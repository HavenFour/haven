"use client";
import { COLORS } from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { 
  Image, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent
} from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const onboardingData = [
  {
    image: require("../../assets/images/Journey-amico.png"),
    title: "Start Your Journey",
    description: "Discover new places and create unforgettable memories with our travel companion app."
  },
  {
    image: require("../../assets/images/Traveling-amico.png"), // Replace with your second image
    title: "Plan & Explore", 
    description: "Easily plan your trips, find hidden gems, and explore destinations like never before."
  },
  {
    image: require("../../assets/images/Trip-amico.png"), // Replace with your third image
    title: "Share & Connect",
    description: "Share your adventures with friends and connect with fellow travelers around the world."
  }
];

export default function GetStarted() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % onboardingData.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * screenWidth,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // If user is authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/(protected)/home");
    }
  }, [isAuthenticated, router]);

  // Handle manual scroll
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  // Handle dot press
  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {onboardingData.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {onboardingData.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
              onPress={() => scrollToIndex(index)}
            />
          ))}
        </View>
      </View>

      {/* Get Started Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        {/* Optional: Skip button */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text style={styles.skipButtonText}>Create Account Instead</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 280,
    height: 280,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: "ubuntu-bold",
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: "ubuntu-regular",
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    backgroundColor: '#D0D0D0',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  getStartedButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  getStartedButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    fontFamily: "ubuntu-medium",
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
    fontFamily: "ubuntu-regular",
  },
});