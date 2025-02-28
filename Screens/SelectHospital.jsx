import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

const hospitals = [
  {
    id: 1,
    name: "City Care Hospital",
    rating: 4.7,
    cost: "$50",
    appointmentDays: "2 Days",
    image: "https://t3.ftcdn.net/jpg/02/11/15/66/360_F_211156620_CeBr5etdTNXLb231sFcQ8M9YD1OY5IW8.jpg", 
    doctors: [
      {
        name: "Dr. Itak KL",
        speciality: "Cardiologist",
        rating: 4.8,
        experience: "10 Years",
        image: "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
      },
      {
        name: "Dr. Lalita Smith",
        speciality: "Neurologist",
        rating: 4.6,
        experience: "8 Years",
        image: "https://t4.ftcdn.net/jpg/03/20/52/31/240_F_320523164_tx7Rdd7I2XDTvvKfz2oRuRpKOPE5z0ni.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Greenfield Hospital",
    rating: 4.5,
    cost: "$40",
    appointmentDays: "3 Days",
    image: "https://t3.ftcdn.net/jpg/00/87/82/66/240_F_87826600_TqIMrXHWIouuL9cEBlJioTdEuKo6rPBB.jpg",
    doctors: [
      {
        name: "Dr. Bhawya Chaterjee",
        speciality: "Surgeon",
        rating: 4.6,
        experience: "11 Years",
        image: "https://t4.ftcdn.net/jpg/02/70/79/65/240_F_270796552_UGUuks0Jyb5p6TZxLKr0W6w3XIRGM9sg.jpg",
      },
    ],
  },
];

const SelectHospital = ({ route, navigation }) => {
  const { name, gender, age, profile, issue, selectedSymptoms, timeSince, description } = route.params;
  const [selectedDoctors, setSelectedDoctors] = useState({});
  const [selectedHospitals, setSelectedHospitals] = useState({});

  const handleDoctorChange = (hospital, doctor) => {
    setSelectedDoctors((prev) => ({ ...prev, [hospital.id]: doctor }));
    setSelectedHospitals((prev) => ({ ...prev, [hospital.id]: hospital }));
  };

  const handleConfirmBooking = (hospitalId) => {
    const selectedHospital = selectedHospitals[hospitalId];
    const selectedDoctor = selectedDoctors[hospitalId];

    if (!selectedHospital || !selectedDoctor) return;

    const bookingData = {
      name,
      gender,
      age,
      profile,
      issue,
      selectedSymptoms,
      timeSince,
      description,
      hospitalName: selectedHospital.name,
      hospitalRating: selectedHospital.rating,
      hospitalCost: selectedHospital.cost,
      appointmentDays: selectedHospital.appointmentDays,
      doctorName: selectedDoctor.name,
      doctorSpeciality: selectedDoctor.speciality,
      doctorRating: selectedDoctor.rating,
      doctorExperience: selectedDoctor.experience,
      doctorImage: selectedDoctor.image,
    };

    navigation.navigate("AdminControl", { bookingData });
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
          Select a Hospital
        </Text>

        {hospitals.map((hospital) => (
          <View
            key={hospital.id}
            style={{
              backgroundColor: "#FFF",
              borderRadius: 10,
              padding: 15,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            {/* Hospital Image & Rating */}
            <Image source={{ uri: hospital.image }} style={{ width: "100%", height: 150, borderRadius: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>{hospital.name}</Text>
            <Text style={{ fontSize: 16, color: "#777" }}>⭐ {hospital.rating} / 5</Text>
            <Text style={{ fontSize: 16, marginTop: 5 }}>💰 Cost: {hospital.cost}</Text>

            {/* Doctor Dropdown */}
            <Text style={{ fontSize: 18, marginTop: 10 }}>Select a Doctor:</Text>
            <Picker
              selectedValue={selectedDoctors[hospital.id] || ""}
              onValueChange={(value) => handleDoctorChange(hospital, value)}
              style={{ height: 50 }}
            >
              <Picker.Item label="Choose a Doctor" value="" />
              {hospital.doctors.map((doc, index) => (
                <Picker.Item key={index} label={`${doc.name} - ${doc.speciality} (${doc.rating}⭐)`} value={doc} />
              ))}
            </Picker>

            {/* Show Doctor Details */}
            {selectedDoctors[hospital.id] && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  backgroundColor: "#F0F0F0",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={{ uri: selectedDoctors[hospital.id].image }}
                  style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>{selectedDoctors[hospital.id].name}</Text>
                  <Text style={{ fontSize: 14, color: "#555" }}>{selectedDoctors[hospital.id].speciality}</Text>
                  <Text style={{ fontSize: 14, color: "#777" }}>⭐ {selectedDoctors[hospital.id].rating} / 5</Text>
                  <Text style={{ fontSize: 14, color: "#777" }}>🩺 {selectedDoctors[hospital.id].experience}</Text>
                </View>
              </View>
            )}

            {/* Confirm Booking Button */}
            {selectedDoctors[hospital.id] && (
              <TouchableOpacity
                onPress={() => handleConfirmBooking(hospital.id)}
                style={{
                  backgroundColor: "#007AFF",
                  padding: 12,
                  borderRadius: 10,
                  marginTop: 15,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>Confirm Booking</Text>
              </TouchableOpacity>
            )}

            {/* Appointment Time */}
            <Text style={{ fontSize: 16, marginTop: 10 }}>🕒 Appointment in {hospital.appointmentDays}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectHospital;
