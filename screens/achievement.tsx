import { createStackNavigator } from "@react-navigation/stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  VStack,
  Image,
  Button,
  HStack,
  Box,
  Avatar,
  Badge,
  Icon,
  Center,
  Text,
  View,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, YellowBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { paddingLeft } from "styled-system";

import EditScreenInfo from "../components/EditScreenInfo";
import DepositScreen from "./DepositFormScreen";
import firestore from "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";

const achievementList = [
  {
    medal: (
      <Image
        alt="medalRed"
        size={12}
        source={require("../assets/images/medal_red.png")}
      />
    ),
    description: "Chat with elderlies in 10 different language",
    title: "Language Expert!",
  },
  {
    medal: (
      <Image
        alt="medalBlue"
        size={12}
        source={require("../assets/images/medal_blue.png")}
      />
    ),
    title: "Extrovert!",
    description: "Chat with 10 elderlies",
  },
  {
    medal: (
      <Image
        alt="medalGreen"
        size={12}
        source={require("../assets/images/medal_green.png")}
      />
    ),
    title: "Very Talkative!",
    description: "Chat with elderlies more than 60 minutes",
  },
  {
    medal: (
      <Image
        alt="medalPurple"
        size={12}
        source={require("../assets/images/medal_purple.png")}
      />
    ),
    title: "Inviter!",
    description: "Invite and share this app to 10 friends",
  },
  {
    medal: (
      <Image
        alt="medalGrey"
        size={12}
        source={require("../assets/images/medal_grey.png")}
      />
    ),
    description:
      "Chat with elderlies that have 20 different interests in total",
    title: "You Have Wide Inetersts!",
  },
];

function LogoTitle() {
  return (
    <VStack
      alignItems="flex-start"
      // width="100%"
      space={3}
      left={8}
      marginTop={-15}
    >
      <Text style={{ fontSize: 16, color: "#FFF" }}>Welcome!</Text>
      <Text style={{ fontSize: 24, color: "#FFF", marginTop: -5 }}>
        {Date()
          .toLocaleString()
          .slice(0, 3)
          .concat(", ", Date().toLocaleString().slice(4, 15))}
      </Text>
    </VStack>
  );
}

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const Achievement = (props: any) => {
  return (
    <>
      <View style={styles.container}>
        <HStack style={styles.topBar}>
          <Text
            style={{
              fontSize: 24,
              color: "#ff7200",
              fontWeight: "800",
              fontFamily: "Avenir",
              marginLeft: "3%",
            }}
          >
            Achievement
          </Text>
        </HStack>

        <VStack
          h="100%"
          w="100%"
          style={{ justifyContent: "flex-start", alignItems: "center" }}
        >
          <Image
            width="70%"
            resizeMode="contain"
            height="30%"
            source={require("../assets/images/achievement.png")}
            alt="achievement"
          />

          <Box
            bg="#ffffff"
            rounded="xl"
            p={8}
            style={{
              //   position: "absolute",
              marginTop: "-7%",
              zIndex: 10,
              width: "100%",
              height: "100%",
              borderRadius: 40,
            }}
          >
            {achievementList.map((item, array) => (
              <HStack
                space={4}
                w="100%"
                style={{ alignItems: "center", marginBottom: "10%" }}
              >
                {item.medal}
                <VStack
                  space={2}
                  w="100%"
                  style={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "800",
                      color: "#46454C",
                      fontFamily: "Avenir",
                    }}
                  >
                    {item.title}
                  </Text>

                  <HStack space={2} width="80%">
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "200",
                        color: "#46454C",
                      }}
                    >
                      {item.description}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            ))}
          </Box>
        </VStack>
      </View>
    </>
  );
};

export default connect(mapStateToProps)(Achievement);

// const AuthNavigator = createStackNavigator();
// const DepositStack = ({ navigation }) => (
//   <AuthNavigator.Navigator
//     screenOptions={{ headerShown: false }}
//     initialRouteName="Form"
//   >
//     <AuthNavigator.Screen name="Scan" component={TabOneScreen} />

//     {/* <AuthNavigator.Screen name="Signup" component={SignupScreen} /> */}
//   </AuthNavigator.Navigator>
// );
// export default DepositStack;

const styles = StyleSheet.create({
  topBar: {
    justifyContent: "space-between",
    width: "100%",
    marginTop: "5%",
    backgroundColor: "#ffffff",
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingBottom: "3%",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: "center",
    overflow: "scroll",
    // justifyContent: "center",
    backgroundColor: "#ffe4b8",
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
