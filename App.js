import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Drawer from './routes/drawer'
import AppContainer from './routes/switch'
import Firebase,{FirebaseProvider} from './routes/firebaseConfig'
// import LoginStack from './routes/loginStack';
import AuthLoading from './test/authLoading'

export default function App() {
  return (
    
    <FirebaseProvider value={Firebase}>
      <AppContainer/>

      {/* <Drawer/> */}
      {/* <LoginStack/> */}
    </FirebaseProvider>
    // <View>
    //   <Text>Hello</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
