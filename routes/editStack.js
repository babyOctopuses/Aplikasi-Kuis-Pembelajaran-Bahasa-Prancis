import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import EditLesson from '../screens/Edit/editLesson';
import EditQuiz from '../screens/Edit/editQuiz';
import EditHome from '../screens/Edit/editHome';
import AddLesson from '../screens/Edit/addLesson';
import AddQuiz from '../screens/Edit/addQuiz';

import Header from '../shared/header'
import React from 'react'
import EditVocab from '../screens/Edit/EditVocab';
import EditSentence from '../screens/Edit/EditSentence';
import EditQEasy from '../screens/Edit/editQEasy';
import EditQMedium from '../screens/Edit/editQMedium';
import EditQHard from '../screens/Edit/EditQHard';

// import Login from '../screens/Login/login;'

    const screens={
        EditHome:{
            screen: EditHome,   
            navigationOptions:({navigation})=>{
                return{
                    // headerTitle: () => <Header navigation={navigation}/>,
                } 
            }         
        },
        EditLesson:{
            screen: EditLesson,
        },
        EditQuiz:{
            screen: EditQuiz
        },
        AddLesson:{
            screen: AddLesson,
        },
        AddQuiz:{
            screen: AddQuiz,
        },
        EditVocab:{
            screen: EditVocab,
        },
        EditSentence:{
            screen: EditSentence,
        },
        EditQEasy:{
            screen: EditQEasy,
        },
        EditQMedium:{
            screen: EditQMedium,
        },
        EditQHard:{
            screen: EditQHard,
        },

    }
   
const EditStack = createStackNavigator(screens);

export default EditStack