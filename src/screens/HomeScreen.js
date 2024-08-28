import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {signOut} from '../services/auth';
import NewsCard from '../components/NewsCard';
import BreakingNewsCard from '../components/BreakingNewsCard';
import styles from '../../styles/HomeScreen';
import {fetchLatestNewsArticles, fetchTopHeadlines} from '../services/news';
import {TextInput} from 'react-native';
import SortingButton from '../components/SortingButton';
import SearchBar from '../components/SearchBar';
import SortOptionsModal from '../components/SortOptionModal';
import ProfileImage from '../components/ProfileImage';
import {useIsFocused} from '@react-navigation/native';
const articles = [
  {
    source: {
      id: null,
      name: 'Gizmodo.com',
    },
    author: 'Matthew Gault',
    title: 'Whatever Polymarket Is, It’s Not the Future of News',
    description:
      'A betting market is gambling that financial incentives can be the ultimate arbiters of truth.',
    url: 'https://gizmodo.com/whatever-polymarket-is-its-not-the-future-of-news-2000491209',
    urlToImage: 'https://gizmodo.com/app/uploads/2024/08/Polymarket.jpg',
    publishedAt: '2024-08-27T12:05:13Z',
    content:
      'If youre a degenerate gambler then you probably already know that Polymarket is predicting that Trump will win the U.S. election. If youre not a degenerate gambler, then you may not even know what Po… [+10143 chars]',
  },
  {
    source: {
      id: null,
      name: 'Gizmodo.com',
    },
    author: 'Kyle Barr',
    title: 'All the Biggest News From Gamescom 2024, So Far',
    description:
      "We've seen gameplay for Call of Duty: Black Ops 6 and Dune: Awakening, but there's more than enough trailers to wet your whistle as you wait for Indiana Jones: The Great Circle, now coming to PS5.",
    url: 'https://gizmodo.com/all-the-biggest-news-from-gamescom-2024-so-far-2000489120',
    urlToImage:
      'https://gizmodo.com/app/uploads/2024/08/Borderlands-4-teaser.jpeg',
    publishedAt: '2024-08-20T22:00:35Z',
    content:
      'Gamescom 2024 Opening Night Live has come and gone, leaving us with a heap of trailers to chew through on big games, small games, and short movies about games. Your big tentpole franchises are herein… [+5798 chars]',
  },
  {
    source: {
      id: 'wired',
      name: 'Wired',
    },
    author: 'Dell Cameron, Lily Hay Newman',
    title: 'Stop X’s Grok AI From Training on Your Tweets',
    description:
      'Plus: More Pegasus spyware controversy, a major BIOS controversy, and more of the week’s top security news.',
    url: 'https://www.wired.com/story/x-grok-ai-training-pegasus/',
    urlToImage:
      'https://media.wired.com/photos/66a42a0afcd6369d908d0d6b/191:100/w_1280,c_limit/1564298467',
    publishedAt: '2024-07-27T13:00:00Z',
    content:
      'The fallout from CrowdStrikes deleterious software update came into full view this week as system administrators and IT staffers scrambled to get digital systems back online and return operations to … [+3255 chars]',
  },
  {
    source: {
      id: null,
      name: 'Gizmodo.com',
    },
    author: 'Matt Novak',
    title:
      'Trump Supporters Say Big Tech Is Censoring News About Their Big Boy President',
    description:
      'Trump folks still give AI way too much credit as a reliable tool.',
    url: 'https://gizmodo.com/trump-supporters-say-big-tech-is-censoring-news-about-their-big-boy-president-2000480765',
    urlToImage:
      'https://gizmodo.com/app/uploads/2024/07/GettyImages-2162996431.jpg',
    publishedAt: '2024-07-30T13:45:38Z',
    content:
      'Donald Trump was the target of an assassination attempt on July 13 during a rally in Butler, Pennsylvania when a man shot at him from about 130 yards away. That much is undisputed at this point. But … [+5532 chars]',
  },
  {
    source: {
      id: null,
      name: 'Gizmodo.com',
    },
    author: 'James Whitbrook',
    title: 'All the News, Trailers, and Cosplay From San Diego Comic-Con 2024',
    description:
      'Another Comic-Con has come to an end–but io9 was there every step of the way to bring you all the news, just in case you missed anything.',
    url: 'https://gizmodo.com/san-diego-comic-con-2024-news-marvel-dc-star-wars-2000480671',
    urlToImage:
      'https://gizmodo.com/app/uploads/2024/07/sdcc-news-round-up-marvel-star-trek-rings-of-power.jpg',
    publishedAt: '2024-07-29T17:20:13Z',
    content:
      '"Borg, Borg, Borg! I love the Borg!", Davies boomed when asked during a San Diego Comic-Con panel celebrating Doctor Who and Star Trek\'s shared values.',
  },
  {
    source: {
      id: null,
      name: 'Gizmodo.com',
    },
    author: 'Germain Lussier',
    title: 'All the Movie, TV, Game, and Theme Park News From D23 2024',
    description:
      "From Star Wars and Marvel to Avatar and animation, we've got all the biggest news from Disney's massive conventions, D23.",
    url: 'https://gizmodo.com/all-the-movie-tv-game-and-theme-park-news-from-d23-2024-2000485897',
    urlToImage: 'https://gizmodo.com/app/uploads/2024/08/D23-2024-recap.jpg',
    publishedAt: '2024-08-12T17:10:23Z',
    content:
      'People often ask what the heck D23 is and the easiest way to describe it is a comic convention, but only for Disney. Every few years, the Walt Disney Company brings every nook and cranny of its prope… [+1097 chars]',
  },
  {
    source: {
      id: null,
      name: 'Gizmodo.com',
    },
    author: 'James Whitbrook',
    title:
      'BBC Pulls 2006 Doctor Who Episode Featuring Disgraced News Broadcaster From Streaming',
    description:
      '"Fear Her" features a prominent appearance by former BBC News anchor Huw Edwards, who pleaded guilty this week to three counts of making indecent images of children.',
    url: 'https://gizmodo.com/doctor-who-huw-edwards-fear-her-streaming-bbc-2000482581',
    urlToImage:
      'https://gizmodo.com/app/uploads/2024/08/doctor-who-fear-her-10th-doctor-rose.jpg',
    publishedAt: '2024-08-02T16:00:16Z',
    content:
      'The BBC has pulled the 2006 Doctor Who episode “Fear Her” from streaming on its iPlayer platform, after one of its guest stars, former BBC news anchor Huw Edwards, plead guilty in UK courts on counts… [+2927 chars]',
  },
  {
    source: {
      id: null,
      name: 'NPR',
    },
    author: 'Steve Inskeep',
    title: 'Morning news brief',
    description:
      'Inflation falls to its lowest level in more than three years. A new round of talks to end the war in Gaza is set to begin in Doha. There’s some violence on the streets in the Bangladeshi capital.',
    url: 'https://www.npr.org/2024/08/15/nx-s1-5074826/morning-news-brief',
    urlToImage:
      'https://media.npr.org/include/images/facebook-default-wide-s1400-c100.jpg',
    publishedAt: '2024-08-15T08:15:58Z',
    content:
      'Inflation falls to its lowest level in more than three years. A new round of talks to end the war in Gaza is set to begin in Doha. Theres some violence on the streets in the Bangladeshi capital.',
  },
  {
    source: {
      id: null,
      name: 'NPR',
    },
    author: 'A Martínez',
    title: 'Morning news brief',
    description:
      'Israel hits Hezbollah targets in Lebanon in "preemptive strike." VP Harris’ ties with Donald Trump in some swing states in latest poll. EX-LA mayor Eric Garcetti is accused of lying under oath.',
    url: 'https://www.npr.org/2024/08/26/nx-s1-5087437/morning-news-brief',
    urlToImage:
      'https://media.npr.org/include/images/facebook-default-wide-s1400-c100.jpg',
    publishedAt: '2024-08-26T07:49:42Z',
    content:
      'Israel hits Hezbollah targets in Lebanon in "preemptive strike." VP Harris ties with Donald Trump in some swing states in latest poll. EX-LA mayor Eric Garcetti is accused of lying under oath.',
  },
  {
    source: {
      id: null,
      name: 'NPR',
    },
    author: 'Steve Inskeep',
    title: 'Morning news brief',
    description:
      'Israel blames Hezbollah for deadly rocket strike. Venezuela’s electoral authority declares President Maduro the winner of Sunday’s election. Donald Trump escalates his attacks against VP Harris.',
    url: 'https://www.npr.org/2024/07/29/nx-s1-5051526/morning-news-brief',
    urlToImage:
      'https://media.npr.org/include/images/facebook-default-wide-s1400-c100.jpg',
    publishedAt: '2024-07-29T09:02:13Z',
    content:
      'Israel blames Hezbollah for deadly rocket strike. Venezuelas electoral authority declares President Maduro the winner of Sundays election. Donald Trump escalates his attacks against VP Harris.',
  },
];
const HomeScreen = props => {
  const [topHeading, setTopHeadings] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [callNewsArticles, setCallNewsArticles] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getTopHeadings();
      getNewArticles();
      setRecommendedArticles([]);
    } else {
      setRecommendedArticles([]);
    }
  }, [isFocused]);

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
        article={item}
        articleIdNo={''}
        callBack={() => {}}
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
        <SearchBar
          setRecommendedArticles={setRecommendedArticles}
          selectedOption={selectedOption}
          isFocused={isFocused}
        />
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
