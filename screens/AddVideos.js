import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, StatusBar, View, Image, ScrollView, Modal, Alert} from "react-native";
import { Button, Card, FAB } from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { StackActions } from '@react-navigation/native';
import MyComponent from './Menu';

const AddVideos = (props) => {

	const checkToken = async () => {
		var institute= await AsyncStorage.getItem("instituteToken");
		var dept= await AsyncStorage.getItem("deptToken");
		var course= await AsyncStorage.getItem("courseToken");
		var role= await AsyncStorage.getItem("roleToken");
		var username = await AsyncStorage.getItem("usernameToken");
		var obj = {
			institute : institute,
			dept : dept,
			role : role,
			username : username,
			course : course
		}
		return obj
	}

	const r = props.route.params.role;
	const c = props.route.params.course;
	const [userName, setName] = useState("")
	const [username, setUserName] = useState("")
	const [role, setRole] = useState(r);
	const [course, setCourse] = useState(c)
	const [institute, setInstitute] = useState("")
	const [dept, setDept] = useState("")
	const [topicname, setTopicname] = useState("")
	const [desc, setDesc] = useState("")
	const [fiile, setFile] = useState({
		name: "",
		type: "",
		uri: ""
	})
	const [uploadingFile, setUploadingFile] = useState()
	
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    const onUpload = (result) => {
	}

	const pickDocument = async () => {
		console.log("here")
		let result = await DocumentPicker.getDocumentAsync({});
		if(result.type == "cancel"){
			Alert.alert("Please Choose a Video first")
		} else{
			let newFile = {
				uri : result.uri,
				type : "test/mp4",
				name: result.name
			}
			setFile(newFile)
		}
	}

	const submitData = (result) =>{
		if(fiile.name && topicname && desc){
			const formData = new FormData();
        // This name i.e video should be used to collect data in backend
		formData.append('file',result);
		formData.append('upload_preset','eLearnApp');
		formData.append('cloud_name','ak-124210-bh');
		const response = fetch("https://api.cloudinary.com/v1_1/ak-124210-bh/auto/upload", {
			method: "post",
			body : formData
		})
		.then(res => res.json())
		.then(resilt =>{
			checkToken()
			.then(res =>{
				console.log(resilt.url)
				fetch(`https://agile-bastion-40085.herokuapp.com/${res.institute}/${res.dept}/${course}/videos/new`,{
					method: "POST",
					headers: {
						Accept: 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					},
					body:JSON.stringify({
						owner: res.username,
						course: res.course,
						institute: res.institute,
						department: res.dept,
						desc: desc,
						topicname: topicname,
						videoUrl: resilt.url
					})
				})
				.then((response) => response.json())
				.then((responseData) => {
					Alert.alert(responseData.msg);
					props.navigation.navigate("Notes", res.course, res.role,)
				}).catch((error) => {
					console.log(error);
				})
			})
		})
	} else{
		Alert.alert("All fields are required")
	}
	}

	const goback = () =>{
		props.navigation.dispatch(StackActions.pop());
	}

	return(
		<View style={ styles.container1 }>
		<MyComponent backBtn={true} titleText="Add" goback={goback}/>
		<ScrollView>
		<View style={{ flex:1, margin: 20, alignItems: 'center', backgroundColor: '#fafaff'}}>
				<Text style={{ marginTop: 20, fontSize: 20}}>Add Videos</Text>
				<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Topic Name"
					placeholderTextColor="#a0a0a0"
			        value={topicname}
			        onChangeText={text => setTopicname( text )}
	      		/>
				<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Description"
					placeholderTextColor="#a0a0a0"
			        value={desc}
			        onChangeText={text => setDesc( text )}
	      		/>
	    		<TextInput
					style={{width: 250, margin: 8, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Course"
					placeholderTextColor="#a0a0a0"
					value={course}
					editable={false}
			        onChangeText={text => setCourse( text )}
	      		/>
	    		<TextInput
					style={{width: 250, height: 40, borderColor: '#e0e0e0', backgroundColor: "#fff", borderWidth: 2, padding: 10,}}
					placeholder="Course"
					placeholderTextColor="#a0a0a0"
					value={fiile.name}
					editable={false}
	      		/>
				<Button mode="contained" style={{ width: 250 }} onPress={pickDocument}>
					Choose Video
				</Button>
				<Button mode="contained" style={{ marginTop: 10 }} onPress={()=> {submitData(fiile)}}>
					Add Video
  				</Button>
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
  
export default AddVideos