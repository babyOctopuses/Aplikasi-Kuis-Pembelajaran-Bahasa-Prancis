import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {Feather} from "@expo/vector-icons";
import {Dimensions} from "react-native";


import HomeStack from './homeStack'
// import QuizStack from './quizStack'
import AboutStack from './aboutStack'
import ProfileStack from './profileStack'
import SideBar from '../component/sidebar'
// import InfoStack from './infoStack'

const UserDrawer= createDrawerNavigator({
    
    Lesson:{
        screen: HomeStack,        
    },
    // Quiz:{
    //   screen: QuizStack,
    // },
    Profile:{
      screen: ProfileStack,
    },
    About:{
      screen: AboutStack,
    },
    // Info:{
    //   screen: InfoStack,
    // },
    
},
{
    contentComponent: props =>
    <SideBar {...props}/>,
    drawerWidth: Dimensions.get("window").width * 0.85,
    hideStatusBar:true,
  
    contentOptions:{
      activeBackgroundColor: "rgba(212, 118, 207, 0.2)",
      activeTintCOlor: "#531158",
      itemsContainerStyke:{
        marginTop: 16,
        marginHorizontal: 8
      },
      itemStyle:{
        borderRadius:4
      }
    }
  }
)

export default UserDrawer;