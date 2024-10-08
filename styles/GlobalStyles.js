import {StyleSheet} from 'react-native';
import theme from './theme';

export const dimensions = {
  paddingSmall: 8,
  paddingMedium: 16,
  paddingLarge: 32,
  borderRadius: 5,
};

const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  button: {
    width: '100%',
    backgroundColor: theme.color.primary,
    paddingVertical: 15,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    marginBottom: 10,
    fontFamily: theme.fonts.semiBold,
  },
  buttonText: {
    color: '#fff',
    fontFamily: theme.fonts.semiBold,
  },
  buttonWithBorder: {
    width: '100%',
    borderColor: theme.color.primary,
    paddingVertical: 15,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    marginBottom: 10,
    fontFamily: theme.fonts.semiBold,
    borderWidth: 1,
  },
  buttonWithBorderText: {
    color: theme.color.primary,
    fontFamily: theme.fonts.semiBold,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: theme.color.lightGray,
    borderRadius: theme.borderRadius,
    marginBottom: 15,
    backgroundColor: theme.color.white,
    fontFamily: theme.fonts.regular,
    color: theme.color.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: theme.borderRadius,
    marginBottom: 15,
    backgroundColor: theme.color.white,
    paddingHorizontal: 10,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    color: theme.color.black,
  },
  inputErrorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.color.white,
    paddingHorizontal: 10,
    borderColor: theme.color.error,
  },
  inputError: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: theme.color.error,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.color.white,
    fontFamily: theme.fonts.regular,
    color: theme.color.black,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: theme.color.naturalGray,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.extraBold,
    color: theme.color.black,
  },
  subtitle: {
    fontSize: 16,
    color: theme.color.lightGray,
    marginBottom: 20,
    fontFamily: theme.fonts.regular,
  },
  errorMessage: {
    marginBottom: 15,
    color: theme.color.error,
  },
  successMessage: {
    marginBottom: 15,
    color: theme.color.success,
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
});

export default globalStyles;
