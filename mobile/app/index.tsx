import { ActivityIndicator, View } from 'react-native';

// Splash while the root navigator decides where to send the user (auth vs app).
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#0f766e" />
    </View>
  );
}
