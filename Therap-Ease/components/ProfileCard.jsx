import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useState } from "react";
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import img1 from "../assets/images/user_placeholder.jpg";
import { ColorTheme } from "../constants/GlobalStyles.jsx";


const validationSchemas = {
  Email: Yup.string().email("Invalid email").required("Email is required"),
  Password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
  Age: Yup.number().positive().integer().required("Age is required"),
  Name: Yup.string().required("Name is required"),
  Gender: Yup.string().oneOf(["Male", "Female", "Other"]).required(),
  Location: Yup.string().required("Location is required"),
  Height: Yup.string().required("Height is required"),
  Weight: Yup.string().required("Weight is required"),
  "Blood Group": Yup.string().required("Blood Group is required"),
};


export default function ProfileCard() {
  const [profile, setProfile] = useState({ Name: "John Doe", Age: "25", Gender: "Male", Location: "Delhi", Height: "5'10''", Weight: "60 kg", Email: "abc@gmail.com", Password: "••••••", "Blood Group": "O+" });
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const openModal = (field) => { setCurrentField(field); setModalVisible(true); };

  const renderRow = (key) => (
    <View style={styles.row} key={key}>
      <Text style={styles.label}>{key}:</Text>
      <Text style={styles.value} numberOfLines={1} ellipsizeMode="tail">{profile[key]}</Text>
      <TouchableOpacity style={styles.editBtn} onPress={() => openModal(key)}>
        <Ionicons name="pencil" size={20} color={ColorTheme.fourth} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.containerLarge}>
      <View style={styles.profilePicWrapper}><Image source={img1} style={styles.profilePic} /></View>
      <View style={{ flex: 1, width: "90%", marginTop: "5%", marginBottom: "3%", borderRadius: 10, padding: 15 }}>
        {Object.keys(profile).map(renderRow)}
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {currentField && (
              <Formik
                initialValues={{ value: profile[currentField] }}
                validationSchema={Yup.object({ value: validationSchemas[currentField] || Yup.string() })}
                onSubmit={(values) => { setProfile({ ...profile, [currentField]: values.value }); setModalVisible(false); }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Edit {currentField}</Text>
                    <TextInput style={styles.input} onChangeText={handleChange("value")} onBlur={handleBlur("value")} value={values.value} secureTextEntry={currentField === "Password"} />
                    {errors.value && touched.value && <Text style={styles.error}>{errors.value}</Text>}
                    <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}><Text style={styles.saveText}>Save</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={() => setModalVisible(false)}><Text style={styles.saveText}>Cancel</Text></TouchableOpacity>
                  </>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLarge: {
    width: "90%",
    height: "90%",
    backgroundColor: ColorTheme.second,
    borderRadius: "2%",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
  },
  profilePicWrapper: {
    width: 150,
    height: 150,
    borderRadius: "100%",
    borderColor: ColorTheme.fourth,
    borderWidth: 3,
    overflow: "hidden",
    backgroundColor: ColorTheme.fourth,
  },
  profilePic: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: ColorTheme.fifth,
  },
  label: {
    fontSize: 18,
    color: ColorTheme.seventh,
    fontWeight: "bold",
    flex: 1,
  },
  value: {
    fontSize: 18,
    color: ColorTheme.fourth,
    flex: 1,
    textAlign: "right",
  },
  editBtn: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  error: {
    color: ColorTheme.error,
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: ColorTheme.fourth,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});