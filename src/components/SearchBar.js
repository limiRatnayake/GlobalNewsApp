import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <Icon
        name="search-outline"
        size={20}
        color="black"
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Search"
        placeholderTextColor="gray"
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: theme.borderRadius,
    paddingHorizontal: 10, 
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
    fontWeight: 900
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;
