import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NewsCard from '../components/NewsCard';
import styles from '../../styles/HomeScreen';
import globalStyles from '../../styles/GlobalStyles';
import {getBookmarks} from '../services/user';
import { useIsFocused } from '@react-navigation/native';

const BookmarkScreen = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [refreshItems, setRefreshItems] = useState(false);
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused || refreshItems) {
      const fetchBookmarks = async () => {
        const articles = await getBookmarks();
        console.log(articles, 'fetchBookmarks');

        setBookmarkedArticles(articles);
        setRefreshItems(false);
      };

      fetchBookmarks();
    }
  }, [isFocused, refreshItems]);

  const renderRecommendedNewsItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() =>
        props.navigation.navigate('ArticleView', {
          item: item,
        })
      }>
      <NewsCard
        index={index}
        title={item.title}
        isHorizontal={false}
        userProfile={item.author}
        timestamp={item.publishedAt}
        category={item.category}
        urlToImage={item.urlToImage}
        article={item}
        articleIdNo={item.articleId}
        callBack={setRefreshItems}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={globalStyles.headerContainer}>
        <Text style={globalStyles.title}>Bookmarks</Text>
        <Text style={globalStyles.subtitle}>Your favourites </Text>
      </View>
      {bookmarkedArticles.length > 0 ? (
        <FlatList
          data={bookmarkedArticles}
          renderItem={(item, index) => renderRecommendedNewsItem(item, index)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.verticalList}
        />
      ) : (
        <Text style={style2.noBookmarksText}>No bookmarks available</Text>
      )}
    </View>
  );
};

const style2 = StyleSheet.create({
  
  noBookmarksText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookmarkScreen;
