import React from 'react'
import {View,StyleSheet,Image, Button,StatusBar,Dimensions, Text} from 'react-native'
import { Video } from 'expo-av'
import firebase from '../routes/firebase'
// import { getStorage, ref } from "firebase/storage";

const {width, height} = Dimensions.get("window");

const firestorage = firebase.storage().ref('Pronunciation/Lesson1.mp4');

export default class VideoPage extends React.Component{
    render(){
        return(
           <View style={style.container}>
               <StatusBar backgroundColor="#f58084"/>
               <Button title="press" onPress={()=>{
                   const fire=firebase.storage().ref('Pronunciation/lesson1');
                   
                   console.log("firestorage", firestorage.getDownloadURL())
                //    console.log("fire", fire.bucket+"/"+fire.fullPath)
                }}/>
               <Video
                source={
                    // {uri:'https://firebasestorage.googleapis.com/v0/b/quizapp-18fdf.appspot.com/o/Pronunciation%2FLesson1.mp4'}
                    require('../assets/images/Lesson1.mp4')
                    }
                rate={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                isLooping={false}
                useNativeControls
                style={style.video}
               />
               <Text style={{
                //    fontFamily:"Medium",
                   textAlign:"justify",
                   color:"#345c74",
                   paddingLeft:42,
                   paddingRight:35
               }}>
                   User experiance (UX) design is the process design teams use to create
                   products that provide meaningful and relevant experiances to users. This 
                   involves the design of the entire process of acquiring and integrating 
                   the product, including aspects of branding, design, usability and function. 
                   "User Experience Design" is often used interchangeably with 
                   terms such as "User Interfase Design" and "usability". However, while 
                   usability and user interfase (UI) design are important aspects of UX 
                   design, they are subsets of it - UX design covers a vast array of other
                   areas, too. A UX designer is concerned with the entire process of 
                   acquiring and integrating a product,...
               </Text>
               <View style={{
                   flexDirection:"row",
                   paddingVertical:5,
                   backgroundColor:"#f58084",
                   marginHorizontal:40,
                   paddingVertical:15,
                   alignItems:"center",
                   borderRadius:10,
                   justifyContent:"center",
                   marginTop:20
               }}>
                   <Text style={{
                       color:"#FFF",
                       fontSize:15,
                       marginRight:50
                   }}>
                       Read more
                   </Text>
                   <Image source={require('../assets/images/a3.png')}/>
               </View>
           </View>
        )
    }
}
const style = StyleSheet.create({
    video:{
        width:width,
        height:height/3,
    },
    container:{
        backgroundColor:"#fff",
        justifyContent:"center"
    }
})