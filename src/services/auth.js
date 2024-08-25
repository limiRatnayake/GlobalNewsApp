import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '461150889136-ps02u0q83d2aea24bgm3rts45a299ajo.apps.googleusercontent.com',
  offlineAccess: true,
});

// sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with email and password:', error);
  }
};

// sign up with email and password
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// sign in with Google
export const signInWithGoogle = async () => {
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const userCredential = await auth().signInWithCredential(googleCredential);
    console.log(userCredential, 'userCredential');

    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

//Logout
export const signOut = async () => {
  try {
    await auth().signOut();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
