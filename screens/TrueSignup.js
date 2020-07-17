import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, StatusBar, View, Image, ScrollView, Linking, Platform, Alert} from "react-native";
import { Button, Card, FAB } from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import LoggedoutFooter from '../Components/LoggedoutFooter';
import SignupBtn from '../Components/SignupBtn';
import MyComponent from './Menu';
import { StackActions } from '@react-navigation/native';

const TrueSignup = (props) => {
  	const [valueFirstName, onChangeFirstName] = React.useState('');
  	const [valueLastName, onChangeLastName] = React.useState('');
	
	const goback = () =>{
		props.navigation.dispatch(StackActions.pop());
	}

	const handleSignupBtn = (role) =>{
		props.navigation.navigate("Signup", {role: role});
	}

	const homeNav = () => {
		props.navigation.navigate("Home")
	}

	const loginNav = () => {
		props.navigation.navigate("Login")
	}

	if(props.route.params.insti){
		return (
			<View style={{flex:1, backgroundColor:'#fff'}}>
				<MyComponent backBtn={true} titleText="Signup as" goback={goback}/>
				<View style={styles.container1}>
					<SignupBtn onclick={handleSignupBtn} roleSign="institute-teacher" roleSignName="Signup as a Institute Teacher" />
					<SignupBtn onclick={handleSignupBtn} roleSign="institute-student"  roleSignName="Signup as a Institute Student" />
					<SignupBtn onclick={handleSignupBtn} roleSign="institute-admin" roleSignName="Signup as a Institute Admin" />
					<SignupBtn onclick={handleSignupBtn} roleSign="dept-admin" roleSignName="Signup as a Dept Admin" />
				</View>
				<View style={{justifyContent:'center', alignItems:'center'}}>
					<Image source={{uri: 'https://img.freepik.com/free-vector/student-graduation-cap-using-computer-desk_1262-21421.jpg?size=626&ext=jpg'}} style={{ width: 370, height: 320}}/>
				</View>				
				<LoggedoutFooter homeProp={homeNav} loginProp={loginNav}/>
			</View>
		)} else{
			return (
			<View style={{flex:1, backgroundColor:'#fff'}}>
				<MyComponent backBtn={true} titleText="Signup as" goback={goback}/>
				<View style={styles.container1}>
					<SignupBtn onclick={handleSignupBtn} roleSign="guest-teacher" roleSignName="Signup as a Guest Teacher" />
					<SignupBtn onclick={handleSignupBtn} roleSign="guest-student" roleSignName="Signup as a Guest Student" />
				</View>
				<View style={{justifyContent:'center', alignItems:'center'}}>
					<Image source={{uri: 'https://img.freepik.com/free-vector/student-graduation-cap-using-computer-desk_1262-21421.jpg?size=626&ext=jpg'}} style={{ width: 370, height: 320}}/>
				</View>
				<LoggedoutFooter homeProp={homeNav} loginProp={loginNav}/>
			</View>
		)}
}

const styles = StyleSheet.create({
  container1: {
  	flex: 1,
	justifyContent: 'center'
  },

});
export default TrueSignup