import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BreakingNewsCard = ({item}) => {
  return (
    <View style={styles.horizontalItem}>
      <Text>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalItem: {
    width: 250,
    height: 120,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 12
  },
});
export default BreakingNewsCard;
