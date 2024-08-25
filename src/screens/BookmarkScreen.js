import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {signOut} from '../services/auth';
import NewsCard from '../components/NewsCard';
import styles from '../../styles/HomeScreen';
import {fetchLatestNewsArticles, fetchTopHeadlines} from '../services/news';
import globalStyles from '../../styles/GlobalStyles';

const BookmarkScreen = () => {
  const [bookmarks, setBookmarks] = useState([]);
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
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={globalStyles.headerContainer}>
        <Text style={globalStyles.title}>Bookmarks</Text>
        <Text style={globalStyles.subtitle}>Your favourites </Text>
      </View>
      <FlatList
        data={bookmarks}
        renderItem={(item, index) => renderRecommendedNewsItem(item, index)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.verticalList}
      />
    </View>
  );
};
export default BookmarkScreen;
