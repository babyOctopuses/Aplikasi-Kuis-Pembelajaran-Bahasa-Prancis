import React, { Component,useState } from 'react';
import {Modal, TouchableOpacity, FlatList,
        Text, Alert, Button, StyleSheet,
        TextInput, ScrollView, ActivityIndicator,
        View, ImageBackground
} from 'react-native';
import firebase from '../../routes/firebase';
import {MaterialIcons} from '@expo/vector-icons'
import {globalStyles} from '../../constants/globalStyle'

class EditLesson extends Component {

  constructor() {
    super();
    // const [modalOpen, setModalOpen]= useState(false);
    this.dbRef = firebase.firestore().collection('Lessons')
    this.state = {
      modalVisible: false,
      title: '',
      desc: '',
      vocabulary:[''],
      grammar: '',
      sentences:[''],
      number:0,
      lesson:'',
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
          sentences:[user.sentences],
          number: user.number,
          lesson:user.lesson,
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
    // console.log("this.setState", state)
  }
  
  inputValueUpdateVocab = (val, index, prop) => {
    const state = this.state.vocabulary[0];
    console.log("state:", state[index])
    state[index][prop]=val;
    console.log("state[index].prop:", state)
    this.setState({state});  
  }

  inputValueUpdateVocab2 = (val, prop) => {
    
    let state = this.state.vocabulary[0];
    if(state == undefined){
      this.state.vocabulary[0]=[{vocabulary:'', meaning:''}]
    }
    else{
      console.log("state:", state)
      state[prop]=val;
      console.log("state[index].prop:", state)
      this.setState({state});
    }   
  }

  inputValueUpdateSentences = (val, prop) => {
    
    let state = this.state.sentences[0];
    if(state == undefined){
      this.state.sentence[0]=[{sentence:'', meaning:''}]
    }
    else{
      // console.log("state:", state)
      state[prop]=val;
      // console.log("state[index].prop:", state)
      this.setState({state});
    }
     
  }


  updateLesson(){
    this.setState({
      isLoading: true,
  });
    console.log('updatedb', this.state.key);
    const updateDBRef = firebase.firestore().collection('Lessons').doc(this.state.key);
    updateDBRef.set({
      title: this.state.title,
      desc: this.state.desc,
      grammar: this.state.grammar,
      vocabulary: [...this.state.vocabulary[0]],
      sentences:[...this.state.sentences[0]],
      number:this.state.number,
      lesson:this.state.lesson,
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        desc: '',
        grammar: '',
        vocabulary:[''],
        sentences:[''],
        number:0,
        lesson:'',
        isLoading: false,
      });
      alert('Data berhasil disimpan')
      this.componentDidMount();
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  // updateVocab() {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const updateDBRef = firebase.firestore().collection('Lessons').doc(this.state.key);
  //   updateDBRef.add({
  //     vocabulary:'this.state.vocabulary[0]',
  //   }).then((docRef) => {
  //     this.setState({
  //       vocabulary:[],
  //       isLoading: false,
  //     });
  //     this.props.navigation.navigate('EditHome');
  //   })
  //   .catch((error) => {
  //     console.error("Error: ", error);
  //     this.setState({
  //       isLoading: false,
  //     });
  //   });
  // }

  addVocab() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Lessons').doc(this.state.key);
    updateDBRef.set({      
      title: this.state.title,
      desc: this.state.desc,
      grammar: this.state.grammar,
      vocabulary:[{
        vocabulary:'',
        meaning:'',
      },...this.state.vocabulary[0]],
    },this.state.vocabulary[0]
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
  
  deleteLesson(){
    // console.log("delete1")
    const dbRef = firebase.firestore().collection('Lessons').doc(this.props.navigation.state.params.userkey)
    dbRef.delete().then((res) => {
          console.log('Item removed from database')
          alert('Data berhasil dihapus')
          this.props.navigation.navigate('EditHome');
      })
      
  }

  deleteVocab1(index){
    if(this.state.vocabulary[0].length==1){
      Alert.alert(
        'Delete User',
        'There must be at least 1 Vocabulary',
        [{text: 'Got it!'}]
      )
    }else if(this.state.vocabulary[0].length>1){
    this.setState({
      isLoading: true,
  });
    console.log('updatedb', this.state.key);
    const updateDBRef = firebase.firestore().collection('Lessons').doc(this.state.key);
    updateDBRef.set({
      title: this.state.title,
      desc: this.state.desc,
      grammar: this.state.grammar,
      vocabulary: this.state.vocabulary[0].filter(vocab => vocab.vocabulary != this.state.vocabulary[0][index].vocabulary),
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        desc: '',
        grammar: '',
        vocabulary:[''],
        isLoading: false,
      });
      this.componentDidMount();
      // this.props.navigation.navigate('Home');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
  }

  deleteVocab(){
    // console.log("delete1")
    console.log("delete11:", firebase.firestore().collection('Lessons').doc(this.props.navigation.state.params.userkey)) 
      // dbRef.delete().then((res) => {
      //     console.log('Item removed from database')
      //     this.props.navigation.navigate('Home');
      // })
  }

  openTwoButtonAlert= ()=>{
    console.log("delete");
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteLesson()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        //cancelable: true 
      }
    );
    console.log("delete");
  }
  
  render() {
    const { modalVisible } = this.state;
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    
    return (
      
      
      <View style={styles.container}>
      <ScrollView>
      <View style={styles.inputGroup}>
      <TextInput
              placeholder={'number'}
              value={this.state.number}
              keyboardType='numeric'
              onChangeText={(val) => this.inputValueUpdate(val, 'number')}
          />
        </View>
      <View style={styles.inputGroup}>
      <TextInput
              placeholder={'lesson'}
              value={this.state.lesson}
              onChangeText={(val) => this.inputValueUpdate(val, 'lesson')}
          />
        </View>
      <View style={{padding: 35}}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'title'}
              value={this.state.title}
              onChangeText={(val) => this.inputValueUpdate(val, 'title')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'desc'}
              multiline={true}
              value={this.state.desc}
              onChangeText={(val) => this.inputValueUpdate(val, 'desc')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={6}
              placeholder={'grammar'}
              value={this.state.grammar}
              onChangeText={(val) => this.inputValueUpdate(val, 'grammar')}          
          />
         </View> 

         <View style={styles.inputGroup2}>
          <Text>
            Tekan tombol dibawah untuk mengubah kosa kata dan contoh kalimat:
          </Text>
          <TouchableOpacity style={globalStyles.addButtons2} onPress={()=>this.props.navigation.navigate("EditVocab", {userkey:this.props.navigation.state.params.userkey})}>
            <Text>Ubah Kosa Kata</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.addButtons2} onPress={()=>this.props.navigation.navigate("EditSentence", {userkey:this.props.navigation.state.params.userkey})}>
              <Text>Ubah Contoh Kalimat</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.button}>
          <Button
            title='Save'
            onPress={() => this.updateLesson()} 
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
    // backgroundColor:'#fff'   
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  inputGroup2: {
    flex: 1,
    padding: 0,
    marginBottom: 45,
    // borderBottomWidth: 1,
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
    marginBottom: 7, 
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
    width:100
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
  editbutton: {
    // flex: 1,
    padding: 5,
    // marginVertical: 15,
    marginHorizontal:10,
    marginTop: 10,
    // color: "#345c74"
    // fontweight:'bold'
  },

})

export default EditLesson;
