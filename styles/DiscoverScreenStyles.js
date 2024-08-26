import {StyleSheet} from 'react-native';
import theme from './theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  categoryList: {
    marginBottom: 20,
  },
  categoryListContainer: {
    padding: 0,
    margin: 0,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: '#EAF2FF',
    borderRadius: 20,
    marginRight: 10,
    margin: 0,
    justifyContent: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: theme.color.primary,
    padding: 0,
  },
  categoryText: {
    color: theme.color.primary,
    fontFamily: theme.fonts.semiBold,
  },
  selectedCategoryText: {
    color: theme.color.white,
    fontFamily: theme.fonts.semiBold,
  },
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  newsImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginRight: 16,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontWeight: 'bold',
  },
  newsSubtitle: {
    color: 'gray',
    marginBottom: 4,
  },
  newsCategory: {
    color: 'blue',
  },
});
