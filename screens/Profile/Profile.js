// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { TouchableOpacity, FlatList, Alert,
  Button, StyleSheet,Text, TextInput, ScrollView, ActivityIndicator, View, ImageBackground } from 'react-native';
import firebase from '../../routes/firebase';
import {MaterialIcons} from '@expo/vector-icons'
import {FontAwesome} from '@expo/vector-icons'
import {globalStyles} from '../../constants/globalStyle';

class Profile extends Component {

  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Userss')
    this.state = {
      modalVisible: false,
      email:'',
      name:'',
      status:'',
      uid:'',
      xp:'',
      scores:[''],
      isLoading: true,
    };
  }
 
  componentDidMount() {
    const fire=firebase.auth().currentUser.uid;
    const dbRef = firebase.firestore().collection('users').doc(fire)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        console.log("user", user)
        this.setState({
          email:user.email,
          name:user.name,
          status:user.status,
          uid:user.uid,
          scores: [user.scores],
          xp:user.xp,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    })
  }

  addVocab() {
    this.setState({
      isLoading: true,
    });
    this.componentDidMount();   
   }
 
  render() {
    const reLoad=()=>{
      this.componentDidMount();   
    }
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }else{
    return (
      <ImageBackground
        source={require('../../assets/images/mainbg.png')}
        style={globalStyles.ImageDimension}
      >
      <View style={styles.container}>
        
        <View style={globalStyles.scrollView}>
          <View style={globalStyles.burgerContainer}>
              <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer("Home")}
                  }>
                  <MaterialIcons name='menu' size={18} style={globalStyles.burger}/>
              </TouchableOpacity>
          </View>
        </View>
      
      <ScrollView style={{flex:1}}>
        <View style={{paddingTop: 35, paddingHorizontal:10}}>
          <TouchableOpacity style={globalStyles.addButtons} onPress={()=>reLoad()}>
            <Text>Reload</Text>
          </TouchableOpacity>
          
          <View style={styles.inputGroup}>
            <Text fontSize={20}>Name: {this.state.name}</Text>
            <Text fontSize={20}>XP: {this.state.xp}</Text>
          </View>
          <Text style={styles.vocabularyTitle}>
                Results
          </Text>
          
           
              <View style={{flexDirection:'row', alignItems:'center', borderBottomWidth:1}}>
                  <Text style={{paddingRight: 40, paddingLeft: 15}}>Quiz</Text>
                  <Text style={{paddingHorizontal: 15}}>Score</Text>
                  {/* <Text style={{paddingHorizontal: 15}}>Status</Text>  */}
                  <Text style={{paddingHorizontal: 15}}>Date</Text>  
              </View>

          <ScrollView>
              <FlatList
                  data={this.state.scores[0]}
                  renderItem={({item, index})=>(
                  <View style={styles.flatlist}>
                  <View style={{backgroundColor:'white'}}>          
                    <ScrollView>
                      
                      <View style={{flexDirection:'row', alignItems:'center'}}>                       
                          <Text style={{paddingLeft: 15}}>{item.quiz}</Text>
                          <Text style={{paddingHorizontal: 15}}>{item.score}</Text>
                          {/* <Text style={{paddingHorizontal: 15}}>{item.status}</Text> */}
                          <Text style={{paddingHorizontal: 15}}>{item.date}</Text>
                      </View>
                    </ScrollView>
                    </View>
              </View>
            )}/>
          </ScrollView>
          
        </View>
      </ScrollView>
      </View>
      </ImageBackground>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalToggle:{
    marginBottom:10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center'
  },
  modalClose:{
    marginTop: 20,
    marginBottom: 0,
    alignItems: 'flex-end'
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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
    marginVertical: 5, 
  },
  choice:{
    padding: 10,
    marginTop: 20,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff8088',
    borderRadius: 7,
  },
  choiceText:{
    marginLeft: 10,
    fontSize: 17,
    justifyContent:'center',
    alignItems:'center',
    color: '#fff'
  },
  vocabularyTitle:{
    fontSize:18,
    color: "#345c74",
    marginHorizontal:10,
    marginVertical:10,
    fontWeight:'bold'
  },
  flatlist:{
    flexDirection:"row",
    backgroundColor:'#fff',
    paddingVertical: 5,
    marginHorizontal:5,
    alignItems:"flex-start",
    width:'100%'
  },
  flatlistVocab:{
    color:"#345c74",
    //  fontFamily:"Bold",
    fontSize:14,
    paddingHorizontal:10,
    width:130,
    borderBottomWidth:1,  
    borderColor: '#345c74'
  },
  modalView:{
    flexDirection: 'row',
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  modal:{
    justifyContent:'center',
    alignItems:'center'
  },
  modalToggle:{
    marginBottom:10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center'
  },
  modalClose:{
    marginTop: 20,
    marginBottom: 0
  },
  modalContent:{
    flex:0.5
  },
  edit:{
    flexDirection: 'row',
    alignItems:'center'
  },
  title:{
    fontSize:16,
    fontWeight:'bold',
    color:'#345c74',
    marginVertical: 2,
  },
  space:{
    borderBottomWidth:1,
    borderBottomColor: '#345c74',
    marginVertical:3,
  }

})

export default Profile;
