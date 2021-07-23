import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  HStack,
  Icon,
  IconButton,
  Badge,
  StatusBar,
  VStack,
  Text,
  Image,
} from "native-base";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "../components/Themed";
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { logout } from "../services/auth";
import { useEffect } from "react";
import { getHistory } from "../services/firestore";
import { connect } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";

const User = {
  name: "Robe Jobs",
  created: "2018-02-21",
  tags: ["programmer", "developer", "coder"],
  introduction:
    "Hello my friends :) I am Robe Jobs, would love to make some new friends while learning some languages! always find elderly like you interesting, as you have SO MUCH experiences and stories that I do not possess! Would always love to chat with you and know more about your lives ;)",
};

const BadgesColour = ["red", "blue", "yellow", "green", "grey"];

const SecondRoute = (props: any) => (
  <ScrollView>
    <VStack
      alignItems="center"
      width={Dimensions.get("window").width}
      height="100%"
      space={1}
      marginTop={3}
      paddingBottom={20}
    >
      <ImageBackground
        borderRadius={35}
        resizeMode="cover"
        source={require("../assets/images/reward.png")}
        style={styles.rewards}
      ></ImageBackground>
      <Text fontSize={24} style={styles.bold}>
        {User.name}
      </Text>
      <Text fontSize={12}>Joined 1Y 3M</Text>
      <View
        style={{
          width: "90%",
          borderRadius: 15,
          padding: 15,
          backgroundColor: "transparent",
        }}
      >
        <VStack>
          <Text style={{ ...styles.bold }}>About Me</Text>
        </VStack>
        <HStack alignItems="flex-start" marginTop={2}>
          {User.tags.map((tag) => (
            <Badge
              backgroundColor="transparent"
              borderWidth={1}
              borderColor="#172D55"
              borderRadius={20}
              paddingRight={5}
              paddingLeft={5}
              paddingTop={3}
              paddingBottom={3}
              marginRight={2}
            >
              {tag}
            </Badge>
          ))}
        </HStack>
        <Text
          fontSize={13}
          padding={1}
          marginTop={2}
          fontWeight="300"
          fontFamily="Avenir"
        >
          {User.introduction}
        </Text>
        <HStack justifyContent="space-between">
          <Image
            source={require("../assets/images/medal_blue.png")}
            alt="medal_blue"
            style={{ width: 40, height: 40 }}
          />
          <Image
            source={require("../assets/images/medal_red.png")}
            alt="medal_red"
            style={{ width: 40, height: 40 }}
          />
          <Image
            source={require("../assets/images/medal_green.png")}
            alt="medal_green"
            style={{ width: 40, height: 40 }}
          />
          <Image
            source={require("../assets/images/medal_purple.png")}
            alt="medal_purple"
            style={{ width: 40, height: 40 }}
          />
          <Image
            source={require("../assets/images/medal_grey.png")}
            alt="medal_grey"
            style={{ width: 40, height: 40 }}
          />
        </HStack>
      </View>
      <View
        style={{
          borderWidth: 3,
          borderColor: "green",
          width: "80%",
          borderRadius: 15,
          padding: 25,
          backgroundColor: "transparent",
        }}
      >
        <VStack space={5}>
          <Text style={{ ...styles.bulletPoints, fontSize: 16 }}>
            Reward Scheme
          </Text>
          <VStack alignItems="center" space={3}>
            <HStack>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: "#438672",
                  fontSize: 28,
                }}
              >
                150
              </Text>
              <Text style={{ marginLeft: 3, fontSize: 16, color: "grey" }}>
                pts
              </Text>
            </HStack>
            <Text style={{ color: "grey", lineHeight: 22.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
              aliquam tempus vulputate vestibulum eget sit vel tincidunt sit.
              Quis faucibus in interdum arcu quis.
            </Text>
          </VStack>
          <VStack alignItems="center" space={3}>
            <HStack>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: "#438672",
                  fontSize: 28,
                }}
              >
                300
              </Text>
              <Text style={{ marginLeft: 3, fontSize: 16, color: "grey" }}>
                pts
              </Text>
            </HStack>
            <Text style={{ color: "grey", lineHeight: 22.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
              aliquam tempus vulputate vestibulum eget sit vel tincidunt sit.
              Quis faucibus in interdum arcu quis.
            </Text>
          </VStack>
        </VStack>
      </View>
    </VStack>
  </ScrollView>
);

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const ProfileScreen = (props: any) => {
  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <VStack
        alignItems="center"
        width={Dimensions.get("window").width}
        height="100%"
        marginTop={3}
      >
        <HStack style={styles.topBar}>
          <Text style={{ fontSize: 24, color: "#438672", fontWeight: "600" }}>
            Profile
          </Text>
          <Icon
            size="sm"
            as={<AntDesign name="logout" />}
            color="black"
            onPress={() => logout()}
          />
        </HStack>
        <SecondRoute></SecondRoute>
      </VStack>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(ProfileScreen);
const styles = StyleSheet.create({
  topBar: {
    justifyContent: "space-between",
    width: "80%",
  },
  rewards: {
    width: 125,
    height: 125,
  },
  bulletPoints: {
    color: "#438672",
    fontWeight: "500",
  },
  title: {
    fontWeight: "300",
    opacity: 0.89,
    marginTop: 15,
  },
  bold: {
    fontWeight: "bold",
  },
  info: {
    fontWeight: "bold",
    color: "#438672",
  },
});
