import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';

export default function App() {
  return (
    <View className="bg-green-600 flex-1 items-center justify-center p-10">
      <Text className="text-3xl">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
