import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from "react-native";
import { LayoutGrid, Plus, User, Camera, Image as ImageIcon } from "lucide-react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from expo


export default function BottomNavigation() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Request permissions on mount
  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || mediaLibraryStatus.status !== 'granted') {
        alert('Permissions to access camera & media library are required!');
      }
    })();
  }, []);

  // Function to pick an image from the gallery
  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  // Function to take a photo with the camera
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };


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
          <TouchableOpacity style={styles.centerButton} onPress={() => setModalVisible(true)}>
            {navItems[1].icon}
          </TouchableOpacity>

          {/* Profile Button */}
          <View style={styles.iconContainer}>
            {navItems[2].icon}
            <Text style={styles.iconLabel}>{navItems[2].label}</Text>
          </View>
        </View>
      </View>

      {/* Image Preview */}
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />}

      {/* Modal for Image Options */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
              <Camera size={24} color="black" />
              <Text style={styles.optionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
              <ImageIcon size={24} color="black" />
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: 250, alignItems: "center" },
  optionButton: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  optionText: { marginLeft: 10, fontSize: 16 },
  imagePreview: { width: 100, height: 100, marginTop: 10, borderRadius: 8 },
});
