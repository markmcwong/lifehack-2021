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
  Fab,
  Pressable,
  IconButton,
  Icon,
  View,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { paddingLeft } from "styled-system";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text } from "../components/Themed";
import SlideUpDrawer from "../widgets/slideUpDrawer";
import DepositScreen from "./DepositFormScreen";
import GestureRecognizer from "react-native-swipe-gestures";
import { fetchUsers, getRecommendedUsers } from "../services/firestore";
import { Ionicons } from "@expo/vector-icons";

const userListArray = [
  {
    profilePicture: null,
    languages: ["English", "Spanish", "Japanese"],
    name: "POOCREAMPIE",
  },
  {
    profilePicture: null,
    languages: ["English", "Spanish", "Spanish", "Spanish", "Japanese"],
    name: "POOCREAMPIE",
  },
  {
    profilePicture: null,
    languages: ["English", "Spanish", "Spanish", "Spanish", "Japanese"],
    name: "POOPCREAMPIE",
  },
  {
    profilePicture: null,
    languages: ["English", "Spanish", "Spanish", "Spanish", "Japanese"],
    name: "POOPIECREAMPIE",
  },
];

function LogoTitle(user: any, setDrawerOpen: Function) {
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
        {user.name}
      </Text>
    </VStack>
  );
}

const TabOneScreen = (props: any) => {
  const [shouldDrawerOpen, setDrawerOpen] = useState(false);
  const [listOfUsers, setlistOfUsers] = useState<any>(null);

  useEffect(() => {
    console.log(props);
    // fetchUsers(["English"]);
    getRecommendedUsers((data: any) => setlistOfUsers(data));
    (async () => {
      // fetchGroupByUserID(props.user.uid);
    })();
  }, []);

  useEffect(() => {
    console.log("here is the list of users");
    console.log(listOfUsers);
  }, [listOfUsers]);
  return (
    <>
      <HStack
        style={{
          backgroundColor: "#ff9f00",
          alignSelf: "start",
          alignItems: "center",
          justifyContent: "space-between",
          // position: "absolute",
          height: 100,
          width: "100%",
          // borderBottomLeftRadius: 20,
          // borderBottomRightRadius: 20,
        }}
      >
        {LogoTitle(props.user, () => setDrawerOpen(!shouldDrawerOpen))}
        <Button
          variant="unstyled"
          onPress={() => props.navigation.navigate("TabFour")}
        >
          <Image
            source={require("../assets/images/robeJobs.jpg")}
            alt="profile"
            height={50}
            width={50}
            marginRight={25}
            borderRadius={25}
          />
        </Button>
      </HStack>
      <View
        position="absolute"
        // placement="top-right"
        top={20}
        // left={190}
        zIndex={3}
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton
          size="lg"
          backgroundColor="white"
          borderRadius={30}
          onPress={() => {
            setDrawerOpen(!shouldDrawerOpen);
          }}
          icon={
            <Icon
              // position="absolute"
              size="sm"
              color="orange"
              as={Ionicons}
              name="filter-outline"
            />
          }
        />
      </View>
      <GestureRecognizer
        onSwipeUp={() => {
          console.log("swiped");
          setDrawerOpen(true);
        }}
        onSwipeDown={() => setDrawerOpen(false)}
        style={styles.container}
      >
        <SlideUpDrawer
          isPanelActive={shouldDrawerOpen}
          callback={(val) => setDrawerOpen(val)}
        />
        <ScrollView>
          {listOfUsers == null ? (
            <React.Fragment />
          ) : (
            <View style={styles.container}>
              {listOfUsers!.map((item: any, index: number) => (
                <Pressable
                  onPress={() =>
                    props.navigation.navigate("PersonDetailScreen")
                  }
                  bg="#ffffff"
                  rounded="xl"
                  p={8}
                  style={{
                    width: "90%",
                    borderRadius: 20,
                    marginBottom: "5%",
                  }}
                >
                  <HStack space={4} w="100%" style={{ alignItems: "center" }}>
                    <Avatar
                      size="lg"
                      source={require("../assets/images/robeJobs.jpg")}
                    >
                      SS
                    </Avatar>
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
                          fontSize: 24,
                          fontWeight: "bold",
                          color: "#46454C",
                        }}
                      >
                        {item.name}
                      </Text>
                      <ScrollView
                        horizontal={true}
                        width="80%"
                        showsHorizontalScrollIndicator={false}
                      >
                        <HStack space={2} width="80%">
                          {item.languages &&
                            item.languages.map((language, index) => (
                              <Badge
                                variant={"outline"}
                                colorScheme={index == 0 ? "orange" : "dark"}
                                style={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                  minWidth: 80,
                                  padding: 12,
                                  paddingLeft: 12,
                                  paddingRight: 12,
                                  // paddingBottom: 0,
                                  borderRadius: 10,
                                }}
                              >
                                {language}
                              </Badge>
                            ))}
                        </HStack>
                      </ScrollView>
                    </VStack>
                  </HStack>
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
      </GestureRecognizer>
    </>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(TabOneScreen);
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
