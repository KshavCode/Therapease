import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorTheme } from "../../constants/GlobalStyles.jsx";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: ColorTheme.first,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: ColorTheme.first,
    marginTop: 15,
    marginLeft: 15,
  },
  text2: {
    fontSize: 30,
    fontWeight: "bold",
    color: ColorTheme.first,
  },
  username: {
    fontSize: 40,
    marginTop: 0,
    color: "white",
  },
  card: {
    width: "95%",
    height: "19%",
    marginTop: "3%",
    backgroundColor: ColorTheme.fourth,
    borderRadius: 10,
    shadowColor: "#000",
  },
});

function SecondCard({role}) {
  if (role === "patient") {
    return (
      <View style={[styles.card, {backgroundColor: ColorTheme.fifth, height: "50%", alignItems:"center", padding: "3%" }]}>
        <Text style={[styles.text2, {color:ColorTheme.first}]}>Recommended Articles</Text>
        <View style={[styles.card, {backgroundColor: "white", height: "36%", marginTop: "3%"}]}>
        </View>
        <View style={[styles.card, {backgroundColor: "white", height: "36%", marginTop: "5%"}]}>
        </View>
      </View>
    );
  }
  else {
    return null;
  }
}

function ThirdCard({role}) {
  if (role === "patient") {
    return (
      <View style={[styles.card, {backgroundColor: ColorTheme.fourth, height: "31%", alignItems:"center", padding: "3%" }]}>
        <Text style={[styles.text2, {color:ColorTheme.first}]}>Today&apos;s Schedule</Text>
      </View>
    );
  }
  else {
    return null;
  }
}

function UserCard({ username, role }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Hello,</Text>
      <Text style={[styles.text, styles.username]}>
        {role === "doctor" ? `Dr. ${username}` : username}
      </Text>
    </View>
  )
}

function HomeScreen({ role }) {
  return (
    <SafeAreaView style={styles.screen}>
        <UserCard username="ABC XYZ" role={role} />
        <SecondCard role={role} />
        <ThirdCard role={role} />
    </SafeAreaView>
  );
}
export default HomeScreen;


