import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = '8c6acce3ead248a3adeefceda292e7c0';

// Configure axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Function to fetch top headlines
export const fetchTopHeadlines = async ( ) => {
  try {
    const response = await apiClient.get(
      `/top-headlines?sources=techcrunch&pageSize=10&apiKey=${API_KEY}`,
    );
    console.log(response.data.length);

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return [];
  }
};

export const fetchLatestNewsArticles = async (q, from, sortBy) => {
  try {
    const response = await apiClient.get(
      `/top-headlines?language=en&apiKey=${API_KEY}`,
    );
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

// Function to fetch news by category
export const fetchNewsByCategory = async category => {
  try {
    const response = await apiClient.get(`/top-headlines?category=${category}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news by category:', error);
    throw error;
  }
};
