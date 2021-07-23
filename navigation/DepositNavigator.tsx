import { createStackNavigator } from "@react-navigation/stack";
import DepositScreen from "../screens/DepositFormScreen";
import * as React from "react";
import DepositAfterScreen from "../screens/DepositAfterScreen";
import DepositConfirmedScreen from "../screens/DepositConfirmedScreen";

const DepositNavigator = createStackNavigator();

const DepositStack = () => (
  <DepositNavigator.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="DepositForm"
  >
    <DepositNavigator.Screen name="DepositForm" component={DepositScreen} />
    <DepositNavigator.Screen
      name="DepositAfter"
      component={DepositAfterScreen}
    />
    <DepositNavigator.Screen
      name="DepositConfirmed"
      component={DepositConfirmedScreen}
    />
  </DepositNavigator.Navigator>
);

export default DepositStack;
