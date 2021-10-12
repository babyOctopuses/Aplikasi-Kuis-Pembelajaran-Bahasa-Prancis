import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import Home from '../screens/Home/home';
import Login from '../screens/Login/login';
import Signup from '../screens/Login/signup';
import Drawer from '../routes/drawer'
import ForgotPassword from '../screens/Login/forgotPassword'

    const screens={
        Login:{
            screen: Login,
            navigationOptions:()=>{
                return{
                    headerLeft: null,
                    gestureEnabled: false
                } 
            }            
        },
        ForgotPassword:{
            screen: ForgotPassword,
            navigationOptions:()=>{
                return{
                    headerOption: true,
                } 
            }            
        },
        Signup:{
            screen:Signup,
            navigationOptions: {
                headerLeft: null,
            },
        },
        Home:{
            screen: Home,  
            navigationOptions: {
                headerLeft: null,
            },          
        },
        // Drawer:{
        //     screen: createAppContainer(Drawer),  
        //     navigationOptions: {
        //         headerLeft: null,
        //     },          
        // }
    }
   
const LoginStack = createStackNavigator(screens);

export default LoginStack;