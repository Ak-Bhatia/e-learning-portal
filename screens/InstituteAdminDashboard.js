import React, { useEffect, useState } from 'react';
import { Text, TextInput, Modal, Alert, StyleSheet, StatusBar, View, Image, FlatList, ScrollView, TouchableHighlight , TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {Button, Card, FAB} from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import LoggedinFooter from '../Components/LoggedinFooter';
import { StackActions } from '@react-navigation/native';
import MyComponent from './Menu';

const InstituteAdminDashboard = (props) => {

    const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
    const [verification, setVerification] = useState("")

	const checkToken = async () => {
		var institute = await AsyncStorage.getItem("instituteToken");
		var obj  = {
			institute:institute
		}
		return obj
    }

	const fetchData = () => {
		checkToken()
		.then(res => {
			fetch(`https://agile-bastion-40085.herokuapp.com/institute-admin-dashboard/${res.institute}/dept`)
			.then(res=>res.json())
			.then(results=>{
				setData(results)
				setLoading(false)
			}). catch(err=>{
				console.log(err)
				setLoading(false)
			})
		})
	}

	useEffect(()=>{
		fetchData()
	}, [])

	const homeNav = () => {
		props.navigation.dispatch(StackActions.replace("Home"))
	}

	const goback = () =>{
		props.navigation.dispatch(StackActions.pop());
	}

	return(
        <View style={{flex:1}}>
		<MyComponent backBtn={false} titleText="Admin Block" goback={goback}/>
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
                onRefresh={()=>fetchData()}
                refreshing={loading}
            />
			<LoggedinFooter homeProp={homeNav} role="institute-admin"/>
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
		borderRadius: 5,
		marginTop: 10,
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

export default InstituteAdminDashboard