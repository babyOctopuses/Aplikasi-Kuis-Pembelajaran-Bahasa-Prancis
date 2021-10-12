import React, { Component, Fragment } from 'react'
import { ImageBackground, StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../../component/FormInput'
import FormButton from '../../component/FormButton'
import ErrorMessage from '../../component/ErrorMessage'
import { withFirebaseHOC } from '../../routes/firebaseConfig'
import {globalStyles} from '../../constants/globalStyle'
import {MaterialIcons} from '@expo/vector-icons'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password should be at least 6 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
  // check: Yup.boolean().oneOf([true], 'Please check the agreement')
})

class AddUser extends Component {
  state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye'
  }

  goToLogin = () => this.props.navigation.navigate('AddUser')

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon:
        prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }

  handleConfirmPasswordVisibility = () => {
    this.setState(prevState => ({
      confirmPasswordIcon:
        prevState.confirmPasswordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility
    }))
  }

  handleOnAddUser = async (values, actions) => {
    const { name, email, password } = values
    const status= "admin";
    const xp= 0;
    
    const date= new Date();
    const year= date.getFullYear();
    const month= date.getMonth()
    const day= date.getDate();
    const today= day+"/"+(month+1)+"/"+year;
    const scores=['']

    try {
      const response = await this.props.firebase.signupWithEmail(
        email,
        password
      )

      if (response.user.uid) {
        const { uid } = response.user
        const userData = { email, name, uid, status, xp, scores }
        await this.props.firebase.createNewUser(userData)
        alert('Admin berhasil ditambah')
        this.props.navigation.navigate('Login')
      }
    } catch (error) {
      console.error(error)
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  render() {
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon
    } = this.state
    
    return (
      // <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/french.png')}
        style={globalStyles.ImageDimension}
      >
      <View style={styles.white}>
        <View style={styles.scrollView}>
          
          <View style={globalStyles.burgerContainer}>
              <TouchableOpacity onPress={()=>{this.props.navigation.openDrawer("Home")}}>
                <MaterialIcons name='menu' size={18} style={globalStyles.burger}/>
              </TouchableOpacity>
          </View>
        </View>
        
        <View >
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            check: false
          }}
          onSubmit={(values, actions) => {
            this.handleOnAddUser(values, actions)
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
            isSubmitting,
            setFieldValue
          }) => (
            <Fragment>
              <FormInput
                name='name'
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder='Enter your full name'
                iconName='md-person'
                iconColor='#2C384A'
                onBlur={handleBlur('name')}
              />
              <ErrorMessage errorValue={touched.name && errors.name} />
              <FormInput
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder='Enter email'
                autoCapitalize='none'
                iconName='ios-mail'
                iconColor='#2C384A'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name='password'
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder='Enter password'
                iconName='ios-lock'
                iconColor='#2C384A'
                onBlur={handleBlur('password')}
                secureTextEntry={passwordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={this.handlePasswordVisibility}>
                    <Ionicons name={passwordIcon} size={28} color='grey' />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <FormInput
                name='password'
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                placeholder='Confirm password'
                iconName='ios-lock'
                iconColor='#2C384A'
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry={confirmPasswordVisibility}
                rightIcon={
                  <TouchableOpacity
                    onPress={this.handleConfirmPasswordVisibility}>
                    <Ionicons
                      name={confirmPasswordIcon}
                      size={28}
                      color='grey'
                    />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage
                errorValue={touched.confirmPassword && errors.confirmPassword}
              />
              {/* <CheckBox
                containerStyle={styles.checkBoxContainer}
                checkedIcon='check-box'
                iconType='material'
                uncheckedIcon='check-box-outline-blank'
                title='Agree to terms and conditions'
                checkedTitle='You agreed to our terms and conditions'
                checked={values.check}
                onPress={() => setFieldValue('check', !values.check)}
              /> */}
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='Add User'
                  buttonColor='#F57C00'
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
        </View>
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    paddingHorizontal: 20,
    // alignItems:'center'
    // marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff'
  },
  scrollView:{
    width:"100%",
    alignItems:"flex-end",
    paddingHorizontal:20,
    // marginVertical:30
},
white:{
  margin: 10,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#fff'
}
})

export default withFirebaseHOC(AddUser)
