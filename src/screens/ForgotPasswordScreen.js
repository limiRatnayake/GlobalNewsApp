import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import {resetPassword} from '../services/user';
import globalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/theme';
import {validateEmail} from '../utils/validation';

const ForgotPasswordScreen = props => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    const emailError = validateEmail(email);
    setLoading(true);
    if (emailError) {
      setErrorMessage(emailError);
      setLoading(false);
      return;
    }

    try {
      const emailExists = await resetPassword(email);
      if (emailExists) {
        setMessage('Password reset email sent! Check your inbox.');
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={globalStyles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={theme.color.primary} />
          </TouchableOpacity>
          <Text style={globalStyles.headerTitle}>Reset Password</Text>
        </View>
      </View>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={[
          errorMessage != '' ? globalStyles.inputError : globalStyles.input,
        ]}
        placeholder="name@email.com"
        keyboardType="email-address"
        placeholderTextColor="gray"
        onChangeText={text => {
          setEmail(text);
          setMessage('');
          setErrorMessage('');
        }}
      />
      {errorMessage ? (
        <Text style={globalStyles.errorMessage}>{errorMessage}</Text>
      ) : null}

      {message ? (
        <Text style={globalStyles.successMessage}>{message}</Text>
      ) : null}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => handlePasswordReset()}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.color.white} />
        ) : (
          <Text style={globalStyles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: theme.color.black,
    fontFamily: theme.fonts.bold,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
  noBookmarksText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  headerTitle: {
    color: theme.color.black,
  },
});

export default ForgotPasswordScreen;
