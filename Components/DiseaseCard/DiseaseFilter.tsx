import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
    backgroundColor: "#f2f2f2",
    marginTop: 5,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  activeCategory: {
    backgroundColor: "rgba(39, 89, 0, 0.58)",
  },
  activeText: {
    color: "#fff",
  },
});

export default DiseaseFilters;
