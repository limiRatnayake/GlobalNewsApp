import { StyleSheet } from "react-native"; 
import theme from "./theme";

const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.bgOpacity,
  },
  imageContainer: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    width: 250,
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bodyContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: theme.color.white,
    borderRadius: 25,
    paddingHorizontal: '10%',
    paddingVertical: '10%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'flex-start',
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },

  forgotPasswordContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  forgotPasswordText: {
    alignSelf: 'flex-start',
    color: theme.color.primary,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerText: {
    color: '#666',
    marginBottom: 10,
  },
  registerLink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  orText: {
    color: '#666',
    marginBottom: 10,
  },
  googleButton: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#666',
  },
  divider: {marginVertical: 10},
});

export default LoginScreenStyles;
