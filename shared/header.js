import React from 'react'
import {StyleSheet, View, Text, ImageBackground, Image, Button} from 'react-native'

import {MaterialIcons} from '@expo/vector-icons'
import { TouchableOpacity } from '../node_modules/react-native-gesture-handler';
import firebase from '../routes/firebase'

export default function Header({ navigation }){
    
    const openMenu =()=>{
        navigation.openDrawer({navigation});
    }

    return(
        <View>                
            <View style={styles.headerTitle}>
                <View 
                style={{
                    padding:10,
                    // paddingVertical:12,
                    borderRadius:10,
                    marginRight:30,
                    backgroundColor:"#d1a0a7"
            }}>
                <TouchableOpacity onPress={()=>{openMenu}}>
                    <Image
                    source={require('../assets/images/hum.png')}
                    style={{height:15,width:20}}
                    />
                </TouchableOpacity>
            </View>
                <Text style={styles.headerText}>Quiz App</Text>
                <Button title="test" onPress={()=>{console.log("firebase.auth", firebase.auth())}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        //backgroundColor: 'yellow',
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing:1,
    },
    icon:{
        position: 'absolute',
        left: 16
    },
    headerImage:{
        width: 26,
        height: 26,
        marginHorizontal: 10,
    },
    headerTitle:{
        flexDirection: 'row',
    }
})