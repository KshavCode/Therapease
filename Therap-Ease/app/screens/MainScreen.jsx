import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorTheme } from "../../constants/GlobalStyles.jsx";
import HomeScreen from "./HomeScreen.jsx";
import ProfileScreen from "./ProfileScreen.jsx";
import SearchScreen from "./SearchScreen.jsx";


const Tab = createBottomTabNavigator();

const App = ( { role } ) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      animation: 'shift',
      tabBarStyle: {
        backgroundColor: ColorTheme.fourth,
      },
      tabBarActiveTintColor: ColorTheme.second,
      tabBarInactiveTintColor: ColorTheme.sixth,
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
      {() => <HomeScreen role={role} />}
    </Tab.Screen>
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Profile">
      {() => <ProfileScreen role={role} />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default App;


