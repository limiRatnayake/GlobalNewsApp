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
    fontFamily: theme.fonts.extraBold,
    marginBottom: 20,
    justifyContent: 'flex-start',
    color: '#000',
  },
  inputContainer: {
    width: '100%',
  },

  forgotPasswordContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start'
  },
  forgotPasswordText: {
    alignSelf: 'flex-start',
    color: theme.color.primary,
    marginBottom: 20,
    fontFamily: theme.fonts.semiBold,
  },
  registerPwdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  registerText: {
    color: '#666',
    marginRight: '2%',
  },
  registerLink: {
    color: '#007aff',
    fontFamily: theme.fonts.semiBold,
  },
  orText: {
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  googleButton: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  googleIcon: {width: 24, height: 24, marginRight: 10},
  googleButtonText: {
    color: theme.color.black,
    fontFamily: theme.fonts.extraBold
  },
  divider: {marginVertical: 10},
});

export default LoginScreenStyles;
