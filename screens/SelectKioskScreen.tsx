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
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import store from "../state/store";

export default function SelectKioskScreen({ navigation }) {
  const [location, setLocation] = useState(null);

  const list = [
    {
      name: "NUS Faculty of Science",
      address: "21 Lower Kent Ridge Rd, Singapore 119077",
      coordinates: {
        latitude: 22.3193,
        longitude: 114.1594,
      },
    },
    {
      name: "NUS School of Computing",
      address: "NUS School of Computing, COM1, 13, Computing Dr, 117417",
      coordinates: {
        latitude: 22.3293,
        longitude: 114.1684,
      },
    },
    {
      name: "Block 421",
      address: "421 Ang Mo Kio Ave 10, Singapore 560421",
      coordinates: {
        latitude: 22.3253,
        longitude: 114.1694,
      },
    },
  ];
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView flex={1} backgroundColor="#438672">
      <View
        style={{
          flex: 1,
          backgroundColor: "#438672",
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
            backgroundColor: "#438672",
            paddingHorizontal: 20,
          }}
        >
          <HStack space={4}>
            <Icon
              as={MaterialCommunityIcons}
              name="arrow-left"
              color="#FFF"
              size={8}
              onPress={() => navigation.goBack()}
            />
            <VStack space={1}>
              <Text style={{ fontSize: 28, color: "#FFF", fontWeight: "500" }}>
                Select Kiosk
              </Text>
              <Text style={{ fontSize: 14, color: "#FFF", fontWeight: "400" }}>
                Click the location to select kiosk
              </Text>
            </VStack>
          </HStack>

          <VStack marginTop={35} space={8} flex={1} alignItems="center">
            <Select
              //   selectedValue={language}
              minWidth={200}
              accessibilityLabel="Country"
              placeholder="Country"
              variant="filled"
              // marginTop={5}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
              placeholderTextColor="#438672"
              backgroundColor="#FFF"
              borderRadius={30}
            >
              <Select.Item label="Singapore" value="sg" />
              <Select.Item label="Taiwan" value="tw" />
              <Select.Item label="Hong Kong" value="hk" />
              <Select.Item label="Malaysia" value="my" />
            </Select>

            <VStack space={3} width="100%" flex={1} alignItems="center">
              {list.map((x) => (
                <Button
                  backgroundColor="#FFF"
                  w="100%"
                  // flex={1}
                  // h="10%"
                  // alignItems="flex-start"
                  // justifyContent="center"
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                  padding={6}
                  borderRadius={25}
                  onPress={() => {
                    console.log("clicked");
                    store.dispatch({
                      type: "SELECT_LOCATION",
                      location: x.name,
                      coordinates: x.coordinates,
                    });
                    navigation.goBack();
                  }}
                >
                  <Text
                    style={{
                      color: "#438672",
                      fontWeight: "bold",
                      fontSize: 16,
                      width: "100%",
                    }}
                  >
                    {x.name}
                  </Text>
                  <Text
                    style={{
                      color: "#438672",
                      fontWeight: "400",
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    {x.address}
                  </Text>
                </Button>
              ))}
            </VStack>
          </VStack>
        </View>
      </View>
    </SafeAreaView>
  );
}
