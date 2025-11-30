import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorTheme } from "../../constants/GlobalStyles.jsx";

// ---- SAMPLE DATA ----
const todaysAppointments = [
  { id: 12321, name: "Keshav", date: "27 October", time: "17:30" },
  { id: 11354, name: "Shivam", date: "27 October", time: "20:00" },
  { id: 14354, name: "Somay", date: "27 October", time: "09:00" },
];

const upcomingAppointments = [
  { id: 11354, name: "Hardik Vrijay", date: "28 October", time: "09:00" },
  { id: 14754, name: "Ajay Lohmod", date: "28 October", time: "09:00" },
  { id: 15354, name: "Vijay Nagarjun", date: "29 October", time: "09:00" },
  { id: 15455, name: "Riya Gol", date: "29 October", time: "11:30" },
  { id: 12354, name: "Somay Rajput", date: "30 October", time: "09:00" },
  { id: 16666, name: "Rahul", date: "30 October", time: "15:00" },
];

const requestAppointments = [
  { id: 17777, name: "Arjun Watson", date: "Requested", time: "Requested" },
  { id: 11888, name: "Yusuf", date: "Requested", time: "Requested" },
  { id: 18888, name: "Meera Venkateshwar", date: "Requested", time: "Requested" },
  { id: 188, name: "Gurdeep", date: "Requested", time: "Requested" },
];

// ---- SMALL COMPONENTS ----

const SectionHeader = ({ title, count, subtitle }) => (
  <View style={styles.sectionHeader}>
    <View>
      <Text style={styles.headingText}>{title}</Text>
      {subtitle ? <Text style={styles.subHeadingText}>{subtitle}</Text> : null}
    </View>
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{count}</Text>
    </View>
  </View>
);

const AppointmentItem = ({ item, type }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemLeft}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemIdText}>#{item.id}</Text>
    </View>

    <View style={styles.itemRight}>
      <Text style={styles.itemDateText}>{item.date}</Text>
      <Text style={styles.itemTimeText}>{item.time}</Text>
    </View>

    {type === "requests" && (
      <View style={styles.buttonRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.actionButton, { backgroundColor: ColorTheme.fourth }]}
        >
          <Text style={styles.btnText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.actionButton, { backgroundColor: ColorTheme.error }]}
        >
          <Text style={styles.btnText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.actionButton, { backgroundColor: ColorTheme.third }]}
        >
          <Text style={styles.btnText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const AppointmentsList = ({ data, type }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>No appointments.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <AppointmentItem item={item} type={type} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      contentContainerStyle={{ paddingVertical: 4 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

// ---- MAIN SCREEN ----

function AppointmentsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TODAY'S APPOINTMENTS */}
        <View style={styles.card}>
          <SectionHeader
            title="Today's Appointments"
            count={todaysAppointments.length}
            subtitle="Patients scheduled for today"
          />
          <AppointmentsList data={todaysAppointments} type="today" />
        </View>

        {/* UPCOMING APPOINTMENTS */}
        <View style={styles.card}>
          <SectionHeader
            title="Upcoming Appointments"
            count={upcomingAppointments.length}
            subtitle="Next sessions in your calendar"
          />
          <AppointmentsList data={upcomingAppointments} type="upcoming" />
        </View>

        {/* REQUESTS */}
        <View style={styles.card}>
          <SectionHeader
            title="Requests"
            count={requestAppointments.length}
            subtitle="Pending approval from patients"
          />
          <AppointmentsList data={requestAppointments} type="requests" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---- STYLES ----

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: ColorTheme.first,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
  },

  card: {
    backgroundColor: ColorTheme.fourth,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // subtle "card" feel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  headingText: {
    fontSize: 20,
    fontWeight: "700",
    color: ColorTheme.first,
  },

  subHeadingText: {
    fontSize: 12,
    color: ColorTheme.first,
    opacity: 0.8,
    marginTop: 2,
  },

  countBadge: {
    minWidth: 28,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: ColorTheme.first,
    alignItems: "center",
    justifyContent: "center",
  },

  countBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: ColorTheme.fourth,
  },

  itemContainer: {
    backgroundColor: ColorTheme.first,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  itemLeft: {
    flex: 1,
  },

  itemRight: {
    alignItems: "flex-end",
  },

  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: ColorTheme.fourth,
  },

  itemIdText: {
    fontSize: 12,
    color: ColorTheme.fourth,
    opacity: 0.7,
    marginTop: 1,
  },

  itemDateText: {
    fontSize: 13,
    color: ColorTheme.fourth,
  },

  itemTimeText: {
    fontSize: 12,
    color: ColorTheme.fourth,
    opacity: 0.8,
    marginTop: 1,
  },

  itemSeparator: {
    height: 6,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 6,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },

  emptyStateContainer: {
    paddingVertical: 12,
    alignItems: "center",
  },

  emptyStateText: {
    color: ColorTheme.first,
    opacity: 0.9,
    fontSize: 13,
  },
});

export default AppointmentsScreen;
