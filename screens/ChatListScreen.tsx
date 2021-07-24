import {
  Avatar,
  Text,
  Box,
  HStack,
  ScrollView,
  View,
  VStack,
  Divider,
  Pressable,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { fetchGroupByUserID, fetchUserDetail } from "../services/firestore";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
const data = [
  {
    name: "John Doe",
    message: "Hello, World!",
    time: "1:00 PM",
  },
  {
    name: "John Doe",
    message: "Hello, World!",
    time: "1:00 PM",
  },
];

export const ChatListScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [groups, setGroups] = useState<any>(null);
  const [userDetailList, setUserDetailList] = useState<any>(null);
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    // timeAgo;
    fetchGroupByUserID(user.uid, (data: any) => setGroups(data));
  }, []);

  useEffect(() => {
    groups && console.log(groups.length);
    groups &&
      fetchUserDetail(
        groups.map((group: any) => group.members),
        (val: any) => setUserDetailList(val)
      );
  }, [groups]);

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", overflow: "hidden", display: "flex" }}
    >
      <HStack
        px={5}
        paddingTop={2}
        style={{
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }}
        w="100%"
        paddingBottom={5}
        backgroundColor="white"
      >
        <Text
          color={user.isYouth ? "#FF7200" : "#78C9A7"}
          fontWeight="500"
          fontSize={26}
        >
          Chats
        </Text>
      </HStack>
      <View px={5} style={styles.container}>
        <ScrollView w="100%" my={8}>
          <VStack w="100%" alignItems="flex-start" justifyContent="flex-start">
            {userDetailList &&
              userDetailList.map((conversation, index) => (
                <React.Fragment key={groups[index].lastSent + index}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("Conversation", {
                        id: groups[index].id,
                        name: conversation.name,
                      })
                    }
                  >
                    <HStack
                      w="100%"
                      paddingTop={index == 0 ? 0 : 5}
                      paddingBottom={5}
                      justifyContent="space-between"
                    >
                      <HStack w="70%">
                        <Avatar
                          size="lg"
                          source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg",
                          }}
                        ></Avatar>
                        <VStack
                          px={3}
                          py={2.5}
                          w="80%"
                          justifyContent="space-between"
                        >
                          <Text fontSize={18} fontWeight="300">
                            {conversation.name}
                          </Text>
                          <Text
                            // numberOfLines={1}
                            fontSize={12}
                            // width="70%"
                            // ellipsizeMode="tail"
                            fontWeight="300"
                            color="gray.400"
                            // style={{ flex: 1 }}
                          >
                            {groups[index].lastText.length > 20
                              ? groups[index].lastText.substring(0, 30) + "..."
                              : groups[index].lastText}
                            {/* {groups[index].id} */}
                          </Text>
                        </VStack>
                      </HStack>
                      <Text py={3} px={3} fontSize={14}>
                        {timeAgo.format(groups[index].lastSent as Date)}
                      </Text>
                    </HStack>
                  </Pressable>
                  <Divider />
                </React.Fragment>
              ))}
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 20,
    // paddingBottom: 12,
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // justifyContent: "center",
    // backgroundColor: "#FFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  greenText: {
    color: "#147460",
  },
});
