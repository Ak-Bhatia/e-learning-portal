import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, StyleSheet, StatusBar, View, ScrollView } from "react-native";
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import InstituteAdminDashboard from './screens/InstituteAdminDashboard';
import DeptAdminDashboard from './screens/DeptAdminDashboard';
import DeptAdminCourses from './screens/DeptAdminCourses';
import TeacherDashboard from './screens/TeacherDashboard';
import StudentTeacherDashboard from './screens/StudentTeacherDashboard';
import Notes from './screens/Notes';
import Videos from './screens/Videos';
import AddNotes from './screens/AddNotes';
import NotesAdding from './screens/NotesAdding';
import AddVideos from './screens/AddVideos';
import TrueSignup from './screens/TrueSignup';
import AsyncStorage from '@react-native-community/async-storage';

function App() {

  const Stack = createStackNavigator();

  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [rollno, setRollno] = useState("")
  const [role, setRole] = useState("")
  const [institute, setInstitute] = useState("")
  const [department, setDepartment] = useState("")
  const [course, setCourse] = useState("")
  const [initial, setInitial] = useState("")

  const checkToken = async () => {
    var usernametoken = await AsyncStorage.getItem("usernameToken");
    var nametoken = await AsyncStorage.getItem("nameToken");
    var rollnotoken = await AsyncStorage.getItem("rollnoToken");
    var roletoken = await AsyncStorage.getItem("roleToken");
    var institutetoken = await AsyncStorage.getItem("instituteToken");
    var departmenttoken = await AsyncStorage.getItem("departmentToken");
    var coursetoken = await AsyncStorage.getItem("courseToken");
    if(usernametoken){
      setUsername(usernametoken)
      setName(nametoken)
      setRollno(rollnotoken)
      setRole(roletoken)
      setInstitute(institutetoken)
      setDepartment(departmenttoken)
      setCourse(coursetoken)
      console.log("User Logged In");
      console.log("user",usernametoken)
    } else{
      console.log("User not Logged In");
    }
    if(!usernametoken){
      await setInitial("Home")
    } else {
      if(role == "institute-admin"){
        await setInitial("InstituteAdminDashboard")
      } else if(role == 'dept-admin'){
        await setInitial("DeptAdminDashboard")
      } else if(role == 'insititute-teacher'){
        await setInitial("TeacherDashboard")
      } else{
        await setInitial("StudentTeacherDashboard")
      }
    }
    
  }
  
  useEffect(()=>{
    checkToken()
  }, [])
  
  const myOptions1 = {
    headerStyle: {
      backgroundColor: '#5601F3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }}

  return (
    <Stack.Navigator initialRouteName="Home" headerMode={false}>
      <Stack.Screen name="Home" mode="card" component={Home} options={myOptions1}/>
      <Stack.Screen name="TrueSignup" mode="card" component={TrueSignup} options={myOptions1}/>
      <Stack.Screen name="InstituteAdminDashboard" mode="card" component={InstituteAdminDashboard} options={myOptions1}/>
      <Stack.Screen name="DeptAdminDashboard" mode="card" component={DeptAdminDashboard} options={myOptions1}/>
      <Stack.Screen name="DeptAdminCourses" mode="card" component={DeptAdminCourses} options={myOptions1}/>
      <Stack.Screen name="TeacherDashboard" mode="card" component={TeacherDashboard} options={myOptions1}/>
      <Stack.Screen name="StudentTeacherDashboard" mode="card" component={StudentTeacherDashboard} options={myOptions1}/>
      <Stack.Screen name="Notes" mode="card" component={Notes} options={myOptions1}/>
      <Stack.Screen name="AddNotes" mode="card" component={AddNotes} options={myOptions1}/>
      <Stack.Screen name="Videos" mode="card" component={Videos} options={myOptions1}/>
      <Stack.Screen name="AddVideos" mode="card" component={AddVideos} options={myOptions1}/>
      <Stack.Screen name="Login" mode="card" component={Login} options={myOptions1}/>
      <Stack.Screen name="Signup" mode="card" component={Signup} options={myOptions1}/>
      <Stack.Screen name="NotesAdding" mode="card" component={NotesAdding} options={myOptions1}/>
    </Stack.Navigator>
  );
}

export default () => {

  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}
