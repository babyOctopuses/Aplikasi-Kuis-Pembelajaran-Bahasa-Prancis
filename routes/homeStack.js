import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import Home from '../screens/Home/home';
import Lesson from '../screens/Home/lesson';
import Lessons from '../screens/Home/lessons';
import QuizHome from '../screens/Quiz/quizHome';
import Quiz from '../screens/Quiz/quiz2'
import Vocab from '../screens/Home/vocab'
import Level from '../screens/Quiz/level'
import Sentences from '../screens/Home/sentences'

import Login from '../screens/Login/login';
import Signup from '../screens/Login/signup';
import ForgotPassword from '../screens/Login/forgotPassword'
import VideoPage from '../test/videoPage'

const screens={
        Home:{
            screen: Home,  
            navigationOptions: {
                headerLeft: null,
            },          
        },
        Lesson:{
            screen: Lesson,
        },
        Lessons:{
            screen: Lessons,
        },
        Quizzes:{
            screen: QuizHome,
        },
        Quiz:{
            screen: Quiz,
        },
        Vocab:{
            screen: Vocab,
        },
        Sentences:{
            screen: Sentences,
        },
        Level:{
            screen: Level,
        }
}
   
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);