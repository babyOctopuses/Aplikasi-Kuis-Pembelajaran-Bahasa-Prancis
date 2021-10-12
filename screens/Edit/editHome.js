import React, {Component} from 'react'
import {Modal, StyleSheet, FlatList, View, Text, ImageBackground, TouchableOpacity, Image, Button} from 'react-native'
import {ScrollView,TextInput} from 'react-native-gesture-handler'
import firebase from '../../routes/firebase';
import {globalStyles} from '../../constants/globalStyle'
import {MaterialIcons} from '@expo/vector-icons'

export default class EditHome extends Component{
    
    constructor() {
        super();
        this.firestoreLessonRef = firebase.firestore().collection('Lessons');
        this.firestoreQuizRef = firebase.firestore().collection('Quiz').orderBy("number", "asc");
        this.state = {
        isLoading: true,
        userArr: []
        };
      }
    
      componentDidMount() {
        this.unsubscribeLesson = this.firestoreLessonRef.onSnapshot(this.getCollectionLesson);
        this.unsubscribeQuiz = this.firestoreQuizRef.onSnapshot(this.getCollectionQuiz);
        // console.log("unsubscribe: ",this.unsubscribe);
      }
    
      componentWillUnmount(){
        this.unsubscribeLesson();
        this.unsubscribeQuiz();
      }

      setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    
      getCollectionLesson = (querySnapshot) => {
        const lessonArr = [];
        querySnapshot.forEach((res) => {
          const { title, desc, grammar, lesson } = res.data();
          lessonArr.push({
            key: res.id,
            res,
            title,
            desc,
            grammar,
            lesson,
          });
        });
        this.setState({
          lessonArr,
          isLoading: false,
       });
      }

      getCollectionQuiz = (querySnapshot) => {
        const quizArr = [];
        querySnapshot.forEach((res) => {
          const { title, Quiz, desc, lesson } = res.data();
          quizArr.push({
            key: res.id,
            res,
            title,
            desc,
            lesson,
            Quiz
          });
        });
        this.setState({
          quizArr,
          isLoading: false,
       });
      }

    render(){
        const { modalVisible } = this.state;
        return(
    <ImageBackground
        source={require('../../assets/images/mainbg.png')}
        style={globalStyles.ImageDimension}
    >
    <View style={{flex:1}}>
        <View>
            <View style={globalStyles.scrollView}>
                    <View style={globalStyles.burgerContainer}>
                       <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer("Cources")}
                           }>
                           <MaterialIcons name='menu' size={20} style={globalStyles.burger}/>
                           {/* <Image
                            source={require('../../assets/images/hum.png')}
                            style={globalStyles.burger}
                           /> */}
                        </TouchableOpacity>
                       </View>
                       {/*hamburger icon above*/}
            </View>
                   <View style={globalStyles.center}>
                   <Text style={globalStyles.mainTitle}>
                       Lessons
                   </Text>
                   </View>
                <ScrollView>
                    <FlatList
                        horizontal={true}
                        data={this.state.lessonArr}
                        renderItem={({item})=>(
                        <TouchableOpacity 
                        style={globalStyles.itemContainerEdit}
                        onPress={()=>{this.props.navigation.navigate('EditLesson', {userkey:item.key}); console.log("item", item)}}
                    >
                        <Text style={globalStyles.subtitle}>
                            {item.lesson}
                        </Text>
                        <Text style={globalStyles.title}>
                            {item.title}
                        </Text>
                            </TouchableOpacity>
                            )}
                        />
                </ScrollView>
                
                <TouchableOpacity
                style={globalStyles.itemContainer}
                onPress={()=>{this.props.navigation.navigate('AddLesson')}}
                >                    
                    <Text style={globalStyles.subtitle}>
                        Add Lesson
                    </Text>    

                </TouchableOpacity>                   
        </View>

        <ScrollView>
        <View style={globalStyles.center}>
                   <Text style={globalStyles.mainTitle}>
                       Quiz
                   </Text>
        </View>           
                <ScrollView>
                    <FlatList
                        horizontal={true}
                        data={this.state.quizArr}
                        renderItem={({item})=>(
                        <TouchableOpacity 
                        style={globalStyles.itemContainer}
                        onPress={()=>{this.props.navigation.navigate('EditQuiz', {userkey:item.key});}}
                    >
                        <Text style={globalStyles.subtitle}>{item.lesson}</Text>
                        <Text style={globalStyles.title}>{item.title}</Text>
                        <Text style={globalStyles.subtitle}>{item.desc}</Text>
                    </TouchableOpacity>
                            )}
                        />
                </ScrollView>
                
                <TouchableOpacity
                style={globalStyles.itemContainer}
                onPress={()=>{this.props.navigation.navigate('AddQuiz')}}
                >                    
                    <Text style={globalStyles.subtitle}>
                        Add Quiz
                    </Text>    
                </TouchableOpacity>                   
        </ScrollView>
        </View>
    </ImageBackground>
        )}
    }



// import React, { Component } from 'react'
// import { Button, Text, StyleSheet, View } from 'react-native'
// import {MaterialIcons} from '@expo/vector-icons'



// export default function Home({navigation}){
    
//     const openMenu =()=>{
//         navigation.openDrawer({navigation});
//     }

//         return (
//             <View style={styles.container}>
//                 <Text> Home </Text>
//                 <MaterialIcons name='menu' size={28} onPress={openMenu} />
//                 <Button title='click me' onPress={()=>{this.props.navigation.navigate('About')}}/>
//             </View>
//         )
    
// }

const styles = StyleSheet.create({
    container:{
      margin: 20,
      paddingVertical: 20,
      justifyContent:'center',
      alignItems: 'center',
      flex:1,
      backgroundColor: '#fff',
    }
  })