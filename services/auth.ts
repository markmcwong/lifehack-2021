// import firebase from "firebase/auth";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import store from "../state/store";
import { createNewUserRecord } from "./firestore";
import { firebaseConfig } from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Listen for authentication state to change.

export async function loginWithGoogle() {
  const { idToken, accessToken } = await Google.logInAsync({
    androidClientId:
      "698867919136-u37jqdik4p95234bhps3aqmvavge00mt.apps.googleusercontent.com",
    iosClientId:
      "698867919136-sqe9ek05mqcn6lrg6hrn7s4aei733rr0.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });
  const credential = firebase.auth.GoogleAuthProvider.credential(
    idToken,
    accessToken
  );

  firebase
    .auth()
    .signInWithCredential(credential)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
      if (result.additionalUserInfo?.isNewUser) {
        createNewUserRecord(user!.uid);
      }
      store.dispatch({
        type: "LOGIN",
        name: user?.displayName,
        uid: user?.uid,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function login(email: string, password: string) {
  const result = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  store.dispatch({
    type: "LOGIN",
    name: result.user?.displayName,
    uid: result.user?.uid,
  });
}

export async function register(email: string, password: string) {
  const result = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  createNewUserRecord(result.user!.uid);
  store.dispatch({
    type: "LOGIN",
    name: result.user?.displayName,
    uid: result.user?.uid,
  });
}

export async function logout() {
  console.log("Logging out");
  await firebase.auth().signOut();
  store.dispatch({ type: "LOGOUT" });
}
