import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import img1 from '../../assets/images/banner1.png';
import img2 from '../../assets/images/banner2.png';
import { ColorTheme } from "../../constants/GlobalStyles.jsx";


const fetchAppointments = () => {
  // MAX, UPCOMING 3
  let data = [
    {"id":12321, "name":"Keshav", "date": '27 October', "time":'17:30'},
    {"id":11354, "name":"Shivam", "date": '27 October', "time":'20:00'},
    {"id":14354, "name":"Somay", "date": '28 October', "time":'09:00'}
  ]
  return data
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: ColorTheme.first,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
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

  scheduleOuter: {
    width: "95%",
    backgroundColor: ColorTheme.fourth,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: "3%",
  },
  scheduleHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: ColorTheme.first,
    marginBottom: 8,
  },
  scheduleScroll: {
    flexDirection: "row",
  },
  smallCard: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: ColorTheme.first,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "black",
  },
  smallCardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  smallCardSub: {
    fontSize: 12,
    color: "black",
  },
  graph: {
    width: 300,
    height: 130,
    resizeMode: 'stretch'
  }

});

function SecondCard({ role }) {
  if (role === "patient") {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: ColorTheme.fifth,
            height: "50%",
            alignItems: "center",
            padding: "3%",
          },
        ]}
      >
        <Text style={[styles.text2, { color: ColorTheme.first }]}>
          Recommended Articles
        </Text>

        <TouchableOpacity
          onPress={() => console.log("Banner 1 clicked")}
          style={[styles.card, { height: "40%", marginTop: 5, elevation: 5 }]}
        >
          <Image
            source={img1}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Banner 2 clicked")}
          style={[styles.card, { height: "40%", marginTop: 10, elevation: 5}]}
        >
          <Image
            source={img2}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    const appointmentData = fetchAppointments();
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: ColorTheme.fifth,
            height: "45%",
            alignItems: "center",
            padding: 10,
          },
        ]}
      >
        <Text style={[styles.text2, { color: ColorTheme.first }]}>
          Upcoming Appointments
        </Text>
        <View style={[styles.card, { height: "80%", marginTop: 10, elevation: 5, backgroundColor: ColorTheme.first }]}>
          <FlatList
            data={appointmentData}
            renderItem={({ item }) => (
              <View style={{ padding: 10, borderBottomWidth: .3, borderColor: ColorTheme.fifth}}>
                <Text style={[styles.smallCardTitle, {color:ColorTheme.fourth, textAlign:'center'}]}>{item.name}, #{item.id}</Text>
                <Text style={{ color: ColorTheme.fourth, textAlign:'center' }}>{item.date} at {item.time}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

function ThirdCard({ role }) {
  if (role === "patient") {
    const items = [
      { id: '1', title: "9:00 AM", sub: "Breakfast" },
      { id: '2', title: "11:00 AM", sub: "Medicine" },
      { id: '3', title: "2:00 PM", sub: "Doctor Appt" },
      { id: '4', title: "4:00 PM", sub: "Walk" },
      { id: '5', title: "7:00 PM", sub: "Dinner" },
    ];

    return (
      <View style={[styles.card, {backgroundColor: ColorTheme.fourth, height: "31%", alignItems:"center", padding: "2%" }]}>
        <Text style={[styles.text2, {marginBottom:'2%'}]}>Today&apos;s Schedule</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scheduleScroll}
        >
          {items.map((it) => (
            <TouchableOpacity key={it.id} style={styles.smallCard} onPress={() => console.log('pressed', it)}>
              <Text style={styles.smallCardTitle}>{it.title}</Text>
              <Text style={styles.smallCardSub}>{it.sub}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
    <View style={[styles.card, {backgroundColor: ColorTheme.fourth, height: "35%", alignItems:"center", padding: "2%" }]}>
      <Text style={[styles.text2, {marginBottom:'2%'}]}>Patient Activity Chart</Text>
      <Image source={require("../../assets/images/graph_placeholder.png")} style={styles.graph} />
    </View>);
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
  );
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