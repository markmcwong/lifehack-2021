import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Pressable,
  StatusBar,
  VStack,
  Text,
} from "native-base";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "../components/Themed";
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { logout } from "../services/auth";
import { useEffect } from "react";
import { getHistory } from "../services/firestore";
import { connect } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";

export const data = [
  { name: "Mobile Phone", points: 30 },
  { name: "Tablet", points: 40 },
  { name: "Laptop", points: 60 },
  { name: "Desktop", points: 80 },
  { name: "Monitor", points: 50 },
];

const SecondRoute = (props: any) => (
  <ScrollView>
    <VStack
      alignItems="center"
      width={Dimensions.get("window").width}
      height="100%"
      space={3}
      marginTop={3}
      paddingBottom={20}
    >
      <ImageBackground
        resizeMode="contain"
        source={require("../assets/images/reward.png")}
        style={styles.rewards}
      >
        <VStack space={4}>
          <Text
            style={{
              alignSelf: "center",
              marginTop: "5%",
              marginLeft: "-35%",
              // fontWeight: "bold",
              color: "white",
              fontSize: 14,
            }}
          >
            Current Reward Points:
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              color: "white",
              fontSize: 28,
            }}
          >
            {props.reward}
          </Text>
        </VStack>
      </ImageBackground>
      <View
        style={{
          borderWidth: 3,
          borderColor: "green",
          width: "80%",
          borderRadius: 15,
          padding: 15,
          backgroundColor: "transparent",
        }}
      >
        <VStack>
          {data.map((x) => (
            <HStack
              justifyContent="space-between"
              key={x.name}
              style={{ padding: 7.5 }}
            >
              <HStack>
                <View
                  style={{
                    alignSelf: "center",
                    height: 3,
                    width: 3,
                    backgroundColor: "#438672",
                    marginRight: 8,
                  }}
                />
                <Text style={styles.bulletPoints}>{x.name}</Text>
              </HStack>
              <Text style={styles.bulletPoints}>{x.points} pts</Text>
            </HStack>
          ))}
        </VStack>
      </View>
      <View
        style={{
          borderWidth: 3,
          borderColor: "green",
          width: "80%",
          borderRadius: 15,
          padding: 25,
          backgroundColor: "transparent",
        }}
      >
        <VStack space={5}>
          <Text style={{ ...styles.bulletPoints, fontSize: 16 }}>
            Reward Scheme
          </Text>
          <VStack alignItems="center" space={3}>
            <HStack>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: "#438672",
                  fontSize: 28,
                }}
              >
                150
              </Text>
              <Text style={{ marginLeft: 3, fontSize: 16, color: "grey" }}>
                pts
              </Text>
            </HStack>
            <Text style={{ color: "grey", lineHeight: 22.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
              aliquam tempus vulputate vestibulum eget sit vel tincidunt sit.
              Quis faucibus in interdum arcu quis.
            </Text>
          </VStack>
          <VStack alignItems="center" space={3}>
            <HStack>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  color: "#438672",
                  fontSize: 28,
                }}
              >
                300
              </Text>
              <Text style={{ marginLeft: 3, fontSize: 16, color: "grey" }}>
                pts
              </Text>
            </HStack>
            <Text style={{ color: "grey", lineHeight: 22.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
              aliquam tempus vulputate vestibulum eget sit vel tincidunt sit.
              Quis faucibus in interdum arcu quis.
            </Text>
          </VStack>
        </VStack>
      </View>
    </VStack>
  </ScrollView>
);

const FirstRoute = (history: any) => (
  <ScrollView style={{ flex: 1 }}>
    <VStack alignItems="center" paddingBottom="20">
      {history &&
        history.map((x: any) => (
          <VStack
            style={{
              borderWidth: 3,
              borderColor: "green",
              width: "80%",
              borderRadius: 15,
              paddingTop: 10,
              paddingBottom: 25,
              marginBottom: 15,
              paddingHorizontal: 25,
              backgroundColor: "transparent",
            }}
            key={x.id}
          >
            <HStack justifyContent="space-between">
              <VStack space={1}>
                <Text style={styles.title}>Transaction No:</Text>
                <Text style={styles.info}>{x.id}</Text>
                <Text style={styles.title}>Date:</Text>
                <Text style={styles.info}>
                  {
                    (x._createdAt as firebase.firestore.Timestamp)
                      .toDate()
                      .toLocaleString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })
                    // .slice(0, -3)
                  }
                </Text>
              </VStack>
              <VStack space={1}>
                <Text style={styles.title}>Recycled Object:</Text>
                <Text style={styles.info}>{x.recycledObject}</Text>
                <Text style={styles.title}>Reward Points:</Text>
                <Text style={styles.info}>{x.points}</Text>
              </VStack>
            </HStack>
            <VStack space={1}>
              <Text style={styles.title}>Location:</Text>
              <Text style={styles.info}>{x.location}</Text>
              <Text style={{ ...styles.info, fontWeight: "300" }}>
                {x.address}
              </Text>
            </VStack>
          </VStack>
        ))}
    </VStack>
  </ScrollView>
);

