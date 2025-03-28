import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Sparkles, X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function StyleMeHeader({
  showBackButton = true,
  title = "Style Me",
}: {
  showBackButton?: boolean;
  title?: string;
}) {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
          <X size={20} strokeWidth={3.5} color="#1e1e1e" />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Sparkles size={24} strokeWidth={2.5} color="#1e1e1e" style={{ marginRight: 8 }} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 110,
    backgroundColor: "#c1d1d7",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 62,
    left: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
});
