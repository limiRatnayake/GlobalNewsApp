import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';

const SortingButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
        <Icon name="swap-vertical-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center', 
  },
  button: {
    backgroundColor: theme.color.primary,  
    borderRadius: 12,  
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SortingButton;
