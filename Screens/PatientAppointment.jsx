import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

const symptomsList = [
  "Fever", "Cough", "Cold", "Headache", "Body Pain", "Fatigue", 
  "Dizziness", "Nausea", "Vomiting", "Chest Pain", "Shortness of Breath", 
  "Diarrhea", "Sore Throat", "Runny Nose", "Joint Pain", "Skin Rash", 
  "Blurred Vision", "Loss of Smell", "Loss of Taste", "Abdominal Pain"
];

const PatientAppointment = ({ route, navigation }) => {
  const { name, gender, age, profile, issue } = route.params;
  
  const [numSymptoms, setNumSymptoms] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState([""]);
  const [timeSince, setTimeSince] = useState("");
  const [description, setDescription] = useState("");

  const handleSymptomChange = (index, value) => {
    const newSymptoms = [...selectedSymptoms];
    newSymptoms[index] = value;
    setSelectedSymptoms(newSymptoms);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
          Book an Appointment
        </Text>

        {/* Select Number of Symptoms */}
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Select Number of Symptoms:</Text>
        <Picker
          selectedValue={numSymptoms}
          onValueChange={(itemValue) => {
            setNumSymptoms(itemValue);
            setSelectedSymptoms(Array(itemValue).fill(""));
          }}
          style={{ height: 50, marginBottom: 15 }}
        >
          {[...Array(5).keys()].map((num) => (
            <Picker.Item key={num + 1} label={`${num + 1}`} value={num + 1} />
          ))}
        </Picker>

        {/* Select Symptoms */}
        {selectedSymptoms.map((symptom, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16 }}>Symptom {index + 1}:</Text>
            <Picker
              selectedValue={symptom}
              onValueChange={(value) => handleSymptomChange(index, value)}
              style={{ height: 50 }}
            >
              <Picker.Item label="Select Symptom" value="" />
              {symptomsList.map((sym, i) => (
                <Picker.Item key={i} label={sym} value={sym} />
              ))}
            </Picker>
          </View>
        ))}

        {/* Select Time Since Experiencing Symptoms */}
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Time Since Symptoms Started:</Text>
        <TextInput
          placeholder="E.g., 2 days, 1 week"
          value={timeSince}
          onChangeText={setTimeSince}
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginBottom: 15,
          }}
        />

        {/* Short Description */}
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Short Description:</Text>
        <TextInput
          placeholder="Describe your condition"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          style={{
            height: 80,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            paddingHorizontal: 10,
            textAlignVertical: "top",
            marginBottom: 20,
          }}
        />

        {/* Proceed Button */}
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: "#0D8F83",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 10,
          }}
          onPress={() =>
            navigation.navigate("SelectHospital", {
              name,
              gender,
              age,
              profile,
              issue,
              selectedSymptoms,
              timeSince,
              description,
            })
          }
        >
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>Select Hospital</Text>
        </TouchableOpacity>

        {/* Get Well Soon */}
        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10 }}>
          Get well soon!! 😊
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientAppointment;
