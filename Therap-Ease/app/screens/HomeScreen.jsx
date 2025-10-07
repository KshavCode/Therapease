import React from "react";
import { StyleSheet, View } from "react-native";
import { ColorTheme } from "../../constants/GlobalStyles.jsx";
import UserCard from "..\\components\\UserCard";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorTheme.first,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorTheme.fifth,
  },
});

function HomeScreen({ role }) {
  return (
    <View style={styles.screen}>
      <UserCard username="ABC XYZ" role={role}/>
    </View>
  );
}
export default HomeScreen;


