import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProfileCard from "../../components/ProfileCard.jsx";
import { ColorTheme } from "../../constants/GlobalStyles.jsx";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: ColorTheme.first,
    paddingTop: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  searchBox: {
    width: "90%",
    backgroundColor: ColorTheme.second,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  suggestionBox: {
    width: "90%",
    backgroundColor: ColorTheme.second,
    borderRadius: 8,
    height: "80%",
    paddingVertical: 5,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: ColorTheme.third,
  },
  suggestionText: {
    fontSize: 16,
    color: ColorTheme.fourth,
  },
});

function SearchScreen() {
  const names = [
    { id: 1, name: "Alice Johnson", role: "patient" },
    { id: 2, name: "Bob Smith", role: "doctor" },
    { id: 3, name: "Charlie Brown", role: "patient" },
    { id: 4, name: "Diana Prince", role: "patient" },
    { id: 5, name: "Ethan Clark", role: "doctor" },
    { id: 6, name: "Fiona Adams", role: "patient" },
    { id: 7, name: "George Miller", role: "patient" },
    { id: 8, name: "Hannah Davis", role: "patient" },
    { id: 9, name: "Ian Thompson", role: "doctor" },
    { id: 10, name: "Julia Roberts", role: "patient" },
    { id: 11, name: "Kevin Turner", role: "patient" },
    { id: 12, name: "Laura Scott", role: "patient" },
    { id: 13, name: "Michael Carter", role: "doctor" },
    { id: 14, name: "Nina Brooks", role: "patient" },
    { id: 15, name: "Oscar Reed", role: "patient" },
    { id: 16, name: "Paula Hughes", role: "patient" },
    { id: 17, name: "Quinn Parker", role: "doctor" },
    { id: 18, name: "Rachel Ward", role: "patient" },
    { id: 19, name: "Sam Evans", role: "patient" },
    { id: 20, name: "Tina Collins", role: "patient" },
    { id: 21, name: "Umar Patel", role: "doctor" },
    { id: 22, name: "Vera Mitchell", role: "patient" },
    { id: 23, name: "Will Barnes", role: "patient" },
    { id: 24, name: "Xavier Reed", role: "doctor" },
    { id: 25, name: "Yara Lopez", role: "patient" },
    { id: 26, name: "Zack Morgan", role: "patient" },
    { id: 27, name: "Amelia White", role: "patient" },
    { id: 28, name: "Brandon Green", role: "doctor" },
    { id: 29, name: "Clara Young", role: "patient" },
    { id: 30, name: "David Hall", role: "patient" },
    { id: 31, name: "Ella King", role: "patient" },
    { id: 32, name: "Frank Lewis", role: "doctor" },
    { id: 33, name: "Grace Allen", role: "patient" },
    { id: 34, name: "Henry Walker", role: "patient" },
    { id: 35, name: "Isabella Rivera", role: "patient" },
    { id: 36, name: "Jack Cooper", role: "doctor" },
    { id: 37, name: "Kylie Torres", role: "patient" },
    { id: 38, name: "Liam Foster", role: "patient" },
    { id: 39, name: "Maya Perez", role: "patient" },
    { id: 40, name: "Noah Gray", role: "doctor" },
    { id: 41, name: "Olivia Butler", role: "patient" },
    { id: 42, name: "Peter Hughes", role: "patient" },
    { id: 43, name: "Queenie Jenkins", role: "patient" },
    { id: 44, name: "Ronan Phillips", role: "doctor" },
    { id: 45, name: "Sophie Ward", role: "patient" },
    { id: 46, name: "Travis Hill", role: "patient" },
    { id: 47, name: "Uma Shah", role: "patient" },
    { id: 48, name: "Victor Allen", role: "doctor" },
    { id: 49, name: "Wendy Long", role: "patient" },
    { id: 50, name: "Xander Stone", role: "doctor" },
  ];

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [notFound, setNotFound] = useState(true);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      setNotFound(true)
      const results = names.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  };

  const handleSelect = (name) => {
    setQuery(name);
    setFiltered([]);
    setNotFound(false);
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search name..."
        placeholderTextColor={ColorTheme.fourth}
        value={query}
        onChangeText={handleSearch}
      />

      {filtered.length > 0 && (
        <View style={styles.suggestionBox}>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelect(item.name)}
              >
                <Text style={styles.suggestionText}>
                  {item.name} — {item.role}
                </Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={true}
          />
        </View>
      )}
      {!notFound && (
        <ProfileCard role={'doctor'} />
      )}
    </View>
  );
}

export default SearchScreen;
