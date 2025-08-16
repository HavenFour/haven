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
const CARD_HEIGHT = 320;

// Data now includes pricing fields explicitly
const promotionData = [
  {
    id: '1',
    title: 'Santorini Sunset Loft',
    description:
      'Experience a cliffside loft with iconic white walls, blue domes, and magical sunset views.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 2341,
    salePrice: '$890',
    originalPrice: '$1,299',
    isLiked: false,
  },
  {
    id: '2',
    title: 'Mountain Adventure Lodge',
    description:
      'Explore breathtaking peaks and scenic valleys with luxury mountain accommodation.',
    image:
      'https://images.unsplash.com/photo-1464822759844-d150baec028b?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 1876,
    salePrice: '$650',
    originalPrice: '$920',
    isLiked: true,
  },
  {
    id: '3',
    title: 'Parisian City Escape',
    description:
      'Urban exploration with cultural experiences in the heart of the City of Light.',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 3021,
    salePrice: '$480',
    originalPrice: '$610',
    isLiked: false,
  },
];

type PromotionItem = (typeof promotionData)[number];

const PromotionCard = ({
  item,
  onPress,
}: {
  item: PromotionItem;
  onPress: (i: PromotionItem) => void;
}) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.9}
    onPress={() => onPress(item)}
  >
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />

      {/* Like Button */}
      <TouchableOpacity style={styles.likeButton} activeOpacity={0.8}>
        <Ionicons
          name={item.isLiked ? 'heart' : 'heart-outline'}
          size={20}
          color={item.isLiked ? '#FF4757' : '#fff'}
        />
      </TouchableOpacity>

      {/* Floating White Info Box with: title, desc, rating, price, explore */}
      <View style={styles.infoBox}>
        {/* Title */}
        <Text numberOfLines={1} style={styles.infoTitle}>
          {item.title}
        </Text>

        {/* Description */}
        <Text numberOfLines={2} style={styles.infoSubtitle}>
          {item.description}
        </Text>

        {/* Rating */}
         <View style={styles.metaRow}>
                    <View style={styles.ratingChip}>
                      <Ionicons name="star" size={12} color="#FFB800" />
                      <Text style={styles.ratingText}>
                        {item.rating.toFixed(1)}
                      </Text>
                      <Text style={styles.reviewsText}>({item.reviews})</Text>
                    </View>
                  </View>

        {/* Price + CTA */}
        <View style={styles.priceCtaRow}>
          <View style={styles.priceGroup}>
            {item.originalPrice ? (
              <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            ) : null}
            <Text style={styles.salePrice}>{item.salePrice}</Text>
          </View>

          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.9}>
            <Text style={styles.ctaText}>Explore</Text>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function Promotions() {
  const handlePromotionPress = (promotion: PromotionItem) => {
    console.log('Pressed promotion:', promotion.title);
  };

  const renderPromotion = ({ item }: { item: PromotionItem }) => (
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

const chipBg = "#F3F6FA";
const chipBorder = "#E6ECF2";

const styles = StyleSheet.create({
  container: {},
  listContainer: {
    paddingHorizontal: 0,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  likeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Floating white panel
  infoBox: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  infoTitle: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 10,
  },

  // Rating row
 metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: chipBg,
    borderColor: chipBorder,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 40,
  },
  ratingText: {
    marginLeft: 4,
    color: "#1f2937",
    fontSize: 12,
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
  },
  reviewsText: {
    marginLeft: 4,
    color: "#6b7280",
    fontSize: 11,
    fontFamily: "Roboto-Regular",
  },

  // Price + CTA
  priceCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  originalPrice: {
    color: '#9CA3AF',
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  salePrice: {
    color: '#111827',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
  },

  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 40,
  },
  ctaText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
    marginRight: 4,
  },
});
