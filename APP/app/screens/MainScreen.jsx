import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorTheme } from "../../constants/GlobalStyles.jsx";
import AppointmentsScreen from "./AppointmentsScreen.jsx";
import HomeScreen from "./HomeScreen.jsx";
import PatientsScreen from "./PatientsScreen.jsx";
import SearchScreen from "./SearchScreen.jsx";
import SettingsScreen from "./SettingsScreen.jsx";

const Tab = createBottomTabNavigator();

const App = ({ role }) => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          animation: "shift",
          tabBarStyle: {
            backgroundColor: ColorTheme.fourth,
          },
          tabBarActiveTintColor: ColorTheme.second,
          tabBarInactiveTintColor: ColorTheme.sixth,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home-outline";
            else if (route.name === "Search") iconName = "search-outline";
            else if (route.name === "Settings") iconName = "person-outline";
            else if (route.name === "Patients") iconName = "people-outline";
            else if (route.name === "Appointments") iconName = "documents-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home">{() => <HomeScreen role={role} />}</Tab.Screen>
        {role==='doctor' && (
          <Tab.Screen name="Patients" component={PatientsScreen} />
        )}
        <Tab.Screen name="Search" component={SearchScreen} />
        {role==='doctor' && (
          <Tab.Screen name="Appointments" component={AppointmentsScreen} />
        )}
        <Tab.Screen name="Settings">
          {() => <SettingsScreen role={role} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
};

export default App;
