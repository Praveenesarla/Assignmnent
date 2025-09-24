import * as Notifications from "expo-notifications";
import { Slot, useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const url = response.notification.request.content.data.url;
        if (typeof url === "string") {
          router.replace(url as any);
        }
      }
    );

    Notifications.getLastNotificationResponseAsync().then((response) => {
      const url = response?.notification.request.content.data.url;
      if (typeof url === "string") {
        router.replace(url as any);
      }
    });

    return () => subscription.remove();
  }, [router]);

  return <Slot />;
}
