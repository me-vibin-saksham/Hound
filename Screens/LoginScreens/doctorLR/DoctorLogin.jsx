import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const DoctorLogin = () => {
  const navigation = useNavigation();
  const [doctorId, setDoctorId] = useState("");

  const CORRECT_DOCTOR_ID = "Doctor-Octopus";

  const handleLogin = () => {
    if (doctorId === CORRECT_DOCTOR_ID) {
      Alert.alert("Success", "Doctor Login Successful!");
      navigation.navigate("DoctorHome");
    } else {
      Alert.alert("Error", "Invalid Doctor ID!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Doctor Login 🩺</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Doctor ID"
        placeholderTextColor="#888"
        value={doctorId}
        onChangeText={setDoctorId}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DoctorLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});