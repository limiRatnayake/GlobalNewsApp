import { StyleSheet } from "react-native";
import theme from "./theme";

const RegisterScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    marginBottom: 20,
  },

  formContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: theme.color.black,
    fontFamily: theme.fonts.bold,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  checkboxTick: {
    width: 14,
    height: 14,
    backgroundColor: '#007BFF',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    color: theme.color.primary,
    fontFamily: theme.fonts.semiBold,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default RegisterScreenStyles;