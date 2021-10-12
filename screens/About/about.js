// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { StyleSheet,Text, ScrollView, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import firebase from '../../routes/firebase';
import {globalStyles} from '../../constants/globalStyle'
import {MaterialIcons} from '@expo/vector-icons'

class About extends Component {

  render() {
    
    return (
      <ImageBackground source={require('../../assets/images/french.png')}
      style={globalStyles.ImageDimension}>
      <ScrollView style={styles.container}>
        <View>
        <View style={globalStyles.scrollView}>
          <View style={globalStyles.burgerContainer}>
                <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer("Home")}}>
                <MaterialIcons name='menu' size={18} style={globalStyles.burger}/>
                    {/* <Image
                    source={require('../../assets/images/hum.png')}
                    style={globalStyles.burger}
                    /> */}
                </TouchableOpacity>
          </View>
      </View>
        <View>
          <Image source={require('../../assets/images/jul.png')} style={styles.profile}/>
        </View>
        <View style={styles.inputGroup}>
          <Text style={{textAlign: 'justify'}}>
              Bermula dari menggambar karakter dan menonton anime yang bermuara teknologi, 
              Aku, Julfendi, terinspirasi dengan kehebatan dan potensial penerapannya dalam kehidupan manusia.
              Mulai dari yang sederhana seperti mencatat hingga mempelajari bahasa asing, kini telah didominasi
              oleh teknologi. Aku percaya teknologi adalah masa depan. 
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.texts}>
          Tertarik dan mau belajar bersama? Yuk, Hubungi aku di:
          </Text>
        </View>
        <View>
            <View style={styles.contact}>
                <Image source={require('../../assets/logo/WA.png')} style={styles.logo}/>
                <Text>
                    085668488377
                </Text>
            </View>
            <View style={styles.contact}>
                <Image source={require('../../assets/logo/ig.png')} style={styles.logoig}/>
                <Text>
                    @nickjul8
                </Text>
            </View>
            <View style={styles.inputGroup}>
            {/* <Text style={{fontSize:18,color: "#345c74", marginHorizontal:10, fontWeight:'bold' }}>
                Vocabulary
            </Text> */}

            </View>
        </View>
      </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  logo:{
    width : 30,
    height : 30,
    marginRight:10,
  },
  logoig:{
    width : 20,
    height : 20,
    marginRight:15,
    marginLeft:5
  },
    container: {
    margin: 10,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  inputGroup: {
    // flex: 1,
    padding: 5,
    marginVertical: 20,
    marginHorizontal:20,
  },
  contact:{
    padding: 5,
    marginVertical: 5,
    marginHorizontal:20,
    flexDirection:'row',
    alignItems:'center'
  },
  profile:{
    marginTop: 30,
    width : 180,
    height : 180,
    borderRadius : 90,
    borderWidth: 3,
    borderColor: "#FFF",
    justifyContent: 'center',
    alignSelf: 'center'
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
  desc:{
    padding:5,  
    justifyContent: 'center',
    alignItems: 'center'
  },
  texts:{
    fontSize:18,
    color: "#345c74",
    fontWeight:'bold',
  }
})

export default About;