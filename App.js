import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import FirstSlection from './Screens/FirstSlection';
import PatientHome from './Screens/HomeScreens/PatientHome';
import PatientLogin from './Screens/LoginScreens/patientLR/PatientLogin';
import PatientRegister from './Screens/LoginScreens/patientLR/PatientRegister';
import PatientAppointment from './Screens/PatientAppointment';
import SelectHospital from './Screens/SelectHospital';
import AdminControl from './Screens/AdminControl';
import AdminLogin from './Screens/LoginScreens/adminLR/AdminLogin';
import AdminPanel from './Screens/HomeScreens/AdminPanel';
import DoctorHome from './Screens/HomeScreens/DoctorHome';
import DoctorLogin from './Screens/LoginScreens/doctorLR/DoctorLogin';
import Diagnosis from './Screens/Doctor & AI/Diagnosis';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={FirstSlection} options={{ headerShown: false }}/>
        <Stack.Screen name='PatientHome' component={PatientHome} options={{ headerShown: false }}/>
        <Stack.Screen name='PatientLogin' component={PatientLogin} options={{ headerShown: false }}/>
        <Stack.Screen name='PatientRegister' component={PatientRegister} options={{ headerShown: false }}/>
        <Stack.Screen name='PatientAppointment' component={PatientAppointment} options={{ headerShown: false }}/>
        <Stack.Screen name='SelectHospital' component={SelectHospital} options={{ headerShown: false }}/>
        <Stack.Screen name='AdminControl' component={AdminControl} options={{ headerShown: false }}/>
        <Stack.Screen name='AdminLogin' component={AdminLogin} options={{ headerShown: false }}/>
        <Stack.Screen name='AdminPanel' component={AdminPanel} options={{ headerShown: false }}/>
        <Stack.Screen name='DoctorHome' component={DoctorHome} options={{ headerShown: false }}/>
        <Stack.Screen name='DoctorLogin' component={DoctorLogin} options={{ headerShown: false }}/>
        <Stack.Screen name='Diagnosis' component={Diagnosis} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

