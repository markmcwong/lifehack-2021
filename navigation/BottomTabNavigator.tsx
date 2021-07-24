/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import ChatBox from "../screens/chatBox";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { Text, View } from "../components/Themed";
import { Image, HStack, VStack, Icon } from "native-base";
import ProfileScreen from "../screens/ProfileScreen";
import { TouchableOpacity } from "react-native";
import PersonDetailScreen from "../screens/PersonDetail";
import Achievement from "../screens/achievement";
import selfIntroduction from "../screens/selfIntroduction";
import selectStartingLanguage from "../screens/selectStartingLang";
import selectFamiliarLang from "../screens/selectFamiliarLang";
import selectInterests from "../screens/selectInterests";
import selectYouthElderly from "../screens/selectYouthElderly";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Tabbob5"
      tabBar={(props) => <MyTabBar {...props} />}
      tabBarOptions={{
        activeTintColor: "#EFB556",
        inactiveTintColor: "#c2c2c2",
        safeAreaInsets: { bottom: 10 },

        labelStyle: {
          display: "none",
        },
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          // style: { backgroundColor: "#ffffff" },
          // tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tabbob"
        component={selfIntroduction}
        options={{
          // style: { backgroundColor: "#ffffff" },
          // tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tabbob2"
        component={selectStartingLanguage}
        options={{
          // style: { backgroundColor: "#ffffff" },
          // tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tabbob3"
        component={selectFamiliarLang}
        options={{
          // style: { backgroundColor: "#ffffff" },
          // tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tabbob4"
        component={selectInterests}
        options={{
          // style: { backgroundColor: "#ffffff" },
          // tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tabbob5"
        component={selectYouthElderly}
        options={{
          // style: { backgroundColor: "#ffffff" },
          // tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chatbubbles-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={Achievement}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="trophy-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-circle-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  return state.index == 1 ? (
    <></>
  ) : (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#ffffff",
        // height: 50,

        padding: 15,
        borderRadius: 25,
        // justifyContent: "center",
        // alignItems: "center",
        marginHorizontal: 30,
        overflow: "hidden",
        position: "absolute",
        bottom: 20,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Icon
              color={isFocused ? "#ff9f00" : "#c2c2c2"}
              as={options.tabBarIcon}
            ></Icon>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator
      screenOptions={{
        // headerShown: false,
        // header: () => null,
        headerTitle: () => <Text></Text>,
        // headerTintColor: "#ff9f00",
        // headerTitleStyle: { textAlign: "left" },
        // header: () => null,
        headerStyle: {
          backgroundColor: "#ff9f00",
          height: 30,
          shadowOffset: { height: 0 },
        },
      }}
    >
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          // header: () => (
          //   <View style={{ backgroundColor: "#57B894" }}>
          //     <Text>abcx</Text>
          //   </View>
          // ),
          // header: () => null,
          headerTitle: () => <Text></Text>,
        }}
      />
      {/* <TabOneStack.Screen
        name="PersonDetailScreen"
        component={PersonDetailScreen}
        options={{
          headerShown: false,
          // header: () => (
          //   <View style={{ backgroundColor: "#57B894" }}>
          //     <Text>abcx</Text>
          //   </View>
          // ),
          // header: () => null,
          // headerTitle: () => <Text></Text>,
        }}
      /> */}
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={ChatBox}
        options={{
          header: () => null,
          headerTitle: () => <Text></Text>,
        }}
      />
    </TabTwoStack.Navigator>
  );
}
