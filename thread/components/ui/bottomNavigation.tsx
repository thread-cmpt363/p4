import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LayoutGrid, Plus, User } from "lucide-react-native"; // Assuming lucide-react-native is in use

export default function BottomNavigation() {
  // Navigation items data for easy mapping
  const navItems = [
    {
      icon: <LayoutGrid size={35} color="white" />,
      label: "Dashboard",
    },
    {
      icon: <Plus size={25} color="#1e1e1e" strokeWidth={3} />,
      label: "",
      isCenter: true,
    },
    {
      icon: <User size={25} color="white" />,
      label: "Profile",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.navItemsContainer}>
          {/* Dashboard Button */}
          <View style={styles.iconContainer}>
          <Image 
            source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAdUlEQVR4nOWVQQrAIAwEfV7+/4T0IVP05KGKu2Chda6JDDEmlvIbgAAunskad3J7QQ3MSCe3FzQG1TWc3HMFyeYexEQyfEV62QpvCHL1XjEHbflecZosVttQY3sFaMvOEihNtgTLhzhWkGz+cEIYtJCX3We5AbskbaLkfaUHAAAAAElFTkSuQmCC' }} 
            style={{ width: 24, height: 24, borderColor: "white" }}
          />
           
          <Text style={styles.iconLabel}>{navItems[0].label}</Text>
          </View>

          {/* Center Add Button */}
          <TouchableOpacity style={styles.centerButton}>
            {navItems[1].icon}
          </TouchableOpacity>

          {/* Profile Button */}
          <View style={styles.iconContainer}>
            {navItems[2].icon}
            <Text style={styles.iconLabel}>{navItems[2].label}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    position: "absolute",
    width: "390",
    height: "100",
    bottom: "0",
  },
  navbar: {
    height: 88,
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderTopWidth: 1,
    borderColor: "#C1D1D7", // You can replace this with your actual blue color
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 0,
    justifyContent: "center",
  },
  navItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 65,
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: 45,
    height: 45,
    justifyContent: "center",
  },
  centerButton: {
    width: 35.06,
    height: 35.06,
    borderRadius: 17.53,
    backgroundColor: "#C1D1D7", // Replace with your desired color
    justifyContent: "center",
    alignItems: "center",
  },
  iconLabel: {
    position: "absolute",
    top: 35,
    width: "100%",
    textAlign: "center",
    fontFamily: "Lexend-Regular", // You might need to add this font
    fontSize: 8,
    color: "white",
  },
});
