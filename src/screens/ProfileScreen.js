import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileImage from '../components/ProfileImage';
import globalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/theme';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {signOut} from '../services/auth';
import {getUserProfile, saveUserData, updateUserData} from '../services/user';
import {validateEmail, validateName} from '../utils/validation';
import styles from '../../styles/ProfileScreenStyles';

const ProfileScreen = props => {
  const [loading, setLoading] = useState('');
  const [saveLoading, setSaveLoading] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState({
    name: '',
    email: '',
    reqFailed: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    getUserDetails();
  }, []);

  const logoutUser = async () => {
    try {
      let userDetails = await signOut();
      console.log('signOut');
    } catch (error) {
      console.log('Login Error', error.message);
    }
  };

  const getUserDetails = async () => {
    setLoading(true);
    try {
      let userProfile = await getUserProfile();
      console.log('userDetails: ', userProfile);
      if (userProfile) {
        setName(userProfile.name || '');
        setEmail(userProfile.email || '');
      }
      setLoading(false);
    } catch (error) {
      console.log('get user details Error', error.message);
      setLoading(false);
    }
  };

  const saveUserDetails = async () => {
    setSaveLoading(true);
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    if (nameError || emailError) {
      setShowErrorMessage({
        name: nameError,
        email: emailError,
      });
      setSaveLoading(false);
      return;
    }
    let user = {
      email: email,
      name: name,
    };
    try {
      let data = await updateUserData(user);
      console.log('saveUserDetails: ', data);
      getUserDetails();
      setSuccessMessage(data);
      setShowErrorMessage({});
      setSaveLoading(false);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.log('save User Details Error', error);
      setSuccessMessage('');
      setShowErrorMessage({
        reqFailed: 'Something went wrong. Please try again later!',
      });
      setSaveLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.color.primary} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.color.primary} />
        ) : (
          <React.Fragment>
            <View style={styles.profileSection}>
              <ProfileImage identifier={name} size={80} />
              <Text style={styles.profileName}>{name}</Text>
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
                  value={name}
                  placeholder="Enter your name"
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
                  value={email}
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
            </View>
            {showErrorMessage.reqFailed && (
              <Text style={globalStyles.errorMessage}>
                {showErrorMessage.reqFailed}
              </Text>
            )}
            {successMessage && (
              <Text style={globalStyles.successMessage}>{successMessage}</Text>
            )}
            <TouchableOpacity
              style={globalStyles.buttonWithBorder}
              onPress={() => saveUserDetails()}>
              <Text style={globalStyles.buttonWithBorderText}>
                {saveLoading ? <ActivityIndicator size={'small'} color={theme.color.primary} /> : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
      </ScrollView>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => logoutUser()}>
        <Text style={globalStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
