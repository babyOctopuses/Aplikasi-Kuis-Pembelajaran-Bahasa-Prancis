// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { TouchableOpacity, FlatList, Alert, Button, StyleSheet,Text, TextInput, ScrollView, ActivityIndicator, View, ImageBackground } from 'react-native';
import firebase from '../../routes/firebase';
import {MaterialIcons} from '@expo/vector-icons'
import {FontAwesome} from '@expo/vector-icons'

class EditQHard extends Component {

  constructor() {
    super();
    // const [modalOpen, setModalOpen]= useState(false);
    this.dbRef = firebase.firestore().collection('Quiz')
    this.state = {
      modalVisible: false,
      title: '',
      desc: '',
      explanation:'',
      answer:'',
      Easy:[''],
      Medium:[''],
      Hard:[''],
      number:0,
      lesson:'',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('Quiz').doc(this.props.navigation.state.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          title: user.title,
          desc: user.desc,
          explanation: user.explanation,
          Easy: [user.Easy],
          Medium: [user.Medium],
          Hard:[user.Hard],
          number:0,
          lesson:'',
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    })
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
    console.log("this.setState", state)
  }
  
  inputValueUpdateVocab = (val, index, prop) => {
    const state = this.state.Hard[0];
    state[index][prop]=val;
    this.setState(state);  
  }

  inputValueUpdateVocab3 = (val, index, prop, ind) => {
    const state = this.state.Hard[0];
    console.log("state:", state[index])
    state[index][prop][ind]=val;
    console.log("val",val)
    console.log("state:", state[index])
    console.log("state[index].prop:", state[index][prop])
    console.log("state[index].prop[ind]:", state[index][prop][ind])
    this.setState({state});  
  }

