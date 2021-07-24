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
  TextArea,
  Fab,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { StyleSheet, YellowBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { paddingLeft } from "styled-system";

import EditScreenInfo from "../components/EditScreenInfo";
import DepositScreen from "./DepositFormScreen";
import firestore from "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import { connect, useSelector } from "react-redux";
import { setUserBio } from "../services/firestore";

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const selfIntroduction = (props: any) => {
  const user = useSelector((state: any) => state.user);
  const [bio, setBio] = useState("");

  return (
    <>
      <View style={styles.container}>
        <VStack
          h="100%"
          w="100%"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            p={12}
            style={{
              color: "#F9A826",
              fontWeight: "bold",
              fontFamily: "Avenir",
              fontSize: 36,
            }}
          >
            {"Tell Us More\nAbout You!"}
          </Text>
          <TextArea
            borderColor="orange"
            color="orange"
            width="80%"
            h="50%"
            numberOfLines={4}
            borderRadius={20}
            placeholder="Your short self introduction!"
            onChangeText={(e: string) => {
              setBio(e);
            }}
            value={bio}
          />

          <Fab
            position="absolute"
            size="sm"
            backgroundColor="orange"
            bottom={10}
            right={10}
            onPress={() => {
              setUserBio(
                JSON.stringify(bio).substring(
                  1,
                  JSON.stringify(bio).length - 1
                ),
                user.uid
              );
              props.navigation.navigate("selectStartingLang");
            }}
            icon={
              <Icon
                // position="absolute"
                size="sm"
                color="white"
                as={Ionicons}
                name="arrow-forward-outline"
              />
            }
          />
        </VStack>
      </View>
    </>
  );
};

export default connect(mapStateToProps)(selfIntroduction);

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
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: "center",
    overflow: "scroll",
    // justifyContent: "center",
    backgroundColor: "#ffffff",
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
