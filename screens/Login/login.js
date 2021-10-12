import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../../component/FormInput'
import FormButton from '../../component/FormButton'
import ErrorMessage from '../../component/ErrorMessage'
import firebase from '../../routes/firebase'
// import AppLogo from '../components/AppLogo'
import { withFirebaseHOC } from '../../routes/firebaseConfig'
import {globalStyles} from '../../constants/globalStyle'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
})

class Login extends Component {
  state = {
    passwordVisibility: true,
    rightIcon: 'ios-eye',
    status:'',
  }

  goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword')
  goToSignup = () => this.props.navigation.navigate('Signup')

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }

  handleOnLogin = async (values, actions) => {
    const { email, password } = values
    try {
      const response = await this.props.firebase.loginWithEmail(email, password)
      

      if (response.user) {
        console.log("response.user", response.user.uid)
        console.log('firebefore', firebase.auth())

        const dbRef = firebase.firestore().collection('users').doc(response.user.uid)
        dbRef.get().then((res) => {
          if (res.exists) {
            const user = res.data();
            // console.log("user", user)
            this.setState({
              status:user.status,
            });
            
            if(user.status == "admin"){
              this.props.navigation.navigate('Admin', {userkey:response.user.uid})
            }if(user.status == "user"){
              this.props.navigation.navigate('User', {userkey:response.user.uid})
            }
            
          } else {
            console.log("Document does not exist!");
          }
        })

        // console.log("statexxx", user.status)
        
        console.log('fireafter', firebase.auth())
      }
    } catch (error) {
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  render() {
    const { passwordVisibility, rightIcon } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/loginbg.png')}
          style={globalStyles.ImageDimension}
        >
        <View style={styles.Form}> 
        <Formik
        
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            this.handleOnLogin(values, actions)
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting
          }) => (
            <Fragment>
              <FormInput
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder='Enter email'
                autoCapitalize='none'
                // iconName='ios-mail'
                iconColor='#1F37DD'
                style={{paddingTop:10}}
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name='password'
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder='Enter password'
                secureTextEntry={passwordVisibility}
                // iconName='ios-lock'
                iconColor='#1F37DD'
                onBlur={handleBlur('password')}
                rightIcon={
                  <TouchableOpacity onPress={this.handlePasswordVisibility}>
                    <Ionicons name={rightIcon} size={28} color='grey' />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='LOGIN'
                  buttonColor='#1F37DD'
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#EA2D52'
          }}
          type='clear'
        />

        <Button
          title='Forgot Password?'
          onPress={this.goToForgotPassword}
          titleStyle={{
            color: '#1F37DD'
          }}
          type='clear'
        />
        </View>
        {/* </View> */}
        </ImageBackground>
      </SafeAreaView>
    )
  }
}
const styles= StyleSheet.create({
  container:{
    // flex: 1,
    backgroundColor: '#fff',
    alignItems:'center'
    // marginTop: 50
  },
logoContainer: {
  marginBottom: 15,
  alignItems: 'center'
},
buttonContainer: {
  margin: 25,
  // backgroundColor:'#1F37DD',
},
Form:{
  flex:1,
  // backgroundColor:'#000',
  justifyContent:'center',
  
}
})

export default withFirebaseHOC(Login)
