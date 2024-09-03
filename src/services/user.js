import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {signOut} from './auth';
import store from '../store/store';
import {setIsBookmarked} from '../store/reducers/articleSlice';

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
