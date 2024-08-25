import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';

const ArticleScreen = props => {
  const {item} = props.route.params;
  const [isConnected, setIsConnected] = useState(true);
  console.log(item, 'title');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Icon name="bookmark-outline" size={24} color="white" />
      </View>
      {isConnected ? (
        <WebView source={{uri: item?.url}} style={{flex: 1}} />
      ) : (
        <>
          <View style={styles.articleContainer}>
            <ScrollView>
              <View style={styles.articleHeader}>
                <Text style={styles.categoryLabel}>Sports</Text>
              </View>
              <Text style={styles.articleTitle}>{item?.title}</Text>
              <View style={styles.articleMetaContainer}>
                <Image
                  source={{uri: 'https://via.placeholder.com/50'}}
                  style={styles.profileImage}
                />
                <View>
                  <Text style={styles.articleMeta}>South Africa</Text>
                  <Text style={styles.articleTime}>1 hour ago</Text>
                </View>
              </View>
              <Text style={styles.articleBody}>
                Kamala Harris promised Americans a future that neither Donald
                Trump nor Joe Biden could deliver, showing how profoundly she
                has changed the 2024 election. The first Black woman to claim a
                major party nomination on Thursday styled her “unlikely journey”
                to the Democratic nod as the springboard to lift the country to
                a new place after years being torn apart by its bitter divides.
                ...
              </Text>
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
    backgroundColor: '#333',
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
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
});

export default ArticleScreen;
