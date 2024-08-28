import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v23';
// const API_KEY = '8c6acce3ead248a3adeefceda292e7c0';
const API_KEY = '9b4f0227b89d44a99e651deab9e955be8';

// Configure axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '9b4f0227b89d44a99ee651eab9e955be8',
  },
});

// Function to fetch top headlines
export const fetchTopHeadlines = async () => {
  try {
    const response = await apiClient.get(
      `/top-headlines?sources=techcrunch&pageSize=10`,
    );
    console.log(response.data.length);

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return [];
  }
};

export const fetchLatestNewsArticles = async (q, from, sortBy) => {
  console.log(sortBy, 'fetchLatestNewsArticles');
  const query = q ? q : 'news';
  try {
    const response = await apiClient.get(
      `/everything?q=${query}&sortBy=${sortBy}`,
    );
    console.log(`/everything?q=${q}&sortBy=${sortBy}`, 'response');
    
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news articles:', error);
  }
};

// Function to search news articles by keyword
export const searchNews = async keyword => {
  try {
    const response = await apiClient.get(`/everything?q=${keyword}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

//  fetch news to get categories
export const fetchNewsBySources = async category => {
  try {
    const response = await apiClient.get(
      `/top-headlines/sources?country=us`,
    );

    const sources = response.data.sources;

    const uniqueCategories = [];

    sources.forEach(source => {
      if (!uniqueCategories.includes(source.category)) {
        uniqueCategories.push(source.category);
      }
    });

    return uniqueCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// fetch news by category
export const fetchNewsByCategory = async category => {
  console.log(category, 'category');

  try {
    const response = await apiClient.get(
      `/top-headlines?country=us&category=${category}`,
    );

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news by category:', error);
    throw error;
  }
};
