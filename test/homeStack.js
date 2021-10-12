import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import Home from '../screens/Home/home';
import Lesson from '../screens/Home/lesson';

    const screens={
        // Login:{
        //     screen: Login,
        //     navigationOptions:()=>{
        //         return{
        //             headerLeft: null,
        //             gestureEnabled: false
        //         } 
        //     }            
        // },
        // ForgotPassword:{
        //     screen: ForgotPassword,
        //     navigationOptions:()=>{
        //         return{
        //             headerOption: true,
        //         } 
        //     }            
        // },
        // Signup:{
        //     screen:Signup,
        //     navigationOptions: {
        //         headerLeft: null,
        //     },
        // },
        Home:{
            screen: Home,  
            navigationOptions: {
                headerLeft: null,
            },          
        },
        Lesson:{
            screen: Lesson,
        },
    }
   
const HomeStack = createStackNavigator(screens);

export default HomeStack;