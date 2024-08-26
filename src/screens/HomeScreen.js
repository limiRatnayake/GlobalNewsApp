import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {signOut} from '../services/auth';
import NewsCard from '../components/NewsCard';
import BreakingNewsCard from '../components/BreakingNewsCard';
import styles from '../../styles/HomeScreen';
import {fetchLatestNewsArticles, fetchTopHeadlines} from '../services/news';

const HomeScreen = props => {
  const [topHeading, setTopHeadings] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopHeadings();
    getNewArticles();
    // signZOut();
  }, []);

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

  const getNewArticles = async () => {
    try {
      let newArticles = await fetchLatestNewsArticles(
        (q = ''),
        (from = ''),
        (sortBy = 'popularity'),
      );
      console.log('newArticles', newArticles);
      setRecommendedArticles(newArticles);
    } catch (error) {
      console.log('newsTopHeading Error', error.message);
      setTopHeadings([]);
    }
  };

  const signZOut = async () => {
    try {
      let userDetails = await signOut();
      console.log('signOut');
    } catch (error) {
      console.log('Login Error', error.message);
    }
  };

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
        />
      </TouchableOpacity>
    );

    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image
              source={{uri: 'https://via.placeholder.com/30'}}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Icon name="search" size={30} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="notifications-none" size={30} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {topHeading.length > 0 && (
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
      )}
      <View style={styles.containerRow}>
        <Text style={styles.subHeading}>Recommended for you</Text>
        <TouchableOpacity>
          <Text style={styles.extraHeading}>Show more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recommendedArticles}
        renderItem={(item, index) => renderRecommendedNewsItem(item, index)}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.verticalList}
      />
    </View>
  );
};

export default HomeScreen;
