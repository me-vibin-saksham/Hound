import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function App() {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Hi}>Hi👋</Text>
      <Text style={styles.User}>User !!</Text>
      <TouchableOpacity activeOpacity={1} style={styles.button} onPress={()=> navigation.navigate("PatientLogin")}>
        <Text style={styles.text}>I'm a Patient</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.button} onPress={()=> navigation.navigate("DoctorLogin")}>
        <Text style={styles.text}>I'm a Doctor</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.button} onPress={()=> navigation.navigate("AdminLogin")}>
        <Text style={styles.text}>I'm an Admin</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", 
  },
  Hi:{
    fontSize:35,
    fontWeight:"bold",
    marginRight:"25%"
  },
  User:{
    fontSize:35,
    fontWeight:"bold",
    marginLeft:"20%",
    marginBottom:12
  },
  button: {
    height: 85,
    width: "60%",
    backgroundColor: "#0D8F83",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color:"#FFFFFF"
  },
});
