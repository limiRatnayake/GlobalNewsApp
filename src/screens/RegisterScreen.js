import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity, 
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  
import globalStyles from '../../styles/GlobalStyles';
import styles from '../../styles/RegisterScreenStyles';

const SignUpScreen = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={globalStyles.title}>Sign up</Text>
          <Text style={globalStyles.subtitle}>
            Create an account to get started
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="name@email.com"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Create a password"
              secureTextEntry={true}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Confirm password"
              secureTextEntry={true}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
            {isChecked && <Icon name="check" size={14} color="#007BFF" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I've read and agree with the{' '}
            <Text style={styles.linkText}> Terms and Conditions</Text> and the{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </View>

        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already a member? <Text style={styles.linkText}>Login now</Text>
        </Text>
      </View>
    </View>
  );
};


export default SignUpScreen;
