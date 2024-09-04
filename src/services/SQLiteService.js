import SQLite from 'react-native-sqlite-storage';
import auth from '@react-native-firebase/auth';
import {generateUniqueId} from '../utils/uniqueArticleId';
import { addBookmarksToFirebase, removeBookmarkFromFirestore } from './user';
import store from '../store/store';
import { updateCheckBookmark } from '../store/reducers/loaderSlice';

const db = SQLite.openDatabase(
  {
    name: 'NewsApp.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log('Error opening database: ', error);
  },
);

//Create necessary tables
export const createTables = () => {
  db.transaction(txn => {
    // txn.executeSql(
    //   `DROP TABLE IF EXISTS bookmarks`,
    //   [],
    //   () => {
    //     console.log('Old articles table dropped successfully');
    //   },
    //   error => {
    //     console.log('Error dropping old articles table: ', error);
    //   },
    // );
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT,
        title TEXT,
        description TEXT,
        url TEXT UNIQUE,
        urlToImage TEXT,
        publishedAt TEXT,
        content TEXT,
        category TEXT,
        query TEXT
      );`,
      [],
      () => {
        console.log('Table created successfully with the updated schema');
      },
      error => {
        console.log('Error creating table: ', error);
      },
    );

    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
      );`,
      [],
      () => {
        console.log('Categories table created successfully');
      },
      error => {
        console.log('Error creating categories table: ', error);
      },
    );
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS bookmarks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT,
        articleId TEXT,
        title TEXT,
        author TEXT,
        publishedAt TEXT,
        category TEXT,
        url TEXT,
        urlToImage TEXT,
        content TEXT,
        UNIQUE(userId, articleId)
      );`,
      [],
      () => {
        console.log('Bookmarks table created successfully');
      },
      error => {
        console.log('Error creating bookmarks table: ', error);
      },
    );
  });
};

// Insert articles into the database for offline support
export const insertArticles = (articles, category, query) => {
  db.transaction(txn => {
    articles.forEach(article => {
      txn.executeSql(
        `INSERT OR IGNORE INTO articles (author, title, description, url, urlToImage, publishedAt, content, category, query) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          article.author,
          article.title,
          article.description,
          article.url,
          article.urlToImage,
          article.publishedAt,
          article.content,
          category,
          query,
        ],
        () => {
          //   console.log('Article inserted successfully');
        },
        error => {
          console.log('Error inserting article: ', error);
        },
      );
    });
  });
};

// Fetch articles from the database
export const getArticles = (category, query, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM articles WHERE category = ? OR query = ? ORDER BY publishedAt DESC`,
      [category, query],
      (tx, results) => {
        let articles = [];
        for (let i = 0; i < results.rows.length; i++) {
          articles.push(results.rows.item(i));
        }
        callback(articles);
      },
      error => {
        console.log('Error fetching articles: ', error);
      },
    );
  });
};

// Fetch articles by category from the database
export const getArticlesByCategory = (category, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM articles WHERE category = ? ORDER BY publishedAt DESC`,
      [category], // Only use category here
      (tx, results) => {
        let articles = [];
        for (let i = 0; i < results.rows.length; i++) {
          articles.push(results.rows.item(i));
        }
        callback(articles); // Pass the articles array to the callback
      },
      error => {
        console.log('Error fetching articles: ', error);
      },
    );
  });
};

// Insert categories into the database
export const insertCategories = categories => {
  db.transaction(txn => {
    categories.forEach(category => {
      txn.executeSql(
        `INSERT OR IGNORE INTO categories (name) VALUES (?)`,
        [category],
        () => {
          console.log('Category inserted successfully', category);
        },
        error => {
          console.log('Error inserting category: ', error);
        },
      );
    });
  });
};

