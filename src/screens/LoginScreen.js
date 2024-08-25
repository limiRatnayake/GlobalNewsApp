import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../../styles/LoginScreenStyles';
import globalStyles from '../../styles/GlobalStyles';
import Divider from '../components/Divider';

const LoginScreen = props => {
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
            style={globalStyles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={globalStyles.button}>
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
            onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={styles.googleButtonText}>Sign In With Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
