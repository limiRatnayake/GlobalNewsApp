import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import styles from '../../styles/LoginScreenStyles';
import globalStyles from '../../styles/GlobalStyles';
import Divider from '../components/Divider';
import {signInWithEmail, signInWithGoogle} from '../services/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {validateEmail, validatePassword} from '../utils/validation';
import theme from '../../styles/theme';

const LoginScreen = props => {
  const [loading, setLoading] = useState('');
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
    setLoading(true);

    if (emailError || passwordError) {
      setShowErrorMessage({
        email: emailError,
        password: passwordError,
      });
      setLoading(false);
      return;
    }
    try {
      let userDetails = await signInWithEmail(email, password);
      if (!userDetails?.user) {
        setShowErrorMessage({
          reqFailed: userDetails.message
            ? userDetails.message
            : 'Something went wrong. Please try again later!',
        });
      }

      console.log(userDetails, 'userDetails');
      setLoading(false);
    } catch (error) {
      console.log('Login Error', error.message);
      setLoading(false);
      setShowErrorMessage({
        reqFailed: error.message
          ? error.message
          : 'Something went wrong. Please try again later!',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    console.log('toucghed');
    setLoading(true);
    try {
      let userDetails = await signInWithGoogle();
      console.log(userDetails, 'userDetails');
      setLoading(false);
    } catch (error) {
      setShowErrorMessage({
        reqFailed: 'Something went wrong. Please try again later!',
      });
      setLoading(false);
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
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
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
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => handleEmailLogin()}>
              <Text style={globalStyles.buttonText}>
                {loading ? (
                  <ActivityIndicator size="small" color={theme.color.white} />
                ) : (
                  'Login'
                )}
              </Text>
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
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;
