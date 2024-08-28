import React, {useEffect, useState} from 'react';
import {View, TextInput, FlatList, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsCard from '../components/NewsCard';
import styles from '../../styles/DiscoverScreenStyles';
import globalStyles from '../../styles/GlobalStyles';
import {fetchNewsBySources, fetchNewsByCategory} from '../services/news';
import {useDispatch, useSelector} from 'react-redux';
import {addCategoryList} from '../store/actions/categoryAction';
import {useIsFocused} from '@react-navigation/native';
const categories = ['All News', 'Sports', 'Technology', 'Business'];
const DiscoverScreen = props => {
  const [newsByCategory, setNewsByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [refreshItems, setRefreshItems] = useState(false);
  const {categoryList} = useSelector(state => state.category);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused || refreshItems) {
      getNewsByCategory();
      setRefreshItems(false);
      setNewsByCategory([]);
    }
  }, [isFocused, refreshItems]);

  const getNewsByCategory = async () => {
    try {
      let topHeadlinesByCategory = await fetchNewsBySources();
      dispatch(addCategoryList(topHeadlinesByCategory));
      console.log(
        topHeadlinesByCategory[0],
        categoryList,
        'topHeadlinesByCategory',
      );

      getArticlesByCategory(topHeadlinesByCategory[0]);
    } catch (error) {
      console.log('getNewsByCategory Error', error.message);
      dispatch(addCategoryList([]));
    }
  };
  const getArticlesByCategory = async category => {
    try {
      let articles = await fetchNewsByCategory(category);
      console.log(articles, category, 'articles');

      setNewsByCategory(articles);
    } catch (error) {
      console.log('getArticlesByCategory Error', error.message);
      setNewsByCategory([]);
    }
  };

  const getDataByCategory = (category, index) => {
    console.log(category, 'getDataByCategory');

    setSelectedCategory(index);
    getArticlesByCategory(category);
  };

  const renderRecommendedNewsItem = ({item, index}) => {
    return (
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
          articleIdNo={''}
          callBack={setRefreshItems}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={globalStyles.headerContainer}>
        <Text style={globalStyles.title}>Discover</Text>
        <Text style={globalStyles.subtitle}>News from around the world</Text>
      </View>
      {/* <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            marginRight: 10,
          }}
        />
        <TouchableOpacity>
          <Icon name="filter-outline" size={28} />
        </TouchableOpacity>
      </View> */}
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
        {newsByCategory?.length > 0 ? (
          <FlatList
            data={newsByCategory}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
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
