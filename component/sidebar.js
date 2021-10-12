import React, {Component} from 'react';
import {View,Button, TouchableOpacity ,Text, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native';
import {DrawerNavigatorItems} from "react-navigation-drawer";
import {Ionicons} from "@expo/vector-icons";
import firebase from '../routes/firebase';
// import Name from './name'

class SideBar extends Component{
    constructor() {
        super();
        // const [modalOpen, setModalOpen]= useState(false);
        this.dbRef = firebase.firestore().collection('users')
        this.state = {
          name: '',
          email: '',
          score:'',
          status:''
        };
      }
     
      signOut = () => {
        firebase.auth().signOut().then(() => {
          this.props.navigation.navigate('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      } 
    render(){
        return(
            <ScrollView>
                <ImageBackground source={require('../assets/images/space1.png')}
                style={{height:150, width:undefined, padding: 16, paddingTop:48}}>
                {/* <Image source={require('../assets/images/Gradient.png')}
                style={styles.profile}/> */}
                <View style={{flexDirection: "row"}}>
                    {/* <Text style={styles.followers}>{this.state.score} Points</Text>
                    <Ionicons name="md-people" size={16} color="rgba(255, 255, 255, 0.8)"/> */}
                </View>
                </ImageBackground>
                <View style={styles.container}>
                    <DrawerNavigatorItems {...this.props}/>
                </View>
                   <Button title="Log Out" onPress={()=>{this.signOut()}}/>
                {/* <Name/> */}
            </ScrollView>
    );
    }
}
    


const styles=StyleSheet.create({
    container :{
        flex:1
    },
   
    profile:{
        width : 80,
        height : 80,
        borderRadius : 40,
        borderWidth: 3,
        borderColor: "#FFF"
    },
    followers:{
        color: "rgba(255,255,255,0.8)",
        fontSize: 13,
        marginRight: 4
    }
});

export default SideBar;