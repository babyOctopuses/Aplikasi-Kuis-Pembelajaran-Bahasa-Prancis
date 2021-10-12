import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {Feather} from "@expo/vector-icons";
import {Dimensions} from "react-native";


import HomeStack from './homeStack'
// import QuizStack from './quizStack'
import EditStack from './editStack'
import AboutStack from './aboutStack'
import AddUserStack from './addUserStack'
import ProfileStack from './profileStack'
import VideoPage from '../test/videoPage'
import SideBar from '../component/sidebar'
// import InfoStack from './infoStack'


const MasterDrawer= createDrawerNavigator({
    
    Lesson:{
        screen: HomeStack,        
    },
    // Quiz:{
    //   screen: QuizStack,
    // },
    Profile:{
      screen: ProfileStack,
    },
    Edit:{
      screen: EditStack,
    },
    AddUser:{
      screen: AddUserStack,
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
},
{
  initialRouteName: HomeStack,
}
)

export default MasterDrawer;