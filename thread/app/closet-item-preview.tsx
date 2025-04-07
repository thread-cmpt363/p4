import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, Edit, X, ArrowLeft, Shirt, AlertCircle } from "lucide-react-native";

export default function ClosetItemPreviewScreen() {
  const router = useRouter();
  const { image, title: initialTitle, description, invalid } = useLocalSearchParams();

  const [title, setTitle] = useState(initialTitle as string);
  const [desc, setDesc] = useState(description as string);
  const [isEditing, setIsEditing] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    if (invalid === "true") {
      setErrorModalVisible(true);
    }
  }, [invalid]);

  const saveToCloset = async () => {
    try {
      const response = await fetch("https://7dbd-2001-569-5248-aa00-20ef-d733-166f-ba5a.ngrok-free.app/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: desc,
          image,
        }),
      });

      const data = await response.json();
      Alert.alert("Saved", "Item saved to closet successfully!");
      router.back();
    } catch (error) {
      console.error("Save failed:", error);
      Alert.alert("Error", "Failed to save item.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <X size={24} color="#1e1e1e" />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Shirt size={24} color="#1e1e1e" />
          <Text style={styles.headerText}>Add to closet</Text>
        </View>
      </View>

      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={16} color="#C1D1D7" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Image preview */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* Title + Description */}
      <View style={styles.details}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          editable={isEditing}
          style={[styles.titleInput, !isEditing && { opacity: 0.6 }]}
          placeholder="Item title"
          placeholderTextColor="#aaa"
          returnKeyType="done"
          blurOnSubmit
          onSubmitEditing={() => setIsEditing(false)}
        />

        <TextInput
          multiline
          value={desc}
          onChangeText={setDesc}
          editable={isEditing}
          style={[styles.descInput, !isEditing && { opacity: 0.6 }]}
          placeholder="Item description"
          placeholderTextColor="#aaa"
          returnKeyType="done"
          blurOnSubmit
          onSubmitEditing={() => setIsEditing(false)}
        />

        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Edit size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={saveToCloset}>
        <Check size={28} color="#1e1e1e" />
      </TouchableOpacity>

      {errorModalVisible && (
      <Modal transparent animationType="fade" visible={errorModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <AlertCircle size={40} color="#3A82F7" style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Clothing Not Recognized</Text>
            <Text style={styles.modalMessage}>
            We couldn’t recognize a clothing item in this image. Try again with better lighting, a clear background, and a sharp focus.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setErrorModalVisible(false);
                router.replace("/");
              }}
            >
              <Text style={styles.modalButtonText}>Retake Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    paddingTop: 60,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 98,
    backgroundColor: "#C1D1D7",
    width: "100%",
    justifyContent: "center",
  },
  headerIcon: {
    position: "absolute",
    left: 16,
    top: 50,
  },
  headerTitle: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 6,
  },
  backButtonText: {
    color: "#C1D1D7",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    resizeMode: "cover",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  details: {
    gap: 12,
    paddingHorizontal: 20,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  descInput: {
    fontSize: 16,
    color: "white",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
  },
  confirmButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#C1D1D7",
    padding: 16,
    borderRadius: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e1e1e",
    marginBottom: 8,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#3A82F7",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
