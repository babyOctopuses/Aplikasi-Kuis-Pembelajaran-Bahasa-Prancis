import React, {Component} from 'react'
import { Image, Button, StyleSheet, SafeAreaView,
  Text, View, TouchableOpacity, Modal, StatusBar,
  ScrollView, FlatList, Animated, ImageBackground } from 'react-native'
import firebase from '../../routes/firebase'
import { COLORS, SIZES } from '../../constants/Theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Speech from 'expo-speech';
import {globalStyles} from '../../constants/globalStyle'

export default class Quiz extends Component {
    
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Quiz')
    this.state = {
      currentQuestionIndex:0,
      currentOptionSelected:null,
      correctOption:null,
      isOptionsDisabled:false,
      isShuffled:false,
      scoreNow:0,
      showNextButton:false,
      showScoreModal:false,
      modalVisible: false,
      progress:0,
      title: '',
      desc: '',
      Easy:[''],
      Medium:[''],
      Hard:[''],
      explanation:'',
      email:'',
      name:'',
      scores:[''],
      xp:'',
      status:'',
      uid:'',
      passStat:'passed',
      isLoading: true
      
    };
  }
 
  componentDidMount() {
    const uid= firebase.auth().currentUser.uid;
    const test= firebase.firestore().collection('users').doc(uid);
    console.log("test.auth()", firebase.auth().currentUser.uid)
    const dbRef = firebase.firestore().collection('Quiz').doc(this.props.navigation.state.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          title: user.title,
          desc: user.desc,
          Easy: [user.Easy],
          Medium: [user.Medium],
          Hard: [user.Hard],
          explanation: user.explanation,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    })
    test.get().then((res) => {
        if (res.exists) {
          const user2 = res.data();
          console.log("user2", user2);
          this.setState({
            key: res.id,
            email: user2.email,
            name: user2.name,
            scores: [user2.scores],
            status: user2.status,
            uid: user2.uid,
            xp:user2.xp,
            isLoading: false
          });
        } else {
          console.log("Document does not exist!");
        }
      })
  }
  
      render(){
        var level = this.props.navigation.state.params.level; 
        console.log("props: ", this.props);
        console.log("level: ", level);
        var allQuestions;
        var questionLength;

        if(level == "Easy"){
            allQuestions = this.state.Easy[0];
            questionLength = 10;
            console.log("Easy allQuestions :", allQuestions)
        } else if (level== "Medium"){
            allQuestions = this.state.Medium[0];
            questionLength = 20;
            console.log("Medium allQuestions :", allQuestions)
        } else if( level == "Hard"){
            allQuestions = this.state.Hard[0];
            questionLength = 30;
            console.log("Hard allQuestions :", allQuestions)
        }
        
        const currentQuestionIndex= this.state.currentQuestionIndex;
        const currentOptionSelected= this.state.currentOptionSelected;
        const correctOption= this.state.correctOption;
        const isOptionsDisabled=this.state.isOptionsDisabled;
        const isShuffled = this.state.isShuffled;
        const scoreNow=this.state.scoreNow;
        // const passStat= this.state.passStat;
        const showNextButton= this.state.showNextButton;
        const showScoreModal=this.state.showScoreModal;
        const progress = new Animated.Value(0);
        const progressAnim = progress.interpolate({
            inputRange: [0, questionLength],
            outputRange: ['0%','100%']
        })

        const updateScore=()=>{
            this.setState({
              isLoading: true,
          });
            const date= new Date();
            const year= date.getFullYear();
            const month= date.getMonth()
            const day= date.getDate();
            const today= day+"/"+(month+1)+"/"+year;
            console.log("date:", date, year, month, day, today);
            
            const uid= firebase.auth().currentUser.uid;
            const updateDBRef = firebase.firestore().collection('users').doc(uid);
            updateDBRef.set({
              email: this.state.email,
              name: this.state.name,
              status: this.state.status,
              uid: this.state.uid,
              xp:this.state.xp+scoreNow,
              scores:[{
                date: today,
                score:scoreNow,
                status:'passed',
                quiz:this.state.title
                    },
                    ...this.state.scores[0]
               ]   
            }
        ).then((docRef) => {
              this.setState({
                key: '',
                name: '',
                email: '',
                status:'',
                uid:'',
                xp:'',
                score:[''],
                isLoading: false,
              });
              this.componentDidMount()
            })
            .catch((error) => {
              console.error("Error: ", error);
              this.setState({
                isLoading: false,
              });
            });
          }

        //set function 
        const setShowScoreModal=(option)=>{
            this.setState({
                showScoreModal : option
            })
        }
        
        const setCorrectOption = (option) => {
          this.setState({ correctOption: option });
        }

        const setCurrentQuestionIndex = (index) => {
          this.setState({ currentQuestionIndex: index });
        }

        const setScoreNow=(scoreNow)=>{
          this.setState({ scoreNow: scoreNow });
        };

        const setCurrentOptionSelected = (option) => {
          this.setState({ currentOptionSelected: option });
        };
        
        const setIsOptionsDisabled=(option)=>{
          this.setState({ isOptionsDisabled: option });
        };

        const setShowNextButton=(option)=>{
          this.setState({ showNextButton: option });
        };

        const setIsShuffled=(option)=>{
            this.setState({ isShuffled: option });
          };

        // const setPassStat=(option)=>{
        //     console.log("option", option)
        //     passStat=option
        //     this.setState({ passStat: passStat });
        //     console.log("option", this.state)
        // };  
        
        const pushQuestionIndexDone=()=>{
            if(isShuffled==false){
                let shuffleQuestion= allQuestions.sort(()=> Math.random()-.5);
                setIsShuffled( true );
                console.log("isShuffled",isShuffled)
                console.log("isShuffled",shuffleQuestion)
            }else{
                console.log("isShuffled is true")
            }
        }

        //validate answer and handlenext
        const validateAnswer = (selectedOption) => {
          let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        //   let indexDone=[]

        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        console.log("setscorenow", scoreNow);
        if(selectedOption==correct_option){
            // Set Score
            setScoreNow(scoreNow+1)           
        }
        
        // Show Next Button
        setShowNextButton(true)
      }

      const handleNext = () => {
        pushQuestionIndexDone();
        if(currentQuestionIndex == questionLength-1){
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        }else{          
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    // restart Quiz

    const restartQuiz = () => {
        setShowScoreModal(false);
        pushQuestionIndexDone();

        setCurrentQuestionIndex(0);
        setScoreNow(0);
        

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        setIsShuffled(false);
        
        // console.log("this.state before", passStat)
        // if(scoreNow>allQuestions.length/2){
        //     setPassStat('passed')
            // this.setState({ passStat: 'passed' })
            // console.log("this.state pass", passStat)
            // setPassStat("passed");
        // }else if(scoreNow<allQuestions.length/2){
            // setPassStat('failed')
            // console.log("this.state fail", this.state.passStat)
            // setPassStat("failed")
        // }
        updateScore();
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    //go back to home
    const goBack=()=>{
        // if(scoreNow>allQuestions.length/2){
        //     setPassStat("passed");
        // }else if(scoreNow<allQuestions.length/2){
        //     setPassStat("failed")
        // }
        updateScore();
        this.props.navigation.navigate('Quizzes');
    }

    //render UI
        const renderOptions = () => {
          return (
              <View>
                  {
                      allQuestions[currentQuestionIndex]?.Options.map(option => (
                          <TouchableOpacity 
                          onPress={()=> validateAnswer(option)}
                          disabled={isOptionsDisabled}
                          key={option}
                          style={{
                              borderWidth: 3, 
                              borderColor: option==correctOption 
                              ? COLORS.success
                              : option==currentOptionSelected 
                              ? COLORS.error 
                              : COLORS.secondary+'40',
                              backgroundColor: option==correctOption 
                              ? COLORS.success +'20'
                              : option==currentOptionSelected 
                              ? COLORS.error +'20'
                              : COLORS.secondary+'20',
                              height: 80, borderRadius: 20,
                              flexDirection: 'row',
                              alignItems: 'center', justifyContent: 'space-between',
                              paddingHorizontal: 20,
                              marginVertical: 10
                          }}
                          >
                              <Text style={{fontSize: 15, color: COLORS.white}}>{option}</Text>
  
                              {/* Show Check Or Cross Icon based on correct answer*/}
                              {
                                  option==correctOption ? (
                                      <View style={{
                                          width: 30, height: 30, borderRadius: 30/2,
                                          backgroundColor: COLORS.success,
                                          justifyContent: 'center', alignItems: 'center'
                                      }}>
                                          <MaterialCommunityIcons name="check" style={{
                                              color: COLORS.white,
                                              fontSize: 20
                                          }} />
                                      </View>
                                  ): option == currentOptionSelected ? (
                                      <View style={{
                                          width: 30, height: 30, borderRadius: 30/2,
                                          backgroundColor: COLORS.error,
                                          justifyContent: 'center', alignItems: 'center'
                                      }}>
                                          <MaterialCommunityIcons name="close" style={{
                                              color: COLORS.white,
                                              fontSize: 20
                                          }} />
                                      </View>
                                  ) : null
                              }
  
                          </TouchableOpacity>
                      ))
                  }
              </View>
          )
      }
      
      const renderNextButton = () => {
          if(showNextButton){
              return (
                <View>
                   <View style={{
                      borderWidth:3,
                      borderColor:'#3498db',
                      padding:20,
                      width:'100%',
                      borderRadius:20,
                      marginTop:10,
                      shadowColor: "#444",
                      shadowRadius: 3,
                      
                    }}>
                    <Text style={{
                            marginVertical:5,
                            fontSize: 13,
                            color: COLORS.white,
                            textAlign: 'left'}}>
                            {allQuestions[currentQuestionIndex]?.explanation}
                    </Text>                      
                   </View>
                   
                <TouchableOpacity
                onPress={handleNext}
                style={{
                    marginTop: 20,
                    width: '100%',
                    backgroundColor: COLORS.accent,
                    // backgroundColor: "#444",
                    padding: 20,
                    borderRadius: 5
                }}>
                    <Text style={{
                      fontSize: 20,
                      color: COLORS.white,
                      textAlign: 'center'}}>Next</Text>
                </TouchableOpacity>
                  </View>
              )
          }else{
              return null
          }
      }

        const renderQuestion=()=>{
          return (
            <View>
                <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2}}>
                      {currentQuestionIndex+1}
                    </Text>
                    <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>
                      / {questionLength}
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>{
                console.log("item.vocab: ",allQuestions[currentQuestionIndex]?.Question)
                const thingToSay = allQuestions[currentQuestionIndex]?.Question;
                Speech.speak(thingToSay, {language:'fr'});
                }}>
                    {/* Question */}
                    <Text style={{
                        color: COLORS.white,
                        fontSize: 30
                    }}>
                    {/* what is this? */}
                    {allQuestions[currentQuestionIndex]?.Question}
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
        )
        }

        const renderProgressBar = () => {
          return (
              <View style={{
                  width: '100%',
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: '#00000020',
  
              }}>
                  <Animated.View style={[{
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: COLORS.accent
                  },{
                      width: progressAnim
                  }]}>
  
                  </Animated.View>
  
              </View>
          )
      }
      

        return(
          <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                source={require('../../assets/images/crs.png')}
                style={globalStyles.ImageDimension}
            >
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <ScrollView style={{backgroundColor: COLORS.background,}}>
            <View style={{
                flex: 1,
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position:'relative'
            }}>
            <Text style={{
                color: "#aaa",
                marginHorizontal:5,
                marginBottom:10,
            }}>
                Anda bisa menekan soal bahasa Prancisnya untuk mendengar pengucapannya
            </Text>
            {/* {renderProgressBar()} */}
            {renderQuestion()}
            {renderOptions()} 
            {renderNextButton()} 

            {/* Score Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showScoreModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: COLORS.white,
                            width: '90%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ scoreNow > (questionLength/2) ? 'Congratulations!' : 'Oops!' }</Text>
 
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 30,
                                    color: scoreNow > (questionLength/2) ? COLORS.success : COLORS.error
                                }}>{scoreNow}</Text>
                                 <Text style={{
                                     fontSize: 20, color: COLORS.black
                                 }}> / { questionLength }</Text>
                            </View>
                            {/* Retry Quiz button */}
                            <TouchableOpacity
                            onPress={restartQuiz}
                            style={{
                                backgroundColor: COLORS.accent,
                                padding: 20, width: '100%', borderRadius: 20
                            }}>
                                <Text style={{
                                    textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Retry Quiz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={goBack}
                            // style={{
                            //     backgroundColor: COLORS.accent,
                            //     padding: 20, width: '100%', borderRadius: 20
                            // }}
                            >
                                <Text style={{
                                    textAlign: 'center', color: COLORS.accent, fontSize: 20
                                }}>Back to Home</Text>
                            </TouchableOpacity> 
                        </View> 
                    </View>
                </Modal>
            <Image
                 source={require('../../assets/images/DottedBG.png')}
                 style={{
                     width: SIZES.width,
                     height: 130,
                     zIndex: -1,
                     position: 'absolute',
                     bottom: 0,
                     left: 0,
                     right: 0,
                     opacity: 0.5
                 }}
                 resizeMode={'contain'}
                 />
          </View>
          </ScrollView>
          </ImageBackground>
          </SafeAreaView>          
        )  
    }
    
}

const styles = StyleSheet.create({})
