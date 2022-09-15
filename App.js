import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
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
    flex:3,
  },
  day: {
    backgroundColor: "teal",
    flex:1,
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
})