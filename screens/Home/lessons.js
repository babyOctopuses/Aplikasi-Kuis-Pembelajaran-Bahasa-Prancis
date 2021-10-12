import React, {Component} from 'react'
import {Button, FlatList, View,Text,ImageBackground,TouchableOpacity,Image, StyleSheet} from 'react-native'
import {ScrollView,TextInput} from 'react-native-gesture-handler'
import firebase from '../../routes/firebase';
import {globalStyles} from '../../constants/globalStyle'
import {MaterialIcons} from '@expo/vector-icons'
import {Modalize} from 'react-native-modalize'

export default class Lessons extends Component{
    
    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection('Lessons').orderBy("number", "asc");
        this.state = {
          isLoading: true,
          userArr: []
        };
      }
    
      componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
        // console.log("firebase.auth.uid", firebase.auth().currentUser.uid)
        console.log("unsubscribe: ",this.unsubscribe);
      }
    
      componentWillUnmount(){
        this.unsubscribe();
      }
    
      getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
          const { title, desc, grammar, vocabulary, lesson } = res.data();
          userArr.push({
            key: res.id,
            res,
            title,
            desc,
            grammar,
            vocabulary,
            lesson,
          });
        });
        this.setState({
          userArr,
          isLoading: false,
       });
      }

    render(){
    return(
    <ImageBackground
        source={require('../../assets/images/cat.png')}
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
        
        {/* <ScrollView> */}
        <View style={globalStyles.center}>
            <Text style={{
                paddingHorizontal:20,
                fontSize:35,
                marginTop:-40,
                fontFamily:"Bold",
                color:"#FFF",
            }}>
                Lessons
            </Text>
        </View>

        <Modalize
                    handleStyle={{
                        marginTop:30,
                        backgroundColor:"#e9e9e9",
                        width:80
                    }}
                    modalStyle={{
                        borderTopLeftRadius:60,
                        borderTopRightRadius:60
                    }}
                    alwaysOpen={500}
                    scrollViewProps={{showsVerticalScrollIndicator:false}}
        >
            <View style={{marginTop:40}}>
                <ScrollView>
                    <FlatList
                    data={this.state.userArr}
                    renderItem={({item})=>(
                    <TouchableOpacity 
                    style={globalStyles.itemContainer}
                    onPress={()=>{this.props.navigation.navigate('Lesson', {userkey:item.key});
                    }}>
                            <Text style={globalStyles.subtitle}>
                                {item.lesson}
                            </Text>
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
        {/* </ScrollView> */}
        </Modalize>
     </ImageBackground>
        )}
    }