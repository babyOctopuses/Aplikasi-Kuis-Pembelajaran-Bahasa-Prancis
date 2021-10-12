import React, { Component, Fragment } from 'react'
import { Text, SafeAreaView, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../../component/FormInput'
import FormButton from '../../component/FormButton'
import ErrorMessage from '../../component/ErrorMessage'
import { withFirebaseHOC } from '../../routes/firebaseConfig'

class ForgotPassword extends Component {
  
    handlePasswordReset = async (values, actions) => {
        const { email } = values
      
        try {
          console.log('firebase.passwordReset', this.props)
          await this.props.firebase.passwordReset(email)
          console.log('Password reset email sent successfully')
          this.props.navigation.navigate('Login')
        } catch (error) {
          actions.setFieldError('general', error.message)
        }
      }

    render() {
        const validationSchema = Yup.object().shape({
            email: Yup.string()
              .label('Email')
              .email('Enter a valid email')
              .required('Please enter a registered email')
          })
    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Forgot Password?</Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions)
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
                iconName='ios-mail'
                iconColor='#2C384A'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              
              <View style={styles.buttonContainer}>
                <FormButton
               buttonType='outline'
                  onPress={handleSubmit}
                  title='Send Email'
                  buttonColor='#039BE5'
                  disabled={!isValid || isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
      </SafeAreaView>
    )
  }
}

export default withFirebaseHOC(ForgotPassword)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   marginTop: 150
    },
    text: {
      color: '#333',
      fontSize: 24,
      marginLeft: 25,
      marginTop: 25,
    },
    buttonContainer: {
      margin: 25
    }
  })