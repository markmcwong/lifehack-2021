import firebase from "firebase";
import "firebase/firestore";
import store from "../state/store";
import { firebaseConfig } from "./firebaseConfig";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { data } from "../screens/ProfileScreen";
import * as firestoreTypes from "@firebase/firestore-types";
import { parseGroups, parseMessages } from "./util";
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
    interests: [],
  });
};

export const getRecommendedUsers = async (
  isYouth: boolean,
  callback: Function,
  languages: string[]
) => {
  const userList = [];
  console.log("language length " + languages.length);
  if (languages.length == 0) {
    const querySnapshot = await db
      .collection("user")
      .where("isYouth", "==", !isYouth)
      .onSnapshot((querySnapshot: any) => {
        const data: any = [];
        // console.log("length: " + querySnapshot.length);
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        callback(data);
      });
    return querySnapshot;
  } else {
    const querySnapshot = db
      .collection("user")
      .where("isYouth", "==", !isYouth)
      .where("languages", "array-contains-any", languages)
      .onSnapshot((querySnapshot: any) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        callback(data);
      });
    return querySnapshot;
  }
};

export const setUserBio = async (bio: string, userId: string) => {
  console.log(bio);
  await db.collection("user").doc(userId).update({
    bio: bio,
  });
};

export const setUserMotherTongue = async (language: string, userId: string) => {
  await db
    .collection("user")
    .doc(userId)
    .update({
      languages: firebase.firestore.FieldValue.arrayUnion(language),
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
        languages: firebase.firestore.FieldValue.arrayUnion(lang),
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
        interests: firebase.firestore.FieldValue.arrayUnion(int),
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
  store.dispatch({
    type: "READ_USER_DETAILS",
    name: record.data()!.name,
    isYouth: record.data()!.isYouth,
  });
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

export const fetchGroupByUserID = (uid: string, callback: Function) => {
  console.log("start this" + uid);
  const groupRef = db.collection("message");
  groupRef
    .where("members", "array-contains", db.collection("user").doc(uid))
    .onSnapshot((querySnapshot: firestoreTypes.QuerySnapshot) => {
      console.log("hiii" + querySnapshot.size);
      let groups: any = [];
      querySnapshot.forEach((doc: any) => {
        const id = doc.id;
        console.log("hi");
        if (doc) groups.push({ id, ...doc.data() });
      });
      console.log(groups);
      callback(parseGroups(uid, groups));
    });
};

export const getUserDetails = async (userId: string, callback: Function) => {
  const ref = await db.collection("user").doc(userId).get();
  // console.log(data.data());
  const data = ref.data();
  console.log(data);
  callback(data);
};

export const fetchMessagesByGroupId = async (
  groupId: string,
  callback: Function
) => {
  const messageRef = db.collection("message");
  messageRef
    .doc(groupId)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .onSnapshot((querySnapshot) => {
      let messages: any = [];
      querySnapshot.forEach((doc: any) => {
        const id = doc.id;
        // console.log(doc.data());
        if (doc) messages.push({ id, ...doc.data() });
      });
      callback(parseMessages(messages));
    });
};

export const fetchUsers = async (languages: string[]) => {
  let messages;
  // console.log("start");
  const userRef = db.collection("user");
  const snapshot: firestoreTypes.QuerySnapshot = await userRef
    .where("languages", "array-contains-any", languages)
    .get();
  snapshot.docs.forEach((x) => console.log(x.data()));
};

export const sendNewMessage = async (
  id: string,
  message: string,
  userId: string
) => {
  const messageRef = db.collection("message");
  // console.log(message);
  const newMessage = await messageRef.doc(id).collection("messages").add({
    text: message,
    sentBy: userId,
    createdAt: firebase.firestore.Timestamp.now(),
  });
  messageRef.doc(id).update({
    lastText: message,
    lastSent: firebase.firestore.Timestamp.now(),
  });
  // console.log(newMessage);
};

export const fetchUserDetail = async (ids: any[], callback: Function) => {
  let promises: Promise<any>[] = [];
  let users: any = [];
  ids.forEach(async (id: any) => {
    promises.push(
      id.get().then((doc) => {
        const data: any = doc.data();
        // console.log(data);
        users.push({ email: data.email, name: data.name });
      })
    );
  });
  await Promise.all(promises);
  // console.log(users);
  callback(users);
  // return users;
};

export const connectTwoUsers = async (ids: string[]) => {
  const messageRef = db.collection("message");
  let arefs: string[] = [];
  let brefs: string[] = [];
  let promises: Promise<any>[] = [];
  promises.push(
    db
      .collection("message")
      .where("members", "array-contains", db.collection("user").doc(ids[0]))
      .get()
      .then((docs) => {
        arefs = docs.docs.map((x) => x.id);
      })
  );
  promises.push(
    db
      .collection("message")
      .where("members", "array-contains", db.collection("user").doc(ids[1]))
      .get()
      .then((docs) => {
        brefs = docs.docs.map((x) => x.id);
      })
  );
  await Promise.all(promises);
  const intersected = arefs.filter((element) => brefs.includes(element));
  console.log(intersected);
  if (
    intersected.length == 0 ||
    intersected == null ||
    brefs == null ||
    arefs == null
  ) {
    console.log("yes"!);
    const newMessage = await messageRef.add({
      lastText: "Start your new conversation now!",
      lastSent: firebase.firestore.FieldValue.serverTimestamp(),
      members: ids.map((x) => db.collection("user").doc(x)),
    });
    return newMessage.id;
  } else {
    console.log("no!");
    return intersected[0];
  }
};
// export const fetchConversation = async () => {
//   let messages;
//   console.log("start");
//   const userRef = db.collection("user");
//   const snapshot: firestoreTypes.QuerySnapshot = await userRef
//     .where("languages", "array-contains-any", languages)
//     .get();
//   snapshot.docs.forEach((x) => console.log(x.data()));
// };
