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
const CARD_WIDTH = width * 0.75;

// Sample promotion data (replace with your actual data)
const promotionData = [
  {
    id: '1',
    title: 'Summer Beach Paradise',
    discount: '50% OFF',
    description: 'Tropical beaches await you',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
    location: 'Bali, Indonesia',
  },
  {
    id: '2',
    title: 'Mountain Adventure',
    discount: '30% OFF',
    description: 'Explore breathtaking peaks',
    image: 'https://images.unsplash.com/photo-1464822759844-d150baec028b?w=400&h=250&fit=crop',
    location: 'Swiss Alps',
  },
  {
    id: '3',
    title: 'City Break Special',
    discount: '25% OFF',
    description: 'Urban exploration deals',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=250&fit=crop',
    location: 'Paris, France',
  },
  {
    id: '4',
    title: 'Desert Safari',
    discount: '40% OFF',
    description: 'Experience golden dunes',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=250&fit=crop',
    location: 'Dubai, UAE',
  },
];

const PromotionCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.overlay} />
    
    {/* Discount Badge */}
    <View style={styles.discountBadge}>
      <Text style={styles.discountText}>{item.discount}</Text>
    </View>
    
    {/* Card Content */}
    <View style={styles.cardContent}>
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={14} color="#fff" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
      
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      
      <View style={styles.cardFooter}>
        <Text style={styles.viewDealsText}>View Deals</Text>
        <Ionicons name="arrow-forward" size={16} color="#fff" />
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
        snapToInterval={CARD_WIDTH + 15} // Card width + margin
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  listContainer: {
    paddingRight: 20, // Extra padding at the end
  },
  card: {
    width: CARD_WIDTH,
    height: 200,
    marginRight: 15,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF5722',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.9,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewDealsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});