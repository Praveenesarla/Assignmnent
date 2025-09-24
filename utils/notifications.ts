import * as Notifications from "expo-notifications";

// Configure how notifications are handled
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, // Show a notification banner
    shouldShowList: true, // Include notification in notifications list
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Function to schedule a notification (2–5s delay)
export const scheduleNotification = async (title: string, body: string) => {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: {
      type: "timeInterval",
      seconds: Math.floor(Math.random() * 3) + 2,
    }, // 2–5s delay
  });
};
