import React, { useMemo } from "react";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Place = {
  id: string;
  name: string;
  description: string;
  image: string;
  bestTimeToVisit: string;
  budget: string;
  category: string;
  tags: string[];
  rating: number;     // NEW
  reviews: number;    // NEW
};

type Props = {
  selectedCategory: string | null;
  onPlacePress?: (place: Place) => void;
};

const PLACES: Place[] = [
  {
    id: "1",
    name: "Mountain Lake Resort",
    description:
      "Experience the breathtaking views of mountain peaks and crystal clear lake waters at this serene destination.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
    bestTimeToVisit: "Jun-Sep",
    budget: "$150-$300",
    category: "Mountains",
    tags: ["Nature", "Lakes", "Hiking", "Resort"],
    rating: 4.9,
    reviews: 3247,
  },
  {
    id: "2",
    name: "Santorini Island",
    description:
      "Breathtaking sunsets over the Aegean Sea and iconic blue-domed churches.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=450&fit=crop",
    bestTimeToVisit: "Apr-Oct",
    budget: "$200-$500",
    category: "Beaches",
    tags: ["Beach", "Romantic", "Photography"],
    rating: 4.9,
    reviews: 2890,
  },
  {
    id: "3",
    name: "Machu Picchu",
    description:
      "Ancient Incan citadel perched high in the Andes Mountains with mysterious history.",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=450&fit=crop",
    bestTimeToVisit: "May-Sep",
    budget: "$300-$800",
    category: "Mountains",
    tags: ["Adventure", "Historical", "UNESCO", "Trekking"],
    rating: 4.8,
    reviews: 5642,
  },
  {
    id: "4",
    name: "Kyoto Bamboo Forest",
    description:
      "Walk through towering bamboo groves creating natural green tunnels of tranquility.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=450&fit=crop",
    bestTimeToVisit: "Mar-May",
    budget: "$100-$250",
    category: "Parks",
    tags: ["Nature", "Cultural", "Peaceful"],
    rating: 4.7,
    reviews: 2891,
  },
  {
    id: "5",
    name: "Miami Beach",
    description:
      "Vibrant coastline, palm trees, and turquoise waters perfect for a sunny escape.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=450&fit=crop",
    bestTimeToVisit: "Nov-Apr",
    budget: "$120-$350",
    category: "Beaches",
    tags: ["Beach", "Nightlife", "Water Sports"],
    rating: 4.6,
    reviews: 4321,
  },
];

const MAX_TAGS = 3;

const PlacesToExplore: React.FC<Props> = ({ selectedCategory, onPlacePress }) => {
  const data = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") return PLACES;
    return PLACES.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handlePress = (place: Place) => onPlacePress?.(place);

  const renderItem = ({ item }: { item: Place }) => {
    const visibleTags = item.tags.slice(0, MAX_TAGS);
    const remaining = Math.max(0, item.tags.length - MAX_TAGS);

    return (
      <View style={styles.card}>
        {/* Image */}
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity style={styles.heartBtn} activeOpacity={0.8}>
            <Ionicons name="heart-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>

          {/* Rating chip row (styled like tags) */}
          <View style={styles.metaRow}>
            <View style={styles.ratingChip}>
              <Ionicons name="star" size={12} color="#FFB800" />
              <Text style={styles.ratingText}>
                {item.rating.toFixed(1)}
              </Text>
              <Text style={styles.reviewsText}>({item.reviews})</Text>
            </View>
          </View>

          <Text numberOfLines={2} style={styles.desc}>
            {item.description}
          </Text>

          {/* Tags row */}
          <View style={styles.tagsRow}>
            {visibleTags.map((tag) => (
              <View key={tag} style={styles.tagChip}>
                <Ionicons
                  name="pricetag-outline"
                  size={11}
                  color={COLORS.primary}
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
            {remaining > 0 && (
              <View style={[styles.tagChip, styles.tagChipMuted]}>
                <Text style={[styles.tagText, styles.tagTextMuted]}>
                  +{remaining}
                </Text>
              </View>
            )}
          </View>

          {/* Info row */}
          <View style={styles.infoRow}>
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={16} color="#FF6B35" />
              <Text style={styles.infoText}>
                Best time: {item.bestTimeToVisit}
              </Text>
            </View>

            {/* Budget styled as a chip (same look as tags) */}
            <View style={styles.budgetChip}>
              <Ionicons
                name="wallet-outline"
                size={12}
                color={COLORS.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.budgetChipText}>{item.budget}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.cta}
            onPress={() => handlePress(item)}
            activeOpacity={0.9}
          >
            <Text style={styles.ctaText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      {data.length > 0 ? (
        data.map((item) => (
          <View key={item.id} style={{ marginBottom: 16 }}>
            {renderItem({ item } as any)}
          </View>
        ))
      ) : (
        <Text>No locations found.</Text>
      )}
    </View>
  );
};

const chipBg = "#F3F6FA";
const chipBorder = "#E6ECF2";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden",
    elevation: 4,
  },
  imageWrap: {
    height: 180,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heartBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
  },

  // Rating chip row
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

  desc: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#666",
    lineHeight: 20,
    marginBottom: 10,
  },

  // Tags styling
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 12,
  },
  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: chipBg,
    borderRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: chipBorder,
  },
  tagText: {
    fontSize: 11,
    color: "#2F3A4A",
    fontFamily: "Roboto-Medium",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  tagChipMuted: {
    backgroundColor: "#F7F7F7",
    borderColor: "#EFEFEF",
  },
  tagTextMuted: {
    color: "#7A7A7A",
  },

  // Info row
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  infoText: {
    marginLeft: 6,
    color: "#666",
    fontSize: 12,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
  },

  // Budget chip (matches tags visual language)
  budgetChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: chipBg,
    borderColor: chipBorder,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 40,
  },
  budgetChipText: {
    color: "#1f2937",
    fontSize: 12,
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
  },

  cta: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});

export default PlacesToExplore;
