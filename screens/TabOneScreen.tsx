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
  Pressable,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { paddingLeft } from "styled-system";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import SlideUpDrawer from "../widgets/slideUpDrawer";
import DepositScreen from "./DepositFormScreen";
import GestureRecognizer from "react-native-swipe-gestures";
import { fetchUsers } from "../services/firestore";

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

const TabOneScreen = (props: any) => {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [shouldDrawerOpen, setDrawerOpen] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(false);
    alert(`Data ${data} has been scanned!`);
    props.navigation.navigate("Deposit");
  };

  useEffect(() => {
    console.log(props);
    fetchUsers(["English"]);
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      // fetchGroupByUserID(props.user.uid);
    })();
  }, []);
  return scanned ? (
    <BarCodeScanner
      onBarCodeScanned={scanned ? handleBarCodeScanned : undefined}
      style={StyleSheet.absoluteFillObject}
    />
  ) : (
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
        {LogoTitle()}
        <Button
          variant="unstyled"
          onPress={() => props.navigation.navigate("TabFour")}
        >
          <Image
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
            }}
            alt="profile"
            height={50}
            width={50}
            marginRight={25}
            borderRadius={25}
          />
        </Button>
      </HStack>
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
          <View style={styles.container}>
            {userListArray.map((item, array) => (
              <Pressable
                onPress={() => props.navigation.navigate("PersonDetailScreen")}
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
                    source={{
                      uri: "https://wallpaperaccess.com/full/317501.jpg",
                    }}
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
                        {item.languages.map((language, index) => (
                          <Badge
                            variant={"outline"}
                            colorScheme={index == 0 ? "orange" : "dark"}
                            style={{
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
