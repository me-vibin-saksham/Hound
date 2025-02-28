import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Octicons from "react-native-vector-icons/Octicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native";

const PatientHome = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const users = await AsyncStorage.getItem("users");
      if (users) {
        const usersArray = JSON.parse(users);
        const user = usersArray.find((u) => u.id === userId);
        if (user) {
          setUserData(user);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
          {userData ? (
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View
                style={{
                  flexDirection: "row",
                  height: 90,
                  width: "100%",
                  backgroundColor: "#0D8F83",
                  alignItems: "center",
                }}
              >
                <Octicons
                  size={47}
                  name="three-bars"
                  color={"#FFFFFF"}
                  style={{ marginLeft: 15 }}
                />
                {userData.profilePic && (
                  <Image
                    source={{ uri: userData.profilePic }}
                    style={styles.profileImage}
                  />
                )}
                <View>
                  <Text style={styles.infoText}>{userData.name}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.infoText2}>
                      {userData.gender}, {userData.age}
                    </Text>
                  </View>
                </View>
                <MaterialIcons
                  size={55}
                  name="circle-notifications"
                  color={"#FFFFFF"}
                  style={{ marginLeft: 150 }}
                />
              </View>
            </View>
          ) : (
            <Text style={styles.infoText}>Loading user data...</Text>
          )}
    
          {/* Wrapper to ensure button is positioned correctly */}
          <View style={{ flex: 1 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {ImageData.map((data, index) => (
                <View key={index}>
                  <ImageStorySec title={data.tex} image_url={data.url} />
                </View>
              ))}
            </ScrollView>
    
            {/* Book an Appointment Button */}
            <TouchableOpacity
              style={{height: 50, width: "65%", backgroundColor: "#0D8F83", alignSelf: "center", justifyContent: "center", alignItems: "center", borderRadius: 10, marginVertical: 20,}}
              onPress={()=>{navigation.navigate("PatientAppointment",{name:userData.name, gender:userData.gender, age:userData.age, profile:userData.profilePic, issue:userData.healthIssue})}}
            >
              <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
                Book an Appointment
              </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </SafeAreaView>
      );
    
};

export default PatientHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop:10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft:10
  },
  infoText :{
    fontSize:20,
    fontWeight:"bold",
    marginLeft:8,
    color:"#FFFFFF"
},
  infoText2:{
    fontSize:15,
    marginLeft:8,
    color:"#FFFFFF"
  }
});


const ImageStorySec = ({title, image_url}) => (
    <>
    <View style={{height:220,width:350,backgroundColor:"#0D8F83",marginLeft:15,borderRadius:20,marginTop:35,marginRight:15}}>
        <Image source={{uri:image_url}} style={{height:220,width:"100%",backgroundColor:"red",borderRadius:20,opacity:0.6}}/>
        <Text style={{position:"absolute", fontSize:25, marginHorizontal:25, fontWeight:600,bottom:15,color:"#FFFFFF"}}>{title}</Text>
    </View>
    </>
)

const ImageData = [
    {
        url:"https://e1.pxfuel.com/desktop-wallpaper/339/991/desktop-wallpaper-hospital-logo-hospital.jpg",
        tex:"One step solution to all your medical needs"
    },
    {
        url:"https://static.vecteezy.com/system/resources/thumbnails/040/835/804/small/ai-generated-interior-of-a-hospital-corridor-with-green-walls-and-blue-floor-photo.jpg",
        tex:"Seamless Healthcare at Your Fingertips!"
    },
    {
        url:"https://wallpapers.com/images/hd/patient-reading-in-hospital-bed-zmxej48ggbrs113i.jpg",
        tex:"Smart. Simple. Trusted Healthcare Solutions."
    },
    {
        url:"https://wallpapers.com/images/hd/sad-boi-inside-hospital-a7iuoqfndb723h7d.jpg",
        tex:"From Consultation to Care All in One Place!"
    },

]