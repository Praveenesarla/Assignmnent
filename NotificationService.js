import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function askNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert(
      "Permission required",
      "Enable notifications to receive alerts."
    );
    return false;
  }

  return true;
}

export async function triggerLocalNotification(title, body, data = {}) {
  const permissionGranted = await askNotificationPermissions();
  if (!permissionGranted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
      data,
    },
    trigger: null,
  });
}

export async function scheduleLocalNotificationWithDelay(title, body) {
  const delaySeconds = Math.floor(Math.random() * 4) + 2;
  const permissionGranted = await askNotificationPermissions();
  if (!permissionGranted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
    },
    trigger: {
      seconds: delaySeconds,
      repeats: false,
    },
  });
}
