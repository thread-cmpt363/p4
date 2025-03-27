import React, {useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Sparkles, Star, X } from "lucide-react-native"; // Assuming you're using lucide-react-native for icons
import { useNavigation } from '@react-navigation/native';
// import generateHaiku from '../lib/generateOutfit'

export default function StyleMeQuiz() {
  const navigation = useNavigation();

  useEffect(() => {
    generateHaiku();

    // Reset any state or effects when the component is mounted
    const unsubscribe = navigation.addListener('focus', () => {
      // Logic to handle when this screen is focused again
      // For example, resetting any variables or states if needed
    });

    return unsubscribe;
  }, [navigation]);

  // Data for the content sections
  const welcomeText = {
    title: "Welcome to\nOutfit Styling!",
    description:
      "Let's style your outfits! Based on your closet and personal preferences, we'll create a tailored outfit just for you.",
    additionalInfo:
      "Answer a few quick questions to help us refine your style!",
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <X size={20} strokeWidth={3.5} color="#1e1e1e" />
        </TouchableOpacity>``

        {/* Title with sparkle icon */}
        <View style={styles.titleContainer}>
          <Sparkles size={24} strokeWidth={2.5} color="#1e1e1e" style={{marginRight: 8}} />
          <Text style={[styles.title, styles.poppinsBold]}>Style Me</Text>
        </View>
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Welcome section with star icon */}
        <View style={styles.welcomeSection}>
          <Star size={27} color="#C1D1D7" fill="#C1D1D7" />
          <Text style={[styles.welcomeTitle, styles.poppinsBold]}>{welcomeText.title}</Text>
        </View>

        {/* Description section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>{welcomeText.description}</Text>
          <Text style={[styles.description, styles.additionalInfo]}>
            {welcomeText.additionalInfo}
          </Text>
        </View>

        {/* Get Started button */}
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText, styles.poppinsBold]}>Get Started</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

// Styles
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
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "flex-end",
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
    // position: "absolute",
    // top: 46,
    // left: 118,
  },
  title: {
    fontSize: 24,
    color: "#1e1e1e",
  },
  mainContent: {
    flex: 1,
    width: "100%",
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 0,
    justifyContent: "center",
    marginTop: "-160",
  },
  welcomeSection: {
    position: "relative",
  },
  welcomeTitle: {
    marginTop: 24,
    fontSize: 36,
    color: "#c1d1d7",
    lineHeight: 43.2,
  },
  descriptionSection: {
    marginTop: 24,
  },
  description: {
    fontFamily: "Lexend",
    fontWeight: "normal",
    fontSize: 16,
    color: "white",
    lineHeight: 24,
  },
  additionalInfo: {
    marginTop: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#c1d1d7",
    borderRadius: 46,
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    marginLeft: 16,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1e1e1e",
  },
});
