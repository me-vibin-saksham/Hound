import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AdminControl = ({ route }) => {
  const { bookingData } = route.params;
  const navigation = useNavigation();

  const savePatientData = async () => {
    try {
      const existingPatients = await AsyncStorage.getItem("patients");
      let patientsArray = existingPatients ? JSON.parse(existingPatients) : [];
      const newPatientId = `P${String(patientsArray.length + 1).padStart(5, "0")}`;
      const newPatientData = { id: newPatientId, ...bookingData };
      patientsArray.push(newPatientData);
      await AsyncStorage.setItem("patients", JSON.stringify(patientsArray));
      Alert.alert("Success", `Patient data saved with ID: ${newPatientId}`);
    } catch (error) {
      console.error("Error saving patient data:", error);
      Alert.alert("Error", "Failed to save patient data.");
    }
  };

  useEffect(() => {
    savePatientData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 20, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Admin Control</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", marginBottom: 10 }} />

        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Patient Details</Text>
        <Text>Name: {bookingData.name}</Text>
        <Text>Gender: {bookingData.gender}</Text>
        <Text>Age: {bookingData.age}</Text>
        <Text>Issue: {bookingData.issue}</Text>
        <Text>Symptoms: {bookingData.selectedSymptoms.join(", ")}</Text>
        <Text>Time Since: {bookingData.timeSince}</Text>
        <Text>Description: {bookingData.description}</Text>

        <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", marginVertical: 10 }} />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Hospital Details</Text>
        <Text>Name: {bookingData.hospitalName}</Text>
        <Text>Rating: {bookingData.hospitalRating}⭐</Text>
        <Text>Cost: {bookingData.hospitalCost}</Text>
        <Text>Appointment Time: {bookingData.appointmentDays}</Text>

        <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", marginVertical: 10 }} />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Doctor Details</Text>
        <Image source={{ uri: bookingData.doctorImage }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginBottom: 10 }} />
        <Text>Name: {bookingData.doctorName}</Text>
        <Text>Speciality: {bookingData.doctorSpeciality}</Text>
        <Text>Rating: {bookingData.doctorRating}⭐</Text>
        <Text>Experience: {bookingData.doctorExperience}</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ backgroundColor: "#007bff", padding: 12, borderRadius: 8, marginTop: 20, alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Go to Home Page</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdminControl;