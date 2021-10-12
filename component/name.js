// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../routes/firebase';

export default class Name extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('users');
    this.state = { 
      uid: firebase.auth().currentUser.uid
    }
  }

  componentDidMount(){
    // this.state = { 
      // email: firebase.auth().currentUser.email,
      // uid: 
    // }
    var userDBRef = firebase.firestore().collection('users');
    userDBRef.where("uid", "==", this.state.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          console.log("doc", doc.data().name)
          this.setState({
            uid:doc.data().uid,
            name:doc.data().name,
            // email:doc.data().email,
            score: doc.data().score,
            status:doc.data().status,
          })
          console.log("state222", this.state)
      });
  })
  }

  signOut = () => {
    console.log("test", this.props)
    console.log("firebase", firebase)
    firebase.auth().signOut().then(() => {
      console.log("this.props", this.props )
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    // this.state = { 
      // displayName: firebase.auth().currentUser.displayName,
      // uid: firebase.auth().currentUser.uid
    // }    
    return (
      <View>
        <Text style = {styles.textStyle}>
          Hello, {this.state.name}
        </Text>

        <Button
          color="#3740FE"
          title="Logout"
          onPress={() =>this.signOut()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});