// Fetch categories from the database
export const getCategories = callback => {
  db.transaction(txn => {
    txn.executeSql(
      `SELECT name FROM categories`,
      [],
      (tx, results) => {
        let categories = [];
        for (let i = 0; i < results.rows.length; i++) {
          categories.push(results.rows.item(i).name);
        }
        callback(categories);
      },
      error => {
        console.log('Error fetching categories: ', error);
      },
    );
  });
};

export const clearTable = tableName => {
  db.transaction(txn => {
    txn.executeSql(
      `DELETE FROM ${tableName}`,
      [],
      () => {
        console.log(
          `All records from the ${tableName} table have been cleared successfully`,
        );
      },
      error => {
        console.log(
          `Error clearing records from the ${tableName} table: `,
          error,
        );
      },
    );
  });
};

export const addBookmark = async (article, callback) => {
  const userId = auth().currentUser.uid;
  const articleId = generateUniqueId(article);

  // Check if the article is already bookmarked
  isArticleBookmarked(articleId, isBookmarked => {
    if (isBookmarked) {
      console.log('Article is already bookmarked');
      if (callback) callback(false);
      return;
    }

    // If not bookmarked, add it to the database
    db.transaction(txn => {
      txn.executeSql(
        `INSERT OR IGNORE INTO bookmarks (userId, articleId, title, author, publishedAt, category, url, urlToImage, content) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?)`,
        [
          userId,
          articleId,
          article.title,
          article.author,
          article.publishedAt,
          article.category,
          article.url,
          article.urlToImage,
          article.content,
        ],
        () => {
          console.log('Bookmark added successfully');
          addBookmarksToFirebase(article, articleId);
          if (callback) callback(true); 
        },
        error => {
          console.log('Error adding bookmark: ', error);
          if (callback) callback(false);  
        },
      );
    });
  });
};



export const initialBookmarkAdded = (article, callback) => {
  const userId = auth().currentUser.uid;
  const articleId = generateUniqueId(article);
  db.transaction(txn => {
    txn.executeSql(
      `INSERT OR IGNORE INTO bookmarks (userId, articleId, title, author, publishedAt, category, url, urlToImage, content) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?)`,
      [
        userId,
        articleId,
        article.title,
        article.author,
        article.publishedAt,
        article.category,
        article.url,
        article.urlToImage,
        article.content,
      ],
      () => {
        console.log('Bookmark added successfully'); 
        store.dispatch(updateCheckBookmark(true));
        if (callback) callback(true);
      },
      error => {
        console.log('Error adding bookmark: ', error);
        if (callback) callback(false);
        store.dispatch(updateCheckBookmark(false));
      },
    );
  });
};


export const isArticleBookmarked = (articleId, callback) => {
  const userId = auth().currentUser.uid;

  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM bookmarks WHERE userId = ? AND articleId = ?`,
      [userId, articleId],
      (tx, results) => { 
        console.log(results.rows.length, 'isArticleBookmarked');
        
        if (results.rows.length > 0) {
          callback(true);
        } else {
          callback(false);
        } 
      },
      error => {
        console.log('Error checking bookmark status: ', error);
      },
    );
  });
};

export const removeBookmark = articleId => {
  const userId = auth().currentUser.uid;

  db.transaction(txn => {
    txn.executeSql(
      `DELETE FROM bookmarks WHERE userId = ? AND articleId = ?`,
      [userId, articleId],
      () => {
        console.log('Bookmark removed successfully');
        removeBookmarkFromFirestore(articleId);
      },
      error => {
        console.log('Error removing bookmark: ', error);
      },
    );
  });
};

export const getBookmarks = callback => {
  const userId = auth().currentUser.uid;

  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM bookmarks WHERE userId = ? ORDER BY publishedAt DESC`,
      [userId],
      (tx, results) => {
        let bookmarks = [];
        for (let i = 0; i < results.rows.length; i++) {
          bookmarks.push(results.rows.item(i));
        }
        callback(bookmarks);
      },
      error => {
        console.log('Error fetching bookmarks: ', error);
      },
    );
  });
};
