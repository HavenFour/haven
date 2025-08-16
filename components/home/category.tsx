import { COLORS } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Category({ categories, selectedCategory, onSelectCategory }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {categories.map((category, idx) => {
          const isActive = selectedCategory === category.name;
          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.categoryItem,
                isActive && { backgroundColor: COLORS.primary }, // Primary color for active
              ]}
              onPress={() => onSelectCategory(category.name)}
              activeOpacity={0.7}
            >
              {/* <MaterialCommunityIcons
                name={category.icon}
                size={20}
                color={isActive ? '#fff' : '#2196f3'}
                style={{ marginRight: 6 }}
              /> */}
              <Text
                style={[
                  styles.categoryText,
                  isActive && { color: '#fff', fontWeight: 'bold' },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    gap: 8,
  },
  categoryItem: {
    backgroundColor: '#efefef',
    borderRadius: 30,
    paddingVertical: 7,
    paddingHorizontal: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  categoryText: {
    fontSize: 15,
    color: '#222',
  },
});
