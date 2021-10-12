import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import Info from '../screens/Info/info'

    const screens={
        Info:{
            screen: Info,
    }
}

   
const InfoStack = createStackNavigator(screens);

export default InfoStack;