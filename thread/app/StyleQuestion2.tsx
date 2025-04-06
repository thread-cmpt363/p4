import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import StyleMeHeader from "../components/ui/StyleMeHeader";
import { Svg, Path, Defs, G, ClipPath, Rect } from "react-native-svg";
import { Sun, ChevronLeft, ChevronRight } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';

const OPTIONS = ["No layers", "Light layers", "Heavy layers"];

export default function StyleQuestion3() {
  const router = useRouter();
  const navigation = useNavigation();
  const { occasion } = useLocalSearchParams();
  const [selected, setSelected] = useState<string | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      if (scrollViewRef.current) scrollViewRef.current.scrollToEnd({ animated: true });
    });
    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const handleNext = () => {
    if (!selected) return;
    router.push({
      pathname: "/StyleQuestion3",
      params: { occasion, layering: selected },
    });
  };

  const handlePrevious = () => {
    router.push({
      pathname: "/StyleQuestion1", // Assuming previous screen
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
          keyboardVisible && styles.containerWithKeyboard,
        ]}
      >
        {/* Question + Icon */}
        <View style={styles.questionWrapper}>
          <Svg width="33" height="32" viewBox="0 0 33 32" fill="none">
            <Defs>  
              <ClipPath id="clip0_885_14661">
                <Rect width="33" height="32" fill="white" />
              </ClipPath>
            </Defs>
              <G clipPath="url(#clip0_885_14661)">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.92466 25.0027L1.97399 23.028C1.41221 22.7471 0.967613 22.2769 0.71857 21.7002C0.469527 21.1236 0.43202 20.4776 0.61266 19.876L3.62866 9.824C3.89005 8.95298 4.32688 8.14465 4.91228 7.44873C5.49768 6.75281 6.21927 6.18402 7.03266 5.77733L9.74066 4.42267C10.2962 4.14475 10.9088 4.00004 11.53 4H15.6047C16.2258 4.00004 16.8385 4.14475 17.394 4.42267L20.1007 5.77733C20.9141 6.18402 21.6356 6.75281 22.221 7.44873C22.8064 8.14465 23.2433 8.95298 23.5047 9.824L26.5207 19.876C26.7013 20.4776 26.6638 21.1236 26.4147 21.7002C26.1657 22.2769 25.7211 22.7471 25.1593 23.028L21.2087 25.0027C20.9864 25.8609 20.4854 26.6209 19.7844 27.1634C19.0833 27.706 18.2218 28.0002 17.3353 28H9.79933C8.91261 28.0005 8.05085 27.7064 7.34949 27.1638C6.64813 26.6213 6.14693 25.8611 5.92466 25.0027ZM10.934 6.808C11.119 6.71528 11.3231 6.66689 11.53 6.66667H15.6047C15.8116 6.66689 16.0157 6.71528 16.2007 6.808L16.4513 6.932L13.5673 11.9787L10.6833 6.93333L10.934 6.808ZM14.9007 15.0213L18.8393 8.128L18.91 8.16267C19.3979 8.4065 19.8309 8.74756 20.1821 9.16487C20.5334 9.58219 20.7956 10.0669 20.9527 10.5893L23.9673 20.6427L21.186 22.0333L20.8967 18.556C20.8821 18.3814 20.8334 18.2114 20.7531 18.0557C20.6729 17.9 20.5628 17.7616 20.4291 17.6484C20.2953 17.5353 20.1406 17.4496 19.9738 17.3962C19.807 17.3428 19.6312 17.3228 19.4567 17.3373C19.2821 17.3519 19.1121 17.4006 18.9564 17.4809C18.8006 17.5611 18.6623 17.6712 18.5491 17.8049C18.4359 17.9387 18.3502 18.0934 18.2968 18.2602C18.2435 18.427 18.2235 18.6028 18.238 18.7773L18.6647 23.8893C18.68 24.0732 18.657 24.2582 18.5971 24.4327C18.5372 24.6072 18.4418 24.7673 18.3169 24.9031C18.1919 25.0388 18.0402 25.1471 17.8712 25.2212C17.7023 25.2952 17.5198 25.3334 17.3353 25.3333H14.9007V15.0213ZM12.234 15.0213L8.29533 8.128L8.22466 8.16267C7.73671 8.4065 7.30379 8.74756 6.95251 9.16487C6.60123 9.58219 6.33902 10.0669 6.18199 10.5893L3.16733 20.644L5.94999 22.0347L6.23933 18.5573C6.26868 18.2048 6.43688 17.8783 6.70693 17.6498C6.97698 17.4212 7.32677 17.3093 7.67933 17.3387C8.03189 17.368 8.35835 17.5362 8.58689 17.8063C8.81544 18.0763 8.92734 18.4261 8.89799 18.7787L8.47133 23.8907C8.45622 24.0743 8.47933 24.259 8.5392 24.4333C8.59907 24.6075 8.6944 24.7675 8.81918 24.903C8.94396 25.0386 9.09548 25.1468 9.26417 25.2209C9.43287 25.2949 9.61509 25.3332 9.79933 25.3333H12.234V15.0213Z"
                  fill="#C1D1D7"
                />
              </G>
            </Svg>
          <Text style={[styles.questionText, styles.poppinsBold]}>
            How will you layer?
          </Text>
          <Text style={[styles.subText, styles.lexendRegular]}>
            Layers refer to outerwear, e.g. jackets & coats.
          </Text>
        </View>

        {/* Weather Card */}
        <LinearGradient 
          start={{ x: -0.2, y: 0.2 }}
          end={{ x: 0.8, y: 1.8 }}
          locations={[0, 0.6]}
          colors={['#F4ECCF', '#C0D6DE']} 
          style={styles.weatherCard}>
          {/* Vancouver Text and Sun Icon */}
          <View style={{flexDirection: "row"}}>
            <Text style={[styles.poppinsSemibold,{fontSize:16}]}>
              Vancouver
            </Text>
            <Sun size={20} color="#1e1e1e" fill="#1e1e1e" style={{marginLeft: "auto", position:"relative", top:3}} />
          </View>

          {/* 12 Degrees and Sunny + High/Low Temperatures */}
          <View style={{flexDirection:"row", marginTop:-4, marginBottom:4}}>
            <Text style={[{fontSize:40, color:"#1e1e1e"}, styles.poppinsBold]}>
              12&#176;
            </Text>
            <View style={{flexDirection:"column", paddingTop: 8, marginLeft:"auto"}}>
              <Text style={[styles.lexendRegular, {textAlign:"right", fontSize:16}]}>Sunny</Text>
              <Text style={[styles.lexendRegular, {textAlign:"right", fontSize:16}]}>H:12&#176; L:8&#176;</Text>
            </View>
          </View>

          {/* Set of weather, temperatures + corresponding times */}
          <View style={{flexDirection: "row", justifyContent:"space-between"}}>
            {/* 1PM */}
            <View style={styles.timeAndWeather}>
              <Text style={styles.lexendRegular}>1PM</Text>
              <Sun size={20} color="#1e1e1e" fill="#1e1e1e"/>
              <Text style={styles.lexendRegular}>12&#176;</Text>
            </View>
            {/* 2PM */}
            <View style={styles.timeAndWeather}>
              <Text style={styles.lexendRegular}>2PM</Text>
              <Sun size={20} color="#1e1e1e" fill="#1e1e1e"/>
              <Text style={styles.lexendRegular}>12&#176;</Text>
            </View>
            {/* 3PM */}
            <View style={styles.timeAndWeather}>
              <Text style={styles.lexendRegular}>3PM</Text>
              <Sun size={20} color="#1e1e1e" fill="#1e1e1e"/>
              <Text style={styles.lexendRegular}>12&#176;</Text>
            </View>
            {/* 4PM */}
            <View style={styles.timeAndWeather}>
              <Text style={styles.lexendRegular}>4PM</Text>
              <Sun size={20} color="#1e1e1e" fill="#1e1e1e"/>
              <Text style={styles.lexendRegular}>11&#176;</Text>
            </View>
            {/* 5PM */}
            <View style={styles.timeAndWeather}>
              <Text style={styles.lexendRegular}>5PM</Text>
              <Sun size={20} color="#1e1e1e" fill="#1e1e1e"/>
              <Text style={styles.lexendRegular}>11&#176;</Text>
            </View>
            {/* 6PM */}
            <View style={styles.timeAndWeather}>
              <Text style={styles.lexendRegular}>6PM</Text>
              <Sun size={20} color="#1e1e1e" fill="#1e1e1e"/>
              <Text style={styles.lexendRegular}>10&#176;</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={[styles.weatherStatus]}>
          <Text style={[{marginBottom:-12}, styles.lexendRegular,styles.weatherLine]}>
              It will be <Text style={[styles.tempHighlight, styles.lexendSemibold]}>COOL</Text> today.
          </Text>
          <Text style={[styles.weatherNote, styles.lexendRegular]}><Text style={styles.emoji}>🌤 </Text>12°C condition</Text>
        </View>

        <Text style={[styles.selectText, styles.poppinsBold]}>
          Select layering option:
        </Text>
 
        {/* Options */}
        <View style={styles.buttonGroup}>
          {OPTIONS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.button, selected === item && styles.selectedButton]}
              onPress={() =>
                setSelected((prevSelected) =>
                  prevSelected === item ? null : item
                )
              }
            >
              <Text
                style={[
                  styles.buttonText,
                  styles.lexendSemibold,
                  selected === item && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation */}
        <View style={styles.navigation}>
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
            style={[
              styles.navigationButton,
              styles.nextButton,
              !selected && { opacity: 0 },
            ]}
            onPress={handleNext}
            disabled={!selected}
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
  lexendSemibold: {
    fontFamily: "Lexend",
    fontWeight: "600"
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  containerWithKeyboard: {
    paddingBottom: 100,
  },
  questionWrapper: {
    gap: 12,
    marginTop: 50,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 32,
    lineHeight: 38.4,
    fontWeight: "bold",
    color: "#C1D1D7",
    marginBottom:-4,
  },
  selectText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C1D1D7",
    marginTop: 16,
    marginBottom:-4,
  },
  subText: {
    color: "#C1D1D7",
    fontSize: 14,
  },
  weatherCard: {
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 0,
  },
  weatherStatus:{
    backgroundColor:"#ECE8D1",
    marginTop:0,
    borderTopColor:"#1e1e1e",
    borderTopWidth:2,
    borderBottomLeftRadius:16,
    borderBottomRightRadius:16,
    paddingVertical:6,
    alignItems:"center",
  },
  weatherLine: {
    fontSize: 16,
    color: "#1e1e1e",
  },
  timeAndWeather: {
    alignItems:"center",
  },
  tempHighlight: {
    fontSize: 18,
  },
  emoji: {
    fontSize: 18,
  },
  weatherNote: {
    marginTop: 4,
    fontSize: 14,
    color: "#1e1e1e",
  },
  buttonGroup: {
    marginTop: 16,
    gap: 0,
  },
  button: {
    borderWidth: 2,
    borderColor: "#c1d1d7",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems:"center"
  },
  selectedButton: {
    backgroundColor: "#c1d1d7",
  },
  buttonText: {
    color: "#c1d1d7",
    fontSize: 14,
  },
  selectedText: {
    color: "#1e1e1e",
    fontWeight: "600",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  navigationButton: {
    backgroundColor: "#c1d1d7",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
  },
  backButton: {
    backgroundColor: "#C1D1D7",
    paddingRight:4,
  },
  nextButton: {
    backgroundColor: "#C1D1D7",
    paddingLeft:4,
  },
});
