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
  Spinner,
  useColorModeValue,
  VStack,
} from "native-base";
import * as React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import { textAlign } from "styled-system";
import { pickImage } from "../services/firestore";
import store from "../state/store";

export default function DepositAfterScreen({ navigation }) {
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);

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
          <VStack space={8} flex={1} alignItems="center">
            <Image
              source={require("../assets/images/after.png")}
              w="100%"
              alt="after"
              height="35%"
              resizeMode="contain"
            />
            <Text style={{ fontSize: 28, color: "#438672", fontWeight: "500" }}>
              PROCEDURE
            </Text>
            <VStack space={3} maxWidth={250}>
              <Text
                style={{
                  color: "#394944",
                }}
              >
                1. Deposit your e-waste into the kiosk.{" "}
              </Text>
              <HStack>
                <Text
                  style={{
                    color: "#394944",
                  }}
                >
                  2.
                </Text>
                <Text
                  style={{
                    color: "#394944",
                  }}
                >
                  Upload a photo of the e-waste being inside the kiosk.
                </Text>
              </HStack>
              <Text
                style={{
                  color: "#394944",
                }}
              >
                3. Click the “Confirm” button below
              </Text>
            </VStack>
            <VStack space={3} alignItems="center">
              <Text
                style={{
                  marginLeft: 5,
                  textAlign: "center",
                  marginTop: 5,
                  color: "#438672",
                }}
              >
                Photo (After deposit): {image != null && "Uploaded!"}
              </Text>
              {uploading ? (
                <Spinner color="#2F80ED" />
              ) : (
                <Button
                  w={100}
                  variant="outline"
                  borderColor="#438672"
                  padding={2}
                  marginLeft={1}
                  borderRadius={12}
                  onPress={() =>
                    pickImage(
                      (e: any) => setUploading(e),
                      (z: any) => setImage(z)
                    )
                  }
                >
                  <Text style={{ color: "#438672" }}>Upload</Text>
                </Button>
              )}
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
              if (image != null) {
                store.dispatch({ type: "DEPOSIT_CONFIRM", afterImage: image });
                navigation.navigate("DepositConfirmed");
              } else {
                alert("Please upload your image");
              }
            }}
          >
            <Text style={{ color: "white" }}>Next</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
