import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {signOut} from './auth';

export const saveUserData = async user => {
  if (!user || !user.uid) {
    console.error('User is not authenticated.');
    await signOut();
    return;
  }
  try {
    const userDocRef = firestore().collection('users').doc(user.uid);

    const doc = await userDocRef.get();
    if (!doc.exists) {
      await userDocRef.set({
        name: user.displayName || '',
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const updateUserData = async user => {
  const currentUser = auth().currentUser;
  if (!currentUser) {
    console.error('User is not authenticated.');
    await signOut();
    return;
  }
  try {
    const userDocRef = firestore().collection('users').doc(currentUser.uid);

    const doc = await userDocRef.get();
    if (doc.exists) {
      await userDocRef.set(
        {
          name: user.name || '',
          email: user.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        {merge: true},
      );
    }
    return 'Successfully update your information!';
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userDoc = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get();
      console.log(userDoc, 'userDoc');

      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

//add booking
export const addBookmark = async article => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    await signOut();
    return;
  }

  try {
    const bookmarkRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('bookmarks')
      .doc(article.articleId);

    await bookmarkRef.set({
      ...article,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    console.log('Bookmark added successfully', article);
  } catch (error) {
    console.log('Error adding bookmark:', error, article);
  }
};

// remove a bookmark for a user
export const removeBookmark = async articleId => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    await signOut();
    return;
  }

  try {
    const bookmarkRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('bookmarks')
      .doc(articleId);

    await bookmarkRef.delete();
    console.log('Bookmark removed successfully');
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};

// check if an article is bookmarked
export const checkIsBookmarked = async articleIdNew => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    await signOut();
    return;
  }
  try {
    const bookmarkRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('bookmarks')
      .doc(articleIdNew);

    const doc = await bookmarkRef.get(); 

    return doc.exists;
  } catch (error) {
    console.log('Error checking bookmark status:', error);
    return false;
  }
};

// get bookmarks for the current user
export const getBookmarks = async () => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    const snapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('bookmarks')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
};
