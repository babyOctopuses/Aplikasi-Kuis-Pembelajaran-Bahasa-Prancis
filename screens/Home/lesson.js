// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { TouchableOpacity, FlatList, Alert, Button, StyleSheet,Text, TextInput, ScrollView, ActivityIndicator, View, ImageBackground } from 'react-native';
import firebase from '../../routes/firebase';
import * as Speech from 'expo-speech';
import {globalStyles} from '../../constants/globalStyle'

class Lesson extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      desc: '',
      grammar: '',
      vocabulary:[],
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('Lessons').doc(this.props.navigation.state.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          title: user.title,
          desc: user.desc,
          grammar: user.grammar,
          vocabulary: [user.vocabulary],
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }


  openTwoButtonAlert= ()=>{
    console.log("delete");
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        //cancelable: true 
      }
    );
    console.log("delete");
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ImageBackground source={require('../../assets/images/french.png')}
      style={{width:"100%",height:"100%"}}>
      <ScrollView style={styles.container}>
        <View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.title}>
            {this.state.title}
          </Text>
        
          <Text style={styles.subtitle}>
              {this.state.desc}
          </Text>
        </View>
        <View style={{
              padding: 5,
              marginHorizontal:10,
              marginTop:10,
              marginBottom:-10
        }}>
          <Text style={{
            fontSize:18,
            color: "#345c74",
            // marginHorizontal:10,
            fontWeight:'bold'}}
          >
              Grammar
          </Text>
        </View>
        <View style={styles.grammartitle}>
          <Text style={styles.grammar}>
              {this.state.grammar}
          </Text>
        </View>
        {/* <View style={styles.inputGroup}>
        <Text style={{fontSize:18,color: "#345c74", marginHorizontal:10, fontWeight:'bold' }}>
              Vocabulary
        </Text>

        <ScrollView>    
            <FlatList
                data={this.state.vocabulary[0]}
                renderItem={({item})=>(
                  <View 
                    style={{
                      flexDirection:"row",
                      backgroundColor:'#fff',
                      paddingVertical: 3,
                      marginHorizontal:5,
                      alignItems:"flex-end",   
                }}
            >
            <TouchableOpacity onPress={()=>{
              console.log("item.vocab: ",item.vocabulary)
              const thingToSay = item.vocabulary;
              Speech.speak(thingToSay, {language:'fr'});
              }}>
                <Text style={{
                    color:"#345c74",
                    //  fontFamily:"Bold",
                    fontSize:16,
                    paddingHorizontal:10,
                    width:170,
                    borderBottomWidth:1,  
                    borderColor: '#345c74'
                }}>{item.vocabulary}</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    borderBottomWidth:1,
                    borderColor: '#345c74',
                    color:"#345c74",
                    //  fontFamily:"Bold",
                    fontSize:16,
                    paddingHorizontal:10,
                    width:170
                }}
                >{item.meaning}</Text>
            </View>
            )}
                        />
          </ScrollView>
        </View> */}
        <View style={styles.grammartitle}>
          <Text style={styles.grammar}>
            Tekan tombol dibawah untuk menampilkan kosa kata dan contoh kalimat:
          </Text>
          <TouchableOpacity style={globalStyles.addButtons2} onPress={()=>this.props.navigation.navigate("Vocab", {userkey:this.props.navigation.state.params.userkey})}>
            <Text>Kosa Kata</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.addButtons2} onPress={()=>this.props.navigation.navigate("Sentences", {userkey:this.props.navigation.state.params.userkey})}>
              <Text>Contoh Kalimat</Text>
          </TouchableOpacity>
        </View>

         <View style={styles.grammartitle2}>
          <Text style={styles.grammar}>
            Sudah paham? Yuk uji pemahaman mu dengan kuis
          </Text>
          <TouchableOpacity style={globalStyles.addButtons2} onPress={()=>this.props.navigation.navigate("Quizzes")}>
              <Text>Kerjakan Kuis</Text>
          </TouchableOpacity>
        </View>
        
       </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  inputGroup: {
    // flex: 1,
    padding: 5,
    marginHorizontal:10,
    marginVertical: 15,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  },
  title:{
    // padding: 5,
    // marginTop: 15,
    // marginHorizontal:10,
    fontWeight:'bold',
    fontSize:26,
    marginBottom:10,
    color: "#345c74"
  },
  subtitle:{
    fontSize: 15,
    fontWeight:'bold',
    color: "#345c74"
    // borderBottomWidth:1
  },
  grammar: {
    // flex: 1,
    color: "#345c74",
    // border
  },
  grammartitle: {
    // flex: 1,
    padding: 5,
    // marginVertical: 15,
    marginHorizontal:10,
    // color: "#345c74"
    // fontweight:'bold'
  },
  grammartitle2: {
    // flex: 1,
    padding: 5,
    // marginVertical: 15,
    marginHorizontal:10,
    marginTop: 10,
    // color: "#345c74"
    // fontweight:'bold'
  },
})

export default Lesson;