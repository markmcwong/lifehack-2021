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
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { paddingLeft } from "styled-system";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import DepositScreen from "./DepositFormScreen";

const languages = ["English", "Japanese", "Mandarin"];
const interests = ["Classical Music", "Desserts", "Tai Chi"];

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

export default function PersonDetailScreen({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <VStack h="100%" w="100%">
          <Image
            h="50%"
            w="100%"
            // style={{ width: "100%", height: "100%" }}
            alt="DisplayPicture"
            source={require("../assets/images/asian-elderly-woman-feeling-happy-smiling-looking-camera-while-relax-kitchen-home.png")}
          />
          <Box
            bg="#EFB556"
            rounded="xl"
            p={8}
            style={{
              //   position: "absolute",
              marginTop: "-10%",
              zIndex: 10,
              width: "100%",
              height: "25%",
              borderRadius: 40,
            }}
          >
            <Text
              style={{
                fontSize: 36,
                fontFamily: "Avenir",
                fontWeight: "800",
                color: "#ffffff",
                marginLeft: "3%",
                marginBottom: "1%",
              }}
            >
              Morikawa
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Avenir",
                fontWeight: "500",
                color: "#ffffff",
                marginLeft: "3%",
              }}
            >
              Languages:
            </Text>
            <ScrollView
              horizontal={true}
              width="80%"
              style={{ marginLeft: "3%" }}
              showsHorizontalScrollIndicator={false}
            >
              <HStack
                space={4}
                width="80%"
                height="80%"
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {languages.map((language, index) => (
                  <Badge
                    bg="#ffffff"
                    variant={"outline"}
                    colorScheme={index == 0 ? "orange" : "light"}
                    style={{
                      alignItems: "center",
                      minWidth: 80,
                      padding: 12,
                      paddingLeft: 12,
                      paddingRight: 12,
                      // paddingBottom: 0,
                      borderRadius: 20,
                    }}
                  >
                    {language}
                  </Badge>
                ))}
              </HStack>
            </ScrollView>
          </Box>
          <Box
            bg="#ffffff"
            rounded="xl"
            p={8}
            flex={1}
            style={{
              //   position: "absolute",
              marginTop: "-10%",
              zIndex: 20,
              width: "100%",
              height: "100%",
              borderRadius: 20,
              //   display: "flex",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Avenir",
                fontWeight: "300",
                color: "#46454C",
                marginLeft: "3%",
                marginBottom: "1%",
              }}
            >
              About
            </Text>
            <ScrollView
              horizontal={true}
              width="100%"
              style={{ marginLeft: "3%" }}
              showsHorizontalScrollIndicator={false}
            >
              <HStack
                space={4}
                width="80%"
                height="40%"
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {interests.map((interest, index) => (
                  <Badge
                    variant={"outline"}
                    bg="#ffffff"
                    colorScheme="orange"
                    style={{
                      alignItems: "center",
                      minWidth: 80,
                      padding: 12,
                      paddingLeft: 12,
                      paddingRight: 12,
                      // paddingBottom: 0,
                      borderRadius: 20,
                    }}
                  >
                    {interest}
                  </Badge>
                ))}
              </HStack>
            </ScrollView>
            <Text
              style={{
                flex: 1,
                zIndex: 30,
                fontSize: 16,
                fontFamily: "Avenir",
                fontWeight: "300",
                color: "#46454C",
                marginLeft: "3%",
                marginBottom: "1%",
                marginTop: "-30%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              {
                "I am Morikawa.\nFirst time using this app.\nHope to chat more with our young generation."
              }
            </Text>
          </Box>
          <Icon
            as={MaterialCommunityIcons}
            name="arrow-left"
            color="#FFF"
            size={10}
            // marginTop={100}
            // left={30}
            style={{ position: "absolute", top: 40, left: 30 }}
            onPress={() => navigation.goBack()}
          />
        </VStack>
      </View>
    </>
  );
}

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
