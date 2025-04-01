import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Sparkle, X } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";

export default function StyleMeResult() {
  const { top, bottom, layer, shoes } = useLocalSearchParams();
  const [outfit, setOutfit] = useState(null);

  useEffect(() => {
    try {
      const parsed = {
        top: JSON.parse(top as string),
        bottom: JSON.parse(bottom as string),
        layer: JSON.parse(layer as string),
        shoes: JSON.parse(shoes as string),
      };
      setOutfit(parsed);
    } catch (error) {
      console.error("Failed to parse outfit:", error);
      Alert.alert("Error", "Could not load outfit.");
    }
  }, []);

  const cleanText = (text: string) => text?.replace(/\*\*/g, "").trim();
  const renderTextItem = (label: string, item) => {
    if (!item || !item.title) return null;
    return (
      <View style={styles.textCard}>
        <Text style={styles.textLabel}>{label}</Text>
        <Text style={styles.textTitle}>{cleanText(item.title)}</Text>
        {item.reason && <Text style={styles.textReason}>{cleanText(item.reason)}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <X size={18} color="#1e1e1e" style={styles.iconLeft} />
        <Sparkle size={24} color="#1e1e1e" style={styles.iconRight} />
        <Text style={styles.headerTitle}>Style Me</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Your Outfit</Text>

        <View style={styles.outfitTextGrid}>
          {renderTextItem("Top", outfit?.top)}
          {renderTextItem("Jacket", outfit?.layer)}
          {renderTextItem("Bottoms", outfit?.bottom)}
          {renderTextItem("Shoes", outfit?.shoes)}
        </View>

        <Text style={styles.sectionTitle}>Make Changes</Text>
        <View style={styles.optionsRow}>
          {["👕", "🧥", "👖", "👟", "🔄"].map((icon, i) => (
            <TouchableOpacity key={i} style={styles.optionButton}>
              <Text style={styles.optionIcon}>{icon}</Text>
              <Text style={styles.optionText}>
                {["Top", "Jacket", "Bottoms", "Shoes", "New Outfit"][i]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.regenerateButton}
          onPress={() =>
            Alert.alert("Coming soon", "Regeneration feature not implemented yet.")
          }
        >
          <Text style={styles.regenerateText}>Regenerate Entire Outfit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  header: {
    height: 100,
    backgroundColor: "#c1d1d7",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
  iconLeft: {
    position: "absolute",
    left: 20,
    top: 60,
  },
  iconRight: {
    position: "absolute",
    left: 120,
    top: 58,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#c1d1d7",
    marginBottom: 12,
  },
  outfitTextGrid: {
    gap: 16,
    marginBottom: 32,
  },
  textCard: {
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
  },
  textLabel: {
    color: "#c1d1d7",
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 14,
  },
  textTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  textReason: {
    color: "#ccc",
    fontSize: 14,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    marginTop: 20,
  },
  optionButton: {
    alignItems: "center",
    width: "18%",
  },
  optionIcon: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 10,
    color: "#c1d1d7",
    textAlign: "center",
    marginTop: 4,
  },
  regenerateButton: {
    marginTop: 40,
    backgroundColor: "#c1d1d7",
    paddingVertical: 14,
    borderRadius: 46,
    alignItems: "center",
  },
  regenerateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
});
