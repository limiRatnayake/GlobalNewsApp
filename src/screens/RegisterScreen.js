import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../styles/GlobalStyles';
import styles from '../../styles/RegisterScreenStyles';
import {
  passwordsMatch,
  validateEmail,
  validateName,
  validatePassword,
} from '../utils/validation';
import {signUpWithEmail} from '../services/auth';
import theme from '../../styles/theme';
import Icon2 from 'react-native-vector-icons/Ionicons';

const SignUpScreen = props => {
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
    reqFailed: '',
  });

  const toggleCheckbox = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleSignUp = async () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = passwordsMatch(password, confirmPassword);
    setLoading(true);
    if (
      nameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      !termsAccepted
    ) {
      setShowErrorMessage({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        terms: 'You must agree to the terms and conditions',
      });
        setLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password, name, termsAccepted);
      if (!user.user) {
        setShowErrorMessage({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: ' ',
          reqFailed: user.message
            ? user.message
            : 'Something went wrong. Please try again later!',
        });
      }

       setLoading(false);
      console.log(user, 'USER SIGNUP');
    } catch (error) {
      setShowErrorMessage({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: ' ',
        reqFailed: error
          ? error
          : 'Something went wrong. Please try again later!',
      });
       setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={globalStyles.header}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon2 name="arrow-back" size={24} color={theme.color.primary} />
            </TouchableOpacity>
            <Text style={[globalStyles.title, {marginLeft: 10}]}>Sign up</Text>
          </View>
          <Text style={globalStyles.subtitle}>
            Create an account to get started
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[
                showErrorMessage.name
                  ? globalStyles.inputError
                  : globalStyles.input,
              ]}
              placeholder="Enter your name"
              placeholderTextColor="gray"
              onChangeText={text => {
                setName(text);
                setShowErrorMessage(prev => ({...prev, name: ''}));
              }}
            />
            {showErrorMessage.name ? (
              <Text style={globalStyles.errorMessage}>
                {showErrorMessage.name}
              </Text>
            ) : null}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={[
                showErrorMessage.email
                  ? globalStyles.inputError
                  : globalStyles.input,
              ]}
              placeholderTextColor="gray"
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
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                showErrorMessage.password
                  ? globalStyles.inputErrorContainer
                  : globalStyles.inputContainer,
              ]}>
              <TextInput
                style={globalStyles.inputWithIcon}
                placeholder="Create a password"
                secureTextEntry={!passwordVisible}
                placeholderTextColor="gray"
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
            {showErrorMessage.password ? (
              <Text style={globalStyles.errorMessage}>
                {showErrorMessage.password}
              </Text>
            ) : null}
            <View
              style={[
                showErrorMessage.confirmPassword
                  ? globalStyles.inputErrorContainer
                  : globalStyles.inputContainer,
              ]}>
              <TextInput
                style={globalStyles.inputWithIcon}
                placeholder="Confirm password"
                placeholderTextColor="gray"
                secureTextEntry={!confirmPasswordVisible}
                onChangeText={text => {
                  setConfirmPassword(text);
                  setShowErrorMessage(prev => ({...prev, confirmPassword: ''}));
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }>
                <Icon
                  name={!confirmPasswordVisible ? 'eye-slash' : 'eye'}
                  size={24}
                />
              </TouchableOpacity>
            </View>
            {showErrorMessage.confirmPassword ? (
              <Text style={globalStyles.errorMessage}>
                {showErrorMessage.confirmPassword}
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
            {termsAccepted && <Icon name="check" size={14} color="#007BFF" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I've read and agree with the{' '}
            <Text style={styles.linkText}> Terms and Conditions</Text> and the{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </View>
        {!termsAccepted && showErrorMessage.terms && (
          <Text style={globalStyles.errorMessage}>
            {showErrorMessage.terms}
          </Text>
        )}
        {showErrorMessage.reqFailed && (
          <Text style={globalStyles.errorMessage}>
            {showErrorMessage.reqFailed}
          </Text>
        )}
        <TouchableOpacity
          style={globalStyles.button}
          disabled={loading}
          onPress={() => handleSignUp()}>
          {loading ? (
            <ActivityIndicator size="small" color={theme.color.white} />
          ) : (
            <Text style={globalStyles.buttonText}>Sign up</Text>
          )}
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => props.navigation.navigate('Login')}>
          Already a member? <Text style={styles.linkText}>Login now</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;
