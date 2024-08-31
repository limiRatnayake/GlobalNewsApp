import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NewsCard from '../components/NewsCard';
import styles from '../../styles/HomeScreen';
import {fetchLatestNewsArticles, fetchTopHeadlines} from '../services/news';
import SortingButton from '../components/SortingButton';
import SearchBar from '../components/SearchBar';
import SortOptionsModal from '../components/SortOptionModal';
import ProfileImage from '../components/ProfileImage';
import {useIsFocused} from '@react-navigation/native';
import theme from '../../styles/theme';

const HomeScreen = props => {
  const [topHeading, setTopHeadings] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [callNewsArticles, setCallNewsArticles] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setRecommendedArticles([]);
      setCurrentPage(1, debouncedQuery);
      setHasMoreArticles(true);
      getTopHeadings();
      getNewArticles(1);
    } else {
      setRecommendedArticles([]);
    }
  }, [isFocused]);

  useEffect(() => {
    if (callNewsArticles) {
      getNewArticles(1, debouncedQuery);
      setRecommendedArticles([]);
    }
  }, [selectedOption]);

  useEffect(() => {
    setCurrentPage(1);
    setRecommendedArticles([]);
    setHasMoreArticles(true);
    getNewArticles(1, debouncedQuery);
  }, [debouncedQuery]);

  const getTopHeadings = async () => {
    try {
      let topHeadings = await fetchTopHeadlines();
      console.log('newsTopHeading', topHeadings);
      setTopHeadings(topHeadings);
    } catch (error) {
      console.log('newsTopHeading Error', error.message);
      setTopHeadings([]);
    }
  };

  const getNewArticles = useCallback(
    async (page = 1) => {
      if (isLoading || !hasMoreArticles) return;
      setIsLoading(true);
      console.log(page, 'p[age');
      try {
        let newArticles = await fetchLatestNewsArticles(
          debouncedQuery,
          selectedOption,
          page,
        );
        if (newArticles?.length > 0) {
          setRecommendedArticles(prevArticles => [
            ...prevArticles,
            ...newArticles,
          ]);
          setHasMoreArticles(true);
        } else {
          setHasMoreArticles(false);
        }
        setIsLoading(false);
      } catch (error) {
        console.log('newsTopHeading Error', error.message);
        setHasMoreArticles(false);
        setIsLoading(false);
        setLoadingMore(false);
      } finally {
        setIsLoading(false);
        setLoadingMore(false);
        setCallNewsArticles(false);
      }
    },
    [selectedOption, isLoading, hasMoreArticles, debouncedQuery],
  );
  const renderRecommendedNewsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
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
          callBack={() => {}}
        />
      </TouchableOpacity>
    );
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOptionSelect = option => {
    setSelectedOption(option);
    setCallNewsArticles(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileView')}>
            <ProfileImage identifier={'Lucas Scott'} size={50} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('NotificationView')}>
              <Icon name="notifications-none" size={30} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.heading}>Latest News</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          height: 50,
        }}>
        <SearchBar
          setRecommendedArticles={setRecommendedArticles}
          selectedOption={selectedOption}
          isFocused={isFocused}
          setDebouncedQuery={setDebouncedQuery}
        />
        <SortingButton onPress={handleOpenModal} />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.color.primary} />
      ) : (
        <>
          {recommendedArticles?.length > 0 ? (
            <FlatList
              data={recommendedArticles}
              renderItem={(item, index) =>
                renderRecommendedNewsItem(item, index)
              }
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.verticalList}
              onEndReached={() => {
                if (!loadingMore && hasMoreArticles) {
                  console.log(currentPage, 'onEndReached');

                  setLoadingMore(true);
                  setCurrentPage(prevPage => prevPage + 1);
                  getNewArticles(currentPage);
                }
              }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loadingMore ? <ActivityIndicator size="large" /> : null
              }
            />
          ) : (
            <View>
              <Text>News are not available</Text>
            </View>
          )}
        </>
      )}
      <SortOptionsModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSelectOption={handleOptionSelect}
      />
    </View>
  );
};

export default HomeScreen;
