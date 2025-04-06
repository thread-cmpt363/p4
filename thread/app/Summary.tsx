import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import StyleMeHeader from "../components/ui/StyleMeHeader";
import { List, ChevronLeft, ChevronRight } from "lucide-react-native";
import { Svg, Path } from "react-native-svg";

export default function Summary() {
  const router = useRouter();
  const navigation = useNavigation();
  const { occasion: initialOccasion, layering: initialLayering, style: initialStyle } = useLocalSearchParams();

  const [occasion, setOccasion] = useState(initialOccasion as string);
  const [layering, setLayering] = useState(initialLayering as string);
  const [style, setStyle] = useState(initialStyle as string);
  const [loading, setLoading] = useState(false);

  const [editField, setEditField] = useState<null | "occasion" | "layering" | "style">(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  useEffect(() => {
    // Listeners for keyboard events
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Keyboard is visible
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 100, animated: true }); // Scroll to the bottom when keyboard is shown
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

  const handleGenerateOutfit = async () => {
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

  const handlePrevious = () => {
    router.push({
      pathname: "/StyleQuestion3",
    });
  };

  const renderRow = (
    label: string,
    value: string,
    isEditing: boolean,
    onChange: (text: string) => void,
    editKey: "occasion" | "layering" | "style"
  ) => (
    <View style={styles.row}>
      <Text style={[styles.label, styles.poppinsBold]}>{label}:</Text>
      <View style={styles.answerContainer}>
        {isEditing ? (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={[styles.input, isFocused && styles.answer, isFocused && styles.lexendRegular ]}
            placeholder={`Edit ${label}`}
            placeholderTextColor="#555"
            autoFocus
            returnKeyType="done"
            blurOnSubmit={false}
            onSubmitEditing={() => setEditField(null)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        ) : (
          <Text style={[styles.answer, styles.lexendRegular]}>{value}</Text>
        )}
        <TouchableOpacity onPress={() => setEditField(editKey)}>
          <View style={styles.editIconWrapper}>
            <Svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <Path 
                d="M9.90003 1.83986C10.2221 1.51783 10.6588 1.33691 11.1142 1.33691C11.5697 1.33691 12.0064 1.51783 12.3285 1.83986C12.6505 2.16189 12.8314 2.59866 12.8314 3.05408C12.8314 3.5095 12.6505 3.94626 12.3285 4.26829L4.63842 11.9583L1.40051 12.7678L2.20999 9.5299L9.90003 1.83986Z"
                stroke="#1E1E1E"
                strokeWidth="1.61896"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
          <Text style={[styles.editText, styles.poppinsBold]}>EDIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <StyleMeHeader onBack={() => navigation.goBack()} />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.container, keyboardVisible && styles.containerWithKeyboard]}>
        {/* Summary Icon and Title */}
        <View style={styles.titleContainer}>
          <List size={20} color="#c1d1d7" strokeWidth={2} />
          <Text style={[styles.title, styles.poppinsBold]}>Summary</Text>
        </View>

        {/* Editable Summary Rows */}
        {renderRow("Occasion", occasion, editField === "occasion", setOccasion, "occasion")}
        {renderRow("Layering", layering, editField === "layering", setLayering, "layering")}
        {renderRow("Style", style, editField === "style", setStyle, "style")}

        {/* Navigation Buttons */}
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
            style={[styles.navigationButton, styles.nextButton, loading && { opacity: 0.5 }]}
            onPress={handleGenerateOutfit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#1e1e1e" />
            ) : (
              <ChevronRight 
                size={32} 
                strokeWidth={2.75}
                fill={"#C1D1D7"} 
                color={"#1e1e1e"}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
  },
  containerWithKeyboard: {
    paddingBottom: 24, // Increase padding when the keyboard is visible
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  poppinsBold: {
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  lexendRegular: {
    fontFamily: "Lexend",
  },
  container: {
    // flex: 1,
    // backgroundColor: "#1e1e1e",
    paddingBottom: 0,
  },
  titleContainer: {
    paddingHorizontal: 24,
    gap: 8,
    marginTop: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#c1d1d7",
  },
  row: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  label: {
    color: "#c1d1d7",
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "600",
  },
  answerContainer: {
    flexDirection: "row",
  },
  answer: {
    color: "#1e1e1e",

    backgroundColor: "#c1d1d7",
    flex: 1,
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    color: "#1e1e1e",
    fontSize: 14,
    flex: 1,
  },
  editIconWrapper: {
    marginLeft: 12,
    backgroundColor: "#c1d1d7",
    borderRadius: 50,
    padding: 8,
  },
  editText: {
    fontSize: 12,
    color: "#c1d1d7",
    textAlign: "center",
    paddingLeft:10,
    position:"relative",
    top:6,
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
