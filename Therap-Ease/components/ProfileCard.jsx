import { Image, StyleSheet, Text, View } from "react-native";
import profileimg from '../assets/images/user_placeholder.jpg';
import { ColorTheme } from "../constants/GlobalStyles";


export default function UserCard({name, role}) {
  return (
    <View style={styles.card}>
      <View style={styles.subBox}>
        <View style={styles.profilePicWrapper}>
          <Image source={profileimg} style={styles.profilePic} />
        </View>
        <View style={styles.borderBox}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.text, styles.title]}>Name:</Text>
            <Text style={[styles.text]}>{name}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.text, styles.title]}>Age:</Text>
            <Text style={[styles.text]}>{name}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.text, styles.title]}>Height:</Text>
            <Text style={[styles.text]}>{name}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.text, styles.title]}>Weight:</Text>
            <Text style={[styles.text]}>{name}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.text, styles.title]}>Gender:</Text>
            <Text style={[styles.text]}>{name}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorTheme.sixth, 
    height: '90%',
    width: '95%',
    alignItems: 'center',
    padding: '2%',
  },
  profilePicWrapper: {
    width: 120,
    height: 120,
    borderRadius: "100%",
    borderColor: ColorTheme.fourth,
    borderWidth: 2,
    marginRight: '1%',
    overflow: "hidden",
    backgroundColor: ColorTheme.fourth,
  },
  profilePic: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  subBox:{
    alignItems: "center", 
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  borderBox: {
    borderWidth: 2,
    borderColor: ColorTheme.fourth,
    backgroundColor: ColorTheme.first,
    height: '100%',
    width: '60%',
    padding: '3%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});