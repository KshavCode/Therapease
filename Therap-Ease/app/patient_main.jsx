import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/home_screen";
import ProfileScreen from "./screens/profile_screen";
import SearchScreen from "./screens/search_screen";
// ...existing code...

const ColorPallete = {
  first: "#BEEF9E",
  second: "#A6C36F",
  third: "#828C51",
  fourth: "#335145",
  fifth: "#1E352F",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPallete.first,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPallete.fifth,
  },
});

const Tab = createBottomTabNavigator();

const App = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: ColorPallete.fourth,
      },
      tabBarActiveTintColor: ColorPallete.first,
      tabBarInactiveTintColor: "gray",
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") iconName = "home-outline";
        else if (route.name === "Search") iconName = "search-outline";
        else if (route.name === "Notifications") iconName = "notifications-outline";
        else if (route.name === "Profile") iconName = "person-outline";
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home">
      {() => <HomeScreen role="patient" />}
    </Tab.Screen>
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Profile">
      {() => <ProfileScreen role="doctor" />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default App;


