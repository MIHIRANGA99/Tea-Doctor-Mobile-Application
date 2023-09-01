import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLOR_PALETTE } from "../../constants/colors";

interface DiseaseFiltersProps {
  categories: string[];
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const DiseaseFilters: React.FC<DiseaseFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.categoryItem,
          activeCategory === null && styles.activeCategory,
        ]}
        onPress={() => onSelectCategory(null)}
      >
        <Text
          style={[
            styles.categoryText,
            activeCategory === null && styles.activeText,
          ]}
        >
          සියල්ල
        </Text>
      </TouchableOpacity>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryItem,
            activeCategory === category && styles.activeCategory,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.categoryText,
              activeCategory === category && styles.activeText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLOR_PALETTE.secondary,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  categoryText: {
    fontSize: 14,
    color: COLOR_PALETTE.primary,
  },
  activeCategory: {
    backgroundColor: COLOR_PALETTE.primary,
  },
  activeText: {
    color: COLOR_PALETTE.secondary,
  },
});

export default DiseaseFilters;
