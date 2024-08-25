import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NewsCard = ({title, isHorizontal, userProfile, timestamp, category}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <View
      style={[
        styles.card,
          styles.verticalCard,
      ]}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://via.placeholder.com/100'}}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Image source={{uri: userProfile}} style={styles.userProfile} />
          <View>
            <Text style={styles.title} numberOfLines={1}>
              Title
            </Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.category}>{category}</Text>
          <Icon
            name={isBookmarked ? 'bookmark' : 'bookmark-border'}
            size={24}
            color="black"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
  }, 
  verticalCard: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1, 
    // backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 80,
    height: 83,
    borderRadius: 12,
  },
  textContainer: {
    flex: 3,
    padding: 10,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userProfile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    color: '#888',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
});

export default NewsCard;
