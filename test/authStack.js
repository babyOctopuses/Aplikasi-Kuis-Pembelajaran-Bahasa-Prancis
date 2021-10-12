import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeStack from './homeStack'
import LoginStack from './loginStack'

// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: HomeStack,
      Auth: LoginStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);