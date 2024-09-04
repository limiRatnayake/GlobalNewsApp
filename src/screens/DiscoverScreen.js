import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsCard from '../components/NewsCard';
import styles from '../../styles/DiscoverScreenStyles';
import globalStyles from '../../styles/GlobalStyles';
import {fetchNewsBySources, fetchNewsByCategory} from '../services/news';
import {useDispatch, useSelector} from 'react-redux';
import {addCategoryList} from '../store/actions/categoryAction';
import {useIsFocused} from '@react-navigation/native';
import theme from '../../styles/theme'; 

const DiscoverScreen = props => {
  const [newsByCategory, setNewsByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [refreshItems, setRefreshItems] = useState(false);
  const {categoryList} = useSelector(state => state.category);
  const {networkAvailability} = useSelector(state => state.loader);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused || refreshItems || networkAvailability) {
      getNewsByCategory();
      setRefreshItems(false);
      setNewsByCategory([]);
      setCurrentPage(1);
      setHasMoreArticles(true);
    }
  }, [isFocused, refreshItems, networkAvailability]);

  const getNewsByCategory = async () => {
    try {
      let topHeadlinesByCategory = await fetchNewsBySources();
      dispatch(addCategoryList(topHeadlinesByCategory));
      console.log(
        topHeadlinesByCategory[0],
        categoryList,
        'topHeadlinesByCategory',
      );
      setIsLoading(true);
      getArticlesByCategory(topHeadlinesByCategory[selectedCategory], 1);
    } catch (error) {
      console.log('getNewsByCategory Error', error.message);
      dispatch(addCategoryList([]));
    }
  };

  const getArticlesByCategory = async (category, page) => {
    try {
      let articles = await fetchNewsByCategory(category, page);
      console.log(articles, category, 'articles');
      if (articles?.length > 0) {
        setHasMoreArticles(true);
        setNewsByCategory(prevArticles => [...prevArticles, ...articles]);
        setIsLoading(false);
      } else {
        setHasMoreArticles(false);
        setNewsByCategory([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('getArticlesByCategory Error', error.message);
      setNewsByCategory([]);
      setHasMoreArticles(false);
      setIsLoading(false);
    } finally {
      setLoadingMore(false);
      setHasMoreArticles(false);
      setIsLoading(false);
    }
  };

  const getDataByCategory = (category, index) => {
    console.log(category, 'getDataByCategory');

    setSelectedCategory(index);
    getArticlesByCategory(category, 1);
    setCurrentPage(1);
    setNewsByCategory([]);
  };

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
        articleIdNo={''}
        callBack={setRefreshItems}
        navigation={props.navigation}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={globalStyles.headerContainer}>
        <Text style={globalStyles.title}>Discover</Text>
        <Text style={globalStyles.subtitle}>News from around the world</Text>
      </View>
      <View style={{flexGrow: 0}}>
        <FlatList
          data={categoryList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.toString()}
          contentContainerStyle={styles.categoryListContainer}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  index === selectedCategory && styles.selectedCategoryButton,
                ]}
                onPress={() => getDataByCategory(item, index)}>
                <Text
                  style={
                    index === selectedCategory
                      ? styles.selectedCategoryText
                      : styles.categoryText
                  }>
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          }}
          style={styles.categoryList}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.color.primary} />
        ) : newsByCategory?.length > 0 ? (
          <FlatList
            data={newsByCategory}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            style={{marginBottom: '35%'}}
            onEndReached={() => {
              console.log(loadingMore, hasMoreArticles, 'onEndReached');
              if (!loadingMore) {
                setLoadingMore(true);
                setCurrentPage(prevPage => prevPage + 1);
                getArticlesByCategory(
                  categoryList[selectedCategory],
                  currentPage + 1,
                );
              }
            }}
            onEndReachedThreshold={0.5}
            renderItem={(item, index) => renderRecommendedNewsItem(item, index)}
          />
        ) : (
          <View>
            <Text>News are not available</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default DiscoverScreen;
