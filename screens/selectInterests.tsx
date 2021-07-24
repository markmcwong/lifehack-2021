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
import MultiSelect from "react-native-multiple-select";
import {
  setUserMotherTongue,
  setUserFamiliarLang,
  setUserInterests,
} from "../services/firestore";
import store from "../state/store";

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
            }}
          >
            {"Your interests!\n"}
            <Text
              style={{
                color: "#7d7d7d",
                fontWeight: "300",
                fontFamily: "Avenir",
                fontSize: 18,
              }}
            >
              {
                "Select 1-3 interest to find elderlies who have the same interest as you!"
              }
            </Text>
          </Text>

          <HStack
            flexWrap="wrap"
            p={12}
            style={{ marginLeft: "3%", marginTop: "-10%" }}
          >
            {options.map((option, index) => (
              <Button
                marginRight={3}
                marginBottom={3}
                borderRadius={20}
                backgroundColor={
                  active.indexOf(option) != -1 ? "#F5A623" : "#fff"
                }
                borderColor={
                  active.indexOf(option) != -1 ? "#F5A623" : "#172D55"
                }
                borderWidth={1}
                _text={{
                  // fontSize: 14,
                  color: active.indexOf(option) != -1 ? "#FFF" : "#000",
                }}
                onPress={() => {
                  if (active.indexOf(option) != -1) {
                    setActive(active.filter((x) => x != option));
                  } else {
                    if (active.length != 3) {
                      setActive([...active, option]);
                    } else {
                      alert("You can only choose up to 3 interests!");
                    }
                  }
                }}
              >
                {option}
              </Button>
            ))}
          </HStack>
          <Fab
            position="absolute"
            size="sm"
            backgroundColor="orange"
            bottom={10}
            right={10}
            onPress={() => {
              if (active.length == 0) {
                alert("You have to choose at least one interest");
              }
              setUserInterests(active, user.uid);
              store.dispatch({ type: "FINISH_ONBOARD" });
              // props.navigation.navigate("Auth");
            }}
            icon={
              <Icon
                // position="absolute"
                size="sm"
                color="white"
                as={Ionicons}
                name="checkmark-outline"
              />
            }
          />
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
