import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ColorPallete = {
  first: "#BEEF9E",
  second: "#A6C36F",
  third: "#828C51",
  fourth: "#335145",
  fifth: "#1E352F",
};

function UserCard({ username, role }) {
  return (
    <SafeAreaView style={[styles.screen, { marginTop: "15%" }]}>
      <View style={styles.card}>
        <Text style={styles.text}>Hello,</Text>
        <Text style={[styles.text, styles.username]}>
          {role === "doctor" ? `Dr. ${username}` : username}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default UserCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: ColorPallete.first,
    width: "100%",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: ColorPallete.first,
    marginTop: "5%",
    marginLeft: "5%",
  },
  username: {
    fontSize: 30,
    marginTop: 0,
    color: "white",
  },
  card: {
    width: "90%",
    height: "18%",
    backgroundColor: "green",
    borderRadius: 10,
    shadowColor: "#000",
  },
});
