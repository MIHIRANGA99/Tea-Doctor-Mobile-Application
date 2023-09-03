import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { default_URL } from "../../constants/url";
import { COLOR_PALETTE } from "../../constants/colors";

export default function BlisterMap({ changeTab }) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 6.74,
    longitude: 79.9,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [locations, setLocations] = useState([]);
  const [blisterMarkers, setBlisterMarkers] = useState([]);
  const [bugMarkers, setBugMarkers] = useState([]);
  const [stemMarkers, setStemMarkers] = useState([]);
  const [filterBy, setFilterBy] = useState("all");
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  const filters = [
    {
      name: "Blister Blight",
      key: "blister_blight",
      icon: require("../../assets/icons/eco_green.png"),
    },
    {
      name: "Stem and Branch Canker",
      key: "stem_canker",
      icon: require("../../assets/icons/branch.png"),
    },
    {
      name: "Insects",
      key: "insect",
      icon: require("../../assets/icons/bug_red.png"),
    },
  ];

  useEffect(() => {
    fetch(`${default_URL}/detection/blister-disease`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setLocations(data.data);
          const tempArray = [];
          data.data.forEach((res) => {
            tempArray.push({
              lang: res.lang,
              long: res.long,
              label: res.label,
              score: res.score,
              ratio: res.ratio,
              createdAt: res.createdAt,
            });
          });
          setBlisterMarkers(tempArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });

    fetch(`${default_URL}/detection/stem-disease`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setLocations(data.data);
          const tempArray = [];
          data.data.forEach((res) => {
            tempArray.push({
              lang: res.lang,
              long: res.long,
              label: res.label,
              score: res.score,
              ratio: res.ratio,
              createdAt: res.createdAt,
            });
          });
          setStemMarkers(tempArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });

    fetch(`${default_URL}/detection/insect-detections`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setLocations(data.data);
          const tempArray = [];
          data.data.forEach((res) => {
            tempArray.push({
              lang: res.lang,
              long: res.long,
              label: "Insect",
              count: res.count,
              createdAt: res.createdAt,
            });
          });
          setBugMarkers(tempArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  useEffect(() => {
    // Center the map on the selected marker whenever it changes
    if (selectedMarkerIndex !== null) {
      const selectedLocation = locations[selectedMarkerIndex];
      setMapRegion({
        latitude: selectedLocation.lang,
        longitude: selectedLocation.long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [selectedMarkerIndex]);

  const handleFilter = (key) => {
    if (filterBy === key) {
      setFilterBy("all");
    } else {
      setFilterBy(key);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {(filterBy === "blister_blight" || filterBy === "all") &&
          blisterMarkers.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.lang,
                longitude: location.long,
              }}
              icon={require("../../assets/icons/eco_green.png")}
            >
              <Callout>
                <View>
                  <Text style={styles.label}>{location.label}</Text>
                  <Text style={styles.text}>Score: {location.score}</Text>
                  <Text style={styles.text}>Ratio: {location.ratio}</Text>
                  <Text style={styles.text}>
                    Created At: {location.createdAt}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        {(filterBy === "stem_canker" || filterBy === "all") &&
          stemMarkers.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.lang,
                longitude: location.long,
              }}
              icon={require("../../assets/icons/branch.png")}
            >
              <Callout>
                <View>
                  <Text style={styles.label}>{location.label}</Text>
                  <Text style={styles.text}>Score: {location.score}</Text>
                  <Text style={styles.text}>Ratio: {location.ratio}</Text>
                  <Text style={styles.text}>
                    Created At: {location.createdAt}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        {(filterBy === "insect" || filterBy === "all") &&
          bugMarkers.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.lang,
                longitude: location.long,
              }}
              icon={require("../../assets/icons/bug_red.png")}
            >
              <Callout>
                <View>
                  <Text style={styles.label}>{location.label}</Text>
                  <Text style={styles.text}>Count: {location.count}</Text>
                  <Text style={styles.text}>
                    Created At: {location.createdAt}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
      <View style={styles.buttonContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleFilter(filter.key)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor:
                filterBy === filter.key
                  ? COLOR_PALETTE.primary
                  : COLOR_PALETTE.secondary,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginVertical: 4,
              borderRadius: 8,
            }}
          >
            <Image style={{ width: 24, height: 24 }} source={filter.icon} />
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 4,
                color:
                  filterBy === filter.key
                    ? COLOR_PALETTE.secondary
                    : COLOR_PALETTE.primary,
              }}
            >
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-around",
    paddingVertical: 12,
    bottom: 8,
    right: 20,
    zIndex: 10,
  },
  calloutContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },

  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});
