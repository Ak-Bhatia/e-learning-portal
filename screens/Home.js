import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, StatusBar, View, Image, ScrollView, Linking, Platform, Alert} from "react-native";
import { Button, Card, FAB } from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import LoggedoutFooter from '../Components/LoggedoutFooter';
import SignupBtn from '../Components/SignupBtn';
import MyComponent from './Menu';
import TrueSignup from './TrueSignup';

const Home = (props) => {
  	const [valueFirstName, onChangeFirstName] = React.useState('');
  	const [valueLastName, onChangeLastName] = React.useState('');
	
	const handleSignupBtn = (role) =>{
		props.navigation.navigate("Signup", {role: role});
	}

	const homeNav = () => {
		props.navigation.navigate("Home")
	}

	const loginNav = () => {
		props.navigation.navigate("Login")
	}

	return (
		<View style={{flex:1, backgroundColor:'#fff'}}>
			<MyComponent backBtn={false} titleText="Home"/>
			<View style={styles.container1}>
			<View style={{justifyContent:'center', alignItems:'center'}}>
				<Image source={{uri: 'https://img.freepik.com/free-vector/student-graduation-cap-using-computer-desk_1262-21421.jpg?size=626&ext=jpg'}} style={{ width: 370, height: 320}}/>
			</View>
				<Button icon="account-plus" style={{ paddingTop:2, marginTop: 15, backgroundColor: "#f0f2ff", paddingBottom:2, color:"white"}} uppercase={false} onPress={() => { props.navigation.navigate("TrueSignup", {insti:true}) } } >Signup with Institute</Button>
				<Button icon="account-plus" style={{ paddingTop:2, marginTop: 15, backgroundColor: "#f0f2ff", paddingBottom:2, color:"white"}} uppercase={false} onPress={() => { props.navigation.navigate("TrueSignup", {insti:false}) } } >Signup as Guest</Button>
				<Button icon="login" style={{marginTop: 20, paddingTop: 5, paddingBottom: 5}} mode="contained" uppercase={false} onPress = { () => { loginNav() }}>LOGIN</Button>
			</View>
			<LoggedoutFooter homeProp={homeNav} loginProp={loginNav}/>
		</View>
	)
}

const styles = StyleSheet.create({
  container1: {
  	flex: 1,
	justifyContent: 'center'
  },

});
export default Home