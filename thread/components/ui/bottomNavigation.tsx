import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, Alert } from "react-native";
import { LayoutGrid, Plus, User, Camera, Image as ImageIcon, X } from "lucide-react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from expo
import { useRouter } from "expo-router";
import { Svg, Path, Circle, Defs, ClipPath, Rect } from 'react-native-svg';

export default function BottomNavigation() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

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

  // Upload to backend
  const uploadToBackend = async (imageUri: string) => {
    const formData = new FormData();

    formData.append("image", {
      uri: imageUri,
      name: "upload.jpg",
      type: "image/jpeg",
    } as unknown as Blob); // TypeScript workaround

    try {
      const response = await fetch("https://84b2-207-23-220-205.ngrok-free.app/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();

      const query =
        "/closet-item-preview" +
        `?image=${encodeURIComponent(imageUri)}` +
        `&title=${encodeURIComponent(data.title)}` +
        `&description=${encodeURIComponent(data.description)}`;

      router.push(query);
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Error", "Failed to upload image.");
    }
  };

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
      uploadToBackend(result.assets[0].uri);
    }
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
      uploadToBackend(result.assets[0].uri);
    }
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
          <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <Defs>
              <ClipPath id="clip0_843_12130">
                <Rect width="36" height="36" fill="white" />
              </ClipPath>
            </Defs>
            <Path
              d="M15.2919 18.9588H6.62524C6.3491 18.9588 6.12524 18.735 6.12524 18.4588V7.12549C6.12524 6.84935 6.3491 6.62549 6.62525 6.62549H15.2919C15.5681 6.62549 15.7919 6.84935 15.7919 7.12549V18.4588C15.7919 18.735 15.5681 18.9588 15.2919 18.9588ZM15.2919 29.6255H6.62524C6.3491 29.6255 6.12524 29.4016 6.12524 29.1255V23.1255C6.12524 22.8493 6.3491 22.6255 6.62525 22.6255H15.2919C15.5681 22.6255 15.7919 22.8493 15.7919 23.1255V29.1255C15.7919 29.4016 15.5681 29.6255 15.2919 29.6255ZM28.6252 29.6255H19.9586C19.6824 29.6255 19.4586 29.4016 19.4586 29.1255V17.7922C19.4586 17.516 19.6824 17.2922 19.9586 17.2922H28.6252C28.9014 17.2922 29.1252 17.516 29.1252 17.7922V29.1255C29.1252 29.4016 28.9014 29.6255 28.6252 29.6255ZM19.4586 13.1255V7.12549C19.4586 6.84935 19.6824 6.62549 19.9586 6.62549H28.6252C28.9014 6.62549 29.1252 6.84935 29.1252 7.12549V13.1255C29.1252 13.4016 28.9014 13.6255 28.6252 13.6255H19.9586C19.6824 13.6255 19.4586 13.4016 19.4586 13.1255Z"
              fill="white"
              stroke="white"
              clipPath="url(#clip0_843_12130)"
            />
          </Svg>
          <Text style={styles.iconLabel}>{navItems[0].label}</Text>
          </View>

          {/* Center Add Button */}
          <TouchableOpacity style={styles.centerButton} onPress={() => setModalVisible(true)}>
            {navItems[1].icon}
          </TouchableOpacity>

          {/* Profile Button */}
          <View style={[{marginRight: 6}, styles.iconContainer]}>
            <Svg
              width={26}
              height={30}
              viewBox="0 0 26 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Circle cx="12.5" cy="13.0713" r="12" stroke="white" />
              <Path
                d="M3.82752 20.6643L3.60754 20.9771L3.85177 21.2713C6.1196 24.0033 9.87975 24.9467 12.5 24.9467C14.328 24.9467 16.7379 24.4856 18.8517 23.2525C17.0092 24.405 14.8319 25.0713 12.5 25.0713C5.87614 25.0713 0.5 19.6951 0.5 13.0713C0.5 6.44743 5.87614 1.07129 12.5 1.07129C19.1239 1.07129 24.5 6.44743 24.5 13.0713C24.5 16.0435 23.4176 18.7645 21.6256 20.8613L21.3959 20.5516C18.7984 17.0507 15.494 16.3213 12.5 16.3213C9.48031 16.3213 6.11234 17.4157 3.82752 20.6643ZM17.375 9.02021C17.375 6.33157 15.1886 4.14521 12.5 4.14521C9.81136 4.14521 7.625 6.33157 7.625 9.02021C7.625 11.7089 9.81136 13.8952 12.5 13.8952C15.1886 13.8952 17.375 11.7089 17.375 9.02021Z"
                stroke="white"
              />
            </Svg>
            <Text style={styles.iconLabel}>{navItems[2].label}</Text>
          </View>
        </View>
      </View>

      {/* Image Preview */}
      {/* {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />} */}

      {/* Modal for Image Options */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <X size={20} strokeWidth={3.5} color="#C1D1D7" />
            </TouchableOpacity>
            <Text style={[styles.poppinsBold, styles.addClosetText]}>
              Add clothes to closet
            </Text>
            <View style={styles.modalOptions}>
              <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
                  <ImageIcon size={24} color="#1e1e1e" />
                  <Text style={styles.optionText}>Open gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
                <Camera size={24} color="#1e1e1e" />
                <Text style={styles.optionText}>Take photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

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
    boxSizing: "border-box",
    backgroundColor: "#1e1e1e",
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
  },
  navbar: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderTopWidth: 1,
    borderColor: "#C1D1D7", // You can replace this with your actual blue color
    paddingTop: 2,
    paddingBottom: 24,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  navItemsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 65,
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
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
    width: "100%",
    textAlign: "center",
    fontFamily: "Lexend-Regular", 
    fontSize: 8,
    color: "white",
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: "flex-end", 
    alignItems: "center", 
  },
  modalContent: { 
    backgroundColor: "#222222", 
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 56, 
    borderRadius: 24, 
    alignItems: "center",
    position: "relative",
    width: "99.8%",
    height: "240",
  },
  addClosetText: {
    fontSize:20,
    marginTop:8,
    color: "#C1D1D7",
  },
  modalOptions: {
    display: "flex", 
    flexDirection: 'row',
    height: "90%",
    gap: 16,
  },
  optionButton: { 
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10, 
    backgroundColor: "#C1D1D7", 
    borderRadius: 16,
    padding: 8,
    width: "50%",
  },
  optionText: { 
    fontFamily: "Poppins",
    fontWeight: "700",
    marginLeft: 10, 
    fontSize: 16, 
  },
  imagePreview: { width: 100, height: 100, marginTop: 10, borderRadius: 8 },
});
