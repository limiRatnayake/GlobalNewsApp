import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../../styles/theme';
import moment from 'moment';
import {
  addBookmark,
  isArticleBookmarked,
  removeBookmark,
} from '../services/SQLiteService';

const ArticleScreen = props => {
  const {item, articleId} = props.route.params;
  const {networkAvailability} = useSelector(state => state.loader);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (articleId) {
        isArticleBookmarked(articleId, setIsBookmarked);
      }
    };
    checkBookmarkStatus();
  }, [articleId]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(articleId);
      setIsBookmarked(false);
    } else {
      addBookmark(item, success => {
        if (success) {
          setIsBookmarked(true);
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.color.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleBookmark()}>
          <Icon2
            name={isBookmarked ? 'bookmark' : 'bookmark-border'}
            size={24}
            color={theme.color.primary}
          />
        </TouchableOpacity>
      </View>
      {networkAvailability ? (
        <View style={{flex: 1}}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.color.primary} />
            </View>
          )}
          <WebView
            source={{uri: item?.url}}
            style={{flex: 1}}
            onLoadProgress={() => setLoading(false)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>
      ) : (
        <>
          <View style={styles.articleContainer}>
            <ScrollView>
              <Text style={styles.articleTitle}>{item?.title}</Text>
              {item.urlToImage && (
                <Image
                  source={{uri: item.urlToImage}}
                  style={styles.profileImage}
                />
              )}
              <View style={styles.articleMetaContainer}>
                <View>
                  <Text style={styles.articleMeta}>{item?.author}</Text>
                  <Text style={styles.articleTime}>
                    {moment(item?.publishedAt).format('DD/MM/YYYY HH:MM A')}
                  </Text>
                </View>
              </View>
              <Text style={styles.articleBody}>{item?.content}</Text>
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  articleContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    height: '100%',
  },
  articleHeader: {
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: 'bold',
    backgroundColor: '#333',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  articleMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  profileImage: {
    width: '100%',
    height: '80%',
    borderRadius: theme.borderRadius,
    marginRight: 12,
  },
  articleMeta: {
    fontSize: 16,
    color: '#333',
  },
  articleTime: {
    fontSize: 12,
    color: '#666',
  },
  articleBody: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  
    zIndex: 1,
  },
});

export default ArticleScreen;
