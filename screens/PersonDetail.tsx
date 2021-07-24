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
  ZStack,
  Container,
  Fab,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { paddingLeft } from "styled-system";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import DepositScreen from "./DepositFormScreen";
import { connectTwoUsers, getUserDetails } from "../services/firestore";
import { useSelector } from "react-redux";

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

export default function PersonDetailScreen({ navigation, route }) {
  const user = useSelector((state: any) => state.user);
  const [isShown, setIsShown] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    getUserDetails(route.params.id, (val: any) => setUserDetails(val));
  }, []);
  return (
    <>
      <View style={styles.container}>
        <VStack h="100%" w="100%">
          <Image
            // flex={1}
            // resizeMode="cover"
            w="100%"
            h="50%"
            alt="DisplayPicture"
            source={
              !user.isYouth
                ? require("../assets/images/robeJobs.jpg")
                : require("../assets/images/asian-elderly-woman-feeling-happy-smiling-looking-camera-while-relax-kitchen-home.png")
            }
          />
          <VStack h="100%" w="100%" alignItems="flex-start">
            <Box
              bg={user.isYouth ? "#EFB556" : "#78C9A7"}
              borderTopRadius={25}
              paddingLeft={8}
              py={7}
              h={180}
              w="100%"
              alignItems="flex-start"
              style={{
                //   position: "absolute",
                marginTop: "-10%",
                // zIndex: 10,
                // borderRadius: 40,
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
                {userDetails && userDetails.name}
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
              <Container h={12}>
                <ScrollView
                  horizontal={true}
                  // height="60%"
                  style={{
                    marginLeft: "3%",
                    marginBottom: "1%",
                    width: "100%",
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  <HStack
                    space={4}
                    width="100%"
                    // height="80%"
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    {userDetails &&
                      userDetails.languages &&
                      userDetails.languages.map((language, index) => (
                        <Badge
                          bg="#ffffff"
                          variant={"outline"}
                          colorScheme={
                            index == 0
                              ? user.isYouth
                                ? "orange"
                                : "green"
                              : "light"
                          }
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
              </Container>
            </Box>
            <VStack
              bg="#ffffff"
              rounded="xl"
              px={8}
              py={6}
              flex={1}
              space={2}
              w="100%"
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{
                // position: "absolute",
                marginTop: "-2.5%",
                zIndex: 20,
                // height: "50%",
                borderRadius: 20,
                // bottom: "50%",
                // flex: 1,
                // display: "flex",
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

              <Container h={12}>
                <ScrollView
                  horizontal={true}
                  width="100%"
                  style={{ marginLeft: "3%" }}
                  showsHorizontalScrollIndicator={false}
                >
                  {userDetails &&
                    userDetails.interests &&
                    userDetails.interests.map((interest, index) => (
                      <Badge
                        variant={"outline"}
                        bg="#ffffff"
                        colorScheme={user.isYouth ? "orange" : "green"}
                        style={{
                          alignItems: "center",
                          minWidth: 80,
                          padding: 12,
                          paddingLeft: 12,
                          paddingRight: 12,
                          marginRight: 12,
                          height: 40,
                          // paddingBottom: 0,
                          borderRadius: 20,
                        }}
                      >
                        {interest}
                      </Badge>
                    ))}
                </ScrollView>
              </Container>
              <Text
                // flex={1}
                h="100%"
                style={{
                  // flex: 1,
                  // zIndex: 30,
                  fontSize: 16,
                  fontFamily: "Avenir",
                  fontWeight: "300",
                  color: "#46454C",
                  marginLeft: "3%",
                  marginBottom: "1%",
                  // marginTop: "-30%",
                  // alignItems: "flex-start",
                  // justifyContent: "flex-start",
                }}
              >
                {userDetails && userDetails.bio != ""
                  ? (userDetails.bio as string).split("\\n").map((x, index) => (
                      <Text>
                        {index == 0 ? "" : "\n"}
                        {x}
                      </Text>
                    ))
                  : "This user has no user information yet."}
              </Text>
              {isShown && (
                <Fab
                  position="absolute"
                  size="sm"
                  backgroundColor={user.isYouth ? "orange" : "#78C9A7"}
                  onPress={async () => {
                    const id = await connectTwoUsers([
                      user.uid,
                      route.params.id,
                    ]);
                    navigation.navigate("Conversation", {
                      id: id,
                      name: userDetails.name,
                    });
                    setIsShown(false);
                  }}
                  icon={
                    <Icon
                      // position="absolute"
                      size="sm"
                      color="white"
                      as={Ionicons}
                      name="chatbubble-outline"
                    />
                  }
                />
              )}
            </VStack>
          </VStack>
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