const mapStateToSchemeProps = (state: any, props: any) => {
  console.log(state.user);
  return { reward: state.user.reward };
};

const mapHistoryToSchemeProps = (state: any, props: any) => {
  return {};
};

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const ProfileScreen = (props: any) => {
  const [index, setIndex] = React.useState(0);
  const [history, setHistory] = React.useState(null);
  const [routes] = React.useState([
    { key: "History", title: "History" },
    { key: "SchemeDetails", title: "Scheme Details" },
  ]);
  const initialLayout = { width: Dimensions.get("window").width };
  const renderScene = SceneMap({
    History: connect(mapHistoryToSchemeProps)(() => FirstRoute(history)),
    SchemeDetails: connect(mapStateToSchemeProps)(SecondRoute),
  });
  useEffect(() => {
    fetchFirestoreHistory();
  }, []);

  const fetchFirestoreHistory = async () => {
    const temp: any = await getHistory(props.user);
    setHistory(temp);
  };

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map(
      (x: any, i: number) => i
    );

    return (
      <Box
        flexDirection="row"
        w={Dimensions.get("window").width * 0.7}
        borderRadius={15}
        padding={1}
        marginTop={4}
        marginBottom={4}
        marginLeft={Dimensions.get("window").width * 0.15}
        marginRight={Dimensions.get("window").width * 0.15}
      >
        {props.navigationState.routes.map((route: any, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <Box
              flex={1}
              alignItems="center"
              p={2}
              key={i}
              borderTopLeftRadius={i == 0 ? 20 : 0}
              borderBottomLeftRadius={i == 0 ? 20 : 0}
              borderBottomRightRadius={i == routes.length - 1 ? 20 : 0}
              borderTopRightRadius={i == routes.length - 1 ? 20 : 0}
              backgroundColor={index == i ? "#438672" : "transparent"}
              borderColor="#438672"
              borderWidth={2}
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    opacity,
                    color: index != i ? "#438672" : "#FFF",
                    fontWeight: "600",
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };
  return (
    <SafeAreaView>
      <VStack
        alignItems="center"
        width={Dimensions.get("window").width}
        height="100%"
        marginTop={3}
      >
        <HStack style={styles.topBar}>
          <Text style={{ fontSize: 24, color: "#438672", fontWeight: "600" }}>
            Profile
          </Text>
          <Icon
            size="sm"
            as={<AntDesign name="logout" />}
            color="black"
            onPress={() => logout()}
          />
        </HStack>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={{
            marginTop: StatusBar.currentHeight,
            // justifyContent: "center",
          }}
        />
      </VStack>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(ProfileScreen);
const styles = StyleSheet.create({
  topBar: {
    justifyContent: "space-between",
    width: "80%",
  },
  rewards: {
    width: "100%",
    height: 125,
  },
  bulletPoints: {
    color: "#438672",
    fontWeight: "500",
  },
  title: {
    fontWeight: "300",
    opacity: 0.89,
    marginTop: 15,
  },
  info: {
    fontWeight: "bold",
    color: "#438672",
  },
});
