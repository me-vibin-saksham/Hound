import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const PatientRegister = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [healthIssue, setHealthIssue] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [medicalReport, setMedicalReport] = useState(null);
  const [userId, setUserId] = useState("A00001");

  useEffect(() => {
    fetchLastUserId();
  }, []);

  // Fetch last user ID and increment
  const fetchLastUserId = async () => {
    try {
      const users = await AsyncStorage.getItem("users");
      if (users) {
        const usersArray = JSON.parse(users);
        const lastUser = usersArray[usersArray.length - 1];
        const lastIdNumber = parseInt(lastUser.id.substring(1)) + 1;
        setUserId(`A${String(lastIdNumber).padStart(5, "0")}`);
      }
    } catch (error) {
      console.error("Error fetching last user ID:", error);
    }
  };

  // Request gallery & storage permissions
  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access gallery is required!");
      }
    }
  };

  // Select profile picture
  const pickProfilePicture = async () => {
    await requestPermissions();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // Upload medical report (Image or PDF)
  const pickMedicalReport = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (result.type !== "cancel") {
      setMedicalReport(result.uri);
    }
  };

  // Handle Registration and Store Data
  const handleRegister = async () => {
    if (!name || !email || !password || !age || !gender) {
      alert("Please fill all required fields!");
      return;
    }

    const newUser = {
      id: userId,
      name,
      email,
      password,
      gender,
      age,
      healthIssue,
      profilePic,
      medicalReport,
    };

    try {
      const users = await AsyncStorage.getItem("users");
      const usersArray = users ? JSON.parse(users) : [];
      usersArray.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(usersArray));

      console.log("All Registered Users:", usersArray);
      alert("Registration Successful!");

      // Fetch new ID for next registration
      fetchLastUserId();
    } catch (error) {
      console.error("Error storing user data:", error);
    }

    navigation.navigate("PatientLogin");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Register 🏥</Text>

      {/* Profile Picture Upload */}
      <TouchableOpacity style={styles.imageUpload} onPress={pickProfilePicture}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imageText}>Upload Profile Picture 📷</Text>
        )}
      </TouchableOpacity>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Gender Selection */}
      <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      {/* Age Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        placeholderTextColor="#888"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      {/* Health Issue Dropdown */}
      <Picker selectedValue={healthIssue} onValueChange={(itemValue) => setHealthIssue(itemValue)} style={styles.picker}>
        <Picker.Item label="Do you have any health issue?" value="" />
        <Picker.Item label="Liver Problem" value="Liver" />
        <Picker.Item label="Stomach Problem" value="Stomach" />
        <Picker.Item label="Heart Problem" value="Heart" />
        <Picker.Item label="Diabetes" value="Diabetes" />
        <Picker.Item label="None" value="None" />
      </Picker>

      {/* Upload Medical Report */}
      <TouchableOpacity style={styles.uploadButton} onPress={pickMedicalReport}>
        <Text style={styles.uploadText}>
          {medicalReport ? "Medical Report Selected ✅" : "Upload Medical Report 📑"}
        </Text>
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} activeOpacity={1} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Already have an account? */}
      <TouchableOpacity onPress={() => navigation.navigate("PatientLogin")}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginNow}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PatientRegister;

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
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  imageUpload: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  uploadButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0D8F83",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
});