  updateQuiz(){
    this.setState({
      isLoading: true,
  });
    const updateDBRef = firebase.firestore().collection('Quiz').doc(this.state.key);
    updateDBRef.set({
      title: this.state.title,
      desc: this.state.desc,
      Easy:this.state.Easy[0],
      Medium:this.state.Medium[0],
      Hard:this.state.Hard[0],
      number:this.state.number,
      lesson:this.state.lesson,
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        desc: '',
        Easy:[''],
        Medium:[''],
        Hard:[''],
        number:0,
        lesson:'',
        isLoading: false,
      });
      alert('Data berhasil disimpan')
      this.componentDidMount()
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  addQuiz() {
    console.log("Quiz", this.state.Easy[0][0].Options[0])
    console.log("key", this.state)
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Quiz').doc(this.state.key);
    console.log('updateRef:',updateDBRef)    
    
    updateDBRef.set({      
      title: this.state.title,
      desc: this.state.desc,
      Medium:[...this.state.Medium[0]],
      Easy:[...this.state.Easy[0]],
      Hard:[{
        Question:'',
        correct_option:'',
        explanation:'',
        Options:['','','','']
      },...this.state.Hard[0]],
      number:this.state.number,
      lesson:this.state.lesson,
      // vocabulary:[{
      //   vocabulary:'',
      //   meaning:'',
      // },...this.state.vocabulary[0]],
    }
    // ,this.state.vocabulary[0]
  ).then((docRef) => {
      this.setState({
        vocabulary:[],
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
  
  deleteQuiz(){
    // console.log("delete1")
    const dbRef = firebase.firestore().collection('Quiz').doc(this.props.navigation.state.params.userkey)
    dbRef.delete().then((res) => {
          console.log('Item removed from database')
          alert('Data berhasil dihapus')
          this.props.navigation.navigate('EditHome');
      })
  }

  deleteQuestions(index){
    if(this.state.Hard[0].length==1){
      Alert.alert(
        'Delete User',
        'There must be at least 1 Question',
        [{text: 'Got it!'}]
      )
    }else if(this.state.Hard[0].length>1){  
    // console.log("filter", this.state.Quiz[0].filter(quizes => quizes.Question != this.state.Quiz[0][index].Question))

    this.setState({
      isLoading: true,
  });
    const updateDBRef = firebase.firestore().collection('Quiz').doc(this.state.key);
    updateDBRef.set({
      title: this.state.title,
      desc: this.state.desc,
      Hard:this.state.Hard[0].filter(quizes => quizes.Question != this.state.Hard[0][index].Question),
      Medium:[...this.state.Medium[0]],
      Easy:[...this.state.Easy[0]],
      number:this.state.number,
      lesson:this.state.lesson,
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        desc: '',
        Easy:[''],
        Medium:[''],
        Hard:[''],
        number:0,
        lesson:'',
        isLoading: false,
      });
      this.componentDidMount();
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
    }
  }  

  setAnswer(scoreNow){
    this.setState({ scoreNow: scoreNow });
  };

  openTwoButtonAlert= ()=>{
    console.log("delete");
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteQuiz()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        //cancelable: true 
      }
    );
    console.log("delete");
  }

 
  render() {
    // const { modalVisible } = this.state;
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <View  style={styles.container}>
      <ScrollView style={{flex:1}}>
      <View style={{padding: 35}}>
        {/* vocabulary modal */}
        <Text style={styles.vocabularyTitle}>
              Questions
        </Text>
        <TouchableOpacity>
        <MaterialIcons 
            name='add'
            size={18}
            onPress={()=>
            this.addQuiz()
            }
            style={styles.modalToggle}
        />
        </TouchableOpacity>
        
        <ScrollView> 
            <FlatList
                data={this.state.Hard[0]}
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
                    }}><View style={{
                          alignItems:'flex-end',
                          flexDirection:'column'
                        }}>            
                      <MaterialIcons 
                        name='delete'
                        size={20}
                        style={{
                          alignItems:'flex-end'
                        }}
                        // style={{...styles.modalToggle, ...styles.modalClose}}
                        onPress={()=> 
                        this.deleteQuestions(index)
                        }
                      />
                  </View>
                  <View style={styles.space}>
                  
                      <Text style={styles.title}>
                        Pertanyaan: 
                      </Text>
                      <TextInput 
                        multiline={true}
                        numberOfLines={3}
                        style={{paddingLeft:5}}
                        placeholder='Question'
                        value={item.Question}
                        onChangeText={(val) => this.inputValueUpdateVocab(val, index, 'Question')}  
                      />
                  </View>
                  <View style={styles.space}>
                    <Text style={styles.title}>
                      Jawaban: 
                    </Text>
                    <Text
                    // Input 
                    // multiline={true}
                    // numberOfLines={2}
                    // placeholder='Correct_Answer'
                    // style={{paddingLeft:5}} 
                    // value={item.correct_option}
                    // onChangeText={(val)=>this.inputValueUpdateVocab(val, index, 'correct_option')}  
                    >
                    {item.correct_option}
                    </Text> 
                  </View>
                  <View style={styles.space}>
                  <Text style={styles.title}>
                    Penjelasan: 
                  </Text>
                  <TextInput 
                    multiline={true}
                    numberOfLines={5}
                    style={{paddingLeft:5, alignItems:'flex-start'}}
                    placeholder='explanation'
                    value={item.explanation}
                    onChangeText={(val)=>this.inputValueUpdateVocab(val, index, 'explanation')}  
                  />
                  </View>
                  <ScrollView>
                  <Text style={styles.title}>Pilihan:</Text>
                    {item.Options.map((items, ind)=>(
                      
                      <View key={items.key} style={{flexDirection:'row', alignItems:'center'}}>                       
                      <FontAwesome name='circle-o' color= '#444' size={20} onPress={()=>{
                        const state = this.state.Hard[0];
                        console.log("items", items)
                        state[index]['correct_option']=items
                        this.setState(state)
                      }}

                        />
                        <TextInput
                          placeholder='Options'
                          style={{paddingLeft:5}}
                          value={items}
                          onChangeText={(val)=>this.inputValueUpdateVocab3(val, index, 'Options', ind)}  
                        />
                      </View>
                      )
                    )}
                  </ScrollView>
                  </View>
                </View>
          )}/>
        </ScrollView>
        
        <View style={styles.button}>
          <Button
            title='Save'
            onPress={() => this.updateQuiz()} 
            color="#EA2D52"
          />
        </View>
        <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#1F37DD"
          />
        </View>
        </View>
      </ScrollView>
      </View>
    );
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

export default EditQHard;