import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, StatusBar, View, Image, ScrollView, Modal, Alert} from "react-native";
import { Button, Card, FAB } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import LoggedoutFooter from '../Components/LoggedoutFooter';
import { StackActions } from '@react-navigation/native';
import MyComponent from './Menu';

const Login = (props) => {
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")
	const [loading, setLoading] = useState(false)

	const homeNav = () => {
		props.navigation.navigate("Home")
	}

	const goback = () =>{
		props.navigation.dispatch(StackActions.pop());
	}

	const loginNav = () => {
		props.navigation.navigate("Login")
	}

	const submitData = () =>{
		if(username && password){
			setLoading(true)
			const req = {
				"username": username,
				"password" : password
			}
			axios.post(`https://agile-bastion-40085.herokuapp.com/login`, req)
				.then(
					res =>{
						if(res){
							AsyncStorage.setItem('usernameToken', res.data.user.username)
							AsyncStorage.setItem('nameToken', res.data.user.name)
							AsyncStorage.setItem('rollnoToken', res.data.user.rollno)
							AsyncStorage.setItem('roleToken', res.data.user.role)
							AsyncStorage.setItem('instituteToken', res.data.user.institute)
							AsyncStorage.setItem('deptToken', res.data.user.department)
							AsyncStorage.setItem('courseToken', res.data.user.course)
							Alert.alert('Logged In as ' + res.data.user.username);
							setLoading(false)
							if(res.data.user.role == "institute-admin"){
								props.navigation.dispatch(StackActions.popToTop())
								props.navigation.dispatch(StackActions.replace("InstituteAdminDashboard"));
							} else if(res.data.user.role == "dept-admin"){
								props.navigation.dispatch(StackActions.popToTop())
								props.navigation.dispatch(StackActions.replace("DeptAdminDashboard"));
							} else if(res.data.user.role == "institute-teacher"){
								props.navigation.dispatch(StackActions.popToTop())
								props.navigation.dispatch(StackActions.replace("TeacherDashboard"));
							} else {
								props.navigation.dispatch(StackActions.popToTop())
								props.navigation.dispatch(StackActions.replace("StudentTeacherDashboard", {course : res.data.user.course, role:'institute-student'}))
							}
						}
					}
				)
				.catch(
					err=>
					{
						setLoading(false)
						Alert.alert("Can't Signin");
					}
				)
		}
		else {
			setLoading(false)
			Alert.alert("Both are required fields");
		}
	}

	return(
		<View style={ styles.container1 }>
		<MyComponent backBtn={true} titleText="Login as" goback={goback}/>
		<ScrollView>
			<View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
				<Text style={{ marginTop: 20, fontSize: 20 }}>Login</Text>
				<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					value={username}
					placeholder="Username"
					placeholderTextColor="#a0a0a0"
					onChangeText={text => setUsername( text )}
				/>
				<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					value={password}
					placeholder="Password"
					placeholderTextColor="#a0a0a0"
					onChangeText={text => setPassword( text )}
				/>
				<Button mode="contained" icon="login" style={{ marginTop: 10, marginBottom: 10 }} onPress={()=> submitData()}>
					Login
				</Button>
				<Text>OR</Text>
				<Button mode="contained" icon="account-plus" style={{backgroundColor: 'red', marginTop: 10}} onPress={()=> {homeNav()}}>
					Signup Here!
				</Button>
				<View style={{justifyContent:'center', alignItems:'center'}}>
					<Image source={{uri: 'https://img.freepik.com/free-vector/student-graduation-cap-using-computer-desk_1262-21421.jpg?size=626&ext=jpg'}} style={{ width: 370, height: 320}}/>
				</View>
			</View>
			</ScrollView>
			{/* <LoggedoutFooter homeProp={homeNav} loginProp={loginNav}/> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container1: {
		backgroundColor: "#fafaff",
		flex: 1,
	},
  
  });
  
export default Login