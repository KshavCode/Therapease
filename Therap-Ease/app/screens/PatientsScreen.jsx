import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../components/ProfileCard.jsx";
import { ColorTheme, styles } from "../../constants/GlobalStyles.jsx";


function PatientsScreen() {
  return (
    <SafeAreaView style={[styles.screen, {paddingTop:15}]}>
      <ProfileCard role='patient'/>
      <TouchableOpacity style={[styles.button, {marginTop:10}]}>
        <Text style={styles.buttonText}>GENERATE REPORT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {marginTop:5, backgroundColor:ColorTheme.first, borderColor:ColorTheme.error, borderWidth:1}]}>
        <Text style={[styles.errorText, {fontSize:18}]}>REMOVE PATIENT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default PatientsScreen;
