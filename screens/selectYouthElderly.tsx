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
  Select,
  CheckIcon,
  Fab,
  Pressable,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { ImageStore, StyleSheet, YellowBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { paddingLeft } from "styled-system";

import EditScreenInfo from "../components/EditScreenInfo";
import DepositScreen from "./DepositFormScreen";
import firestore from "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import { connect, useSelector } from "react-redux";
import MultiSelect from "react-native-multiple-select";
import {
  setUserMotherTongue,
  setUserFamiliarLang,
  setUserInterests,
  setUserType,
} from "../services/firestore";

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const options = [
  "Classical Music",
  "Basketball",
  "Football",
  "Martial Arts",
  "Gaming",
  "Mahjong",
  "Origami",
  "Deserts",
  "Tai Chi",
  "Photography",
  "Reading",
  "Cooking",
  "Dancing",
  "Drawing",
  "Writing",
];
const items = [
  {
    id: "92iijs7yta",
    name: "Ondo",
  },
  {
    id: "a0s0a8ssbsd",
    name: "Ogun",
  },
  {
    id: "16hbajsabsd",
    name: "Calabar",
  },
  {
    id: "nahs75a5sg",
    name: "Lagos",
  },
  {
    id: "667atsas",
    name: "Maiduguri",
  },
  {
    id: "hsyasajs",
    name: "Anambra",
  },
  {
    id: "djsjudksjd",
    name: "Benue",
  },
  {
    id: "sdhyaysdj",
    name: "Kaduna",
  },
  {
    id: "suudydjsjd",
    name: "Abuja",
  },
];
const selectInterests = (props: any) => {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [active, setActive] = useState<String[]>([]);
  const user = useSelector((state: any) => state.user);

  let [language, setLanguage] = React.useState("");
  let multiSelect: MultiSelect | null;
  return (
    <>
      <View style={styles.container}>
        <VStack
          h="100%"
          w="100%"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            p={12}
            style={{
              color: "#F9A826",
              fontWeight: "bold",
              fontFamily: "Avenir",
              fontSize: 36,
              marginBottom: "-10%",
            }}
          >
            {"I am..."}
          </Text>
          <Image
            resizeMode="contain"
            w="60%"
            h="40%"
            alt="Picture: Youth or Elderly"
            style={{ marginTop: "-15%" }}
            source={require("../assets/images/youthOrElderly.png")}
          />
          <Pressable
            onPress={async () => {
              await setUserType(false, user.uid);
              props.navigation.navigate("selfIntroduction");
            }}
            // bg="#08797b"
            borderColor="#08797b"
            borderWidth={3}
            rounded="xl"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              height: "10%",
              borderRadius: 30,
              marginBottom: "5%",
              marginTop: "-15%",
            }}
          >
            <HStack
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/old-woman.png")}
                alt="old-woman"
                w="25%"
                resizeMode="contain"
              />

              <Text
                style={{
                  fontFamily: "Avenir",
                  fontWeight: "600",
                  marginLeft: "10%",
                }}
              >
                Elderly
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            onPress={async () => {
              await setUserType(true, user.uid);
              props.navigation.navigate("selfIntroduction");
            }}
            borderColor="#F5A623"
            borderWidth={3}
            rounded="xl"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              height: "10%",
              borderRadius: 30,
            }}
          >
            <HStack
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/teenage.png")}
                alt="teenage"
                w="25%"
                resizeMode="contain"
              />

              <Text
                style={{
                  fontFamily: "Avenir",
                  fontWeight: "600",
                  marginLeft: "10%",
                }}
              >
                Youth
              </Text>
            </HStack>
          </Pressable>
        </VStack>
      </View>
    </>
  );
};

export default connect(mapStateToProps)(selectInterests);

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
