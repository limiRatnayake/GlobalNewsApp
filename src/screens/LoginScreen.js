import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../../styles/LoginScreenStyles';
import globalStyles from '../../styles/GlobalStyles';
import Divider from '../components/Divider';
import {signInWithEmail, signInWithGoogle} from '../services/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {validateEmail, validatePassword} from '../utils/validation';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState({
    email: '',
    password: '',
    reqFailed: '',
  });

  const handleEmailLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setShowErrorMessage({
        email: emailError,
        password: passwordError,
      });
      return;
    }
    try {
      let userDetails = await signInWithEmail(email, password);
      console.log(userDetails, 'userDetails');
    } catch (error) {
      console.log('Login Error', error.message);
      setShowErrorMessage({
        reqFailed: error.message
          ? error.message
          : 'Something went wrong. Please try again later!',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    console.log('toucghed');

    try {
      let userDetails = await signInWithGoogle();
      console.log(userDetails, 'userDetails');
    } catch (error) {
      setShowErrorMessage({
        reqFailed: 'Something went wrong. Please try again later!',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageView}>
          <Image
            source={require('../../assets/images/loginImage.png')}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              showErrorMessage.email
                ? globalStyles.inputError
                : globalStyles.input,
            ]}
            placeholder="name@email.com"
            keyboardType="email-address"
            onChangeText={text => {
              setEmail(text);
              setShowErrorMessage(prev => ({...prev, email: ''}));
            }}
          />
          {showErrorMessage.email ? (
            <Text style={globalStyles.errorMessage}>
              {showErrorMessage.email}
            </Text>
          ) : null}
          <View
            style={[
              showErrorMessage.password
                ? globalStyles.inputErrorContainer
                : globalStyles.inputContainer,
            ]}>
            <TextInput
              style={globalStyles.inputWithIcon}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              onChangeText={text => {
                setPassword(text);
                setShowErrorMessage(prev => ({...prev, password: ''}));
              }}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <Icon name={!passwordVisible ? 'eye-slash' : 'eye'} size={24} />
            </TouchableOpacity>
          </View>
          {showErrorMessage.password || showErrorMessage.reqFailed ? (
            <Text style={globalStyles.errorMessage}>
              {showErrorMessage.password
                ? showErrorMessage.password
                : showErrorMessage.reqFailed}
            </Text>
          ) : null}
          {/* <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => handleEmailLogin()}>
            <Text style={globalStyles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.registerPwdContainer}>
            <Text style={styles.registerText}>Not a member?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={styles.registerLink}>Register now</Text>
            </TouchableOpacity>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.orText}>Or continue with</Text>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => handleGoogleSignIn()}>
            <Image
              style={styles.googleIcon}
              source={require('../../assets/icons/googleIcon.png')}
              alt="Google icon"
            />
            <Text style={styles.googleButtonText}>Sign In With Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
