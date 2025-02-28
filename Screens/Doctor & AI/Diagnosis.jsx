import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

const Diagnosis = () => {
  const route = useRoute();
  const { patientData } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Diagnosis</Text>
      <View style={styles.card}>
        <Text style={styles.name}>{patientData.name}</Text>
        <Text>Gender: {patientData.gender} | Age: {patientData.age}</Text>
        <Text>Issue: {patientData.issue}</Text>
        <Text>Symptoms: {patientData.selectedSymptoms.join(", ")}</Text>
        <Text>Time Since: {patientData.timeSince}</Text>
        <Text>Description: {patientData.description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Diagnosis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
