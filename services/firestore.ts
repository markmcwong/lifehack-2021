import firebase from "firebase";
import "firebase/firestore";
import store from "../state/store";
import { firebaseConfig } from "./firebaseConfig";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { data } from "../screens/ProfileScreen";
import * as firestoreTypes from "@firebase/firestore-types";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

export const getHistory = async (userId: any) => {
  console.log(userId);
  const records = await db
    .collection("history")
    .where("user", "==", userId.uid)
    .get();

  return records.docs.map((x) => {
    return { ...x.data(), id: x.id.substr(0, 8) };
  });
};

export const createNewUserRecord = async (
  name: string,
  email: string,
  userId: string
) => {
  db.collection("user").doc(userId).set({
    email: email,
    name: name,
  });
};

export const getRecommendedUsers = async (callback: Function) => {
  const userList = [];
  const querySnapshot = db
    .collection("user")
    .where("email", "!=", "")
    .onSnapshot((querySnapshot: any) => {
      const data: any = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      callback(data);
    });
};

export const setUserBio = async (bio: string, userId: string) => {
  await db.collection("user").doc(userId).update({
    bio: bio,
  });
};

export const setUserMotherTongue = async (language: string, userId: string) => {
  await db
    .collection("user")
    .doc(userId)
    .update({
      language: firebase.firestore.FieldValue.arrayUnion(language),
    });
};

export const setUserFamiliarLang = async (
  listOfLang: String[],
  userId: string
) => {
  listOfLang.forEach((lang) => {
    db.collection("user")
      .doc(userId)
      .update({
        language: firebase.firestore.FieldValue.arrayUnion(lang),
      });
  });
};

export const setUserInterests = async (
  listOfInterests: String[],
  userId: string
) => {
  listOfInterests.forEach((int) => {
    db.collection("user")
      .doc(userId)
      .update({
        interest: firebase.firestore.FieldValue.arrayUnion(int),
      });
  });
};

export const setUserType = async (isYouth: boolean, userId: string) => {
  db.collection("user").doc(userId).update({
    isYouth: isYouth,
  });
};

export const getUserRecord = async (userId: string) => {
  console.log("userId : " + userId);
  const record = await db.collection("user").doc(userId).get();
  console.log("current user: " + record.data()!);
  store.dispatch({ type: "READ_USER_DETAILS", name: record.data()!.name });
};

export const addDepositRecord = async (
  userId: any,
  dropoffPoint: any,
  recycledObject: any,
  beforeImage: any,
  afterImage: any,
  currentPoints: number
) => {
  const points = data.filter((x) => x.name == recycledObject)[0].points ?? 0;
  db.collection("history").add({
    _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    user: userId,
    location: dropoffPoint,
    recycledObject: recycledObject,
    beforeImage: beforeImage,
    afterImage: afterImage,
    points: points,
  });
  db.collection("user")
    .doc(userId)
    .update({ reward: currentPoints + points });
  getUserRecord(userId);
};

export const uploadImageAsync = async (uri: string) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4().toString());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
};

export const pickImage = async (
  callbackUploading: Function,
  callbackImage: Function
) => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  //   console.log({ pickerResult });
  handleImagePicked(pickerResult, callbackUploading, callbackImage);
};

const handleImagePicked = async (
  pickerResult: ImagePicker.ImagePickerResult,
  callbackUploading: Function,
  callbackImage: Function
) => {
  try {
    callbackUploading(true);

    if (!pickerResult.cancelled) {
      const uploadUrl = await uploadImageAsync(pickerResult.uri);
      callbackImage(uploadUrl);
    }
  } catch (e) {
    console.log(e);
    alert("Upload failed, sorry :(");
  } finally {
    callbackUploading(false);
  }
};

export const fetchGroupByUserID = (uid: string) => {
  let groups;
  console.log("start");
  return new Promise((resolve, reject) => {
    const groupRef = db.collection("pair");
    groupRef
      .where("members", "array-contains", db.collection("user").doc(uid))
      .onSnapshot((querySnapshot: any) => {
        //  const allGroups = []
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          //  const data = doc.data()
          //  data.id = doc.id
          //  if (data.recentMessage) allGroups.push(data)
        });
        //  groups = allGroups;
      });
  });
};

export const getUserDetails = async (userId: string, callback: Function) => {
  const ref = await db.collection("user").doc(userId).get();

  // console.log(data.data());
  const data = ref.data();
  console.log(data);
  callback(data);
};

export const fetchMessagesByGroupId = (groupId: string) => {
  let messages;
  console.log("start");
  return new Promise((resolve, reject) => {
    const messageRef = db.collection("messages");
    messageRef
      .doc(groupId.trim())
      .collection("messages")
      .orderBy("sentAt")
      .onSnapshot((querySnapshot) => {
        const allMessages: any = [];
        querySnapshot.forEach((doc) => {
          if (doc) allMessages.push(doc.data());
        });
        messages = allMessages;
      });
  });
};

export const fetchUsers = async (languages: string[]) => {
  let messages;
  console.log("start");
  const userRef = db.collection("user");
  const snapshot: firestoreTypes.QuerySnapshot = await userRef
    .where("languages", "array-contains-any", languages)
    .get();
  snapshot.docs.forEach((x) => console.log(x.data()));
};
