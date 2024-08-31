import {addBookmark, removeBookmark} from '../../services/user';
import {setIsBookmarked} from '../reducers/notificationSlice';

export const toggleIsBookmarked =
  (articleId, title, timestamp, userProfile, urlToImage) =>
  async (dispatch, getState) => {
    let isBookmarked = getState().articleReducer.isBookmarked;
    console.log(isBookmarked, 'toggleIsBookmarked');
    if (isBookmarked) {
      await removeBookmark(articleId);
      dispatch(setIsBookmarked(false));
    } else {
      await addBookmark({
        articleId,
        title,
        timestamp,
        userProfile,
        urlToImage,
      });
      dispatch(setIsBookmarked(true));
    }
  };
