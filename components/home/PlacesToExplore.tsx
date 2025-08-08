import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const { width } = Dimensions.get('window');
const PlacesToExplore = () => {
  // Sample places data with all requested fields
  const placesData = [
    {
      id: '1',
      name: 'Santorini Island',
      description: 'Experience breathtaking sunsets over the Aegean Sea with iconic blue-domed churches',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=250&fit=crop',
      rating: 4.9,
      reviews: 3247,
      distance: '2.3 km',
      tags: ['Beach', 'Romantic', 'Photography'],
      bestTimeToVisit: 'Apr - Oct',
      category: 'Island',
    },
    {
      id: '2',
      name: 'Machu Picchu',
      description: 'Ancient Incan citadel perched high in the Andes Mountains with mysterious history',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=250&fit=crop',
      rating: 4.8,
      reviews: 5642,
      distance: '5.8 km',
      tags: ['Historical', 'Adventure', 'UNESCO'],
      bestTimeToVisit: 'May - Sep',
      category: 'Mountain',
    },
    {
      id: '3',
      name: 'Kyoto Bamboo Forest',
      description: 'Walk through towering bamboo groves creating natural green tunnels of tranquility',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=250&fit=crop',
      rating: 4.7,
      reviews: 2891,
      distance: '1.2 km',
      tags: ['Nature', 'Cultural', 'Peaceful'],
      bestTimeToVisit: 'Mar - May',
      category: 'Forest',
    },
    {
      id: '4',
      name: 'Northern Lights, Iceland',
      description: 'Witness the magical Aurora Borealis dancing across the pristine Arctic sky',
      image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=250&fit=crop',
      rating: 4.9,
      reviews: 1876,
      distance: '12.5 km',
      tags: ['Aurora', 'Winter', 'Photography'],
      bestTimeToVisit: 'Oct - Mar',
      category: 'Nature',
    },
    {
      id: '5',
      name: 'Dubai Marina',
      description: 'Modern waterfront district with luxury yachts, skyscrapers, and vibrant nightlife',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop',
      rating: 4.6,
      reviews: 4321,
      distance: '3.7 km',
      tags: ['Luxury', 'Modern', 'Nightlife'],
      bestTimeToVisit: 'Nov - Apr',
      category: 'City',
    },
  ];

  const handlePlacePress = (place) => {
    console.log('Explore place:', place.name);
    // Handle navigation to place details
  };

  const renderPlace = ({ item }) => (
    <PlaceCard item={item} onPress={handlePlacePress} />
  );

  return (
    <FlatList
      data={placesData}
      renderItem={renderPlace}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.placesListContainer}
      snapToInterval={PLACE_CARD_WIDTH + 16}
      decelerationRate="fast"
      snapToAlignment="start"
      ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
    />
  );
};

// Place Card Component
const PlaceCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.placeCard} onPress={() => onPress(item)}>
    {/* Image Container */}
    <View style={styles.placeImageContainer}>
      <Image source={{ uri: item.image }} style={styles.placeImage} />
      <View style={styles.placeOverlay} />
      
      {/* Best Time Badge */}
      <View style={styles.bestTimeBadge}>
        <Ionicons name="calendar" size={10} color="#fff" />
        <Text style={styles.bestTimeText}>{item.bestTimeToVisit}</Text>
      </View>
      
      {/* Distance Badge */}
      <View style={styles.distanceBadge}>
        <Ionicons name="location" size={10} color="#fff" />
        <Text style={styles.distanceText}>{item.distance}</Text>
      </View>
    </View>
    
    {/* Card Content */}
    <View style={styles.placeContent}>
      {/* Header with Rating */}
      <View style={styles.placeHeader}>
        <Text style={styles.placeName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFB800" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
      </View>
      
      {/* Description */}
      <Text style={styles.placeDescription}>{item.description}</Text>
      
      {/* Tags */}
      <View style={styles.tagsContainer}>
        {item.tags.slice(0, 2).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {item.tags.length > 2 && (
          <Text style={styles.moreTagsText}>+{item.tags.length - 2}</Text>
        )}
      </View>
      
      {/* Explore Button */}
      <TouchableOpacity style={styles.exploreButton} onPress={() => onPress(item)}>
        <Text style={styles.exploreText}>Explore</Text>
        <Ionicons name="arrow-forward" size={14} color="#fff" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const PLACE_CARD_WIDTH = width * 0.85;

const styles = StyleSheet.create({

  // Places List Styles
  placesListContainer: {
    // paddingHorizontal: 20,
  },
  placeCard: {
    width: PLACE_CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  placeImageContainer: {
    height: 200,
    position: 'relative',
  },
  placeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  bestTimeBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bestTimeText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    marginLeft: 4,
  },
  distanceBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  distanceText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    marginLeft: 4,
  },
  placeContent: {
    padding: 20,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  placeName: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: 26,
    letterSpacing: -0.3,
    paddingRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#333',
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  reviewsText: {
    color: '#666',
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    marginLeft: 2,
  },
  placeDescription: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
    fontWeight: '400',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 11,
    fontFamily: 'Roboto-Medium',
    color: '#4a5568',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  moreTagsText: {
    fontSize: 11,
    fontFamily: 'Roboto-Medium',
    color: '#999',
    fontWeight: '500',
  },
  exploreButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  exploreText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    marginRight: 6,
    letterSpacing: 0.3,
  },


});

export default PlacesToExplore;
