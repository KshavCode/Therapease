import React from "react";
import { StyleSheet, Text, View } from "react-native";

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

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
}
export default ProfileScreen;


