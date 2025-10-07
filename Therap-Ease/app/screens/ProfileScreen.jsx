import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../components/ProfileCard.jsx";
import { styles } from "../../constants/GlobalStyles.jsx";





function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ProfileCard />
    </SafeAreaView>
  );
}

export default ProfileScreen;
