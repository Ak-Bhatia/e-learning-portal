import React, { useEffect, useState } from 'react';
import { Text, TextInput, Modal, Alert, StyleSheet, StatusBar, View, Image, FlatList, ScrollView, TouchableHighlight , TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {Button, Card, FAB} from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import LoggedinFooter from '../Components/LoggedinFooter';
import { StackActions } from '@react-navigation/native';
import MyComponent from './Menu';

const DeptAdminDashboard = (props) => {

    const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
    const [verification, setVerification] = useState("")
    const [viewData, setViewData] = useState("all")
    const [searchUser, setSearch] = useState("")

	const checkToken = async () => {
		var institute = await AsyncStorage.getItem("instituteToken");
        var dept = await AsyncStorage.getItem("deptToken")
        var obj = {
            institute : institute,
            dept : dept
        }
        return obj
    }

  	const fetchData = (name) => {
        setLoading(true)
        setViewData(name)
        setSearch("")
        checkToken()
        .then(res => {
            fetch(`https://agile-bastion-40085.herokuapp.com/dept-admin-dashboard/${res.institute}/${res.dept}/`+name)
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
		fetchData("all")
	}, [])

    const submitData = (searchuser) => {
        if(!searchuser){
            Alert.alert("This field cannot be empty");
        } else{
            setLoading(true)
            setViewData("all")
            checkToken();
            fetch(`https://agile-bastion-40085.herokuapp.com/search-users/`+searchuser)
            .then(res=>res.json())
            .then(results=>{
                setData(results)
                setLoading(false)
            }). catch(err=>{
                Alert.alert(err.message)
                setLoading(false)
            })
       }
    }

    const goback = () =>{
		props.navigation.dispatch(StackActions.pop());
	}

	const homeNav = () => {
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
        <View style={{flex:1, backgroundColor:"#f0f0f0"}}>
		<MyComponent backBtn={false} titleText="Department" goback={goback}/>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:10,}}>
                <Button compact={true} mode="outlined" style={{borderColor: '#a0a0f0', backgroundColor:'white', paddingBottom: 0, height: 30, margin: 0 }} labelStyle={{fontSize: 13, padding:0, marginTop: 5}} onPress = { () => { fetchData("all") }}>All</Button>
                <Button compact={true} mode="outlined" style={{borderColor: '#a0a0f0', backgroundColor:'white', paddingBottom: 0, height: 30, margin: 0 }} labelStyle={{fontSize: 13, padding:0, marginTop: 5}} onPress = { () => { fetchData("teachers") }}>Teachers</Button>
                <Button compact={true} mode="outlined" style={{borderColor: '#a0a0f0', backgroundColor:'white', paddingBottom: 0, height: 30, margin: 0 }} labelStyle={{fontSize: 13, padding:0, marginTop: 5}} onPress = { () => { fetchData("students") }}>Students</Button>
            </View>
            <View style={{flex:0.1, alignItems: 'center', flexDirection: 'row'}}>
                <TextInput
                    style={{width: 200, margin: 8, height: 30, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 7,}}
                    value={searchUser}
                    placeholder="Seacrh Username"
                    placeholderTextColor="#a0a0a0"
                    onChangeText={text => setSearch( text )}
                />
                <Button mode="contained" icon="account-search" style={{ height: 30, marginTop: 10, marginBottom: 10 }} labelStyle={{fontSize: 12, padding:0, marginTop: 7}} onPress={()=> submitData(searchUser)}>
                    Search User
                </Button>
            </View>
            <Text style={styles.closeButton}>{viewData}</Text>
            <View style={{flex:1, backgroundColor:'white'}}>
                <View style={styles.ordersView}>
                    <View style={{ flexDirection: 'row', flex: 2, justifyContent:'space-between'}}>
                        <View style={styles.middleOrderView}>
                            <Text style={{ textAlign:'left', paddingRight:70}}>Username </Text>
                        </View>
                        <View style={styles.middleOrderView}>
                            <Text style={{textAlign:'center', paddingRight:130}}>Status</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', flex: 1, alignItems:'center'}}>
                        <Text style={styles.orderUserName}>Department</Text>
                    </View>
                </View>	
            <FlatList
                data = {data}
                renderItem = {({item})=>
                <View style={styles.ordersView}>
                    <View style={{ flexDirection: 'row', flex: 2, justifyContent:'space-between'}}>
	                    <View style={styles.middleOrderView}>
							<Text style={styles.ordersMiddleHeading}>{item.username} </Text>
        	            </View>
            	        <View style={styles.middleOrderView}>
                        	<Text style={ item.isVerified?styles.acceptButton:styles.closeButton }>{item.isVerified?setVerification("Verified"):setVerification("Not Verified")}{verification}</Text>
		    			</View>
					</View>
					<View style={{justifyContent: 'center', flex: 1, alignItems:'center'}}>
						<Text style={styles.orderUserName}>{item.department}</Text>
                    </View>
                </View>	
                }
                keyExtractor={item=>item._id}
                onRefresh={()=>fetchData(viewData)}
                refreshing={loading}
            />
            </View>
			<LoggedinFooter homeProp={homeNav} deptDashboard={deptDashboardNav} deptCourses={deptCoursesNav} addCourse={addCourseNav} role="dept-admin" />
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
		marginLeft: 10,
		marginRight: 10,
		alignItems:'center',
		justifyContent: 'center',
	},

	ordersMiddleHeading : {
		fontWeight: 'bold',
		color: '#5c6bc0',
		alignItems:'center',
		justifyContent: 'center',
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
        textAlign:'center'
	},

	tagButton : {
		backgroundColor: '#5601F3',
		color: 'whitesmoke',
		fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign:'center'
	},

    footerBtn : {
    	fontSize: 25,
    	color: '#1D2434',
    },
})

export default DeptAdminDashboard