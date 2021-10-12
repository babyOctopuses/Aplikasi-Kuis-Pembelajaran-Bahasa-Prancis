// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { TouchableOpacity, FlatList, Alert, Button, StyleSheet,Text, TextInput, ScrollView, ActivityIndicator, View, ImageBackground } from 'react-native';
import firebase from '../routes/firebase';
import {MaterialIcons} from '@expo/vector-icons'
import {FontAwesome} from '@expo/vector-icons'

class Dates extends Component {

  constructor() {
    super();
    // const [modalOpen, setModalOpen]= useState(false);
    this.dbRef = firebase.firestore().collection('Userss')
    this.state = {
      modalVisible: false,
      xp:'',
      user:'',
      Total:[''],
      isLoading: true,
    };
  }
 
  componentDidMount() {
    //   const fire=firebase.auth().currentUser.uid;
    const dbRef = firebase.firestore().collection('Userss').doc('AnAG8L7VeYC8yPVBlXtb')
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          user: user.user,
          xp:user.xp,
          Scores: [user.Total],
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
    const date= new Date();
    const year= date.getFullYear();
    const month= date.getMonth()
    const day= date.getDate();
    const today= day+"/"+month+"/"+year;

    console.log("date:", date, year, month, day, today);
    const updateDBRef = firebase.firestore().collection('Userss').doc('AnAG8L7VeYC8yPVBlXtb')
    updateDBRef.set({      
      xp:12,
      user:'andi',
      Total:[{
        date: today,
        score:6,
        status:'passed',
        quiz:'lesson 1'
      },
      ...this.state.Total[0],
    ]
    }
    // this.state.vocabulary[0]
  ).then((docRef) => {
    this.setState({
        Scores:[],
        isLoading: false,
      });
      this.componentDidMount();
      // this.props.navigation.navigate('Test', {userkey:updateDBRef});
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });   
   }
 
