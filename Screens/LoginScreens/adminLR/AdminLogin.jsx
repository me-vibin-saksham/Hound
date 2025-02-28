import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminLogin = () => {
  const navigation = useNavigation();
  const [adminCode, setAdminCode] = useState("");
  const [password, setPassword] = useState("");

  const CORRECT_ADMIN_CODE = "Admin";
  const CORRECT_PASSWORD = "password";

  const handleLogin = () => {
    if (adminCode === CORRECT_ADMIN_CODE && password === CORRECT_PASSWORD) {
      Alert.alert("Success", "Admin Login Successful!");
      navigation.navigate("AdminPanel");
    } else {
      Alert.alert("Error", "Invalid admin code or password!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Admin Login 🔑</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Admin Code"
        placeholderTextColor="#888"
        value={adminCode}
        onChangeText={setAdminCode}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AdminLogin;

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
    backgroundColor: "#007bff",
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
