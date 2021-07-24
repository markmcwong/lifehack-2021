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
  Text,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { LogBox, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { paddingLeft } from "styled-system";

import EditScreenInfo from "../components/EditScreenInfo";
import SlideUpDrawer from "../widgets/slideUpDrawer";
import GestureRecognizer from "react-native-swipe-gestures";
import { fetchUsers, getRecommendedUsers } from "../services/firestore";
import { Ionicons } from "@expo/vector-icons";

LogBox.ignoreAllLogs();

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
  const [selectedLanguages, setSelectedLanguages] = useState<any>([]);
  const [querySnapshot, setQuerySnapshot] = useState<any>(null);
  useEffect(() => {
    console.log(selectedLanguages);
    typeof querySnapshot == Function && querySnapshot();
    const test = getRecommendedUsers(
      props.user.isYouth,
      (data: any) => setlistOfUsers(data),
      selectedLanguages
    );
    setQuerySnapshot(test);
  }, [selectedLanguages]);

  useEffect(() => {
    console.log("here is the list of users");
    console.log(listOfUsers);
  }, [listOfUsers]);

  return (
    <>
      <HStack
        style={{
          backgroundColor: props.user.isYouth ? "#ff9f00" : "#78C9A7",
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
              color={props.user.isYouth ? "orange" : "#78C9A7"}
              as={Ionicons}
              name="filter-outline"
            />
          }
        />
      </View>
      <ScrollView
        style={{ backgroundColor: props.user.isYouth ? "#ffe4b8" : "#B4E5D1" }}
      >
        {listOfUsers == null ? (
          <React.Fragment />
        ) : (
          <View
            style={{
              ...styles.container,
              paddingBottom: 60,
            }}
          >
            {listOfUsers!.map((item: any, index: number) => (
              <Pressable
                onPress={() =>
                  props.navigation.navigate("PersonDetailScreen", {
                    id: item.id,
                  })
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
                              colorScheme={
                                index == 0
                                  ? props.user.isYouth
                                    ? "orange"
                                    : "green"
                                  : "dark"
                              }
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
                              <Text
                                fontSize={13}
                                w="100%"
                                textAlign="center"
                                style={{
                                  color:
                                    index == 0
                                      ? props.user.isYouth
                                        ? "orange"
                                        : "green"
                                      : "dark",
                                }}
                              >
                                {language}
                              </Text>
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
      <GestureRecognizer
        onSwipeUp={() => {
          console.log("swiped");
          setDrawerOpen(true);
        }}
        onSwipeDown={() => setDrawerOpen(false)}
        style={{
          height: "15%",
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 20,
        }}
      >
        <SlideUpDrawer
          isPanelActive={shouldDrawerOpen}
          callback={(val) => setDrawerOpen(val)}
          setSelectedLanguages={setSelectedLanguages}
        />
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
