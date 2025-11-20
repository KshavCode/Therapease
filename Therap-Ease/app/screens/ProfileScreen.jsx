import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard from "../../components/UserCard.jsx";
import { styles } from "../../constants/GlobalStyles.jsx";

function ProfileScreen({role}) {
  return (
    <SafeAreaView style={styles.screen}>
      <UserCard />
    </SafeAreaView>
  );
}

export default ProfileScreen;
