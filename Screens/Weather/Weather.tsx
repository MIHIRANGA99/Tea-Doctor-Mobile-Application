import React, { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import DetailCard from "../../Components/DetailCard/DetailCard";
import mainStyles from "../../constants/mainStyles";
import axios from "axios";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import useCurrentUser from "../../firebase/hooks/useCurrentUser";
import FullScreenLoader from "../../layouts/FullScreenLoader";

const Weather = ({ changeTab }: {changeTab: (number: number) => void}) => {

  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentLocation = useCurrentLocation();
  const currentUser = useCurrentUser();
  
  useEffect(() => {
    if (currentLocation && currentUser) {
      setIsLoading(true);
      axios.get('http://api.weatherapi.com/v1/current.json?key=adbdbab1c56947b0b6194257230109&q=Colombo').then((res) => {
      const weather = {
        lang: currentLocation?.coords.latitude,
        long: currentLocation?.coords.longitude,
        userId: currentUser?.uid,
        precipitation: res.data.current.precip_mm,
        temp_max: res.data.current.temp_c,
        temp_min: res.data.current.temp_c,
        wind: res.data.current.wind_kph,
        today: new Date().toLocaleDateString()
      }
      axios.post('http://3.112.233.148:8091/detection/detect-weather', weather).then((response) => {
        console.log(response.data);
        setIsLoading(false);
      }).catch((error) => {
        console.error(error);
      })
    }).catch((error) => {
      console.log(error);
    });
    }
  }, [currentUser, currentLocation])

  return (
    <FullScreenLoader isLoading = {isLoading}>
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
      <View style={{ paddingVertical: 12 }}>
        <DetailCard
          header="Weather on Panadura"
        />
      </View>
    </View>
    </FullScreenLoader>
  );
};

export default Weather;
