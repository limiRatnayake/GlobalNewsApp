import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {signOut} from './auth';
import store from '../store/store'; 
import { 
  initialBookmarkAdded, 
} from './SQLiteService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getTotalNotificationCount} from '../store/actions/notificationAction';

export const saveUserData = async (user, displayName, termsAccepted) => {
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
        name: user.displayName || displayName,
        email: user.email,
        termsAccepted: termsAccepted,
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

export const resetPassword = async email => {
  try {
    const signInMethods = await auth().fetchSignInMethodsForEmail(email);
    if (signInMethods.length > 0) {
      await auth().sendPasswordResetEmail(email);
      return true;
    } else {
      throw new Error('This email is not registered.');
    }
  } catch (error) {
    throw error;
  }
};

// add bookmark
export const addBookmarksToFirebase = async (article, articleId) => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    await signOut();
    return;
  }
  let docExists = await checkIsBookmarked(articleId);
  if (!docExists) {
    try {
      const bookmarkRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('bookmarks')
        .doc(articleId);

      await bookmarkRef.set({
        ...article,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log('Bookmark added successfully: firestroe', articleId);
    } catch (error) {
      console.log('Error adding bookmark:', error, article);
    }
  }
};

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
    console.log(' checking bookmark status:', doc.exists);
    return doc.exists;
  } catch (error) {
    console.log('Error checking bookmark status:', error);
    return false;
  }
};

//remove bookmarks from firebase
export const removeBookmarkFromFirestore = async articleId => {
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
    console.log('Bookmark removed successfully : firestroe', articleId);
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};

//initially set bookmarks to SQLite
export const syncBookmarksWithFirestore = async () => {
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

    const bookmarks = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    bookmarks.forEach(bookmark => {
      initialBookmarkAdded(bookmark);
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
};

export const addNotification = async notification => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    await signOut();
    return;
  }

  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('notifications')
      .add(notification);
    console.log('Notification added successfully: firestroe', notification);
  } catch (error) {
    console.log('Error adding notification:', error);
  }
};

export const deleteNotification = async notification => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    await signOut();
    return;
  }

  try {
    const userNotificationsRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('notifications');

    const snapshot = await userNotificationsRef.get();
    const batch = firestore().batch();

    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('Notification deleted successfully: firestroe');
  } catch (error) {
    console.log('Error deleted notification:', error);
  }
};

export const getNotifications = async () => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    throw new Error('User not authenticated');
  }
  await AsyncStorage.setItem('notifications', JSON.stringify([]));
  try {
    const snapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('notifications') 
      .get();

    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(notifications, 'notifications');

    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
    store.dispatch(getTotalNotificationCount(notifications.length));
    return notifications;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
};
