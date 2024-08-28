import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileImage from '../components/ProfileImage';
import globalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/theme';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { signOut } from '../services/auth';

const ProfileScreen = (props) => {
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
  const userName = 'Lucas Scott';

  const logoutUser = async () => {
    try {
      let userDetails = await signOut();
      console.log('signOut');
    } catch (error) {
      console.log('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.color.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <ProfileImage identifier={userName} size={80} />
          <Text style={styles.profileName}>{userName}</Text>
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
                onChangeText={text => {
                  setPassword(text);
                  setShowErrorMessage(prev => ({...prev, password: ''}));
                }}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon2
                  name={!passwordVisible ? 'eye-slash' : 'eye'}
                  size={24}
                />
              </TouchableOpacity>
            </View>
            {showErrorMessage.password ? (
              <Text style={globalStyles.errorMessage}>
                {showErrorMessage.password}
              </Text>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          style={globalStyles.buttonWithBorder}
          onPress={() => {}}>
          <Text style={globalStyles.buttonWithBorderText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => logoutUser()}>
        <Text style={globalStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: theme.padding.mainPadding,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  headerTitle: {
    fontSize: 18,
    color: theme.color.black,
    fontFamily: theme.fonts.semiBold,
    marginLeft: 8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: theme.color.black,
    fontFamily: theme.fonts.bold,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  logoutButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
