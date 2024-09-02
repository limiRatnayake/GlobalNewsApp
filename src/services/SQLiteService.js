import SQLite from 'react-native-sqlite-storage';

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
    //   `DROP TABLE IF EXISTS articles`,
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
  });
};

// Insert articles into the database
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
