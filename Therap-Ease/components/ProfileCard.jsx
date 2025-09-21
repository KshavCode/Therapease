import React from "react";
import { StyleSheet, View } from "react-native";

const ColorPallete = {
  first: "#BEEF9E",
  second: "#A6C36F",
  third: "#828C51",
  fourth: "#335145",
  fifth: "#1E352F",
};


function ProfileCard({email, name, location, age, height, weight}) {
  return (
    <View style={styles.screen}>
    </View>
  );
}
export default ProfileCard;

const styles = StyleSheet.create({
  screen: {
    flex:1,
    width: "90%",
    marginTop: "5%",
    backgroundColor: ColorPallete.second,
    borderRadius: 10,
    shadowColor: "#000",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPallete.fifth,
  },
  card: {
    
  }
});


