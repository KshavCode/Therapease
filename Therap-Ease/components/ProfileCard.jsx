import React from "react";
import { StyleSheet, View } from "react-native";

const ColorPallete = {
  first: "#BEEF9E",
  second: "#A6C36F",
  third: "#828C51",
  fourth: "#335145",
  fifth: "#1E352F",
};


function ProfileCard() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}> 

      </View>
    </View>
  );
}
export default ProfileCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPallete.first,
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorPallete.fifth,
  },
  card: {
    width: "90%",
    height: "30%",
    backgroundColor: ColorPallete.second,
    borderRadius: 10,
    shadowColor: "#000",
  }
});


