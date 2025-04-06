import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, Shirt, Sun } from "lucide-react-native";
import BottomNavigation from '../components/ui/bottomNavigation';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Svg, Path } from 'react-native-svg';

export default function Dashboard(){
  const navigation = useNavigation();

  // Data for recently added clothing items
  const recentlyAddedItems = [
    { id: 1, src: require("../assets/images/dashboard/navy_pink_top.png"), alt: "Blue top with pink design" },
    { id: 2, src: require("../assets/images/dashboard/denim_jeans.png"), alt: "Denim shorts" },
    { id: 3, src: require("../assets/images/dashboard/cat_shirt.png"), alt: "White t-shirt with cat print" },
  ];

  const [fontsLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Lexend': require('../assets/fonts/Lexend-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.poppinsBold]}>Dashboard</Text>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        {/* Your Closet Card */}
        <View style={[styles.card, styles.leftCardMargin, styles.rightCardMargin]}>
          <View style={styles.cardHeader}>
            <Shirt size={20} color="white" strokeWidth={2.5}
            style={{marginTop: 8}} />
            <Text style={[styles.cardTitle, styles.poppinsBold]}>Your Closet</Text>
          </View>
          <Text style={[styles.recentlyAddedText, styles.lexendRegular]}>Recently Added</Text>
          <View style={styles.imageContainer}>
            {recentlyAddedItems.map((item) => (
              <Image
                key={item.id}
                style={styles.image}
                source={item.src}
              />
            ))}
          </View>
        </View>

        {/* Date & Weather Cards */}
        <View style={styles.row}>
          {/* Date Card */}
          <View style={[styles.card, styles.dateCard, styles.leftCardMargin]}>
            <Text style={[styles.dayText, styles.poppinsSemibold]}>Monday</Text>
            <Text style={[styles.dateText, styles.poppinsSemibold]}>8</Text>
            {/* <Calendar size={24} strokeWidth={2.5} color="#1e1e1e" 
            style={{position: "absolute", bottom:24, left:16}} /> */}
            <View style={{position: "absolute", bottom:24, left:16}}>
              <Svg
                width={23}
                height={25}
                viewBox="0 0 23 25"
                fill="none"
              >
                <Path
                  d="M19.6221 2.86777H18.4221V0.467773H16.0221V2.86777H6.42212V0.467773H4.02212V2.86777H2.82212C1.49012 2.86777 0.434119 3.94777 0.434119 5.26777L0.422119 22.0678C0.422119 23.3878 1.49012 24.4678 2.82212 24.4678H19.6221C20.9421 24.4678 22.0221 23.3878 22.0221 22.0678V5.26777C22.0221 3.94777 20.9421 2.86777 19.6221 2.86777ZM19.6221 22.0678H2.82212V10.0678H19.6221V22.0678ZM7.62212 14.8678H5.22212V12.4678H7.62212V14.8678ZM12.4221 14.8678H10.0221V12.4678H12.4221V14.8678ZM17.2221 14.8678H14.8221V12.4678H17.2221V14.8678ZM7.62212 19.6678H5.22212V17.2678H7.62212V19.6678ZM12.4221 19.6678H10.0221V17.2678H12.4221V19.6678ZM17.2221 19.6678H14.8221V17.2678H17.2221V19.6678Z"
                  fill="#1E1E1E"
                />
              </Svg>
            </View>
          </View>

          {/* Weather Card */}
          <View style={[styles.card, styles.weatherCard, styles.rightCardMargin]}>
            <Text style={[styles.cityText, styles.poppinsSemibold]}>Vancouver</Text>
            <Text style={[styles.tempText, styles.poppinsSemibold]}>12°</Text>
            <View style={styles.weatherInfo}>
              <Sun size={20} color="#1e1e1e" fill="#1e1e1e" />
              <Text style={[styles.weatherText, styles.lexendRegular]}>Sunny</Text>
              <Text style={[styles.weatherText, styles.lexendRegular]}>H:12° L:8°</Text>
            </View>
          </View>
        </View>

        {/* Style Me Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('styleMeQuiz')}
        >
          <Text style={[styles.buttonText, styles.poppinsBold]}>Style an Outfit</Text>
        </TouchableOpacity>

        <BottomNavigation />

      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  poppinsBold: {
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  poppinsSemibold: {
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  lexendRegular: {
    fontFamily: "Lexend",
  },
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 124,
    backgroundColor: "#c1d1d7",
    justifyContent: "flex-end",
    paddingLeft: 20,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 32,
    // fontWeight: "800",
    color: "#1e1e1e",
  },
  main: {
    flex: 1,
    width: "100%",
    paddingTop: 24,
    backgroundColor: "#121212",
  },
  card: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  leftCardMargin: {
    marginLeft: 24
  },
  rightCardMargin: {
    marginRight: 24
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 8,
    marginBottom: -8,
  },
  recentlyAddedText: {
    fontSize: 16,
    color: "#C1D1D7",
    marginTop: 8,
    marginBottom: 12,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  image: {
    width: 96,
    height: 140,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  dateCard: {
    flex: 1,
    backgroundColor: "#d7e1e5",
    padding: 20,
    marginRight: 8,
  },
  dayText: {
    fontSize: 16,
    color: "#1e1e1e",
  },
  dateText: {
    fontSize: 42,
    color: "#1e1e1e",
  },
  weatherCard: {
    flex: 1,
    backgroundColor: "rgba(192,214,222,1)",
    padding: 20,
  },
  cityText: {
    fontSize: 16,
    color: "#1e1e1e",
  },
  tempText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#1e1e1e",
  },
  weatherInfo: {
    marginTop: 0,
  },
  weatherText: {
    fontSize: 16,
    color: "#1e1e1e",
  },
  button: {
    backgroundColor: "#C1D1D7",
    paddingVertical: 10,
    borderRadius: 46,
    marginHorizontal: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#1e1e1e",
    fontSize: 16,
    fontWeight: "bold",
  },
});

