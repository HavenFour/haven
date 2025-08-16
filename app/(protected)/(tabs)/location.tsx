import { Text, View, Platform, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<Location.LocationGeocodedAddress | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        // Request permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        // Get current position (consider setting accuracy for iOS/Android)
        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });
        setLocation(current);

        // Reverse geocode coordinates to address
        const { latitude, longitude } = current.coords;
        const results = await Location.reverseGeocodeAsync({ latitude, longitude });

        // results is an array; pick the first if available
        if (results && results.length > 0) {
          setAddress(results[0]);
        }
      } catch (e: any) {
        setErrorMsg(e?.message ?? "Something went wrong while getting location.");
      }
    }

    getCurrentLocation();
  }, []);

  // Compose display text
  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    const { latitude, longitude } = location.coords;
    text = `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;
  }

  // Optional helper to format address nicely
  const renderAddress = (addr: Location.LocationGeocodedAddress | null) => {
    if (!addr) return null;
    const line1 = [addr.name, addr.street].filter(Boolean).join(" ");
    const line2 = [addr.city, addr.region, addr.postalCode].filter(Boolean).join(", ");
    const line3 = addr.country || "";
    return [line1, line2, line3].filter(Boolean).join("\n");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      {address && (
        <Text style={[styles.paragraph, { marginTop: 12 }]}>
          {renderAddress(address)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
