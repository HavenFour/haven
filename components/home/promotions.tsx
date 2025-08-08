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
const CARD_WIDTH = width * 0.8;

// Updated promotion data with better structure
const promotionData = [
  {
    id: '1',
    title: 'Summer Beach Paradise',
    discount: '50% OFF',
    originalPrice: '$299',
    salePrice: '$149',
    description: 'Tropical beaches await you with crystal clear waters',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
    location: 'Bali, Indonesia',
    rating: 4.8,
    reviews: 2341,
    tag: 'Popular',
  },
  {
    id: '2',
    title: 'Mountain Adventure',
    discount: '30% OFF',
    originalPrice: '$450',
    salePrice: '$315',
    description: 'Explore breathtaking peaks and scenic valleys',
    image: 'https://images.unsplash.com/photo-1464822759844-d150baec028b?w=400&h=250&fit=crop',
    location: 'Swiss Alps',
    rating: 4.9,
    reviews: 1876,
    tag: 'Adventure',
  },
  {
    id: '3',
    title: 'City Break Special',
    discount: '25% OFF',
    originalPrice: '$380',
    salePrice: '$285',
    description: 'Urban exploration with cultural experiences',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=250&fit=crop',
    location: 'Paris, France',
    rating: 4.7,
    reviews: 3021,
    tag: 'Cultural',
  },
  {
    id: '4',
    title: 'Desert Safari',
    discount: '40% OFF',
    originalPrice: '$220',
    salePrice: '$132',
    description: 'Experience golden dunes and starlit nights',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=250&fit=crop',
    location: 'Dubai, UAE',
    rating: 4.6,
    reviews: 1543,
    tag: 'Unique',
  },
];

const PromotionCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.gradientOverlay} />
      
      {/* Tag Badge */}
      <View style={styles.tagBadge}>
        <Text style={styles.tagText}>{item.tag}</Text>
      </View>
      
      {/* Discount Badge */}
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>
    </View>
    
    {/* Card Content */}
    <View style={styles.cardContent}>
      {/* Location and Rating */}
      <View style={styles.cardHeader}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={12} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFB800" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
      </View>
      
      {/* Title */}
      <Text style={styles.cardTitle}>{item.title}</Text>
      
      {/* Description */}
      <Text style={styles.cardDescription}>{item.description}</Text>
      
      {/* Price and CTA */}
      <View style={styles.cardFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          <Text style={styles.salePrice}>{item.salePrice}</Text>
        </View>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={14} color="#fff" />
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
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
        snapToAlignment="start"
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 8,
  },
  listContainer: {
    // paddingHorizontal: 20,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
    // All shadow properties removed for clean flat design
  },
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  tagBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: '#333',
    fontSize: 11,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF4757',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginLeft: 4,
    fontWeight: '400',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#333',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    marginLeft: 2,
  },
  reviewsText: {
    color: '#999',
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
    marginLeft: 2,
  },
  cardTitle: {
    color: '#1a1a1a',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  cardDescription: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '400',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  salePrice: {
    color: COLORS.primary,
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ctaText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    marginRight: 4,
  },
});
