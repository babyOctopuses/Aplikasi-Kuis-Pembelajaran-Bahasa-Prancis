import firebase from 'firebase';
import firestore from 'firebase/firestore';
import React, { createContext } from 'react'
import 'firebase/auth'

const FirebaseContext = createContext({})

  export const FirebaseProvider = FirebaseContext.Provider
  
  export const FirebaseConsumer = FirebaseContext.Consumer
  
  export const withFirebaseHOC = Component => props => (
    <FirebaseConsumer>
      {state => <Component {...props} firebase={state} />}
    </FirebaseConsumer>
  )
  
  const Firebase = {
    passwordReset:email => {
      return firebase.auth().sendPasswordResetEmail(email)
    },
    loginWithEmail: (email, password) => {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    signupWithEmail: (email, password) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
    },
    signOut: () => {
      return firebase.auth().signOut()
    },
    checkUserAuth: user => {
      return firebase.auth().onAuthStateChanged(user)
    },
    // verifyEmail: email => {
    //   console.log("verfy email", firebase.auth())
    //   return firebase.auth().currentUser.sendEmailVerification(email)
    // },
  
    // firestore
    createNewUser: userData => {
      return firebase
        .firestore()
        .collection('users')
        .doc(`${userData.uid}`)
        .set(userData)
    }
  }

  export default Firebase;