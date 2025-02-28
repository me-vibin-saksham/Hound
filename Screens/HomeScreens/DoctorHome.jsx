import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const DoctorHome = () => {
  const [doctorRecords, setDoctorRecords] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDoctorRecords();
  }, []);

  const fetchDoctorRecords = async () => {
    try {
      const storedDoctorRecords = await AsyncStorage.getItem("doctor");
      if (storedDoctorRecords) {
        setDoctorRecords(JSON.parse(storedDoctorRecords));
      }
    } catch (error) {
      console.error("Error fetching doctor records:", error);
    }
  };

  const handleLetPatientIn = (record) => {
    navigation.navigate("Diagnosis", { patientData: record });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Doctor's Dashboard</Text>
      <ScrollView>
        {doctorRecords.length > 0 ? (
          doctorRecords.map((record, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.name}>{record.name}</Text>
              <Text>Gender: {record.gender} | Age: {record.age}</Text>
              <Text>Issue: {record.issue}</Text>
              <Text>Symptoms: {record.selectedSymptoms.join(", ")}</Text>
              <Text>Time Since: {record.timeSince}</Text>
              <Text>Description: {record.description}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLetPatientIn(record)}
              >
                <Text style={styles.buttonText}>👨‍⚕️ Let the Patient In!!</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No patient records found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorHome;

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
    marginBottom: 15,
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
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
  },
});
