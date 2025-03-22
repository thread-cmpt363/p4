import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, Shirt, Sun } from "lucide-react-native";
import BottomNavigation from '../components/ui/bottomNavigation';

export default function Dashboard(): JSX.Element {
  // Data for recently added clothing items
  const recentlyAddedItems = [
    { id: 1, src: require("../assets/images/dashboard/navy_pink_top.png"), alt: "Blue top with pink design" },
    { id: 2, src: require("../assets/images/dashboard/denim_jeans.png"), alt: "Denim shorts" },
    { id: 3, src: require("../assets/images/dashboard/cat_shirt.png"), alt: "White t-shirt with cat print" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        {/* Your Closet Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Shirt size={20} color="white" />
            <Text style={styles.cardTitle}>Your Closet</Text>
          </View>
          <Text style={styles.recentlyAddedText}>Recently Added</Text>
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
          <View style={[styles.card, styles.dateCard]}>
            <Text style={styles.dayText}>Monday</Text>
            <Text style={styles.dateText}>8</Text>
            <Calendar size={24} color="#555" />
          </View>

          {/* Weather Card */}
          <View style={[styles.card, styles.weatherCard]}>
            <Text style={styles.cityText}>Vancouver</Text>
            <Text style={styles.tempText}>12°</Text>
            <View style={styles.weatherInfo}>
              <Sun size={16} color="black" />
              <Text style={styles.weatherText}>Sunny</Text>
              <Text style={styles.weatherText}>H:12° L:8°</Text>
            </View>
          </View>
        </View>

        {/* Style Me Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Style Me</Text>
        </TouchableOpacity>

        <BottomNavigation />

      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#c1d1d7",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
  main: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "#121212",
  },
  card: {
    backgroundColor: "#444",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 8,
  },
  recentlyAddedText: {
    fontSize: 14,
    color: "#C1D1D7",
    marginBottom: 8,
  },
  imageContainer: {
    flexDirection: "row",
    gap: 8,
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateCard: {
    flex: 1,
    backgroundColor: "#d7e1e5",
    padding: 20,
    marginRight: 8,
  },
  dayText: {
    fontSize: 14,
    color: "#555",
  },
  dateText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#555",
  },
  weatherCard: {
    flex: 1,
    backgroundColor: "rgba(192,214,222,1)",
    padding: 20,
  },
  cityText: {
    fontSize: 14,
    color: "#555",
  },
  tempText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#555",
  },
  weatherInfo: {
    marginTop: 8,
  },
  weatherText: {
    fontSize: 14,
    color: "black",
  },
  button: {
    backgroundColor: "#C1D1D7",
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "1e1e1e",
    fontSize: 16,
    fontWeight: "bold",
  },
});

