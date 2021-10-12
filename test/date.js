// Scores:[{
//   date: date,
//   scores:[{
//     status:'failed',
//     score:20
//   },
//   {
//     status:'failed',
//     score:5
//   },
//   //  ...this.state.Scores[0].scores
// ]},
// {
//   date: date,
//   scores:[{
//     status:'failed',
//     score:20
//   },
//   {
//     status:'failed',
//     score:5
//   },
//   //  ...this.state.Scores[0].scores
// ]},
// // ...this.state.Scores
// ],
// }
import React, { Component } from 'react'
import { ScrollView,Button, View, FlatList } from 'react-native'
import firebase from '../routes/firebase'

export class Datess extends Component {
    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('Lessons');
        this.state = {
          date:'',
          Scores: [''],
          scores: '',
          isLoading: false
        };
      }


      componentDidMount() {
        const dbRef = firebase.firestore().collection('Lessons').doc('try222')
        dbRef.get().then((res) => {
          if (res.exists) {
            const user = res.data();
            console.log("user", user.Scores)
            this.setState({
              key: res.id,
              Scores: user.Scores,
              date:user.Scores[0].date,
              isLoading: false
            });
          } else {
            console.log("Document does not exist!");
          }
        })
      }

      componentWillUnmount(){
        this.unsubscribeLesson();
        this.unsubscribeQuiz();
      }

      getCollectionLesson = (querySnapshot) => {
        const LessonArr = [];
        querySnapshot.forEach((res) => {
          const { Scores, date } = res.data();
          quizArr.push({
            key: res.id,
            Scores,
          });
        });
        this.setState({
          quizArr,
          isLoading: false,
       });
      }

      storeUser() {
        const dbRef = firebase.firestore().collection('Lessons').doc('try222')  
        this.setState({
            isLoading: true,
          });      
          this.dbRef.add({
            date: Date(),
          }).then((res) => {
            this.setState({
              date:'',
              isLoading: false,
            });
            console.log("date added")
            // this.props.navigation.navigate('EditHome')
          })
          .catch((err) => {
            console.error("Error found: ", err);
            this.setState({
              isLoading: false,
            });
          });
        
      }

      addVocab() {
        this.setState({
          isLoading: true,
        });
        const date= new Date();
        const updateDBRef = firebase.firestore().collection('Userss').doc();
        updateDBRef.set({      
          Scores:[{
            date: date,
            scores:[{
              score:5,
              status:'pass'
            },
            ...this.state.Scores[0].scores
          ]
          },
          // ...this.state.Scores,
        ]
        }
        // this.state.vocabulary[0]
      ).then((docRef) => {
        this.setState({
            Scores:[],
            isLoading: false,
          });
          this.componentDidMount();
          // this.props.navigation.navigate('Test', {userkey:updateDBRef});
        })
        .catch((error) => {
          console.error("Error: ", error);
          this.setState({
            isLoading: false,
          });
        });   
       }

       checkDate(){
         console.log("state", this.state)
        const date= new Date();
        console.log("date", date)
        const date2= this.state.Scores[0].date.toDate();
        console.log("date 2",date2)
       }

    render() {
        return (
            <View>
                <Button title="Press" onPress={()=>{
                  // console.log("storeUser", this.state.date);
                  console.log("scores", this.state.Scores[0]);  
                   this.addVocab()
                  }}/>
                <Button title="CheckDate" onPress={()=>{
                  // console.log("storeUser", this.state.date);
                  console.log("scores", this.state.Scores[0]);  
                   this.checkDate();
                  }}/>
                <ScrollView>
                  {/* <FlatList
                    data={this.state.Quiz[0]}
                    renderItem={({item, index})=>(
                      <View>

                      </View>
                    )}
                  /> */}
                </ScrollView>    
            </View>
        )
    }
}

export default Datess 