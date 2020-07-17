import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, StatusBar, View, Image, ScrollView, Modal, Alert} from "react-native";
import { Button, Card, FAB } from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {StackActions} from'@react-navigation/native';
import MyComponent from './Menu';

const Signup = (props) => {
	
	const checkToken = async () => {
		const token = await AsyncStorage.getItem("token");
		if(token) {
			Alert.alert("Logged in already as ", token);
		} else {
			Alert.alert("Not logged in");
		}
	}

	const t = props.route.params.role;
	const [name, setName] = useState("")
	const [username, setUserName] = useState("")
	const [rollno, setRollno] = useState("")
	const [password, setPassword] = useState("")
	const [role, setRole] = useState(t);
	const [course, setCourse] = useState("")
	const [institute, setInstitute] = useState("")
	const [department, setDepartment] = useState("")
	const [insti, setinsti] = useState("")
	const submitData = () =>{
		if(name && username && rollno && password && course && institute && department){
			fetch(`https://agile-bastion-40085.herokuapp.com/${role}/register`,{
				method: "POST",
				headers: {
					Accept: 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				body:JSON.stringify({
					name: name,
					username: username,
					rollno: rollno,
					password: password,
					role: role,
					course: course,
					institute: institute,
					department: department,
				})
			})
				.then((response) => response.json())
					.then((responseData) => {
						Alert.alert(responseData.msg);
						console.log(responseData);
						props.navigation.dispatch(StackActions.popToTop());
						props.navigation.dispatch(StackActions.replace("Login"));
						Alert.alert("Now login with your Credentials");
					}).catch((error) => {
						console.log(error);
					})
				} else {
					Alert.alert("All the fields are required")
				}
	}
	
	AsyncStorage.getItem("instiToken").then((value) => {
		setinsti(value);
	}).done();

	const goback = () =>{
		props.navigation.dispatch(StackActions.pop());
	}

	return(
		<View style={ styles.container1 }>
		<ScrollView>
		<MyComponent backBtn={true} titleText="Signup" goback={goback}/>	
		<View style={{ flex:1, margin: 20, alignItems: 'center', backgroundColor: '#fafaff'}}>
				<Text style={{ marginTop: 20, fontSize: 20}}>Signup</Text>
				<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Name"
					placeholderTextColor="#a0a0a0"
			        value={name}
			        onChangeText={text => setName( text )}
	      		/>
				<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Username"
					placeholderTextColor="#a0a0a0"
			        value={username}
			        onChangeText={text => setUserName( text )}
	      		/>
	    		<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Roll No."
					placeholderTextColor="#a0a0a0"
			        value={rollno}
			        onChangeText={text => setRollno( text )}
	      		/>
	    		<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Password"
					placeholderTextColor="#a0a0a0"
			        value={password}
			        onChangeText={text => setPassword( text )}
	      		/>
				<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Role"
					editable={false}					
					placeholderTextColor="#a0a0a0"
					value={role}
					onChangeText={text => setRole( text )}
				/>
				<Text style={{color: "#a0a0a0", fontSize:13}}>*To change your Role/Post, go back to Homepage</Text>
				<Text></Text>
				<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Course/Class"
					placeholderTextColor="#a0a0a0"
					value={course}
					onChangeText={text => setCourse( text )}
				/>
				<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Institute"
					placeholderTextColor="#a0a0a0"
					value={institute}
					onChangeText={text => setInstitute( text )}
				/>
				<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Department"
					placeholderTextColor="#a0a0a0"
					value={department}
					onChangeText={text => setDepartment( text )}
				/>
				<Button mode="contained" icon="account-plus" style={{ marginTop: 10 }} onPress={()=> submitData()}>
						Signup
  				</Button>
				<Button mode="contained" icon="login" style={{ marginTop: 10, backgroundColor: 'red' }} onPress={()=> props.navigation.navigate("Login")}>
						Login
  				</Button>
  				<Text>{insti}</Text>
      	</View>
		</ScrollView>
	</View>
	)
}

const styles = StyleSheet.create({
	container1: {
		backgroundColor: "#fafaff",
		flex: 1,
	},
  
  });
  
export default Signup