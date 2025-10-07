import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorTheme } from "../constants/GlobalStyles.jsx";

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
    backgroundColor: ColorTheme.first,
    width: "100%",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: ColorTheme.first,
    marginTop: 15,
    marginLeft: 20,
  },
  username: {
    fontSize: 40,
    marginTop: 0,
    color: "white",
  },
  card: {
    width: "95%",
    height: "20%",
    backgroundColor: ColorTheme.fourth,
    borderRadius: 10,
    shadowColor: "#000",
  },
});
