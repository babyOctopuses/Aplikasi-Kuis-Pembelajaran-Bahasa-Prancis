import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import About from '../screens/About/about';

    const screens={
        About:{
            screen: About,
        },
    }
   
const AboutStack = createStackNavigator(screens);

export default createAppContainer(AboutStack);