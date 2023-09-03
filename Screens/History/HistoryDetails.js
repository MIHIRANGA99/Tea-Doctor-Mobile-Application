import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { COLOR_PALETTE } from "../../constants/colors";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";

const HistoryDetails = ({ route }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState("");

  const user = useCurrentUser();
  const { url, category } = route.params;

  const API_URL = `http://35.77.105.18:8091/detection/${url}`;

  let featureList = [];

  if (category === "Blister Blight") {
    featureList = ["healthy", "blister_blight"];
  } else if (category === "Stem and Branch") {
    featureList = ["healthy", "bark_cancer", "leaf_cancer"];
  } else if (category === "Shot Hole Borer") {
    featureList = [0, 1];
  } else {
    featureList = ["rainy", "drizzle", "sun"];
  }

  const handlePress = () => {
    Linking.openURL(item.audioURL);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const sortedData = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        if (selectedFeature === "") {
          setData(sortedData);
        } else {
          const filteredData = sortedData.filter((item) => {
            return (
              (item.label && item.label.includes(selectedFeature)) ||
              (item.status &&
                item.status.toString().includes(selectedFeature)) ||
              (item.todayWeatherClass &&
                item.todayWeatherClass.includes(selectedFeature))
            );
          });
          console.log(filteredData);
          setData(filteredData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL, selectedFeature]);

  const formatCreatedAt = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return { date: formattedDate, time: formattedTime };
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" />
      ) : (
        <View style={styles.historyContainer}>
          <Text style={{ color: COLOR_PALETTE.primary, fontWeight: "700" }}>
            {user ? `Hi ${user.email}!` : "Loading..."}
          </Text>
          <Text style={styles.label}>Detection History of {category} </Text>
          <Text style={styles.countText}>
            {data !== null ? `Total Records: ${data.length}` : ""}
          </Text>

          <View style={styles.rowContainer}>
            {featureList.map((featureName, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedFeature(featureName)}
                style={[
                  styles.featureButton,
                  {
                    backgroundColor:
                      selectedFeature === featureName
                        ? COLOR_PALETTE.primary
                        : "transparent",
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      selectedFeature === featureName
                        ? "white"
                        : COLOR_PALETTE.primary,
                  }}
                >
                  {featureName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {data !== null && data.length > 0 ? (
            data.map((item) => (
              <View key={item._id} style={styles.cardContainer}>
                {category === "Weather" ? (
                  <>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require("../../assets/rain.jpeg")}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.detailsContainer}>
                      <Text>
                        Weather:{" "}
                        {item.todayWeatherClass.charAt(0).toUpperCase() +
                          item.todayWeatherClass.slice(1)}
                      </Text>
                      <Text>Wind Speed: {item.wind} km/h</Text>
                      <Text>Humidity: {item.humidities[0]} %</Text>
                      <Text>Rainfall: {item.rainfalls[0]} mm</Text>
                      <Text>Date: {formatCreatedAt(item.createdAt).date}</Text>
                    </View>
                  </>
                ) : category === "Shot Hole Borer" ? (
                  <>
                    <View style={styles.imageContainer}>
                      {item.status === 1 ? (
                        <Image
                          source={require("../../assets/shot.jpg")}
                          style={styles.image}
                        />
                      ) : (
                        <Image
                          source={require("../../assets/no.png")}
                          style={styles.image}
                        />
                      )}
                    </View>
                    <View style={styles.detailsContainer}>
                      <Text>
                        Status:{" "}
                        {item.status === 0
                          ? "No shot hole Borrer"
                          : "Shot-hole Borer"}
                      </Text>
                      <Text>count: {item.count}</Text>
                      <Text>Audio: <Text style={{ color: 'blue', textDecorationLine: 'underline',  }}>Play</Text> </Text>
                      <Text>Date: {formatCreatedAt(item.createdAt).date}</Text>
                      <Text>Time: {formatCreatedAt(item.createdAt).time}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: item.imgURL }}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.detailsContainer}>
                      <Text>Disease: {item.label}</Text>
                      <Text>Score: {item.score}</Text>
                      <Text>Ratio: {item.ratio}</Text>
                      <Text>Date: {formatCreatedAt(item.createdAt).date}</Text>
                      <Text>Time: {formatCreatedAt(item.createdAt).time}</Text>
                    </View>
                  </>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noData}>No detection history available</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  historyContainer: {
    alignItems: "center",
    padding: 16,
    marginTop: 25,
  },
  loader: {
    flex: 1,
    marginTop: 400,
    justifyContent: "center",
    alignItems: "center",
    color: COLOR_PALETTE.primary,
  },
  countText: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  featureButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR_PALETTE.primary,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignItems: "center",
    margin: 2,
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 25,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
  },
  imageContainer: {
    flex: 1,
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 2,
  },
  noData: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
});

export default HistoryDetails;
