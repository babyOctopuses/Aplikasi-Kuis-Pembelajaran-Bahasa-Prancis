import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import firebase from '../routes/firebase'

export default class AuthLoading extends React.Component {
    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection('users');
        this.state = {
          userToken: false,
          isLoading: true,
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
          const { email, name, score, status, uid } = res.data();
          userArr.push({
            key: res.id,
            email, name, score, status,
          });
        });
        this.setState({
          userArr,
          isLoading: false,
       });
      }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log("props", this.props);
    console.log("state", this.state)
    console.log("navigation", this.props.navigation.navigate(userToken ? 'App' : 'Auth'))
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <Button title="Press" onPress={()=>{
            console.log("props", this.props);
            console.log("state", this.state);
            console.log("navigation", this.props.navigation.navigate(userToken ? 'App' : 'Auth'))
    
    }}/>
      </View>
    );
  }
}