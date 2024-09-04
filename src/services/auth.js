import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/app';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {saveUserData, syncBookmarksWithFirestore} from './user';
import { env } from '../environment/environment';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyD1IXKAqteDcEppUk7NO3yRqbBDkY4wnJE',
    authDomain: 'global-news-app-83a21.firebaseapp.com',
    projectId: 'global-news-app-83a21',
    storageBucket: 'global-news-app-83a21.appspot.com',
    messagingSenderId: '461150889136',
    appId: '1:461150889136:web:cbfcd65089e0f3e32a0775',
    measurementId: 'G-XX3M84VJQJ',
  });
}

GoogleSignin.configure({
  webClientId: env.WEB_CLIENT_ID,
  offlineAccess: true,
});

// sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
     syncBookmarksWithFirestore();
    return userCredential.user;
  } catch (error) {
    console.log('Error signing in with email and password:', error);
    return handleFirebaseAuthError(error);
  }
};

// sign up with email and password
export const signUpWithEmail = async (
  email,
  password,
  displayName,
  termsAccepted,
) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log(
      userCredential,
      email,
      password,
      displayName,
      termsAccepted,
      'userCredential',
    );

    await saveUserData(userCredential.user, displayName, termsAccepted);
    return userCredential;
  } catch (error) {
    console.log('Error signing up:', error);
    return handleFirebaseAuthError(error);
  }
};

// sign in with Google
export const signInWithGoogle = async () => {
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const userCredential = await auth().signInWithCredential(googleCredential);
    console.log(userCredential.user, 'userCredential');
    await saveUserData(userCredential.user, '');
    syncBookmarksWithFirestore();
    return userCredential;
  } catch (error) {
    console.log('Error signing in with Google:', error);
    return handleFirebaseAuthError(error);
  }
};

//Logout
export const signOut = async () => {
  try {
   const user = auth().currentUser; 
   if (
     user &&
     user.providerData.some(provider => provider.providerId === 'google.com')
   ) {
     await GoogleSignin.revokeAccess();
     await GoogleSignin.signOut();
   }
    await auth().signOut();
    return true;
  } catch (error) {
    console.log('Error signing out:', error);
    return handleFirebaseAuthError(error);
  }
};

const handleFirebaseAuthError = error => {
  let errorMessage;
  switch (error.code) {
    case 'auth/invalid-credential':
      errorMessage =
        'The authentication credential is invalid. Please try again.';
      break;
    case 'auth/user-not-found':
      errorMessage =
        'No user found with this credential. Please sign up first.';
      break;
    case 'auth/wrong-password':
      errorMessage = 'Incorrect password. Please try again.';
      break;
    case 'auth/email-already-in-use':
      errorMessage = 'This email is already in use. Please try logging in.';
      break;
    case 'auth/weak-password':
      errorMessage =
        'The password is too weak. Please choose a stronger password.';
      break;
    default:
      errorMessage = 'An unknown error occurred. Please try again later.';
      break;
  }
  return new Error(errorMessage);
};
