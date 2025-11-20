import { ColorTheme } from "@/constants/GlobalStyles";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const SAMPLE = [
  { id: "p1", name: "Asha Kumar", age: 28, gender: "Female", city: "Delhi", notes: "Diabetic, take insulin" },
  { id: "p2", name: "Rahul Verma", age: 45, gender: "Male", city: "Mumbai", notes: "Hypertension, BP meds" },
  { id: "p3", name: "Sana Ali", age: 33, gender: "Female", city: "Kolkata", notes: "Allergic to penicillin" },
  { id: "p4", name: "Vikram Das", age: 52, gender: "Male", city: "Chennai", notes: "Recovering from knee surgery" },
  { id: "p5", name: "Meera Singh", age: 19, gender: "Female", city: "Bengaluru", notes: "No chronic conditions" },
];

function initials(name = "") {
  return name
    .split(" ")
    .map((p) => p[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function PatientsScreen({ navigation }) {
  const [patients, setPatients] = useState(SAMPLE);
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // optional initial animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  const filtered = patients.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      String(p.age).includes(q)
    );
  });

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleOpenProfile = (id) => {
    navigation?.navigate && navigation.navigate("PatientDetails", { id });
  };

  const onRefresh = () => {
    setRefreshing(true);
    // emulate refresh - in real app you would fetch server data
    setTimeout(() => {
      setRefreshing(false);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setPatients((prev) => [...prev]); // noop refresh
    }, 800);
  };


  const renderItem = ({ item }) => {
    const expanded = expandedId === item.id;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => toggleExpand(item.id)}
        style={[stylesLocal.card, expanded ? stylesLocal.cardExpanded : null]}
      >
        <View style={stylesLocal.row}>
          <View style={stylesLocal.avatar}>
            <Text style={stylesLocal.avatarText}>{initials(item.name)}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={stylesLocal.name}>{item.name}</Text>
            <Text style={stylesLocal.meta}>
              {item.age} yrs • {item.gender} • {item.city}
            </Text>
          </View>

          <View style={{ width: 50, alignItems: "flex-end" }}>
            <Text style={stylesLocal.chev}>{expanded ? "▲" : "▼"}</Text>
          </View>
        </View>

        {expanded && (
          <View style={stylesLocal.expanded}>
            <Text style={stylesLocal.info}>Notes: {item.notes || "No notes"}</Text>

            <View style={stylesLocal.actions}>
              <TouchableOpacity style={[stylesLocal.btn, stylesLocal.openBtn]} onPress={() => handleOpenProfile(item.id)}>
                <Text style={stylesLocal.btnText}>Generate Report</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[stylesLocal.btn, stylesLocal.removeBtn]}>
                <Text style={[stylesLocal.btnText, { color: "#fff" }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={stylesLocal.container}>
      <View style={stylesLocal.header}>
        <Text style={stylesLocal.title}>Patients</Text>

        <View style={stylesLocal.headerRight}>
          <TouchableOpacity style={stylesLocal.addBtn}>
            <Text style={stylesLocal.addText}>+    Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={stylesLocal.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search name, city, phone or age..."
          style={stylesLocal.search}
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 6 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={{ padding: 24, alignItems: "center" }}>
            <Text style={{ color: "#666" }}>No patients match your search.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const stylesLocal = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7fb" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 12 },
  title: { fontSize: 20, fontWeight: "700" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  addBtn: { backgroundColor: ColorTheme.fourth, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  addText: { color: "#fff", fontWeight: "700" },

  searchWrap: { paddingHorizontal: 16, paddingTop: 10 },
  search: {
    height: 42,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e9ef",
  },

  card: {
    marginHorizontal: 14,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardExpanded: { backgroundColor: "#fcfdff" },

  row: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 52,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { fontWeight: "800", color: ColorTheme.fourth },
  name: { fontSize: 16, fontWeight: "700" },
  meta: { marginTop: 2, color: "#666" },
  chev: { color: "#999", fontSize: 14 },

  expanded: { paddingTop: 10, borderTopWidth: 1, borderTopColor: "#f0f2f7", marginTop: 10 },
  info: { color: "#444", marginBottom: 6 },

  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  btn: { flex: 0.48, paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  openBtn: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#dbe4ff" },
  removeBtn: { backgroundColor: "#ff5252" },
  btnText: { fontWeight: "700", color: "#1f2937" },
});
