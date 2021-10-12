import React from 'react'
import {StyleSheet, View, Text, ImageBackground, Image} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import { TouchableOpacity } from '../node_modules/react-native-gesture-handler';
import globalStyles from '../constants/globalStyle'; 

export default function Header({ navigation }){
    
    return(
        <View style={styles.burgerContainer}>
            <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer("Home")}}>
                <Image
                source={require('../assets/images/hum.png')}
                style={globalstyles.burger}
                />
            </TouchableOpacity>
        </View>
        // <View>
        //     <MaterialIcons name='menu' size={28} style={styles.icon} onPress={openMenu} />
        //     <View style={styles.headerTitle}>
        //         <Image style={styles.headerImage}source={require('../assets/heart_logo.png')} />
        //         <Text style={styles.headerText}>Gamezonexxx</Text>
        //     </View>
        // </View>
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