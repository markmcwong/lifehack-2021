import firebase from "firebase";
import "firebase/firestore";
export const parseMessages = (data: any) => {
  return data.map((item: any, index: number) => {
    console.log(item.id);
    return {
      _id: index,
      text: item.text,
      createdAt:
        item.createdAt != null
          ? (item.createdAt as firebase.firestore.Timestamp).toDate()
          : Date.now(),
      user: {
        _id: item.sentBy,
        // name: "React Native",
        // avatar: "https://placeimg.com/140/140/any",
      },
    };
  });
};

export const parseGroups = (uid: string, data: any) => {
  return data.map((item: any, index: number) => {
    return {
      id: item.id,
      lastText: item.lastText,
      lastSent: (item.lastSent as firebase.firestore.Timestamp).toDate(),
      members: item.members.filter(
        (x) => x != firebase.firestore().collection("user").doc(uid)
      )[0],
    };
  });
};
