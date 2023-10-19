import React, { useState } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import DiseaseCard from "../../Components/DiseaseCard/DiseaseCard";
import DiseaseFilters from "../../Components/DiseaseCard/DiseaseFilter";
import { diseaseDetails } from "../../lib/data";
import { COLOR_PALETTE } from "../../constants/colors";

const DiseaseDisplay = () => {
  const allCategories = Array.from(
    new Set(diseaseDetails.map((disease) => disease.category))
  );

  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  const filteredDiseases = activeCategory
    ? diseaseDetails.filter((disease) => disease.category === activeCategory)
    : diseaseDetails;

  const handleSelectCategory = (category: string | null) => {
    setActiveCategory(category);
  };

  const filteredDiseasesWithSearch = filteredDiseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="රෝගයේ නම අනුව සොයන්න..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <DiseaseFilters
        categories={allCategories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />
      <FlatList
        data={filteredDiseasesWithSearch}
        style={{backgroundColor: COLOR_PALETTE.secondary}}
        keyExtractor={(index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <DiseaseCard disease={item} />
          </View>
        )}
      />
      
    </>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLOR_PALETTE.secondary,
    paddingTop: 50,
  },
  searchBar: {
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },

  container: {
    padding: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 30,
  },
});

export default DiseaseDisplay;
