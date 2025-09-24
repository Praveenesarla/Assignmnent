# 📱 Expo Router Notification & Video Player App

This project is a **React Native (Expo)** assignment that demonstrates the use of **Expo Router navigation**, **WebView integration**, **Video playback**, and **local notifications**.

---

## 🚀 Features

- **Tab Navigation** with Expo Router:
  - **WebView Tab** → loads a webpage.
  - **Video Player Tab** → plays multiple video streams with mute/unmute and stream selector.
- **Local Notifications** using `expo-notifications`:
  - Immediate and delayed notifications.
  - Deep linking → tapping a notification can navigate to a specific screen.
- **Video Player** with `expo-av`:
  - Supports HLS and MP4 streams.
  - Loading indicator, mute/unmute, and stream selection.

---

## 🛠 Implementation Choices

- **Expo Router** for file-based navigation.
- **expo-notifications** for handling local notifications and deep-link navigation.
- **react-native-webview** for embedding external web content.
- **expo-av** for reliable video playback.
- **React Hooks** (`useState`, `useEffect`) for state management.

---

## 📖 How It Works

1. The app starts with two tabs: **WebView** and **Video Player**.
2. **WebView Screen**:
   - Loads an external site.
   - Sends a notification when the page finishes loading.
   - Includes buttons to trigger immediate or delayed notifications.
3. **Notification Handling**:
   - If a notification has a `url`, the app navigates to that screen automatically.
4. **Video Player Screen**:
   - Plays a default video stream.
   - Allows switching between multiple streams.
   - Includes mute/unmute functionality and a loading indicator.

---

## ▶️ Running the Project

```bash
# Install dependencies
npm install

# Start the project
npx expo start
```
