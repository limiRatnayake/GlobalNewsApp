import React, {useEffect} from 'react';
import {
  FlatList,
  Image, 
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {signOut} from '../services/auth';
import NewsCard from '../components/NewsCard'; 
import BreakingNewsCard from '../components/BreakingNewsCard';
import styles from '../../styles/HomeScreen';
const breakingNewsData = [
  {
    id: '1',
    title: 'Breaking News 1',
    userProfile: 'https://via.placeholder.com/30',
    timestamp: '1 hour ago',
    category: 'Sports',
  },
  {
    id: '2',
    title: 'Breaking News 2',
    userProfile: 'https://via.placeholder.com/30',
    timestamp: '2 hours ago',
    category: 'Tech',
  },
  {
    id: '3',
    title: 'Breaking News 3',
    userProfile: 'https://via.placeholder.com/30',
    timestamp: '3 hours ago',
    category: 'World',
  },
  // Add more items as needed
];

const recommendedNewsData = [
  {
    id: '1',
    title: 'Samsung Galaxy Ultra Watch copies everything expects valu...',
    userProfile: 'https://via.placeholder.com/30',
    timestamp: '1 hour ago',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Another News Item',
    userProfile: 'https://via.placeholder.com/30',
    timestamp: '2 hours ago',
    category: 'Business',
  },
  {
    id: '3',
    title: 'More News Item',
    userProfile: 'https://via.placeholder.com/30',
    timestamp: '3 hours ago',
    category: 'Lifestyle',
  },
  {
    id: '4',
    title: 'More News Item',
    userProfile: 'https://via.placeholder.com/30',
    timestamp: '3 hours ago',
    category: 'Lifestyle',
  },
  {
    id: '5',
    title: 'More News Item',
    userProfile: 'https://via.placeholder.com/30',
    timestamp: '3 hours ago',
    category: 'Lifestyle',
  },
];

const HomeScreen = () => {
  useEffect(() => {
    // signZOut();
  }, []);

  const renderBreakingNewsItem = ({item}) => (
    <BreakingNewsCard item />
  );

  const renderRecommendedNewsItem = ({item}) => (
    <NewsCard
      title={item.title}
      isHorizontal={false}
      userProfile={item.userProfile}
      timestamp={item.timestamp}
      category={item.category}
    />
  );

  const signZOut = async () => {
    try {
      let userDetails = await signOut();
      console.log('signOut');
    } catch (error) {
      console.log('Login Error', error.message);
    }
  };
  
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
              <Icon name="search" size={24}   style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="notifications-none"
                size={24} 
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.heading}>Breaking News</Text>
        <TouchableOpacity>
          <Text style={styles.extraHeading}>Show more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={breakingNewsData}
        renderItem={renderBreakingNewsItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
      <View style={styles.containerRow}>
        <Text style={styles.subHeading}>Recommended for you</Text>
        <TouchableOpacity>
          <Text style={styles.extraHeading}>Show more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recommendedNewsData}
        renderItem={renderRecommendedNewsItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.verticalList}
      />
    </View>
  );
};



export default HomeScreen;
