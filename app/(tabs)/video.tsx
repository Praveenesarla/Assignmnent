import Octicons from "@expo/vector-icons/Octicons";
import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const streams = [
  {
    id: "stream1",
    label: "Video 1",
    uri: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "stream2",
    label: "Video 2",
    uri: "https://www.pexels.com/download/video/855029/",
  },
  {
    id: "stream3",
    label: "Video 3",
    uri: "https://www.pexels.com/download/video/7102266/",
  },
];

const HLSVideoPlayer = () => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedStream, setSelectedStream] = useState(streams[0].uri);

  const onStreamChange = (uri: string) => {
    setSelectedStream(uri);
    setLoading(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: selectedStream }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onLoadStart={() => setLoading(true)}
        onReadyForDisplay={() => setLoading(false)}
        onError={(error) => console.log("Video error:", error)}
        shouldPlay
        isLooping
        isMuted={isMuted}
      />
      <Octicons
        style={{ alignSelf: "flex-start", margin: 10 }}
        name={isMuted ? "mute" : "unmute"}
        size={24}
        color="#fff"
        onPress={() => setIsMuted((prev) => !prev)}
      />
      {loading && (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          size="large"
          color="#00f"
        />
      )}

      <View style={styles.streamSelector}>
        {streams.map((stream) => (
          <TouchableOpacity
            key={stream.id}
            style={[
              styles.streamButton,
              selectedStream === stream.uri && styles.streamButtonActive,
            ]}
            onPress={() => onStreamChange(stream.uri)}
          >
            <Text style={styles.streamButtonText}>{stream.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
  },
  streamSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  streamButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    backgroundColor: "#222",
    borderRadius: 5,
  },
  streamButtonActive: {
    backgroundColor: "#06f",
  },
  streamButtonText: {
    color: "#fff",
  },
});

export default HLSVideoPlayer;
