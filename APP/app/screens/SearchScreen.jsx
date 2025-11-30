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
    borderBottomWidth: .2,
    borderBottomColor: ColorTheme.fourth,
  },
  suggestionText: {
    fontSize: 16,
    color: ColorTheme.fourth,
  },
});

function SearchScreen() {
  const names = [
    { id: 321, name: "Alice Johnson", role: "patient" },
    { id: 122, name: "Bob Smith", role: "doctor" },
    { id: 3243, name: "Charlie Brown", role: "patient" },
    { id: 3434, name: "Diana Prince", role: "patient" },
    { id: 5435, name: "Ethan Clark", role: "doctor" },
    { id: 5436, name: "Fiona Adams", role: "patient" },
    { id: 7222, name: "George Miller", role: "patient" },
    { id: 1238, name: "Hannah Davis", role: "patient" },
    { id: 49, name: "Ian Thompson", role: "doctor" },
    { id: 150, name: "Julia Roberts", role: "patient" },
    { id: 6511, name: "Kevin Turner", role: "patient" },
    { id: 1572, name: "Laura Scott", role: "patient" },
    { id: 1873, name: "Michael Carter", role: "doctor" },
    { id: 194, name: "Nina Brooks", role: "patient" },
    { id: 19985, name: "Oscar Reed", role: "patient" },
    { id: 1876, name: "Paula Hughes", role: "patient" },
    { id: 617, name: "Quinn Parker", role: "doctor" },
    { id: 1768, name: "Rachel Ward", role: "patient" },
    { id: 1439, name: "Sam Evans", role: "patient" },
    { id: 2340, name: "Tina Collins", role: "patient" },
    { id: 221, name: "Umar Patel", role: "doctor" },
    { id: 2382, name: "Vera Mitchell", role: "patient" },
    { id: 293, name: "Will Barnes", role: "patient" },
    { id: 2114, name: "Xavier Reed", role: "doctor" },
    { id: 2125, name: "Yara Lopez", role: "patient" },
    { id: 236, name: "Zack Morgan", role: "patient" },
    { id: 2754, name: "Amelia White", role: "patient" },
    { id: 286, name: "Brandon Green", role: "doctor" },
    { id: 22119, name: "Clara Young", role: "patient" },
    { id: 3350, name: "David Hall", role: "patient" },
  ];

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [notFound, setNotFound] = useState(true);

  const handleSearch = (text) => {
  setQuery(text);

  if (text.length === 0) {
    setFiltered([]);
    setNotFound(false);
    return;
  }

  let query = text.toLowerCase();

  // Remove '#' prefix if present
  if (query.startsWith('#')) {
    query = query.slice(1);
  }

  // Search by name OR id
  const results = names.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(query);
    const idMatch = item.id.toString().includes(query);
    return nameMatch || idMatch;
  });

  setFiltered(results);
  setNotFound(results.length === 0);
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
                  {item.name} (#{item.id} - {item.role})
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
