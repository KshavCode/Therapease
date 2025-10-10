import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import logoimg from "../../assets/images/logo.png";
import { ColorTheme, styles } from "../../constants/GlobalStyles.jsx";

// Validation schemas
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(4, "Too short!").required("Password is required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  dob: Yup.string().required("DOB is required"),
});

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

// Radio Button Component
const RadioButton = ({ label, value, selected, onSelect }) => (
  <TouchableOpacity style={styles.radioOption} onPress={() => onSelect(value)}>
    <View
      style={[styles.radioCircle, selected === value && styles.radioSelected]}
    />
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

const LoginScreen = ( { navigation } ) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [role, setRole] = useState("patient");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Animations
  const registerAnim = useRef(new Animated.Value(0)).current;
  const loginAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(registerAnim, {
      toValue: showRegister ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showRegister]);

  useEffect(() => {
    Animated.timing(loginAnim, {
      toValue: showLogin ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showLogin]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        <Image source={logoimg} style={styles.logo} />

        {/* Register Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setShowRegister(!showRegister);
            setShowLogin(false);
          }}
        >
          <Text style={styles.paragraph}>Register</Text>
        </TouchableOpacity>

        {/* Register Form */}
        <Animated.View
          style={[
            styles.formContainer,
            {
              height: registerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 380],
              }),
              opacity: registerAnim,
            },
          ]}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirm: "",
              dob: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              setShowRegister(false);
              navigation.replace("Home"); 
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry
                  value={values.confirm}
                  onChangeText={handleChange("confirm")}
                  onBlur={handleBlur("confirm")}
                />
                {touched.confirm && errors.confirm && (
                  <Text style={styles.errorText}>{errors.confirm}</Text>
                )}

                {/* DOB */}
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text>{values.dob || "Select Date of Birth"}</Text>
                </TouchableOpacity>
                {touched.dob && errors.dob && (
                  <Text style={styles.errorText}>{errors.dob}</Text>
                )}
                {showDatePicker && (
                  <DateTimePicker
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    value={new Date()}
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        const formatted = selectedDate
                          .toISOString()
                          .split("T")[0];
                        setFieldValue("dob", formatted);
                      }
                    }}
                  />
                )}

                {/* Role Selection */}
                <View style={styles.radioGroup}>
                  <RadioButton
                    label="Doctor"
                    value="doctor"
                    selected={role}
                    onSelect={setRole}
                  />
                  <RadioButton
                    label="Patient"
                    value="patient"
                    selected={role}
                    onSelect={setRole}
                  />
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </Animated.View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.actionButton, { marginTop: 10 }]}
          onPress={() => {
            setShowLogin(!showLogin);
            setShowRegister(false);
          }}
        >
          <Text style={styles.paragraph}>Login</Text>
        </TouchableOpacity>

        {/* Login Form */}
        <Animated.View
          style={[
            styles.formContainer,
            {
              height: loginAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 260],
              }),
              opacity: loginAnim,
            },
          ]}
        >
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              setShowLogin(false);
              navigation.replace("Home"); // Navigate to HomeScreen after login
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Username"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Role */}
                <View style={styles.radioGroup}>
                  <RadioButton
                    label="Doctor"
                    value="doctor"
                    selected={role}
                    onSelect={setRole}
                  />
                  <RadioButton
                    label="Patient"
                    value="patient"
                    selected={role}
                    onSelect={setRole}
                  />
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </Animated.View>

        {/* Main Button */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            { marginTop: 10, backgroundColor: ColorTheme.third },
          ]}
          onPress={() => navigation.navigate('MainApp', { role: "patient" })}
        >
          <Text style={[styles.paragraph, { color: ColorTheme.fourth }]}>
            Open Patient
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { marginTop: 10, backgroundColor: ColorTheme.third },
          ]}
          onPress={() => navigation.navigate('MainApp', { role: "doctor" })}
        >
          <Text style={[styles.paragraph, { color: ColorTheme.fourth }]}>
            Open Doctor
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
