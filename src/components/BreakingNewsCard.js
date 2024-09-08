import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import theme from '../../styles/theme';
import {formatDate, getDifferenceFromNow} from '../utils/dateUtils';

const BreakingNewsCard = ({item, index}) => {
  const timeSincePublished = getDifferenceFromNow(item.publishedAt); 
  const imageUrl = item.urlToImage !== '' ? item.urlToImage : null;

  const Container = imageUrl ? ImageBackground : View;
  const containerProps = imageUrl ? {source: {uri: imageUrl}} : {};

  return (
    <Container key={index} style={styles.horizontalItem} {...containerProps}>
      <View style={styles.opacityBackground}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.subText}> {timeSincePublished} ago</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  horizontalItem: {
    width: 250,
    height: 120,
    backgroundColor: theme.color.accent,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  opacityBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: 'white',
    textAlign: 'flex-start',
    paddingHorizontal: 12,
    fontFamily: theme.fonts.semiBold,
  },
  subText: {
    color: theme.color.white,
    textAlign: 'flex-start',
    paddingHorizontal: 8,
  },
});

export default BreakingNewsCard;
