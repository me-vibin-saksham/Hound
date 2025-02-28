import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminPanel = () => {
  const [patients, setPatients] = useState([]);
  const [doctorRecords, setDoctorRecords] = useState([]);

  useEffect(() => {
    fetchPatients();
    fetchDoctorRecords();
  }, []);

  const fetchPatients = async () => {
    try {
      const storedPatients = await AsyncStorage.getItem("patients");
      if (storedPatients) {
        setPatients(JSON.parse(storedPatients));
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

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

  const handleRejectRequest = async (id) => {
    Alert.alert(
      "Confirm Rejection",
      "Are you sure you want to reject this request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedPatients = patients.filter((patient) => patient.id !== id);
              await AsyncStorage.setItem("patients", JSON.stringify(updatedPatients));
              setPatients(updatedPatients);
              Alert.alert("Rejected", "The patient request has been removed.");
            } catch (error) {
              console.error("Error removing patient:", error);
              Alert.alert("Error", "Failed to remove patient.");
            }
          },
        },
      ]
    );
  };

  const handleReschedule = async (id) => {
    Alert.alert(
      "Confirm Reschedule",
      "Are you sure you want to reschedule this patient?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reschedule",
          onPress: async () => {
            try {
              // Find the patient
              const patientToMove = patients.find((patient) => patient.id === id);
              if (!patientToMove) return;

              // Assign a unique doctor record ID
              const newId = `D${String(doctorRecords.length + 1).padStart(4, "0")}`;
              const updatedDoctorRecord = { ...patientToMove, id: newId };

              // Remove from patients and update AsyncStorage
              const updatedPatients = patients.filter((patient) => patient.id !== id);
              await AsyncStorage.setItem("patients", JSON.stringify(updatedPatients));
              setPatients(updatedPatients);

              // Add to doctor storage and update AsyncStorage
              const updatedDoctorRecords = [...doctorRecords, updatedDoctorRecord];
              await AsyncStorage.setItem("doctor", JSON.stringify(updatedDoctorRecords));
              setDoctorRecords(updatedDoctorRecords);

              Alert.alert("Rescheduled", "Patient Records went to Designated Doctor");
            } catch (error) {
              console.error("Error rescheduling patient:", error);
              Alert.alert("Error", "Failed to reschedule patient.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ padding: 20, backgroundColor: "#f5f5f5", flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
        Admin Panel - Queued Patients
      </Text>
      <ScrollView>
        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 10,
                marginBottom: 15,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>{patient.name}</Text>
              <Text>Gender: {patient.gender} | Age: {patient.age}</Text>
              <Text>Issue: {patient.issue}</Text>
              <Text>Symptoms: {patient.selectedSymptoms.join(", ")}</Text>
              <Text>Time Since: {patient.timeSince}</Text>
              <Text>Description: {patient.description}</Text>

              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Hospital: {patient.hospitalName}</Text>
              <Text>Doctor: {patient.doctorName} ({patient.doctorSpeciality})</Text>
              <Text>Experience: {patient.doctorExperience} years | Rating: {patient.doctorRating}⭐</Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                <TouchableOpacity
                  onPress={() => handleReschedule(patient.id)}
                  style={{
                    backgroundColor: "#FFC107",
                    padding: 10,
                    borderRadius: 5,
                    flex: 1,
                    alignItems: "center",
                    marginRight: 5,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>🔄 Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleRejectRequest(patient.id)}
                  style={{
                    backgroundColor: "#E53935",
                    padding: 10,
                    borderRadius: 5,
                    flex: 1,
                    alignItems: "center",
                    marginLeft: 5,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>❌ Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>No patient data found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminPanel;
