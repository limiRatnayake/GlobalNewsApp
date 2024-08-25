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
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: theme.color.lightGray,
    borderRadius: theme.borderRadius,
    marginBottom: 15,
    backgroundColor: theme.color.white,
    fontFamily: theme.fonts.regular,
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
});

export default globalStyles;
