// import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';


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
    throw error;
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

//Logout
export const signOut = async () => {
  try {
    await auth().signOut();
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
