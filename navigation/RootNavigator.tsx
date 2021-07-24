import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import * as React from "react";
import firebase from "firebase";
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStack from "./AuthNavigation";
import { connect } from "react-redux";
import DepositScreen from "../screens/DepositFormScreen";
import DepositStack from "./DepositNavigator";
import PersonDetail from "../screens/PersonDetail";
import chatBox from "../screens/chatBox";
import NewUserStack from "./newUserNavigator";

const Stack = createStackNavigator<RootStackParamList>();

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const RootNavigator = (props: any) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {props.user.uid == null ? (
        // No token found, user isn't signed in
        <Stack.Screen name="NoAuth" component={AuthStack} />
      ) : (
        // User is signed in
        <>
          {props.user.isNewUser ? (
            // No token found, user isn't signed in
            <Stack.Screen name="NewUser" component={NewUserStack} />
          ) : (
            <>
              <Stack.Screen name="Auth" component={BottomTabNavigator} />
              <Stack.Screen
                options={{
                  header: () => null,
                  headerTitle: () => null,
                }}
                name="PersonDetailScreen"
                component={PersonDetail}
              />
              <Stack.Screen
                options={{
                  header: () => null,
                  headerTitle: () => null,
                }}
                name="Conversation"
                component={chatBox}
              />
            </>
          )}
        </>
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};

export default connect(mapStateToProps)(RootNavigator);
