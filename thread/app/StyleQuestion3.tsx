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
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import StyleMeHeader from "../components/ui/StyleMeHeader";
import { Svg, Path } from "react-native-svg";
import { ChevronLeft, ChevronRight } from "lucide-react-native"; 


const STYLES = [
  "Casual", "Formal", "Minimalistic", "Athleisure",
  "Streetwear", "Preppy", "Y2K", "Coquette", "Vintage"
];

export default function StyleQuestion1() {
  const router = useRouter();
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { occasion, layering } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleNext = () => {
    const finalAnswer = [selected, customInput].filter(Boolean).join(": ");
    if (!finalAnswer) return;

    router.push({
      pathname: "/Summary",
      params: { occasion, layering, style: finalAnswer },
    });
  };

  const handlePrevious = () => {
    router.push({
      pathname: "/StyleQuestion2",
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
        contentContainerStyle={[
          styles.container,
          keyboardVisible && styles.containerWithKeyboard
        ]}
      >
        {/* Question */}
        <View style={styles.questionWrapper}>
          <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path 
              d="M16.5 2.66663V6.33329M22.5 29.3333H28.5L25.8333 2.66663H7.16667L4.5 29.3333H10.5L16.5 12.6666L22.5 29.3333Z" 
              stroke="#C1D1D7" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <Path 
              d="M11.8334 2.66663C11.8334 2.66663 11.8334 6.66663 10.5 7.99996C9.16668 9.33329 6.43335 9.99996 6.43335 9.99996M21.1667 2.66663C21.1667 2.66663 21.1667 6.66663 22.5 7.99996C23.8334 9.33329 26.5667 9.99996 26.5667 9.99996" 
              stroke="#C1D1D7" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={[styles.questionText, styles.poppinsBold]}>
            What’s your{'\n'}preferred style for{'\n'}this outfit?
          </Text>
        </View>

        {/* Options */}
        <View style={styles.buttonGrid}>
          {STYLES.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.button, selected === item && styles.selectedButton]}
              onPress={() => {
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
              onPress={() => setIsFocused(true)}
            >
              Or start typing...
            </Text>
          ) : null}
          <TextInput
            placeholder=""
            value={customInput}
            onChangeText={(text) => setCustomInput(text)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.input, styles.inputText]}
            returnKeyType="done"
          />

          {/* Next button */}
          <View style={styles.navigation}>
            {/* Back button */}
            <TouchableOpacity
              style={[styles.navigationButton, styles.backButton]}
              onPress={handlePrevious}
            >
              <ChevronLeft 
                size={32} 
                strokeWidth={2.75}
                fill={"#C1D1D7"} 
                color={"#1e1e1e"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navigationButton, styles.nextButton, !(selected || customInput) && { opacity: 0}]}
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
  lexendRegular: {
    fontFamily: "Lexend",
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
  },
  container: {
    paddingBottom: 20,
  },
  containerWithKeyboard: {
    paddingBottom: 24,
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
  label: {
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
  navigation: {
    marginTop: 130,
    flexDirection: "row",
  },
  navigationButton: {
    backgroundColor: "#c1d1d7",
    marginHorizontal: 24,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
  },
  nextButton: {
    marginLeft: "auto",
    paddingLeft:4,
  },
  backButton: {
    marginRight: "auto",
    paddingRight:4,
  },
  navigationButtonText: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 16,
  },
});
