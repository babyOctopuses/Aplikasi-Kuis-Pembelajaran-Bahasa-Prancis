import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import Profile from '../screens/Profile/Profile'
import ForgotPassword from '../screens/Login/forgotPassword'

    const screens={
        Profile:{
            screen:Profile,
        }
        
    }

   
const ProfileStack = createStackNavigator(screens);

export default ProfileStack;