  render() {
    // const { modalVisible } = this.state;
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }else{
    return (
      <View  style={styles.container}>
      <ScrollView style={{flex:1}}>
      <View style={{padding: 35}}>
        <View style={styles.inputGroup}>
          <Text>{this.state.user}</Text>
        </View>
        <Button title="press" onPress={()=>{console.log(this.state)}}/>
        <Text style={styles.vocabularyTitle}>
              Results
        </Text>
        
        {/* add button */}
        {/* <TouchableOpacity>
        <MaterialIcons 
            name='add'
            size={18}
            onPress={()=>
            this.addVocab()
            }
            style={styles.modalToggle}
        />
        </TouchableOpacity> */}
        
        <ScrollView> 
            <FlatList
                data={this.state.Scores[0]}
                renderItem={({item, index})=>(
                <View style={styles.flatlist}>
                  <View 
                    style={{
                      backgroundColor:'#fff',
                      padding:20,
                      width:'100%',
                      borderRadius:20,
                      marginTop:10,
                      shadowColor: "#444",
                      shadowRadius: 3,
                    }}>
                    <Text>{item.score}</Text>
                                    
                  {/* <ScrollView>
                  <Text style={styles.title}>Results:</Text>
                    {item.map((items, ind)=>(
                      <View key={items.key}>                       
                        <Text>{items.date}</Text> */}

                        {/*codes below are not working*/}
                        {/* <TextInput
                          placeholder='Options'
                        //   style={{paddingLeft:5}}
                          value={items.Scores}   
                        /> */}
                        {/*return the array of the items*/}
                        {/* <FlatList
                        data={items.Scores}
                        renderItem={({itemz, index})=>(
                            <View style={styles.flatlist}>
                            <Button onPress={()=>{console.log("itemz", itemz)}}/>
                                <Text>{itemz.score}}</Text>
                                </View>
                        )}/> */}
                        {/* <View style={{flexDirection:'row', alignItems:'center', borderBottomWidth:1}}>
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
                    )}
                  </ScrollView> */}


                  </View>
                </View>
          )}/>
          {/*until*/}
        </ScrollView>
        
        {/* <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateUser()} 
            color="#19AC52"
          />
        </View>
        <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View> */}
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
    //backgroundColor:'#fff',
    paddingVertical: 3,
    marginHorizontal:5,
    alignItems:"flex-start",
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

export default Dates;

// import React, {Component} from 'react'
// import {Modal, StyleSheet, FlatList, View, Text, ImageBackground, TouchableOpacity, Image, Button} from 'react-native'
// import {ScrollView,TextInput} from 'react-native-gesture-handler'
// import firebase from '../routes/firebase';

// export default class Dates extends Component{
    
//     constructor() {
//         super();
//         // const [modalOpen, setModalOpen]= useState(false);
//         this.dbRef = firebase.firestore().collection('Userss')
//         this.state = {
//           Scores:[''],
//           isLoading: true
//         };
//       }
     
//       componentDidMount() {
//         const dbRef = firebase.firestore().collection('Userss').doc('FAUzppb0GD0nzNnggYsC');
//         dbRef.get().then((res) => {
//           if (res.exists) {
//             const user = res.data();
//             console.log("user", user)
//             this.setState({
//               Scores: [user.Scores],
//               isLoading: false
//             });
//           } else {
//             console.log("Document does not exist!");
//           }
//         })
//       }
      
      
//     render(){
//         const renderDate=(dateitem)=>{
//             const dates= dateitem;
//             console.log("dates", dates)
//             return(
//                 <Text>{[dates]}</Text>
//             )
//           }

//           const prints=(item)=>{
//             console.log("item", item)
//           }
//         return(
//     <View>
//     <View style={{flex:1}}>
//         <ScrollView>       
//                    <Text style={{
//                        color:"#345c74",
//                         //    fontFamily:"Bold",
//                        fontSize:20,
//                        paddingHorizontal:20,
//                        marginTop:20,
//                        marginBottom:10
//                    }}>
//                        Lessons
//                    </Text>
//                    <Button title='press' onPress={()=>{console.log("state",this.state)}}/>
//                 {/* <ScrollView>
//                     <FlatList
//                         data={this.state.Scores[0][0]}
//                         renderItem={({item})=>{
//                             <ScrollView>
//                                 <TouchableOpacity style={{backgroundColor:'pink'}}>
//                                     <Text>
//                                         test
//                                     </Text>
//                                 </TouchableOpacity>
//                             </ScrollView>
//                         }}
//                     />
//                 </ScrollView> */}
                
//                 <ScrollView>
//                     <FlatList
//                         // horizontal={true}
//                         data={this.state.Scores[0]}
//                         renderItem={({item, index})=>(
//                         <TouchableOpacity 
//                         style={{
//                             //flexDirection:"row",
//                             backgroundColor:'#fff',
//                             padding:20,
//                             marginHorizontal:20,
//                             borderRadius:20,
//                             alignItems:"flex-start",
//                             marginTop:10,
//                             shadowColor: "#444",
//                             shadowRadius: 3,
//                         }}
//                         onPress={()=>{console.log("item", item)}}
//                     >
//                     <TouchableOpacity
//                         onPress={()=>{console.log("item", item.scores)}}
//                     >
//                         <Text>{item.date}</Text>
//                     </TouchableOpacity>
                    
//                     <FlatList
//                     data={item.scores}
//                     renderItem={({items, ind})=>(                
//                       <View>                       
//                         <View style={{flex:1,flexDirection:'row', justfyItems:'space-around'}}>
//                             <Text>Quiz</Text> 
//                             <Text>Score</Text>
//                             <Text>Status</Text>
//                         </View>
//                         <Button onPress={()=>{console.log("items", items)}}/>                   
//                         {/* <View style={{flex:1,flexDirection:'row', justifyContent:'space-around'}}>
//                                 <Text>{items.quiz}</Text>
//                                 <Text>{items.score}</Text>
//                                 <Text>{items.status}</Text>
//                         </View> */}
//                         {/* {items.scores.map((itemz, indx)=>(                
//                         <View key={itemz.key}>                       
//                             <View style={{flexDirection:'row'}}>
//                                 <Text style={{marginRight:10}}>{itemz.quiz}</Text>
//                                 <Text style={{marginRight:10}}>{itemz.score}</Text>
//                                 <Text style={{marginRight:10}}>{itemz.status}</Text>
//                             </View>
//                         </View>
//                         )
//                     )} */}
//                       </View>
//                       )
//                     }/>
//                     </TouchableOpacity>
//                             )}
//                         />
//                 </ScrollView>                  
//         </ScrollView>        
//         </View>
//     </View>
//         )}
//     }



// const styles = StyleSheet.create({
//     container:{
//       margin: 20,
//       paddingVertical: 20,
//       justifyContent:'center',
//       alignItems: 'center',
//       flex:1,
//       backgroundColor: '#fff',
//     }
//   })