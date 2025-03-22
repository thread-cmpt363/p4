import { Stack } from "expo-router";
import '../styles/tailwind.css'

export default function RootLayout() {
  return(
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header globally
      }}
    />
  );
}
