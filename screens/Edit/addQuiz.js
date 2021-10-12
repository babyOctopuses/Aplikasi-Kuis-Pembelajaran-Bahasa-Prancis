// screens/AddUserScreen.js

import React, { Component } from 'react';
import { Text, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../routes/firebase';

class AddQuiz extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Quiz');
    this.state = {
      title: '',
      desc: '',
      Question:'',
      number:'',
      lesson:'',
      correct_option:'',
      explanation:'',
      Options:'',
      Option1:'',
      Option2:'',
      Option3:'',
      Option4:'',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeQuiz() {
    if(this.state.title === ''){
      alert('Please fill in the title')
    } else if(this.state.desc === ''){
      alert('Please fill in the description')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        title: this.state.title,
        desc: this.state.desc,
        number: this.state.number,
        lesson: 'Lesson '+ this.state.number,
        Easy:[{
            Question:'sample', 
            correct_option:'sample',
            explanation:'sample',
            Options:['sample1', 'sample2', 'sample3','sample4']
        }],
        Medium:[{
          Question:'sample', 
          correct_option:'sample',
          explanation:'sample',
          Options:['sample1', 'sample2', 'sample3','sample4']
      }],
      Hard:[{
        Question:'sample', 
        correct_option:'sample',
        explanation:'sample',
        Options:['sample1', 'sample2', 'sample3','sample4']
    }],
        
      }).then((res) => {
        console.log("test state", this.state)
        this.setState({
          title: '',
          desc: '',
          Question:'',
          explanation:'',
          correct_option:'',
          Options:'',
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
              <Text>Kuis untuk Lesson ke:</Text>
              <TextInput
                  keyboardType= "numeric"
                  placeholder={'number'}
                  value={this.state.number}
                  onChangeText={(val) => this.inputValueUpdate(val, 'number')}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>Title</Text>
              <TextInput
                  placeholder={'title'}
                  value={this.state.title}
                  onChangeText={(val) => this.inputValueUpdate(val, 'title')}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text>Description</Text>
              <TextInput
                  placeholder={'desc'}
                  value={this.state.desc}
                  onChangeText={(val) => this.inputValueUpdate(val, 'desc')}
              />
            </View>
          </View>
          
          {/* <View style={styles.flatlist}>
          <View style={styles.inputGroup}>
            <Text>Sample question for each difficulty level</Text>
            <TextInput
                placeholder={'Question'}
                value={this.state.Question}
                onChangeText={(val) => this.inputValueUpdate(val, 'Question')}
            />
          </View>
          <View style={styles.inputGroup}>
          <Text>Correct Option</Text>
            <TextInput
                placeholder={'correct_option'}
                value={this.state.correct_option}
                onChangeText={(val) => this.inputValueUpdate(val, 'correct_option')}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Explanation</Text>
            <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder={'explanation'}
                value={this.state.explanation}
                onChangeText={(val) => this.inputValueUpdate(val, 'explanation')}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Options:</Text>
            <TextInput
                placeholder={'Option 1'}
                value={this.state.Option1}
                onChangeText={(val) => this.inputValueUpdate(val, 'Option1')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Option 2'}
                value={this.state.Option2}
                onChangeText={(val) => this.inputValueUpdate(val, 'Option2')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Option 3'}
                value={this.state.Option3}
                onChangeText={(val) => this.inputValueUpdate(val, 'Option3')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Option 4'}
                value={this.state.Option4}
                onChangeText={(val) => this.inputValueUpdate(val, 'Option4')}
            />
          </View>
        </View> */}
        <View style={styles.button}>
          <Button
            title='Add Quiz'
            onPress={() => this.storeQuiz()} 
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

export default AddQuiz;