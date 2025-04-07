import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import StyleMeHeader from "../components/ui/StyleMeHeader";
import { List, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react-native";
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
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorContent, setErrorContent] = useState({ title: "", message: "" });

  const scrollViewRef = useRef<ScrollView | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      scrollViewRef.current?.scrollTo({ y: 100, animated: true });
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleGenerateOutfit = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://7dbd-2001-569-5248-aa00-20ef-d733-166f-ba5a.ngrok-free.app/api/generate-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occasion, layering, style }),
      });

      if (!response.ok) {
        const data = await response.json();
        let title = "Invalid Input";
        let message = "Please revise your answers.";

        switch (data.error) {
          case "INVALID_OCCASION":
            message = "That occasion isn’t valid. Please edit it to something plausible.\n\nExamples:\n'Grocery Run', 'Museum Visit'";
            setEditField("occasion");
            break;
          case "INVALID_STYLE":
            message = "That style isn’t valid. Please edit it to something plausible.\n\nExamples:\n'Boho', 'Y2K'";
            setEditField("style");
            break;
          case "INVALID_BOTH":
            message = "Both your occasion and style need to be changed.\n\nOccasion examples:\n'Road Trip', 'Farmers Market'\nStyle examples:\n'Grunge', 'Business Casual'";
            setEditField("occasion");
            break;
          default:
            message = "Something went wrong with your inputs.";
        }

        setErrorContent({ title, message });
        setErrorModalVisible(true);
        setLoading(false);
        return;
      }

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
      setLoading(false);
      setErrorContent({
        title: "Network Error",
        message: "Failed to generate outfit. Please check your connection and try again.",
      });
      setErrorModalVisible(true);
    }
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
            style={[styles.input, isFocused && styles.answer, isFocused && styles.lexendRegular]}
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
    <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StyleMeHeader onBack={() => navigation.goBack()} />

      <ScrollView ref={scrollViewRef} contentContainerStyle={[styles.container, keyboardVisible && styles.containerWithKeyboard]}>
        <View style={styles.titleContainer}>
          <List size={20} color="#c1d1d7" strokeWidth={2} />
          <Text style={[styles.title, styles.poppinsBold]}>Summary</Text>
        </View>

        {renderRow("Occasion", occasion, editField === "occasion", setOccasion, "occasion")}
        {renderRow("Layering", layering, editField === "layering", setLayering, "layering")}
        {renderRow("Style", style, editField === "style", setStyle, "style")}

        <View style={styles.navigation}>
          <TouchableOpacity style={[styles.navigationButton, styles.backButton]} onPress={() => router.push("/StyleQuestion3")}>
            <ChevronLeft size={32} strokeWidth={2.75} fill="#C1D1D7" color="#1e1e1e" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navigationButton, styles.nextButton, loading && { opacity: 0.5 }]}
            onPress={handleGenerateOutfit}
            disabled={loading}
          >
            {loading ? <ActivityIndicator size="small" color="#1e1e1e" /> : <ChevronRight size={32} strokeWidth={2.75} fill="#C1D1D7" color="#1e1e1e" />}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Error Modal */}
      <Modal transparent animationType="fade" visible={errorModalVisible} onRequestClose={() => setErrorModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <AlertCircle size={40} color="#3A82F7" style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>{errorContent.title}</Text>
            <Text style={styles.modalMessage}>{errorContent.message}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setErrorModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: { flex: 1, backgroundColor: "#1e1e1e" },
  containerWithKeyboard: { paddingBottom: 24 },
  container: { paddingBottom: 0 },
  poppinsBold: { fontFamily: "Poppins", fontWeight: "bold" },
  lexendRegular: { fontFamily: "Lexend" },
  titleContainer: { paddingHorizontal: 24, gap: 8, marginTop: 100, marginBottom: 16 },
  title: { fontSize: 32, fontWeight: "bold", color: "#c1d1d7" },
  row: { paddingHorizontal: 20, marginTop: 24 },
  label: { color: "#c1d1d7", fontSize: 20, marginBottom: 8, fontWeight: "600" },
  answerContainer: { flexDirection: "row" },
  answer: {
    backgroundColor: "#c1d1d7",
    flex: 1,
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#1e1e1e",
  },
  input: { color: "#1e1e1e", fontSize: 14, flex: 1 },
  editIconWrapper: { marginLeft: 12, backgroundColor: "#c1d1d7", borderRadius: 50, padding: 8 },
  editText: { fontSize: 12, color: "#c1d1d7", textAlign: "center", paddingLeft: 10, position: "relative", top: 6 },
  navigation: { marginTop: 130, flexDirection: "row" },
  navigationButton: { backgroundColor: "#c1d1d7", marginHorizontal: 24, borderRadius: 100, alignItems: "center", justifyContent: "center", width: 48, height: 48 },
  nextButton: { marginLeft: "auto", paddingLeft: 4 },
  backButton: { marginRight: "auto", paddingRight: 4 },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalBox: { width: "80%", backgroundColor: "#fff", borderRadius: 16, padding: 24, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#1e1e1e", marginBottom: 8, textAlign: "center" },
  modalMessage: { fontSize: 14, color: "#444", textAlign: "center", marginBottom: 20 },
  modalButton: { backgroundColor: "#3A82F7", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 24 },
  modalButtonText: { color: "white", fontWeight: "600", fontSize: 14 },
});
