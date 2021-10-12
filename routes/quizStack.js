import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import QuizHome from '../screens/Quiz/quizHome';
import Quiz from '../screens/Quiz/quiz';

    const screens={
        QuizHome:{
            screen: QuizHome,            
        },
        Quiz:{
            screen: Quiz,
        },
    }
   
const QuizStack = createStackNavigator(screens);

export default createAppContainer(QuizStack);