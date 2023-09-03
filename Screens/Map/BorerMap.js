import React, { useState, useEffect } from "react";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import { StyleSheet, View, Button, Text, Image } from "react-native";
import { default_URL } from "../../constants/url";

export default function BorerMap() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 6.74, // Replace with your initial coordinates
    longitude: 79.9, // Replace with your initial coordinates
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [locations, setLocations] = useState([]);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  const circleRadius = 1000; // Define the radius of the circular region in meters

  useEffect(() => {
    // Fetch data from the provided API endpoint
    fetch(`${default_URL}/detection/insect-detections`) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setLocations(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const navigateToNextMarker = () => {
    if (selectedMarkerIndex === null) {
      // If no marker is selected, start from the first marker
      setSelectedMarkerIndex(0);
    } else if (selectedMarkerIndex < locations.length - 1) {
      // If there are more markers, navigate to the next marker
      setSelectedMarkerIndex(selectedMarkerIndex + 1);
    }
  };

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

  // Filter locations based on whether they are within the circular region
  const filteredLocations = locations.filter((location) => {
    const distance = getDistance(
      mapRegion.latitude,
      mapRegion.longitude,
      location.lang,
      location.long
    );
    return distance <= circleRadius;
  });

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Circle
          center={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
          }}
          radius={circleRadius}
          strokeWidth={1}
          strokeColor="rgba(0, 0, 255, 0.5)"
          fillColor="rgba(0, 0, 255, 0.2)"
        />
        {filteredLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.lang,
              longitude: location.long,
            }}
          >
            <Callout>
              <View>
                {/* <Image
                  source={require("./assets/leaf.png")} // Replace with the path to your image
                  style={{ width: 32, height: 32 }}
                /> */}
                <Text style={styles.label}>{location.label}</Text>
                <Text style={styles.text}>Score: {location.score}</Text>
                <Text style={styles.text}>Ratio: {location.ratio}</Text>
                <Text style={styles.text}>Created At: {location.createdAt}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="Next Location"
          onPress={navigateToNextMarker}
          disabled={selectedMarkerIndex === locations.length - 1}
        />
      </View>
    </View>
  );
}

// Function to calculate the distance between two coordinates in meters
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 500; // Distance in meters
  return distance;
}

// Function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
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
    bottom: 20,
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