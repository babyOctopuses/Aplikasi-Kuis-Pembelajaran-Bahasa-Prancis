import React, {Component} from 'react'
import {FlatList,Button,  View,Text,ImageBackground,TouchableOpacity,Image} from 'react-native'
import {ScrollView,TextInput} from 'react-native-gesture-handler'
import firebase from '../../routes/firebase';
import {globalStyles} from '../../constants/globalStyle'
import {MaterialIcons} from '@expo/vector-icons'
import {Modalize} from 'react-native-modalize'

export default class QuizHome extends Component{
    
    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection('Quiz');
        this.state = {
          isLoading: true,
          level:'',
          userArr: []
        };
      }
    
      componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
        console.log("unsubscribe: ",this.unsubscribe);
      }
    
      componentWillUnmount(){
        this.unsubscribe();
      }
    
      getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
          const { title, Quiz, desc } = res.data();
          userArr.push({
            key: res.id,
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
        source={require('../../assets/images/crs.png')}
        style={globalStyles.ImageDimension}
    >
        {/* <ScrollView> */}
            <View style={globalStyles.scrollView}>
                <View style={globalStyles.burgerContainer}>
                <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer("Home")}
                    }>
                    <MaterialIcons name='menu' size={18} style={globalStyles.burger}/>
                </TouchableOpacity>
            </View>
                       {/*hamburger icon above*/}                  
                   </View>
                   <View style={globalStyles.center}>
                        <Text style={{
                            paddingHorizontal:20,
                            fontSize:35,
                            marginTop:-30,
                            color:"#FFF",
                        }}>
                            Choose your level
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
                        <TouchableOpacity 
                        style={globalStyles.itemContainer}
                        onPress={()=>{
                            this.state.level='Easy'
                            this.props.navigation.navigate('Quiz',{userkey:this.props.navigation.state.params.userkey, level:this.state.level}, )    
                        // console.log("key", this.props.navigation.state.params.userkey);
                        // console.log("level:", this.state.level)
                        }}
                        >
                            <Text style={globalStyles.leveltitle}>Easy</Text>
                            <Text style={globalStyles.levelsubtitle}>
                                Kerjakan 10 soal pilihan ganda translation dapatkan hingga 10 EXP. Cocok untuk anda baru mulai belajar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={globalStyles.itemContainer}
                        onPress={()=>{
                            this.state.level='Medium'
                            this.props.navigation.navigate('Quiz',{userkey:this.props.navigation.state.params.userkey, level:this.state.level} )
                        console.log("key", this.props.navigation.state.params.userkey)
                        console.log("level:", this.state.level)
                        }}
                        >
                            <Text style={globalStyles.leveltitle}>Medium</Text>
                            <Text style={globalStyles.levelsubtitle}>
                                Kerjakan 20 soal pilihan ganda translation dan beberapa kosa kata dapatkan hingga 20 EXP. Cocok untuk anda yang ingin menjadikan belajar bahasa Prancis rutinitas.
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={globalStyles.itemContainer}
                        onPress={()=>{
                            this.state.level='Hard'
                            this.props.navigation.navigate('Quiz',{userkey:this.props.navigation.state.params.userkey, level:this.state.level})
                            console.log("key", this.props.navigation.state.params.userkey)
                            console.log("level:", this.state.level)
                        }}
                        >
                            <Text style={globalStyles.leveltitle}>Hard</Text>
                            <Text style={globalStyles.levelsubtitle}>
                                Kerjakan 30 soal pilihan ganda translation, kosa kata dan grammar dan Raih hingga 30 EXP. Tekad untuk lulus DELF sudah kuat? Yuk Kerjakan Level Hard setiap hari.
                            </Text>
                        </TouchableOpacity>    
                </ScrollView>
                </View>
                </Modalize>
        {/* </ScrollView> */}
    </ImageBackground>
        )}
    }