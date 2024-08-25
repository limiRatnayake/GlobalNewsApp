import {StyleSheet} from 'react-native';
import theme from './theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.padding.mainPadding,
    backgroundColor: theme.color.white,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontFamily: theme.fonts.semiBold,
    color: theme.color.black,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginHorizontal: 10,
    color: theme.color.primary,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
  horizontalList: {
    marginVertical: 10,
    paddingHorizontal: 0,
    paddingBottom: '20%',
  },
  horizontalItem: {
    width: 200,
    height: 120,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.color.black,
    fontFamily: theme.fonts.medium,
  },
  extraHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.color.primary,
    fontFamily: theme.fonts.medium,
  },
  verticalList: {
    flexGrow: 0,
    paddingVertical: 10,
  },
  verticalItem: {
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
});
