import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import AddUser from '../screens/AddUser/addUser';

    const screens={
        AddUser:{
            screen: AddUser,
        },
    }
   
const AddUserStack = createStackNavigator(screens);

export default createAppContainer(AddUserStack);