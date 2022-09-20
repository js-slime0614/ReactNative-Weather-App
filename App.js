import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";

const API_KEY = "2f48ef9ab67108c16cc0fb7cc330fa8e";
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function App() {
  const [city, setCity] = useState("Loading..");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted) {
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
      );
    console.log(response);
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >

        {days.length === 0 ? <View style={styles.day}>
          <ActivityIndicator color="white" size="large" style={{marginTop: 10}}/>
        </View>
        : days.map((day, index) =>
          <View key={index} style={styles.day}>
            <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
            <Text style={styles.description}>{day.weather[0].main}</Text>
            <Text style={styles.tinyText}>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
          </View>
          )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {flex:1, backgroundColor:"tomato"},
  city : {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  cityName: {
    color:"white",
    fontSize:48,
    fontWeight: "500",
  },
  weather:{
    
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems:"center",
  },
  temp: {
    marginTop:50,
    fontSize:170,
  },
  description:{
    fontSize: 60,
    marginTop: -30,
  },
  tinyText:{
    fontSize:20,
  }
})