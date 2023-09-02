import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import DetailCard from "../../Components/DetailCard/DetailCard";
import mainStyles from "../../constants/mainStyles";
import axios from "axios";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import FullScreenLoader from "../../layouts/FullScreenLoader";

const Weather = ({ changeTab }: { changeTab: (number: number) => void }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentLocation = useCurrentLocation();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentLocation && currentUser) {
      setIsLoading(true);
      axios
        .get(
          "http://api.weatherapi.com/v1/current.json?key=adbdbab1c56947b0b6194257230109&q=Colombo"
        )
        .then((res) => {
          const weather = {
            lang: currentLocation?.coords.latitude,
            long: currentLocation?.coords.longitude,
            userId: currentUser?.uid,
            precipitation: res.data.current.precip_mm,
            temp_max: res.data.current.temp_c,
            temp_min: res.data.current.temp_c,
            wind: res.data.current.wind_kph,
            today: new Date().toLocaleDateString(),
          };
          axios
            .post("http://3.112.233.148:8091/detection/detect-weather", weather)
            .then((response) => {
              console.log(response.data);
              setWeatherData(response.data.data);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error(error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [currentUser, currentLocation]);

  let formattedDate = null;
  if (weatherData) {
    const detectionDate = new Date(weatherData.detection_date);
    formattedDate = detectionDate.toLocaleDateString();
  }

  return (
    <View style={mainStyles.main}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "100%", resizeMode: "contain" }}
          source={require("../../assets/tea-doctor-logo.png")}
        />
      </View>
      <DetailCard
        header="Suggestions"
        description="Check the tea leaves and scan if you see any odd spots"
      />
      {/* <FullScreenLoader isLoading={isLoading}> */}
        <View style={{ paddingVertical: 12, height: isLoading ? 200 : "100%" }}>
          <DetailCard header="Weather on Rathganga" />
          {weatherData && (
            <View style={styles.container}>
              <Text style={styles.dateText}>Date: {formattedDate}</Text>
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Temperature:</Text>
                  <Text style={styles.value}>{weatherData.temps[0]} °C</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Humidity:</Text>
                  <Text style={styles.value}>
                    {weatherData.humidities[0]} %
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Rainfalls:</Text>
                  <Text style={styles.value}>
                    {weatherData.rainfalls[0]} mm
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Wind Speed:</Text>
                  <Text style={styles.value}>{weatherData.wind} km/h</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Today's Weather:</Text>
                  <Text style={styles.value}>
                    {weatherData.todayWeatherClass}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      {/* </FullScreenLoader> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
});

export default Weather;
