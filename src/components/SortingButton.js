import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';

const SortingButton = (props) => {
  const showDot = props.selectedOption || props.fromDate || props.toDate;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
        <Icon name="swap-vertical-outline" size={24} color="white" />
        {showDot && <View style={styles.dot} />}
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
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.color.warning,
  },
});

export default SortingButton;
