import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

// Updated promotion data with better structure
const promotionData = [
  {
    id: '1',
    title: 'Santorini Sunset Loft',
    discount: '50% OFF',
    originalPrice: '$299',
    salePrice: '$890',
    description: 'Experience a cliffside loft with iconic white walls, blue domes, and magical sunset views.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=350&fit=crop',
    location: 'Santorini, Greece',
    rating: 4.8,
    reviews: 2341,
    tag: 'Romantic Stay',
    duration: '2 Night Trip',
    isLiked: false,
  },
  {
    id: '2',
    title: 'Mountain Adventure Lodge',
    discount: '30% OFF',
    originalPrice: '$450',
    salePrice: '$650',
    description: 'Explore breathtaking peaks and scenic valleys with luxury mountain accommodation.',
    image: 'https://images.unsplash.com/photo-1464822759844-d150baec028b?w=400&h=350&fit=crop',
    location: 'Swiss Alps',
    rating: 4.9,
    reviews: 1876,
    tag: 'Adventure',
    duration: '3 Night Trip',
    isLiked: true,
  },
  {
    id: '3',
    title: 'Parisian City Escape',
    discount: '25% OFF',
    originalPrice: '$380',
    salePrice: '$480',
    description: 'Urban exploration with cultural experiences in the heart of the City of Light.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=350&fit=crop',
    location: 'Paris, France',
    rating: 4.7,
    reviews: 3021,
    tag: 'Cultural',
    duration: '4 Night Trip',
    isLiked: false,
  },
];

const PromotionCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.gradientOverlay} />
      
      {/* Like Button */}
      <TouchableOpacity style={styles.likeButton}>
        <Ionicons 
          name={item.isLiked ? "heart" : "heart-outline"} 
          size={20} 
          color={item.isLiked ? "#FF4757" : "#fff"} 
        />
      </TouchableOpacity>
      
      {/* Content Overlay */}
      <View style={styles.overlayContent}>
        <View style={styles.titleSection}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.priceText}>{item.salePrice}</Text>
        </View>
        
        <Text style={styles.cardDescription}>{item.description}</Text>
        
        {/* Tags Row */}
        <View style={styles.tagsRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFB800" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>
        
        {/* Book Now Button */}
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

export default function Promotions() {
  const handlePromotionPress = (promotion) => {
    console.log('Pressed promotion:', promotion.title);
    // Handle navigation or action here
  };

  const renderPromotion = ({ item }) => (
    <PromotionCard item={item} onPress={handlePromotionPress} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={promotionData}
        renderItem={renderPromotion}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        snapToInterval={CARD_WIDTH + 20}
        decelerationRate="fast"
        snapToAlignment="start"
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
       
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 16,
  },
  listContainer: {
    paddingHorizontal: 0,
  },
  card: {
    width: CARD_WIDTH,
    height: 460,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  likeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  overlayContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    lineHeight: 28,
    flex: 1,
    marginRight: 16,
    letterSpacing: -0.5,
  },
  priceText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    lineHeight: 22,
    marginBottom: 20,
    fontWeight: '400',
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backdropFilter: 'blur(10px)',
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    marginLeft: 4,
  },
  tagBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backdropFilter: 'blur(10px)',
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
  },
  durationBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backdropFilter: 'blur(10px)',
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});