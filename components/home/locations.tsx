import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Locations({ locations }) {
  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={locations}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationText}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No locations found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  locationItem: {
    backgroundColor: '#fffbe7',
    borderRadius: 10,
    marginVertical: 5,
    padding: 12,
    elevation: 1,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
});
