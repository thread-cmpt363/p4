import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Sparkles, X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Svg, Path } from "react-native-svg"

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
      <Image 
        source={require("../../assets/images/styleMeQuiz/header_paint_stroke.png")}
        style={{position:"absolute", bottom: 0,}} />
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
          <X size={24} strokeWidth={3} color="#1e1e1e" />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <View style={{marginRight: 8}}>
          <Svg width="23" height="24" viewBox="0 0 23 24" fill="none">
            <Path
              d="M9.187 15.4998C9.09772 15.1537 8.91734 14.8379 8.66462 14.5851C8.4119 14.3324 8.09607 14.152 7.75 14.0628L1.615 12.4808C1.51033 12.4511 1.41821 12.388 1.35261 12.3012C1.28702 12.2144 1.25153 12.1086 1.25153 11.9998C1.25153 11.891 1.28702 11.7851 1.35261 11.6983C1.41821 11.6115 1.51033 11.5485 1.615 11.5188L7.75 9.93576C8.09595 9.84657 8.41169 9.66633 8.6644 9.4138C8.91711 9.16127 9.09757 8.84565 9.187 8.49976L10.769 2.36476C10.7984 2.25968 10.8614 2.1671 10.9483 2.10116C11.0353 2.03521 11.1414 1.99951 11.2505 1.99951C11.3596 1.99951 11.4657 2.03521 11.5527 2.10116C11.6396 2.1671 11.7026 2.25968 11.732 2.36476L13.313 8.49976C13.4023 8.84583 13.5827 9.16166 13.8354 9.41438C14.0881 9.6671 14.4039 9.84748 14.75 9.93676L20.885 11.5178C20.9905 11.5469 21.0835 11.6098 21.1498 11.6968C21.2161 11.7839 21.2521 11.8903 21.2521 11.9998C21.2521 12.1092 21.2161 12.2156 21.1498 12.3027C21.0835 12.3898 20.9905 12.4527 20.885 12.4818L14.75 14.0628C14.4039 14.152 14.0881 14.3324 13.8354 14.5851C13.5827 14.8379 13.4023 15.1537 13.313 15.4998L11.731 21.6348C11.7016 21.7398 11.6386 21.8324 11.5517 21.8984C11.4647 21.9643 11.3586 22 11.2495 22C11.1404 22 11.0343 21.9643 10.9473 21.8984C10.8604 21.8324 10.7974 21.7398 10.768 21.6348L9.187 15.4998Z"
              stroke="#1E1E1E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <Text style={[styles.poppinsBold, styles.title]}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  poppinsBold: {
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  header: {
    width: "100%",
    height: 98,
    backgroundColor: "#c1d1d7",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e1e1e",
  },
});
