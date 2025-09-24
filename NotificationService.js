import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
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
      data, // include navigation info here
    },
    trigger: null,
  });
}

// export async function triggerLocalNotification(title, body) {
//   const permissionGranted = await askNotificationPermissions();
//   if (!permissionGranted) return;

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title,
//       body,
//       sound: "default",
//     },
//     trigger: null,
//   });
// }

export async function scheduleLocalNotificationWithDelay(title, body) {
  // Random delay between 2 and 5 seconds
  const delaySeconds = Math.floor(Math.random() * (5 - 2 + 1)) + 2;

  const permissionGranted = await askNotificationPermissions();
  if (!permissionGranted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delaySeconds,
      repeats: false,
    },
  });
}
