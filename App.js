import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image, SafeAreaView } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Worksheet from './src/screens/Worksheet';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const LogoHeader = () => (
  <View className="w-full ">
    <Image
      source={require('./assets/images/logo.png')}
      className="w-full h-52"
    />
  </View>
);

const MainTabs = () => {
  return (
    <>
      <LogoHeader />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: { backgroundColor: 'white' },
        }}
      >
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Register" component={Register} />
      </Tab.Navigator>
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen onSplashComplete={handleSplashComplete} />
      ) : (
        <SafeAreaView className="flex-1">
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Worksheet" component={Worksheet} />
          </Stack.Navigator>
        </SafeAreaView>
      )}
    </NavigationContainer>
  );
};
export default App;
