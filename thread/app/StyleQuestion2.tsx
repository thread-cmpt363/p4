
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Shirt, Layers} from "lucide-react-native";
import StyleMeHeader from "../components/ui/StyleMeHeader";
import { Sun } from "lucide-react-native";

export default function StyleQuestion3() {
  const router = useRouter();
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string | null>(null);
  const { occasion } = useLocalSearchParams();

  const handleNext = () => {
    if (!selected) return;
    router.push({
      pathname: "/StyleQuestion3",
      params: { occasion, layering: selected },
    });
  };
  

  const options = ["No layers", "Light layers", "Heavy layers"];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Title with sparkle icon */}
        <View style={styles.titleContainer}>
          <StyleMeHeader onBack={() => navigation.goBack()} />
        </View>
      </View>

      {/* Question + Description */}
      <View style={styles.contentWrapper}>
        <Layers size={20} color="white" />  
        <Text style={styles.questionText}>How will you layer?</Text>
        <Text style={styles.subText}>
          Layers refer to outerwear, e.g. jackets & coats.
        </Text>

        {/* Weather preview */}
        <View style={styles.weatherCard}>
          <Sun size={20} color="#1e1e1e" fill="#1e1e1e" />
          <Text style={styles.weatherText}>It will be</Text>
          <Text style={styles.tempHighlight}>COOL</Text>
          <Text style={styles.weatherText}>today.
            <Text style={styles.emoji}> 🌤</Text>
          </Text>
          <Text style={styles.weatherNote}>12°C condition</Text>
        </View>

        {/* Options */}
        <View style={styles.optionGroup}>
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.optionButton, selected === item && styles.selectedButton]}
              onPress={() => setSelected(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Next button */}
      <TouchableOpacity
        style={[styles.nextButton, !selected && { opacity: 0.5 }]}
        onPress={handleNext}
        disabled={!selected}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    paddingTop: 0,
  },
  header: {
    width: "100%",
    height: 110,
    backgroundColor: "#c1d1d7",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    marginTop: 66,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  subText: {
    color: "#C1D1D7",
    fontSize: 14,
    marginBottom: 24,
  },
  weatherCard: {
    backgroundColor: "#c1d1d7",
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
    alignItems: "flex-start",
  },
  weatherText: {
    fontSize: 16,
    color: "#1e1e1e",
  },
  weatherNote: {
    fontSize: 14,
    marginTop: 4,
    color: "#1e1e1e",
  },
  tempHighlight: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
  emoji: {
    fontSize: 18,
  },
  optionGroup: {
    gap: 12,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#c1d1d7",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  selectedButton: {
    backgroundColor: "#c1d1d7",
  },
  optionText: {
    color: "white",
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: "#c1d1d7",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  nextButtonText: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 16,
  },
});
