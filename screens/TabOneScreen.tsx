import { createStackNavigator } from "@react-navigation/stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { VStack, Image, Button, HStack } from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { fetchGroupByUserID } from "../services/firestore";
import SlideUpDrawer from "../widgets/slideUpDrawer";
import DepositScreen from "./DepositFormScreen";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

function LogoTitle() {
  return (
    <VStack
      alignItems="flex-start"
      // width="100%"
      space={3}
      left={8}
      marginTop={-15}
    >
      <Text style={{ fontSize: 24, color: "#FFF" }}>Hello, User!</Text>
      <Text style={{ fontSize: 12, color: "#FFF", marginTop: -5 }}>
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
          backgroundColor: "#57B894",
          alignSelf: "start",
          alignItems: "center",
          justifyContent: "space-between",
          // position: "absolute",
          height: 100,
          width: "100%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        {LogoTitle()}
        <Button
          variant="unstyled"
          onPress={() => props.navigation.navigate("TabThree")}
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
        <View style={styles.container}>
          <VStack space={4} w="60%" style={{ alignItems: "center" }}>
            <Image source={require("../assets/images/qr-code.png")} />
            <Button
              w={185}
              style={{ backgroundColor: "#57B894" }}
              borderRadius={10}
              onPress={
                () => setScanned(true)
                // navigation.push("Deposit")
              }
            >
              Scan
            </Button>
            <Text style={{ fontWeight: "bold", ...styles.greenText }}>
              Scan the QR Code on the kiosk
            </Text>
            <Text style={styles.greenText}>
              Remember to take a photo of your e-waste before deposit it into
              the kiosk!
            </Text>
          </VStack>
          <SlideUpDrawer
            isPanelActive={shouldDrawerOpen}
            callback={(val) => setDrawerOpen(val)}
          />
        </View>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
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
