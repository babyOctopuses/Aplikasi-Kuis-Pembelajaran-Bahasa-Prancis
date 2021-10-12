import React, {Component} from 'react'
import {Button, FlatList, View,Text,ImageBackground,TouchableOpacity,Image, StyleSheet} from 'react-native'
import {ScrollView,TextInput} from 'react-native-gesture-handler'
import firebase from '../../routes/firebase';
import {globalStyles} from '../../constants/globalStyle'
import {MaterialIcons} from '@expo/vector-icons'

export default class Home extends Component{
        
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

    render(){
    return(
    <ImageBackground
        source={require('../../assets/images/Home.png')}
        style={globalStyles.ImageDimension}
    >
        <View style={globalStyles.scrollView}>
                       <View style={globalStyles.burgerContainer}>
                       <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer("Home")}}>
                       <MaterialIcons name='menu' size={18} style={globalStyles.burger}/>
                           {/* <Image
                            source={require('../../assets/images/hum.png')}
                            style={globalStyles.burger}
                           /> */}
                        </TouchableOpacity>
                       </View>
                       {/*hamburger icon above*/}
                   
        </View>
        <View style={{marginTop:10}}>
                   
                   {/* <Text style={globalStyles.intro}>
                       Hi, Apa yang ingin kamu pelajari hari ini?
                   </Text>
                   
                   <Text style={globalStyles.mainTitle}>
                       Lessons
                   </Text> */}
        </View>
        {/* start test */}
        <Text style={{
                       paddingHorizontal:20,
                       fontSize:35,
                    //    paddingTop:40,
                       fontFamily:"Bold",
                       color:"#FFF"
                   }}>
                       Welcome back
                   </Text>
        <Text style={{
            paddingHorizontal:20,
            fontSize:35,
        //    paddingTop:40,
            fontFamily:"Bold",
            color:"#FFF"
        }}>
            {this.state.name}
        </Text>
        <View style={{
                       flexDirection:"row",
                       backgroundColor:"#FFF2F2",
                       marginTop:15,
                       marginHorizontal:20,
                       borderRadius:20,
                       paddingVertical:30,
                       paddingLeft:30
                   }}>
                       <View>
                           <Text style={{
                               color:"#345c74",
                               fontSize:20,
                               fontFamily:"Bold",
                               width:250,
                               paddingRight:100 
                           }}>
                               Yuk lanjut belajar Bahasa Prancisnya
                           </Text>
                           <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Lessons')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"#f58084",
                                    alignItems:"center",
                                    marginTop:20,
                                    width:150,
                                    paddingVertical:10,
                                    borderRadius:14,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Text style={{
                                        color:"#FFF",
                                        fontFamily:"Bold",
                                        fontSize:12
                                    }}>Belajar</Text>  
                                    <Image
                                        source={require('../../assets/images/a3.png')}
                                        style={{marginLeft:20,width:8,height:8}}
                                    />
                           </TouchableOpacity>
                       </View>
                       <Image
                            source={require('../../assets/images/undraw.png')}
                            style={{marginLeft:-80,marginTop:35}}
                       />
                   </View>
                   
                   <View style={{
                       flexDirection:"row",
                       backgroundColor:"#FFF2F2",
                       marginTop:15,
                       marginHorizontal:20,
                       borderRadius:20,
                       paddingVertical:30,
                       paddingLeft:30
                   }}>
                       <View>
                           <Text style={{
                               color:"#345c74",
                               fontSize:20,
                               fontFamily:"Bold",
                               width:250,
                               paddingRight:100 
                           }}>
                               Udah yakin bisa? Nih cobain kuisnya
                           </Text>
                           <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Quizzes')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"#f58084",
                                    alignItems:"center",
                                    marginTop:20,
                                    width:150,
                                    paddingVertical:10,
                                    borderRadius:14,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Text style={{
                                        color:"#FFF",
                                        fontWeight:"Bold",
                                        fontSize:12
                                    }}>Kerjakan Kuis</Text>  
                                    <Image
                                        source={require('../../assets/images/a3.png')}
                                        style={{marginLeft:20,width:8,height:8}}
                                    />
                           </TouchableOpacity>
                       </View>
                       {/* <View style={{width:30,height:30}}> */}
                        <Image
                                source={require('../../assets/images/undraw_quiz_nlyh.png')}
                                style={{marginLeft:-80,marginTop:35, width:130,height:90}}
                        />
                       {/* </View> */}

                   </View>
        {/* end test */}

        {/* <ScrollView>
            <View>
                <ScrollView>
                    <FlatList
                    data={this.state.userArr}
                    renderItem={({item})=>(
                    <TouchableOpacity 
                    style={globalStyles.itemContainer}
                    onPress={()=>{this.props.navigation.navigate('Lesson');
                    }}>
                            <Text style={globalStyles.title}>
                                {item.title}
                            </Text>
                            <Text style={globalStyles.subtitle}>
                                {item.desc}
                            </Text>
                            </TouchableOpacity>
                        )}
                        />
                </ScrollView>     

        
        </View>
        </ScrollView> */}
     </ImageBackground>
        )}
    }