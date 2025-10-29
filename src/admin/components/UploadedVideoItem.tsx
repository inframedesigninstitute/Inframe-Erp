"use client"

import { LinearGradient } from "expo-linear-gradient"
import React, { useRef, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from "react-native"

interface VideoItem {
  id: string
  title: string
  thumbnail: ImageSourcePropType | string
  uri: string
  duration: number
}

interface UploadedVideoItemProps {
  onBack?: () => void
}

const UploadedVideoItem: React.FC<UploadedVideoItemProps> = ({ onBack }) => {
  const [videos, setVideos] = useState<VideoItem[]>([
    {
      id: "1",
      title: "Lecture 1: Intro to Biology",
      thumbnail: "https://via.placeholder.com/150x100/ff6b6b/FFFFFF?text=Bio+Lec+1",
      uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      duration: 3600,
    },
    {
      id: "2",
      title: "Tutorial: Photosynthesis",
      thumbnail: "https://via.placeholder.com/150x100/4ecdc4/FFFFFF?text=Photo+Tut",
      uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      duration: 2400,
    },
    {
      id: "3",
      title: "Advanced Cell Structure",
      thumbnail: "https://via.placeholder.com/150x100/4f86f7/FFFFFF?text=Cell+Adv",
      uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      duration: 1800,
    },
  ])

  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(videos[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const scaleAnim = useRef(new Animated.Value(1)).current

  // ✅ Animated button press
  const onPressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
      duration: 120,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 120,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start()
  }

  // ✅ File Upload with full DocumentPicker support
  const handleUploadVideo = async () => {
    try {
      setIsLoading(true)

      if (Platform.OS === "web") {
        // For web upload
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "video/*"
        input.onchange = (e: any) => {
          const file = e.target.files?.[0]
          if (!file) return
          const newVideoUrl = URL.createObjectURL(file)
          const newVideo: VideoItem = {
            id: Date.now().toString(),
            title: file.name,
            thumbnail: "https://via.placeholder.com/150x100/000000/FFFFFF?text=NEW+UPLOAD",
            uri: newVideoUrl,
            duration: 0,
          }
          setVideos((prev) => [...prev, newVideo])
          setSelectedVideo(newVideo)
          Alert.alert("✅ Success", "Video uploaded successfully!")
        }
        input.click()
      } else {
        // Native app (Android/iOS)
        const DocumentPicker = require("react-native-document-picker")
        const res = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.video],
        })
        const newVideo: VideoItem = {
          id: Date.now().toString(),
          title: res.name ?? "New Video",
          thumbnail: "https://via.placeholder.com/150x100/000000/FFFFFF?text=NEW+UPLOAD",
          uri: res.uri,
          duration: 0,
        }
        setVideos((prev) => [...prev, newVideo])
        setSelectedVideo(newVideo)
        Alert.alert("✅ Success", "Video uploaded successfully!")
      }
    } catch (error: any) {
      // Ensure DocumentPicker is defined before checking
      if (Platform.OS !== "web") {
        const DocumentPicker = require("react-native-document-picker")
        if (!DocumentPicker.isCancel(error)) {
          Alert.alert("❌ Error", "Failed to upload video.")
        }
      } else {
        Alert.alert("❌ Error", "Failed to upload video.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayPause = () => {
    if (!videoRef.current) return
    if (isPlaying) videoRef.current.pause()
    else videoRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const handleForward = () => {
    if (videoRef.current) videoRef.current.currentTime += 10
  }

  const handleBackward = () => {
    if (videoRef.current) videoRef.current.currentTime -= 10
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.videoThumbnail, selectedVideo?.id === item.id && styles.selectedThumbnail]}
      onPress={() => setSelectedVideo(item)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Image
          source={typeof item.thumbnail === "string" ? { uri: item.thumbnail } : item.thumbnail}
          style={styles.thumbnailImage}
        />
        <View style={styles.videoOverlay}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {item.title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LIVE CLASS PLATFORM</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>10:00 AM</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.contentInner}>
          {/* Left Panel */}
          <View style={styles.leftPanel}>
            <Text style={styles.sectionTitle}>UPLOADED{"\n"}VIDEOS</Text>
            <FlatList
              data={videos}
              renderItem={renderVideoItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled
              style={styles.videoList}
            />

            {/* Upload Button */}
            <Animated.View style={[styles.uploadButtonWrapper, { transform: [{ scale: scaleAnim }] }]}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={handleUploadVideo}
              >
                <LinearGradient
                  colors={["#4f86f7", "#6c63ff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.uploadButton}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.uploadButtonText}>📤 Upload New Video</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Right Panel */}
          {selectedVideo && (
            <Animated.View style={[styles.rightPanel, { transform: [{ scale: scaleAnim }] }]}>
              <View style={styles.playerContainer}>
                <video
                  ref={videoRef}
                  src={selectedVideo.uri}
                  style={{ width: "100%", height: 300, backgroundColor: "#000" }}
                  controls
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                />
                <View style={styles.videoHeader}>
                  <Text style={styles.videoHeaderTitle}>🎥 LIVE CLASS: {selectedVideo.title}</Text>
                </View>
              </View>

              <View style={styles.controls}>
                <TouchableOpacity onPress={handleBackward} style={styles.controlButton}>
                  <Text style={styles.controlIcon}>⏮ -10s</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
                  <Text style={styles.playButtonLarge}>{isPlaying ? "⏸" : "▶"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleForward} style={styles.controlButton}>
                  <Text style={styles.controlIcon}>+10s ⏭</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.timeDisplay}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default UploadedVideoItem

// ----------------------------
// STYLES
// ----------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef3f8", paddingTop: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 12,
    elevation: 10,
  },
  backButton: { padding: 8 },
  backButtonText: { color: "#333", fontSize: 14, fontWeight: "600" },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#111", flex: 1, textAlign: "center" },
  timeContainer: { flexDirection: "row", alignItems: "center" },
  timeText: { color: "#000", fontSize: 14 },
  content: { flex: 1, paddingHorizontal: 20 },
  contentInner: { flexDirection: "row", gap: 20, paddingBottom: 20 },
  leftPanel: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 8,
  },
  rightPanel: {
    flex: 1.2,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  videoList: { flex: 1, marginBottom: 15 },
  videoThumbnail: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f7f9fb",
    borderWidth: 1,
    borderColor: "#e0e4e7",
  },
  selectedThumbnail: { borderColor: "#4f86f7" },
  thumbnailImage: { width: "100%", height: 100, resizeMode: "cover" },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  playIcon: { fontSize: 26, color: "#fff" },
  videoTitle: { padding: 8, fontSize: 12, color: "#111", fontWeight: "600", textAlign: "center" },
  uploadButtonWrapper: { alignItems: "center", marginTop: 20 },
  uploadButton: {
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 26,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#4f86f7",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  playerContainer: {
    backgroundColor: "#f0f3f8",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
  },
  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#e2e7ef",
  },
  videoHeaderTitle: { color: "#111", fontSize: 14, fontWeight: "bold", flex: 1 },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 15,
  },
  controlButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f1f3f6",
  },
  controlIcon: { fontSize: 13, color: "#333", fontWeight: "600" },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4f86f7",
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonLarge: { fontSize: 26, color: "#fff" },
  timeDisplay: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
})
