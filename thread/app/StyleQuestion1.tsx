import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { X, Calendar, Sparkles } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import StyleMeHeader from "../components/ui/StyleMeHeader";

const OCCASIONS = [
  "Work", "Dinner", "Lunch", "Date Night", "School", "Workout",
  "Party", "Hangout with Friends", "Movie", "Beach Day", "Park",
];

export default function StyleQuestion1() {
  const router = useRouter();
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");

  const handleNext = () => {
    const finalAnswer = [selected, customInput].filter(Boolean).join(": ");
    if (!finalAnswer) return;

    router.push({
      pathname: "/StyleQuestion2",
      params: { occasion: finalAnswer },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <StyleMeHeader onBack={() => navigation.goBack()} />
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionWrapper}>
        <Calendar size={20} color="white" />
        <Text style={styles.questionText}>What’s the{'\n'}occasion today?</Text>
      </View>

      {/* Options */}
      <ScrollView contentContainerStyle={styles.buttonGrid}>
        {OCCASIONS.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.button,
              selected === item && styles.selectedButton,
            ]}
            onPress={() => {
              setSelected(item);
            }}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Text input + "Next" */}
      <View style={styles.bottomArea}>
        <Text style={styles.orText}>Or start typing...</Text>
        <TextInput
          placeholder="Type your occasion"
          placeholderTextColor="#999"
          value={customInput}
          onChangeText={(text) => {
            setCustomInput(text);
          }}
          style={styles.input}
        />

        <TouchableOpacity
          style={[
            styles.nextButton,
            !(selected || customInput) && { opacity: 0.5 },
          ]}
          onPress={handleNext}
          disabled={!(selected || customInput)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        },
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
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
  },
  questionWrapper: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 66,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  buttonGrid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "#c1d1d7",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  selectedButton: {
    backgroundColor: "#c1d1d7",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  bottomArea: {
    marginTop: "auto",
    paddingBottom: 30,
  },
  orText: {
    paddingHorizontal: 20,
    color: "#c1d1d7",
    marginBottom: 200,
  },
  input: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#c1d1d7",
    color: "white",
    fontSize: 16,
    paddingVertical: 6,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#c1d1d7",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 16,
  },
});
