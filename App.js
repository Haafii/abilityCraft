// import { StatusBar } from 'expo-status-bar';
// import {  Text, View } from 'react-native';
// import Login from './src/screens/Login';


// export default function App() {
//   return (
//     <View className="flex-1 items-center justify-center p-10">
//      <Login/>
//       {/* <Text className="text-3xl">Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" /> */}
//     </View>
//   );
// }






// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Login from './src/screens/Login';
// import Register from './src/screens/Register';


// const Tab = createBottomTabNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Login" component={Login} />
//         <Tab.Screen name="Register" component={Register} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Login from './src/screens/Login';
// import Register from './src/screens/Register';

// const Tab = createMaterialTopTabNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Login" component={Login} />
//         <Tab.Screen name="Register" component={Register} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;











// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Login from './src/screens/Login';
// import Register from './src/screens/Register';
// import { View, Image, StyleSheet } from 'react-native';

// const Tab = createMaterialTopTabNavigator();

// const LogoHeader = () => (
//   <View style={styles.logoContainer}>
//     <Image source={require('./assets/images/logo.png')} style={styles.logo} />
//   </View>
// );

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarActiveTintColor: 'white',
//           tabBarInactiveTintColor: 'gray',
//           tabBarLabelStyle: { fontSize: 14 },
//           tabBarStyle: { backgroundColor: 'blue' },
//         }}
//       >
//         <Tab.Screen name="Login" component={Login} />
//         <Tab.Screen name="Register" component={Register} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   logo: {
//     width: 200,
//     height: 150,
//     marginBottom: 20,
//   },
// });

// export default App;






import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { View, Image, StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const LogoHeader = () => (
  <View style={styles.logoContainer}>
    <Image source={require('./assets/images/logo.png')} style={styles.logo} />
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
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
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    // height: 300,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
});

export default App;
