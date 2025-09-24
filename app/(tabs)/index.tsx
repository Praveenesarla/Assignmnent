import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import {
  scheduleLocalNotificationWithDelay,
  triggerLocalNotification,
} from "../../NotificationService";

export default function WebViewScreen() {
  const [notified, setNotified] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        onLoadEnd={() => {
          if (!notified) {
            triggerLocalNotification(
              "WebView Loaded!",
              "Tap to watch the video player.",
              { url: "/video" }
            );
            setNotified(true);
          }
        }}
        source={{
          uri: "https://houseofedtech.in/",
        }}
        style={{ flex: 1 }}
      />

      <View style={styles.buttons}>
        <Button
          title="Send Immediate Notification"
          onPress={() =>
            triggerLocalNotification(
              "Immediate Notification",
              "Notification is shown now"
            )
          }
        />
        <Button
          title="Send Delayed Notification (2-5 Sec)"
          onPress={() =>
            scheduleLocalNotificationWithDelay(
              "Delayed Notification",
              "Notification will arrive in 2-5 seconds"
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    padding: 10,
    gap: 10,
  },
});
