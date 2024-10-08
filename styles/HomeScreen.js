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
    marginBottom: '8%',
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
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 10,
  },
  horizontalList: {
    marginVertical: 10,
    paddingHorizontal: 0,
    paddingBottom: '30%',
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
  badge: {
    position: 'absolute',
    right: 0,
    top: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
