import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import StyleMeHeader from "../components/ui/StyleMeHeader";
import { Pencil, List, ChevronLeft, ChevronRight, Check } from "lucide-react-native";

export default function Summary() {
  const router = useRouter();
  const { occasion: initialOccasion, layering: initialLayering, style: initialStyle } = useLocalSearchParams();

  const [occasion, setOccasion] = useState(initialOccasion as string);
  const [layering, setLayering] = useState(initialLayering as string);
  const [style, setStyle] = useState(initialStyle as string);
  const [loading, setLoading] = useState(false);

  const [editField, setEditField] = useState<null | "occasion" | "layering" | "style">(null);

  const renderRow = (
    label: string,
    value: string,
    isEditing: boolean,
    onChange: (text: string) => void,
    editKey: "occasion" | "layering" | "style"
  ) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.answerContainer}>
        {isEditing ? (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={styles.input}
            placeholder={`Edit ${label}`}
            placeholderTextColor="#555"
            autoFocus
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={() => setEditField(null)}
          />
        ) : (
          <Text style={styles.answer}>{value}</Text>
        )}
  
        <TouchableOpacity onPress={() => setEditField(editKey)}>
          <View style={styles.editIconWrapper}>
            <Pencil size={16} color="#1e1e1e" />
          </View>
          <Text style={styles.editText}>EDIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );  

  const generateOutfit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://a7c3-2001-569-501e-4f00-44f8-db20-f5f2-9937.ngrok-free.app/api/generate-outfit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ occasion, layering, style }),
        }
      );

      const outfit = await response.json();
      setLoading(false);
      router.push({
        pathname: "/style-me-result",
        params: {
          top: JSON.stringify(outfit.top),
          bottom: JSON.stringify(outfit.bottom),
          layer: JSON.stringify(outfit.layer),
          shoes: JSON.stringify(outfit.shoes),
        },
      });
    } catch (error) {
      console.error("Failed to generate outfit:", error);
      Alert.alert("Error", "Failed to generate outfit. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <StyleMeHeader />
      </View>

      {/* Summary Icon and Title */}
      <View style={styles.iconRow}>
        <List size={20} color="white" />
        <Text style={styles.title}>Summary</Text>
      </View>

      {/* Editable Summary Rows */}
      {renderRow("Occasion", occasion, editField === "occasion", setOccasion, "occasion")}
      {renderRow("Layering", layering, editField === "layering", setLayering, "layering")}
      {renderRow("Style", style, editField === "style", setStyle, "style")}

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.navCircle}>
          <ChevronLeft size={20} color="#1e1e1e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navCircle} onPress={generateOutfit} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#1e1e1e" />
          ) : (
            <ChevronRight size={20} color="#1e1e1e" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    paddingBottom: 30,
  },
  header: {
    width: "100%",
    height: 110,
    backgroundColor: "#c1d1d7",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
  },
  iconRow: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  row: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  label: {
    color: "#c1d1d7",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  answerContainer: {
    backgroundColor: "#c1d1d7",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  answer: {
    color: "#1e1e1e",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    color: "#1e1e1e",
    fontSize: 14,
    flex: 1,
  },
  editIconWrapper: {
    marginLeft: 12,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 4,
  },
  editText: {
    fontSize: 10,
    color: "#c1d1d7",
    marginTop: 2,
    textAlign: "center",
  },
  navButtons: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  navCircle: {
    backgroundColor: "#c1d1d7",
    borderRadius: 50,
    padding: 12,
  },
});
