import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NewsCard from '../components/NewsCard';
import styles from '../../styles/HomeScreen';
import globalStyles from '../../styles/GlobalStyles';
// import {getBookmarks} from '../services/user';
import {useIsFocused} from '@react-navigation/native';
import theme from '../../styles/theme';
import { getBookmarks } from '../services/SQLiteService';

const BookmarkScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [refreshItems, setRefreshItems] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsLoading(true);
    if (isFocused || refreshItems) {
      const fetchBookmarks =  () => {
           getBookmarks(articles => {
             // const articles = await getBookmarks();
             console.log(articles, 'fetchBookmarks');

             setBookmarkedArticles(articles);
             setRefreshItems(false);
             setIsLoading(false);
           });
      };

      fetchBookmarks();
    } else {
      setIsLoading(false);
    }
  }, [isFocused, refreshItems]);

  const renderRecommendedNewsItem = ({item, index}) => {
    return (
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
        navigation={props.navigation}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={globalStyles.headerContainer}>
        <Text style={globalStyles.title}>Bookmarks</Text>
        <Text style={globalStyles.subtitle}>Your favourites </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.color.primary} />
      ) : bookmarkedArticles?.length > 0 ? (
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
