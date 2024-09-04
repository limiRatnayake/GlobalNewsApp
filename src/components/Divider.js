import React from 'react';
import {View} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';

const Divider = ({style}) => {
  return <View style={[globalStyles.divider, style]} />;
};

export default Divider;
