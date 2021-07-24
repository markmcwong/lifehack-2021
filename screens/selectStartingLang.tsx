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
  Text,
  View,
  TextArea,
  Select,
  CheckIcon,
  Fab,
} from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { StyleSheet, YellowBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { paddingLeft } from "styled-system";

import EditScreenInfo from "../components/EditScreenInfo";
import DepositScreen from "./DepositFormScreen";
import firestore from "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import { connect, useSelector } from "react-redux";
import MultiSelect from "react-native-multiple-select";
import { setUserMotherTongue } from "../services/firestore";

const mapStateToProps = (state: any, props: any) => {
  return { user: state.user };
};

const options = [
  "Cantonese",
  "Mandarin",
  "Spanish",
  "English",
  "Korean",
  "Arabic",
  "Others",
];
const items = [
  {
    id: "92iijs7yta",
    name: "Ondo",
  },
  {
    id: "a0s0a8ssbsd",
    name: "Ogun",
  },
  {
    id: "16hbajsabsd",
    name: "Calabar",
  },
  {
    id: "nahs75a5sg",
    name: "Lagos",
  },
  {
    id: "667atsas",
    name: "Maiduguri",
  },
  {
    id: "hsyasajs",
    name: "Anambra",
  },
  {
    id: "djsjudksjd",
    name: "Benue",
  },
  {
    id: "sdhyaysdj",
    name: "Kaduna",
  },
  {
    id: "suudydjsjd",
    name: "Abuja",
  },
];
const selectStartingLanguage = (props: any) => {
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [active, setActive] = useState<String[]>([]);
  const user = useSelector((state: any) => state.user);

  let [language, setLanguage] = React.useState("");
  let multiSelect: MultiSelect | null;
  return (
    <>
      <View style={styles.container}>
        <MultiSelect
          // hideTags
          items={items}
          uniqueKey="asdasid"
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
        />
        <VStack
          h="100%"
          w="100%"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            p={12}
            style={{
              marginTop: "-12%",
              color: "#F9A826",
              fontWeight: "bold",
              fontFamily: "Avenir",
              fontSize: 36,
            }}
          >
            {"My Mother Tongue"}
          </Text>
          <Select
            selectedValue={language}
            minWidth={200}
            accessibilityLabel="Select your mother tongue"
            placeholder="Select your mother tongue"
            onValueChange={(itemValue) => setLanguage(itemValue)}
            _selectedItem={{
              bg: "orange.200",
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="Cantonese" value="Cantonese" />
            <Select.Item label="Mandarin" value="Mandarin" />
            <Select.Item label="Spanish" value="Spanish" />
            <Select.Item label="English" value="English" />
            <Select.Item label="Korean" value="Korean" />
            <Select.Item label="Arabic" value="Arabic" />
            <Select.Item label="Others" value="Others" />
          </Select>
          <Fab
            position="absolute"
            size="sm"
            backgroundColor="orange"
            bottom={10}
            right={10}
            onPress={() => {
              setUserMotherTongue(language, user.uid);
              props.navigation.navigate("selectFamiliarLang");
            }}
            icon={
              <Icon
                // position="absolute"
                size="sm"
                color="white"
                as={Ionicons}
                name="arrow-forward-outline"
              />
            }
          />
        </VStack>
      </View>
    </>
  );
};

export default connect(mapStateToProps)(selectStartingLanguage);

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
    backgroundColor: "#ffffff",
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
