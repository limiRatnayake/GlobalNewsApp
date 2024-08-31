import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {addBookmark, checkIsBookmarked, removeBookmark} from '../services/user';
import {generateUniqueId} from '../utils/uniqueArticleId';
import theme from '../../styles/theme';

const NewsCard = ({
  index,
  title,
  isHorizontal,
  userProfile,
  timestamp,
  category,
  urlToImage,
  article,
  articleIdNo,
  callBack,
  navigation,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const articleId = articleIdNo == '' ? generateUniqueId(article) : articleIdNo;

  useEffect(() => {
    const checkBookmarkStatus = async () => { 
      if (articleId) {
        const bookmarked = await checkIsBookmarked(articleId);
        setIsBookmarked(bookmarked);
      }
    };
    checkBookmarkStatus();
  }, [articleId]);

  const toggleBookmark =  () => {
    if (isBookmarked) {
       removeBookmark(articleId);
      setIsBookmarked(false);
      callBack(true);
    } else {
       addBookmark({
        articleId,
        title,
        timestamp,
        userProfile,
        urlToImage,
      });
      setIsBookmarked(true);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        navigation.navigate('ArticleView', {
          item: article,
          articleId: articleId,
        })
      }>
      <View key={index} style={[styles.card, styles.verticalCard]}>
        {urlToImage ? (
          <View style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              source={{uri: urlToImage}}
              style={styles.image}
            />
          </View>
        ) : null}
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
            <TouchableOpacity onPress={() => toggleBookmark()}>
              <Icon
                name={isBookmarked ? 'bookmark' : 'bookmark-border'}
                size={24}
                color={theme.color.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 90,
    height: 100,
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
    // width: 50,
    // height: 50,
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
    alignSelf: 'flex-end',
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
