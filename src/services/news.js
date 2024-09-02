import axios from 'axios';
import store from '../store/store';
import { getTotalNotificationCount } from '../store/actions/notificationAction';
import NetInfo from '@react-native-community/netinfo';
import { createTables, getArticles, getArticlesByCategory, getCategories, insertArticles, insertCategories } from './SQLiteService';

const BASE_URL = 'https://newsapi.org/v2';
// const API_KEY = '8c6acce3ead248a3adeefceda292e7c0';
const API_KEY = '9b4f0227b89d44a99e651eab9e955be8';
// const API_KEY = '9b4f0227b89d44a99e651eab9e955be8';

// Configure axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '9b4f0227b89d44a99e651eab9e955be8',
  },
});

createTables();

export const fetchLatestNewsArticles = async (q, sortBy, page) => {
  const netInfo = await NetInfo.fetch();
  const query = q ? q : 'news';

  if (netInfo.isConnected) {
    try {
      const response = await apiClient.get(
        `/everything?pageSize=10&page=${page}&q=${query}&sortBy=${sortBy}`,
      );
      const articles = response.data.articles;

      // Insert articles into SQLite database
      insertArticles(articles, '', query);

      return articles;
    } catch (error) {
      console.error('Error fetching news articles:', error);
      return [];
    }
  } else {
    return new Promise(resolve => {
      getArticles('', query, articles => {
        console.log(articles, 'articles');
        
        resolve(articles);
      });
    });
  }
};

//  fetch news to get categories
export const fetchNewsBySources = async () => {
  const netInfo = await NetInfo.fetch();

  if (netInfo.isConnected) {
    try {
      const response = await apiClient.get(
        `/top-headlines/sources?country=us&pageSize=10`,
      );

      const sources = response.data.sources;

      const uniqueCategories = [];

      sources.forEach(source => {
        if (!uniqueCategories.includes(source.category)) {
          uniqueCategories.push(source.category);
        }
      });

      // Insert categories into SQLite database
      insertCategories(uniqueCategories);

      return uniqueCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  } else {
    // Fetch categories from the SQLite database when offline
    return new Promise(resolve => {
      getCategories(categories => {
        console.log(categories, 'fetchNewsBySources');
        
        resolve(categories);
      });
    });
  }
};

// fetch news by category
export const fetchNewsByCategory = async (category, page) => {
  const netInfo = await NetInfo.fetch();

  if (netInfo.isConnected) {
    try {
      const response = await apiClient.get(
        `/top-headlines?country=us&category=${category}&pageSize=10&page=${page}`,
      );
      const articles = response.data.articles;

      // Insert articles into SQLite database
      insertArticles(articles, category, '');

      return articles;
    } catch (error) {
      console.error('Error fetching news by category:', error);
      return [];
    }
  } else {
    return new Promise(resolve => {
      getArticlesByCategory(category, articles => {
        console.log(category, 'insertArticles category', articles);

        resolve(articles);
      });
    });
  }
};
