import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

function SearchScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Search Page</Text>
    </View>
  );
}
export default SearchScreen;


