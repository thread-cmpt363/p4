import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import StyleMeHeader from "../components/ui/StyleMeHeader";
import { Pencil, List, ChevronLeft, ChevronRight } from "lucide-react-native";

export default function Results() {
  const router = useRouter();
  const { occasion, layering, style } = useLocalSearchParams();

  const Row = ({ label, value, editTarget }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.answerContainer}>
        <Text style={styles.answer}>{value}</Text>
        <TouchableOpacity onPress={() => router.push(editTarget)}>
          <View style={styles.editIconWrapper}>
            <Pencil size={16} color="#1e1e1e" />
          </View>
          <Text style={styles.editText}>EDIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Title with sparkle icon */}
        <View style={styles.titleContainer}>
          <StyleMeHeader onBack={() => navigation.goBack()} />
        </View>
      </View>

      {/* Summary Icon and Title */}
      <View style={styles.iconRow}>
        <List size={20} color="white" />
        <Text style={styles.title}>Summary</Text>
      </View>

      {/* Summary Rows */}
      <Row label="Occasion" value={occasion} editTarget="/StyleQuestion1" />
      <Row label="Layering" value={layering} editTarget="/StyleQuestion2" />
      <Row label="Style" value={style} editTarget="/StyleQuestion3" />

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.navCircle}>
          <ChevronLeft size={20} color="#1e1e1e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navCircle}>
          <ChevronRight size={20} color="#1e1e1e" />
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
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 36,
    },
    header: {
      width: "100%",
      height: 110,
      backgroundColor: "#c1d1d7",
      justifyContent: "center",
      alignItems: "center",
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
  