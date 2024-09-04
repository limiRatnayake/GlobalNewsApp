import axios from 'axios'; 
import NetInfo from '@react-native-community/netinfo';
import {
  createTables,
  getArticles,
  getArticlesByCategory,
  getCategories,
  insertArticles,
  insertCategories,
} from './SQLiteService';
import {env} from '../environment/environment';

const BASE_URL = env.BASE_URL;


// Configure axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: env.API_KEY,
  },
});

createTables();

export const fetchLatestNewsArticles = async (q, sortBy, page, fromDate, toDate) => {
  const netInfo = await NetInfo.fetch();
  const query = q ? q : 'news';

  if (netInfo.isConnected) {
    try {
      const response = await apiClient.get(
        `/everything?pageSize=10&page=${page}&q=${query}&sortBy=${sortBy}&from=${fromDate}&to=${toDate}`,
      );
      const articles = response.data.articles;

      // Insert articles into SQLite database
      insertArticles(articles, '', query);

      return articles;
    } catch (error) {
      console.log('Error fetching news articles:', error);
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
