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
  VStack,
} from "native-base";
import * as React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Text, View } from "../components/Themed";
import store from "../state/store";
import { pickImage, uploadImageAsync } from "../services/firestore";

export default function DepositScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [recycledObject, setRecycledObject] = useState(null);
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView flex={1} backgroundColor="#57B894">
      <View
        style={{
          flex: 1,
          backgroundColor: "#57B894",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
      >
        <HStack w="100%" alignItems="center">
          <Icon
            as={MaterialCommunityIcons}
            name="arrow-left"
            color="#FFF"
            size={8}
            onPress={() => navigation.goBack()}
          />
          <Text style={{ marginLeft: 10, fontSize: 20, color: "#FFF" }}>
            E-waste deposit form
          </Text>
        </HStack>
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
          <VStack marginTop={20} space={8} flex={1}>
            <Image
              source={require("../assets/images/form.png")}
              alt="form"
              height="30%"
              resizeMode="contain"
            />
            <Input
              padding={4}
              variant="underlined"
              placeholder="Location"
              value={location}
              InputRightElement={
                <Icon
                  as={MaterialCommunityIcons}
                  name="map-marker-outline"
                  color="#57B894"
                  size={8}
                />
              }
              onChangeText={(e: string) => setLocation(e)}
              //   backgroundColor="#F1F1F1"
              //   value={email}
              //   onChangeText={(e: string) => setEmail(e)}
            />
            <Select
              accessibilityLabel="Recycled object"
              placeholder="Recycled object"
              variant="underlined"
              // marginTop={5}
              _selectedItem={{
                bg: "#438672",
                endIcon: <CheckIcon size={4} />,
              }}
              onValueChange={(itemValue) => {
                setRecycledObject(itemValue);
              }}
              // onChange
            >
              <Select.Item label="Mobile Phone" value="Mobile Phone" />
              <Select.Item label="Tablet" value="Tablet" />
              <Select.Item label="Laptop" value="Laptop" />
              <Select.Item label="Desktop" value="Desktop" />
              <Select.Item label="Monitor" value="Monitor" />
            </Select>
            <VStack space={3}>
              <Text style={{ marginLeft: 5, marginTop: 5, color: "#438672" }}>
                Photo (Before deposit): {image != null ? "Uploaded!" : ""}
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
                  <Text style={{ color: "#438672" }}>
                    {image == null ? "Upload" : "Reupload"}
                  </Text>
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
              if (image != null && location != null && recycledObject != null) {
                store.dispatch({
                  type: "DEPOSIT_FORM",
                  dropoffPoint: location,
                  recycledObject: recycledObject,
                  beforeImage: image,
                });
                navigation.navigate("DepositAfter");
              } else {
                alert("Please fill in the form details first!");
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
