import React, { Component,useState } from 'react';
import {Modal, TouchableOpacity, FlatList,
        Text, Alert, Button, StyleSheet,
        TextInput, ScrollView, ActivityIndicator,
        View, ImageBackground
} from 'react-native';
import firebase from '../../routes/firebase';
import {MaterialIcons} from '@expo/vector-icons'


class EditSentence extends Component {

  constructor() {
    super();
    // const [modalOpen, setModalOpen]= useState(false);
    this.dbRef = firebase.firestore().collection('Lessons')
    this.state = {
      modalVisible: false,
      title: '',
      desc: '',
      grammar: '',
      vocabulary:[''],
      sentences:[''],
      number:'',
      lesson:'',
      sentence:'',
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
    const state = this.state.sentences[0];
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
      vocabulary:[...this.state.vocabulary[0]],
      sentences:this.state.sentences[0],
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

  addSentence() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Lessons').doc(this.state.key);
    updateDBRef.set({      
      title: this.state.title,
      desc: this.state.desc,
      grammar: this.state.grammar,
      lesson:'',
      number:0,
      vocabulary: [...this.state.vocabulary[0]],
      sentences:[{
        sentence:'',
        meaning:'',
      },...this.state.sentences[0]],
    },this.state.sentences[0]
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
    if(this.state.sentences[0].length==1){
      Alert.alert(
        'Delete User',
        'There must be at least 1 Sentence',
        [{text: 'Got it!'}]
      )
    }else if(this.state.sentences[0].length>1){
    this.setState({
      isLoading: true,
  });
    console.log('updatedb', this.state.key);
    const updateDBRef = firebase.firestore().collection('Lessons').doc(this.state.key);
    updateDBRef.set({
      title: this.state.title,
      desc: this.state.desc,
      grammar: this.state.grammar,
      lesson:'',
      number:0,
      sentences: this.state.sentences[0].filter(vocab => vocab.sentence != this.state.sentences[0][index].sentence),
      vocabulary:[...this.state.vocabulary[0]]
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
      // <ImageBackground source={require('../../assets/images/quizbg.png')}
      // style={{width:"100%",height:"100%"}}>
      <View style={styles.container}>
      <ScrollView>
      <View style={{padding: 35}}>
         

        {/* vocabulary modal */}
        <Text style={styles.vocabularyTitle}>
              Contoh Kalimat
        </Text>
        <ScrollView> 
            <FlatList
                data={this.state.sentences[0]}
                renderItem={({item, index})=>(
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
                <View style={styles.flatlist}>
                    <View style={{
                        alignItems:'flex-end',
                        flexDirection:'column'
                    }}>
                    <TouchableOpacity>
                      <MaterialIcons 
                          name='delete'
                          size={18}
                          onPress={()=>this.deleteVocab1(index)
                          }
                          // style={styles.modalToggle}
                      />
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>
                        Kalimat 
                    </Text>
                    <TextInput
                      value={item.sentence}
                      placeholder="kalimat"
                      onChangeText={(val)=>this.inputValueUpdateVocab(val, index, 'sentence')}
                      style={styles.flatlistSentence}/>
                     <Text style={styles.title}>
                        Arti: 
                    </Text>
                    <TextInput
                      value={item.meaning}
                      placeholder="arti"
                      onChangeText={(val)=>this.inputValueUpdateVocab(val, index, 'meaning')}
                      style={styles.flatlistMeaning}/>
                    </View>
                </View>
            )}/>
        </ScrollView>
        
        <TouchableOpacity>
        <MaterialIcons 
            name='add'
            size={18}
            onPress={()=>
            this.addSentence()
            }
            style={styles.modalToggle}
        />
        </TouchableOpacity>
      
        <View style={styles.button}>
          <Button
            title='Save'
            onPress={() => this.updateLesson()} 
            color="#EA2D52"
          />
        </View>
       
        </View>
      </ScrollView>
      </View>
      // </ImageBackground>
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
    fontSize:20,
    color: "#345c74",
    marginHorizontal:10,
    marginBottom:10,
    fontWeight:'bold'
  },
  flatlist:{
    
  },
  flatlistSentence:{
    color:"#345c74",
    //  fontFamily:"Bold",
    fontSize:14,
    paddingHorizontal:10,
    // width:130,
    borderBottomWidth:1,  
    borderColor: '#345c74'
  },
  flatlistMeaning:{
    color:"#345c74",
    //  fontFamily:"Bold",
    fontSize:14,
    paddingHorizontal:10,
    // width:130,
    // borderBottomWidth:1,  
    borderColor: '#345c74'
  },
  flatlistheader:{
    color:"#345c74",
    fontWeight:'bold',
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
  title:{
    fontSize:14,
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

export default EditSentence;
