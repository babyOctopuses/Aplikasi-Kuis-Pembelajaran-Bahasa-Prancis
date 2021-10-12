import React, { Component } from 'react';
import { Text, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../routes/firebase';

class AddLesson extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Lessons');
    this.state = {
      title: '',
      desc: '',
      grammar: '',
      vocabulary:'',
      meaning:'',
      sentence:'',
      meanings:'',
      sentences:'',
      lesson:'',
      number:0,
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeLesson() {
    if(this.state.title === ''){
      alert('Please fill in the title')
    } else if(this.state.desc === ''){
      alert('Please fill in the description')
    } else if(this.state.vocabulary === ''){
      alert('Please fill in the first vocabulary')
    } else if(this.state.meaning === ''){
      alert('Please fill in the meaning')
    } else if(this.state.grammar === ''){
      alert('Please fill in the grammar')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        title: this.state.title,
        desc: this.state.desc,
        grammar: this.state.grammar,
        vocabulary:[{vocabulary:this.state.vocabulary, meaning:this.state.meaning}],
        sentences:[{sentence:this.state.sentence, meaning:this.state.meanings}],
        lesson:"Lesson "+this.state.lesson,
        number:this.state.lesson,
      }).then((res) => {
        this.setState({
          title: '',
          desc: '',
          grammar: '',
          vocabulary:'',
          sentences:'',
          lesson:'',
          number:0,
          isLoading: false,
        });
        this.props.navigation.navigate('EditHome')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
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
        <View style={styles.flatlist}>
        <View style={styles.inputGroup}>
          <Text>Lesson ke:</Text>
          <TextInput
              placeholder={'lesson'}
              value={this.state.lesson}
              onChangeText={(val) => this.inputValueUpdate(val, 'lesson')}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Judul</Text>
          <TextInput
              placeholder={'title'}
              value={this.state.title}
              onChangeText={(val) => this.inputValueUpdate(val, 'title')}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Grammar</Text>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Grammar'}
              value={this.state.grammar}
              onChangeText={(val) => this.inputValueUpdate(val, 'grammar')}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Deskripsi</Text>
          <TextInput
              placeholder={'desc'}
              value={this.state.desc}
              onChangeText={(val) => this.inputValueUpdate(val, 'desc')}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Kosa Kata Pertama</Text>
          <TextInput
              placeholder={'first vocabulary'}
              value={this.state.vocabulary}
              onChangeText={(val) => this.inputValueUpdate(val, 'vocabulary')}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Arti Kosa Kata</Text>  
          <TextInput
              placeholder={'meaning'}
              value={this.state.meaning}
              onChangeText={(val) => this.inputValueUpdate(val, 'meaning')}
          />
          </View>
          <View style={styles.inputGroup}>
          <Text>Contoh Kalimat Pertama</Text>
          <TextInput
              placeholder={'first vocabulary'}
              value={this.state.sentence}
              onChangeText={(val) => this.inputValueUpdate(val, 'sentence')}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Arti Kalimat</Text>
          <TextInput
              placeholder={'meaning'}
              value={this.state.meanings}
              onChangeText={(val) => this.inputValueUpdate(val, 'meanings')}
          />
        </View>
        {/* <View style={{marginTop:10}}>
          <Button
            title='Test'
            onPress={() => this.props.navigation.navigate('Test')} 
            color="#19AC52"
          />
        </View> */}
        </View>
        <View style={styles.button}>
          <Button
            title='Add Lesson'
            onPress={() => this.storeLesson()} 
            color="#1F37DD"
          />
        </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
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
  flatlist:{
    backgroundColor:'#fff',
    padding:20,
    width:'100%',
    borderRadius:20,
    marginTop:10,
    shadowColor: "#444",
    shadowRadius: 3,
    marginBottom:20,
  }
})

export default AddLesson;