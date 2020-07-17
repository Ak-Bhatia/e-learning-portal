import React, { useEffect, useState } from 'react';
import { Text, TextInput, Modal, Alert, StyleSheet, StatusBar, View, Image, FlatList, ScrollView, TouchableHighlight , TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {Button, Card, FAB} from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import LoggedinFooter from '../Components/LoggedinFooter';
import { StackActions } from '@react-navigation/native';
import MyComponent from './Menu';

const DeptAdminCourses = (props) => {
    
    const checkToken = async () => {
		var username = await AsyncStorage.getItem("usernameToken");
		var institute = await AsyncStorage.getItem("instituteToken");
		var dept = await AsyncStorage.getItem("deptToken");
		var role = await AsyncStorage.getItem("roleToken");
		var obj = {
			username: username,
			institute: institute,
			dept: dept,
			role: role
		}
		return obj
    }

    const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [createCourse, setCreateCourse] = useState("")

  	const fetchData = () => {
		checkToken()
		.then(res =>{
			fetch(`https://agile-bastion-40085.herokuapp.com/dept-admin-dashboard/${res.institute}/${res.dept}/courses`)
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

	const submitData = () =>{
		if(createCourse){
			checkToken()
			.then(res => {
				fetch(`https://agile-bastion-40085.herokuapp.com/dept-admin-dashboard/${res.institute}/${res.dept}/addcourse`,{
					method: "POST",
					headers: {
						Accept: 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					},
					body:JSON.stringify({
						addedBy: res.username,
						course: createCourse,
						institute: res.institute,
						department: res.dept,
					})
				})
				.then((response) => response.json())
					.then((responseData) => {
						Alert.alert(responseData.msg);
						console.log(responseData);
					}).catch((error) => {
						console.log(error);
					})
				})
			} else {
				Alert.alert("This field cannot be empty")
			}
		}

	const goback = () =>{
		props.navigation.dispatch(StackActions.pop());
	}

	const homeNav = () => {
		props.navigation.dispatch(StackActions.popToTop())
		props.navigation.dispatch(StackActions.replace("Home"))
	}

	const deptDashboardNav = () => {
        props.navigation.navigate("DeptAdminDashboard")
	}

    const deptCoursesNav = () => {
        props.navigation.navigate("DeptAdminCourses")
    }

    const addCourseNav = () => {
        props.navigation.navigate("CreateCourse")
    }

	return(
        <View style={{flex:1, backgroundColor:"white", justifyContent:'center'}}>
			<MyComponent backBtn={true} titleText="Department Courses" goback={goback}/>
			<View style={{flex:0.1, alignItems:'center'}}>
				<View style={{flex:1, alignItems: 'center', flexDirection: 'row'}}>
				<TextInput
					style={{width: 200, margin: 8, height: 35, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 7,}}
					value={createCourse}
					placeholder="Add A Course"
					placeholderTextColor="#a0a0a0"
					onChangeText={text => setCreateCourse( text )}
				/>
				<Button mode="contained" icon="plus-circle" style={{height: 35, marginTop: 10, marginBottom: 10 }} labelStyle={{fontSize: 12, padding:0,}} onPress={()=> submitData()}>
					Add Course
				</Button>
				</View>
			</View>
			<Text style={styles.tagButton}>All Courses</Text>
			<View style={{flex:1}}>
			<FlatList
                data = {data}
                renderItem = {({item})=>
                <TouchableHighlight onPress = { () => props.navigation.navigate("StudentTeacherDashboard", {course : item.course, role:'dept-admin'}) }>
                <View style={styles.ordersView}>
                    <View style={styles.middleOrderView}>
	                    <Button icon="open-in-new" labelStyle={styles.ordersMiddleHeading}>{item.course}</Button>
                    </View>
                    <View style={{justifyContent: 'center', flex: 1, alignItems:'center'}}>
                        {/* <Text style={ item.isRemoved?styles.closeButton:styles.acceptButton }>{item.isRemoved?setRemoved("Removed"):setRemoved("Ongoing")}{removed} Course</Text> */}
                    </View>
                </View>	
                </TouchableHighlight>
				}
                keyExtractor={item=>item._id}
                onRefresh={()=>fetchData()}
                refreshing={loading}
            />
			</View>
			<LoggedinFooter homeProp={homeNav} deptDashboard={deptDashboardNav} deptCourses={deptCoursesNav} addCourse={addCourseNav} role="dept-admin" />
        </View>
	)
}

const styles = StyleSheet.create({

	ordersView : {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		borderBottomColor: '#e0e0e0',
		borderBottomWidth: 0.8,
		backgroundColor: 'white',
		flexDirection: 'row',
	},

	middleOrderView : {
		justifyContent: 'center',
	},

	ordersMiddleHeading : {
		color: '#5c6bc0',
	},

	acceptButton : {
		backgroundColor: 'green',
		color: 'whitesmoke',
		fontWeight: 'bold',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
	},
	tagButton : {
		backgroundColor: '#5601F3',
		color: 'whitesmoke',
		fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign:'center'
	},

	closeButton : {
		textAlign:'center',
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
})

export default DeptAdminCourses