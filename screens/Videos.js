import React, { useEffect, useState } from 'react';
import { Text, TextInput, Modal, Alert, StyleSheet, StatusBar, View, Image, FlatList, ScrollView, TouchableHighlight , TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {Button, Card, FAB} from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import LoggedinFooter from '../Components/LoggedinFooter';
import { StackActions } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import MyComponent from './Menu';

const Videos = (props) => {
    const checkToken= async () => {
		var institute= await AsyncStorage.getItem("instituteToken");
		var dept= await AsyncStorage.getItem("deptToken");
		var role = await AsyncStorage.getItem("roleToken");
		var username = await AsyncStorage.getItem("usernameToken");
		var course = await AsyncStorage.getItem("courseToken");
		var obj = {
			institute : institute,
			dept : dept,
			role : role,
			username : username,
			course : course
		}
		return obj
	}

    const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
    const [userUsername, setUsername] = useState("")
    const [userInstitute, setinstitute] = useState("")
	const r = props.route.params.role;
    const [role, setRole] = useState(r)
	const c = props.route.params.course;
    const [course, setCourse] = useState(c)
    const [userDept, setDept] = useState("")
    const [removed, setRemoved] = useState("")
    const [varVideo, setVarVideo] = useState(false)

  	const fetchData = () => {
		checkToken()
		.then(res =>{
			if(res.role == "institute-teacher"){
				setVarVideo(true)
			} else {
				setVarVideo(false)
			}
			fetch(`https://agile-bastion-40085.herokuapp.com/${res.institute}/${res.dept}/${course}/videos`)
			.then(res=>res.json())
			.then(results=>{
				setData(results)
				setLoading(false)
			}). catch(err=>{
				Alert.alert(err.message)
				setLoading(false)
			})
		})
	}

	useEffect(()=>{
		fetchData()
	}, [])

	const makeDownload = (item) =>{
		FileSystem.downloadAsync(item.noteUrl, FileSystem.documentDirectory+item.topicname)
		.then(( {uri}) =>{
			Alert.alert("Downloaded")
			console.log("downloaded at ", uri)
		})
	}

	const goback = () =>{
		props.navigation.dispatch(StackActions.pop());
	}
	
	const homeNav = () => {
		props.navigation.dispatch(StackActions.popToTop())
		props.navigation.dispatch(StackActions.replace("Home"))
	}

	const studentTeacherDashboardNav = () => {
		props.navigation.navigate("StudentTeacherDashboard", {course, role:'institute-student'})
	}

	const teacherDashboardNav = () => {
		props.navigation.navigate("TeacherDashboard")
	}

	const deptCoursesNav = () => {
        props.navigation.navigate("DeptAdminCourses")
    }

	const deptDashboardNav = () => {
        props.navigation.navigate("DeptAdminDashboard")
	}

	const addCourseNav = () => {
        props.navigation.navigate("CreateCourse", {course, role})
    }

	const addvideos = () => {
		props.navigation.navigate("AddVideos",{course, role})
    }

	return(
        <View style={{flex:1, backgroundColor:"white"}}>
			<MyComponent backBtn={true} titleText="Videos" goback={goback}/>
			<Text style={styles.closeButton}>Choose among these Videos of : {course}</Text>
            <FlatList
                data = {data}
                renderItem = {({item})=>
                <TouchableOpacity onPress={ () => {makeDownload(item)}}>
					<View style={styles.ordersView}>
						<View style={styles.middleOrderView}>
							<Text style={styles.ordersMiddleHeading}>{item.topicname}</Text>
							<Text>Description: {item.desc}</Text>
						</View>
						<View style={{justifyContent: 'center', flex: 1, alignItems:'center'}}>
							<Button icon="play-circle" labelStyle={{ fontSize: 40}} ></Button>
							{/* <Text style={styles.acceptButton }>Course : {item.course}</Text>
							<Text style={styles.acceptButton }>Url : {item.noteUrl}</Text> */}
						</View>
					</View>
				</TouchableOpacity>
				}
                keyExtractor={item=>item._id}
                onRefresh={()=>fetchData()}
                refreshing={loading}
            />
			{ varVideo?
			<FAB
				style={styles.fab}
				icon="plus"
				onPress={ () => addvideos() }
			/>
			:
			<Text></Text>
			}
			<LoggedinFooter homeProp={homeNav} teacherDashboard={teacherDashboardNav} deptDashboard={deptDashboardNav} deptCourses={deptCoursesNav} addCourse={addCourseNav} studentTeacherDashboard={studentTeacherDashboardNav} role={role} />
        </View>
	)
}

const styles = StyleSheet.create({

	ordersView : {
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 10,
		borderBottomColor: '#e0e0e0',
		borderBottomWidth: 0.8,
		backgroundColor: 'white',
		flexDirection: 'row',
	},

	middleOrderView : {
		flex: 2,
		padding: 5,
		justifyContent: 'center',
	},

	ordersMiddleHeading : {
		fontWeight: 'bold',
		color: '#5c6bc0',
	},

	acceptButton : {
		borderRadius: 5,
		marginTop: 10,
		backgroundColor: 'green',
		color: 'whitesmoke',
		fontWeight: 'bold',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
	},

	closeButton : {
		backgroundColor: 'red',
		color: 'whitesmoke',
		fontWeight: 'bold',
		paddingLeft: 10,
		paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
	},

    footerBtn : {
    	fontSize: 25,
    	color: '#1D2434',
	},
	
	fab: {
		color: 'red',
		backgroundColor: '#4700cc',
		position: 'absolute',
		margin: 20,
		right: 10,
		bottom: 40,
	  },
	})

export default Videos