import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import StyleMeHeader from "../components/ui/StyleMeHeader";
import { ChevronRight } from "lucide-react-native"; 

const OCCASIONS = [
  "Work", "Dinner", "Lunch", "Date Night", "School", "Workout",
  "Party", "Hangout with Friends", "Movie", "Beach Day", "Park",
];

export default function StyleQuestion1() {
  const router = useRouter();
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false); 
  
  const scrollViewRef = useRef<ScrollView | null>(null);
  
  useEffect(() => {
    // Listeners for keyboard events
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Keyboard is visible
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true }); // Scroll to the bottom when keyboard is shown
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Keyboard is hidden
      }
    );

    // Clean up the listeners when the component unmounts
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Function to handle when user clicks on the placeholder
  const handleClickPlaceholder = () => {
    setIsFocused(true); // This will focus the TextInput
  };

  const handleNext = () => {
    const finalAnswer = [selected, customInput].filter(Boolean).join(": ");
    if (!finalAnswer) return;

    router.push({
      pathname: "/StyleQuestion2",
      params: { occasion: finalAnswer },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StyleMeHeader onBack={() => navigation.goBack()} />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.container, keyboardVisible && styles.containerWithKeyboard]}
      >
        {/* Question */}
        <View style={styles.questionWrapper}>
          <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <Path d="M25.3333 25.3333H6.66667V10.6667H25.3333M21.3333 1.33334V4.00001H10.6667V1.33334H8V4.00001H6.66667C5.18667 4.00001 4 5.18668 4 6.66668V25.3333C4 26.0406 4.28095 26.7189 4.78105 27.219C5.28115 27.7191 5.95942 28 6.66667 28H25.3333C26.0406 28 26.7189 27.7191 27.219 27.219C27.719 26.7189 28 26.0406 28 25.3333V6.66668C28 5.95943 27.719 5.28116 27.219 4.78106C26.7189 4.28096 26.0406 4.00001 25.3333 4.00001H24V1.33334M22.6667 16H16V22.6667H22.6667V16Z" fill="#C1D1D7"/>
          </Svg>
          <Text style={[styles.questionText, styles.poppinsBold]}>
            What’s the{'\n'}occasion today?
          </Text>
        </View>

        {/* Options */}
        <View style={styles.buttonGrid}>
          {OCCASIONS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.button, selected === item && styles.selectedButton]}
              onPress={() => {
                // Toggle selection: if the item is selected, deselect it, otherwise select it
                setSelected((prevSelected) => (prevSelected === item ? null : item));
              }}
            >
              <Text style={[styles.buttonText, styles.lexendRegular, selected === item && styles.selectedText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Text input + "Next" */}
        <View style={styles.bottomArea}>
          {!isFocused && customInput === '' ? (
            <Text 
              style={[styles.label, styles.lexendRegular]} 
              onPress={handleClickPlaceholder}
            >
              Or start typing...
            </Text>
          ) : null}
          <TextInput
            placeholder=""
            value={customInput}
            onChangeText={(text) => {
              setCustomInput(text);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.input, styles.inputText]}
          />

            <TouchableOpacity
              style={[
                styles.nextButton,
                !(selected || customInput) && { opacity: 0 },
              ]}
              onPress={handleNext}
              disabled={!(selected || customInput)}
            >
              <ChevronRight 
                size={32} 
                strokeWidth={2.75}
                fill={"#C1D1D7"} 
                color={"#1e1e1e"}
              />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
  },
  container: {
    paddingBottom: 20, // Add some padding at the bottom
  },
  containerWithKeyboard: {
    paddingBottom: 24, // Increase padding when the keyboard is visible
  },
  questionWrapper: {
    paddingHorizontal: 24,
    gap: 12,
    marginTop: 80,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 32,
    lineHeight: 38.4,
    fontWeight: "bold",
    color: "#C1D1D7",
  },
  buttonGrid: {
    marginTop: 24,
    paddingHorizontal: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  button: {
    borderWidth: 2,
    borderColor: "#c1d1d7",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  selectedButton: {
    backgroundColor: "#c1d1d7",
  },
  buttonText: {
    color: "#C1D1D7",
    fontSize: 14,
  },
  selectedText: {
    color: "#1e1e1e",
  },
  bottomArea: {
    marginTop: 32,
  },
  label:{
    color: "#c1d1d7",
    fontSize: 24,
    marginLeft: 24,
    position: "absolute",
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#c1d1d7",
    color: "white",
    fontSize: 16,
    paddingBottom: 24,
    marginHorizontal: 24,
  },
  inputText: {
    color: "#c1d1d7",
    fontSize: 24,
  },
  nextButton: {
    backgroundColor: "#c1d1d7",
    marginTop: 110,
    marginHorizontal: 24,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft:4,
    width: 48,
    height: 48,
    marginLeft:"auto",
  },
  nextButtonText: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 16,
  },
});
