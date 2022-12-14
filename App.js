import { useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import {
  DdLogs,
  DdRum,
  DdSdkReactNative,
  DdSdkReactNativeConfiguration,
} from "expo-datadog";

const config = new DdSdkReactNativeConfiguration(
  "client_token",
  "local",
  "application_id",
  false, // track user interactions such as tapping on a button. You can use
  false, // track XHR resources.
  true // track errors.
);

config.serviceName = "test";
config.verbosity = "debug";

DdSdkReactNative.initialize(config);

export default function App() {
  useEffect(() => {
    DdLogs.info("hello");
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          const err = new Error("add ahh!");
          // throw err;
          DdRum.addError(err.message, "source", err.stack);
        }}
      >
        <Text>Press me!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
