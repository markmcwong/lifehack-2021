import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import selectYouthElderly from "../screens/selectYouthElderly";
import selfIntroduction from "../screens/selfIntroduction";
import selectStartingLang from "../screens/selectStartingLang";
import selectFamiliarLang from "../screens/selectFamiliarLang";
import selectInterests from "../screens/selectInterests";

const NewUserNavigator = createStackNavigator();

const NewUserStack = () => (
  <NewUserNavigator.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="selectYouthElderly"
  >
    <NewUserNavigator.Screen
      name="selectYouthElderly"
      component={selectYouthElderly}
    />
    <NewUserNavigator.Screen
      name="selfIntroduction"
      component={selfIntroduction}
    />
    <NewUserNavigator.Screen
      name="selectStartingLang"
      component={selectStartingLang}
    />
    <NewUserNavigator.Screen
      name="selectFamiliarLang"
      component={selectFamiliarLang}
    />
    <NewUserNavigator.Screen
      name="selectInterests"
      component={selectInterests}
    />
  </NewUserNavigator.Navigator>
);

export default NewUserStack;
