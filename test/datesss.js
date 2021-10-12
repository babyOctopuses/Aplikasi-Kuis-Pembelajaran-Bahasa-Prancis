// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { TouchableOpacity, FlatList, Alert, Button, StyleSheet,Text, TextInput, ScrollView, ActivityIndicator, View, ImageBackground } from 'react-native';
import firebase from '../routes/firebase';
import {MaterialIcons} from '@expo/vector-icons'
import {FontAwesome} from '@expo/vector-icons'

class Datesss extends Component {

  constructor() {
    super();
    // const [modalOpen, setModalOpen]= useState(false);
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
  //   });
  //   const date= new Date();
  //   const year= date.getFullYear();
  //   const month= date.getMonth()
  //   const day= date.getDate();
  //   const today= day+"/"+(month+1)+"/"+year;
  //   console.log("date:", date, year, month, day, today);

  //   const fire=firebase.auth().currentUser.uid;
  //   const updateDBRef = firebase.firestore().collection('users').doc(fire)
  //   updateDBRef.set({      
  //       email: this.state.email,
  //       name: this.state.name,
  //       status: this.state.status,
  //       uid: this.state.uid,
  //       xp: this.state.xp+6,
  //       scores:[{
  //           date: today,
  //           score:6,
  //           status:'passed',
  //           quiz:'lesson 1'
  //       },
  //       ...this.state.scores[0]
  //     ]
      
  //     // ...this.state.Scores,
    
  //   }
  //   // this.state.vocabulary[0]
  // ).then((docRef) => {
  //   this.setState({
  //       email:'',
  //       name:'',
  //       status:'',
  //       uid:'',
  //       xp:'',
  //       scores:[''],
  //       isLoading: false,
  //     });
      // this.props.navigation.navigate('Test', {userkey:updateDBRef});
    // })
    // .catch((error) => {
    //   console.error("Error: ", error);
    //   this.setState({
    //     isLoading: false,
    //   });
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
      <View  style={styles.container}>
      {reLoad()}
      <ScrollView style={{flex:1}}>
      <View style={{padding: 35}}>
        <View style={styles.inputGroup}>
          <Text>{this.state.name}</Text>
          <Text>{this.state.xp}</Text>
        </View>
        <Button title="press" onPress={()=>{this.addVocab()}}/>
        <Text style={styles.vocabularyTitle}>
              Results
        </Text>

        {/* add button */}
        
        <ScrollView> 
            <View style={{flexDirection:'row', alignItems:'center', borderBottomWidth:1}}>
                                <Text style={{paddingRight: 40, paddingLeft: 15}}>Quiz</Text>
                                <Text style={{paddingHorizontal: 15}}>Score</Text>
                                <Text style={{paddingHorizontal: 15}}>Status</Text> 
                                <Text style={{paddingHorizontal: 15}}>Date</Text>  
            </View>
            <FlatList
                data={this.state.scores[0]}
                renderItem={({item, index})=>(
                <View style={styles.flatlist}>
                  {/* <View 
                    style={{
                      backgroundColor:'#fff',
                      padding:20,
                      width:'100%',
                      borderRadius:20,
                      marginTop:10,
                      shadowColor: "#444",
                      shadowRadius: 3,
                    }}> */}
                <View style={{backgroundColor:'white'}}>          
                  <ScrollView>
                    
                    <View style={{flexDirection:'row', alignItems:'center'}}>                       
                                    <Text style={{paddingRight: 40 , paddingLeft: 15}}>{item.quiz}</Text>
                                    <Text style={{paddingHorizontal: 15}}>{item.score}</Text>
                                    <Text style={{paddingHorizontal: 15}}>{item.status}</Text>
                                    <Text style={{paddingHorizontal: 15}}>{item.date}</Text>
                    </View>
                  
                  
                    {/* {item.map((items, ind)=>(
                      <View key={items.key}>                       
                        <Text>{items.date}</Text>

                        <View style={{flexDirection:'row', alignItems:'center', borderBottomWidth:1}}>
                            <Text style={{paddingRight: 40, paddingLeft: 15}}>Quiz</Text>
                            <Text style={{paddingHorizontal: 15}}>Score</Text>
                            <Text style={{paddingHorizontal: 15}}>Status</Text>  
                        </View>
                        
                        {items.scores.map((itemz, ind)=>(
                            <View>                            
                            <View key={itemz.key} style={{flexDirection:'row', alignItems:'center'}}>                       
                                <Text style={{paddingRight: 40 , paddingLeft: 15}}>{itemz.quiz}</Text>
                                <Text style={{paddingHorizontal: 15}}>{itemz.score}</Text>
                                <Text style={{paddingHorizontal: 15}}>{itemz.status}</Text>
                            </View>
                            </View>
                            )
                        )}  
                      </View>
                      )
                    )} */}
                  </ScrollView>
                  </View>
                  {/* </View> */}
                </View>
          )}/>
        </ScrollView>
        
       </View>
      </ScrollView>
      </View>
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
    marginBottom: 15,
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

export default Datesss;
