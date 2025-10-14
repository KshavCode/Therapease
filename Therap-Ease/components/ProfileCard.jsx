import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import profileimg from '../assets/images/user_placeholder.jpg';
import { ColorTheme } from "../constants/GlobalStyles";


const fetchData = (id, role) => {
  let jsonData;
  if (role === 'patient') {
    jsonData = {"id": 1, "name":"XYZ", "age":19, "height":`5'11`, "weight": '60kg', "gender":'Male', "bio":'ldjfdsjflkdjslkf\njksjfslkjdflksjfljskdf\nkjsdjflskjflksjdlfkjsdlfkjlkjlk', "location":"New Delhi", "activity": "Mediocre", "joined_on":'23 August 2024', "badges":"Image Data Here"};
  }
  else {
    jsonData = {"id": 1, "name":"ABC", "speciality":'Upper Body', "rating":`4.3`, "experience": '8y', "gender":'Female', "bio":'Best of the Best\nMakes your soul clean and body rest.', "location":"Faridabad", "avaibility": "Weekdays", "joined_on":'18 March 2023', "email":"abc_220321@gmail.com"};
  }
  return jsonData;
}

export default function UserCard({id, role}) {
  let data = fetchData(id, role)
  const onBadge = (id) => {
    let msg;
    if (id===1) {
      msg = '1 Year!'
    }
    else if (id===2) {
      msg = '1 Month Consistency'
    }
    else if (id===3){
      msg = '50 Sessions Completed'
    }
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  }
  if (role==='patient') {
    return (
      <View style={styles.card}>
        <View style={styles.subBox}>
          <View style={styles.profilePicWrapper}>
            <Image source={profileimg} style={styles.profilePic} />
          </View>
          <View style={styles.borderBox}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={[styles.label]}>Name:</Text>
              <Text style={[styles.value]}>{data.name}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={[styles.label]}>Age:</Text>
              <Text style={[styles.value]}>{data.age}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={[styles.label]}>Height:</Text>
              <Text style={[styles.value]}>{data.height}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={[styles.label]}>Weight:</Text>
              <Text style={[styles.value]}>{data.weight}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={[styles.label]}>Gender:</Text>
              <Text style={[styles.value]}>{data.gender}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.borderBox2, {height:'25%', justifyContent:'flex-start'}]}>
            <Text style={[styles.label]}>Bio:</Text>
            <Text style={[styles.value]}>{data.bio}</Text>
        </View>
        <View style={styles.borderBox2}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.label]}>Location:</Text>
            <Text style={[styles.value]}>{data.location}</Text>
          </View>
        </View>
        <View style={styles.borderBox2}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.label]}>Activity:</Text>
            <Text style={[styles.value]}>{data.activity}</Text>
          </View>
        </View>
        <View style={styles.borderBox2}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.label]}>Joined on:</Text>
            <Text style={[styles.value]}>{data.joined_on}</Text>
          </View>
        </View>
        <View style={styles.borderBox2}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.label]}>Badges:</Text>
            {/* <Text style={[styles.text]}>{data.badges}</Text> */}
            <TouchableOpacity onPress={()=>onBadge(1)}>
              <Image source={require("../assets/images/badge1.png")} style={styles.badge}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onBadge(2)}>
              <Image source={require("../assets/images/badge2.png")} style={styles.badge}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onBadge(3)}>
              <Image source={require("../assets/images/badge3.png")} style={styles.badge}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  else {
    return (
      <View style={styles.card}>
        <View style={styles.subBox}>
          <View style={styles.profilePicWrapper}>
            <Image source={profileimg} style={styles.profilePic} />
          </View>
          <View style={styles.borderBox}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={[styles.label]}>Name:</Text>
              <Text style={[styles.value]}>Dr. {data.name}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={[styles.label]}>Speciality:</Text>
              <Text style={[styles.value]}>{data.speciality}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={[styles.label]}>Rating:</Text>
              <Text style={[styles.value]}>{data.rating} ⭐</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={[styles.label]}>Gender:</Text>
              <Text style={[styles.value]}>{data.gender}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={[styles.label]}>Experience:</Text>
              <Text style={[styles.value]}>{data.experience}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.borderBox2, {height:'25%', justifyContent:'flex-start'}]}>
          <Text style={[styles.label]}>Bio:</Text>
          <Text style={[styles.value]}>{data.bio}</Text>
        </View>
        <View style={styles.borderBox2}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.label]}>Avaibility:</Text>
            <Text style={[styles.value]}>{data.avaibility}</Text>
          </View>
        </View>
        <View style={styles.borderBox2}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.label]}>For enquiry:</Text>
            <Text style={[styles.value]}>{data.email}</Text>
          </View>
        </View>
        <View style={styles.borderBox2}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.label]}>Location:</Text>
            <Text style={[styles.value]}>{data.location}</Text>
          </View>
        </View>
        <View style={styles.borderBox2}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={[styles.label]}>Joined on:</Text>
            <Text style={[styles.value]}>{data.joined_on}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorTheme.sixth, 
    height: '90%',
    width: '95%',
    alignItems: 'center',
    padding: 5,
    paddingTop: 10,
    borderRadius: 10
  },
  profilePicWrapper: {
    width: 120,
    height: 120,
    borderRadius: "100%",
    borderWidth: 0,
    marginRight: 3,
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
    borderColor: ColorTheme.fourth,
    backgroundColor: ColorTheme.first,
    height: '100%',
    width: '60%',
    padding: 10,
  },
  borderBox2: {
    borderColor: ColorTheme.fourth,
    backgroundColor: ColorTheme.first,
    height: '10%',
    width: '99%',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: ColorTheme.fourth,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 16,
    color: ColorTheme.third
  },
  badge: {
    width: 40,
    height: 40,
  }
});