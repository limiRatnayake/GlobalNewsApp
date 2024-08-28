import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {signOut} from '../services/auth';
import NewsCard from '../components/NewsCard';
import BreakingNewsCard from '../components/BreakingNewsCard';
import styles from '../../styles/HomeScreenStyles';
import {fetchLatestNewsArticles, fetchTopHeadlines} from '../services/news';
import {TextInput} from 'react-native';
import SortingButton from '../components/SortingButton';
import SearchBar from '../components/SearchBar';
import SortOptionsModal from '../components/SortOptionModal';
import ProfileImage from '../components/ProfileImage';

const HomeScreen = props => {
  const [topHeading, setTopHeadings] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [callNewsArticles, setCallNewsArticles] = useState(false);

  useEffect(() => {
    getTopHeadings();
    getNewArticles();
  }, []);

  useEffect(() => {
    callNewsArticles && getNewArticles();
  }, [selectedOption]);

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

  const getNewArticles = useCallback(async () => {
    try {
      let newArticles = await fetchLatestNewsArticles('', '', selectedOption);
      console.log('newArticles', newArticles);
      setRecommendedArticles(newArticles);
      setCallNewsArticles(false);
    } catch (error) {
      console.log('newsTopHeading Error', error.message);
      setTopHeadings([]);
      setCallNewsArticles(false);
    }
  }, [selectedOption]);

  // const getNewArticles = async () => {
  //   try {
  //     let newArticles = await fetchLatestNewsArticles(
  //       (q = 'apple'),
  //       (from = ''),
  //       (sortBy = selectedOption),
  //     );
  //     console.log('newArticles', newArticles);
  //     setRecommendedArticles(newArticles);
  //   } catch (error) {
  //     console.log('newsTopHeading Error', error.message);
  //     setTopHeadings([]);
  //   }
  // };

  const renderBreakingNewsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          props.navigation.navigate('ArticleView', {
            params: {
              item: item,
            },
          })
        }>
        <BreakingNewsCard item={item} index={index} />
      </TouchableOpacity>
    );
  };

  const renderRecommendedNewsItem = ({item, index}) => (
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
      />
    </TouchableOpacity>
  );

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
            {/* <TouchableOpacity>
              <Icon name="search" size={30} style={styles.icon} />
            </TouchableOpacity> */}
            <TouchableOpacity>
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
        <SearchBar />
        <SortingButton onPress={handleOpenModal} />
      </View>

      {/* {topHeading.length > 0 && (
        <>
          <View style={styles.containerRow}>
            <Text style={styles.heading}>Breaking News</Text>
            <TouchableOpacity>
              <Text style={styles.extraHeading}>Show more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={topHeading}
            renderItem={(item, index) => renderBreakingNewsItem(item, index)}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </>
      )} */}
      {/* <View style={styles.containerRow}>
        <Text style={styles.subHeading}>Recommended for you</Text>
        <TouchableOpacity>
          <Text style={styles.extraHeading}>Show more</Text>
        </TouchableOpacity>
      </View> */}
      <FlatList
        data={recommendedArticles}
        renderItem={(item, index) => renderRecommendedNewsItem(item, index)}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.verticalList}
      />
      <SortOptionsModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSelectOption={handleOptionSelect}
      />
    </View>
  );
};

export default HomeScreen;
