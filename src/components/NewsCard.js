import moment from 'moment';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NewsCard = ({
  index,
  title,
  isHorizontal,
  userProfile,
  timestamp,
  category,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <View key={index} style={[styles.card, styles.verticalCard]}>
      {/* <Image source={{uri: userProfile}} style={styles.userProfile} /> */}
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {userProfile}
            </Text>
            <Text style={styles.timestamp}>
              {moment(timestamp).format('DD/MM/YYYY HH:MM A')}
            </Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.footer}>
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
    width: '98%',
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
    justifyContent: 'flex-end',
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
