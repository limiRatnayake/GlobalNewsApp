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
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: theme.color.lightGray,
    borderRadius: theme.borderRadius,
    marginBottom: 15,
    backgroundColor: theme.color.white,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: theme.color.naturalGray,
  },
});

export default globalStyles;
