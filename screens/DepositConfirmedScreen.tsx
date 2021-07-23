import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  CheckIcon,
  HStack,
  Icon,
  Image,
  Input,
  Select,
  VStack,
} from "native-base";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import store from "../state/store";

export default function DepositConfirmedScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView flex={1} backgroundColor="#FFF4D9">
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF4D9",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            marginVertical: 20,
            borderRadius: 15,
            backgroundColor: "#FFF4D9",

            paddingHorizontal: 30,
          }}
        >
          <VStack space={8} flex={1} alignItems="center" marginTop={10}>
            <Image
              source={require("../assets/images/ty.png")}
              w="100%"
              alt="thank you"
              height="35%"
              resizeMode="contain"
            />
            <Text style={{ fontSize: 28, color: "#438672", fontWeight: "500" }}>
              THANK YOU!
            </Text>
            <VStack space={5} maxWidth={250}>
              <Text
                style={{ fontSize: 16, color: "#394944", textAlign: "center" }}
              >
                Your reward points will be given after our validation is done.
              </Text>
              <Text
                style={{ fontSize: 16, color: "#394944", textAlign: "center" }}
              >
                Thank you again for your support!
              </Text>
            </VStack>
          </VStack>
          <Button
            style={{
              backgroundColor: "#438672",
              width: 200,
              alignSelf: "center",
              borderRadius: 15,
              marginBottom: 20,
            }}
            onPress={() => {
              store.dispatch({ type: "SUBMIT_FORM" });
              navigation.navigate("Auth");
            }}
          >
            <Text style={{ color: "white" }}>Done</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
