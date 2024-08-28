import CryptoJS from 'crypto-js';

export const generateUniqueId = article => {
  const title = article.title || 'unknown_title';
  const author = article.author || 'unknown_author';
  const publishedAt = article.publishedAt || 'unknown_date';

  const rawId = `${title}-${author}-${publishedAt}`;

  return CryptoJS.MD5(rawId).toString();
};
