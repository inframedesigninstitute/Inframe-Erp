"use client"

import { useState } from "react"
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform, // <-- Essential for checking Web vs. Native
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

// 🛑 IMPORTANT: REMOVED the static import of DocumentPicker here!
// We will use 'require()' inside the functions for lazy loading.

import UploadedVideoItem from "../components/UploadedVideoItem"

const screenWidth = Dimensions.get("window").width

// --- Interfaces and Initial Data (Retained) ---
export interface VideoItem {
  id: string
  title: string
  thumbnailUrl: string
  videoUrl: string
  category: "FRONT_END" | "BRANDING" | "UI_UX"
  mentorName: string
  mentorAvatar: string
}
export interface DocumentItem {
  id: string
  name: string
  fileType: string
  downloadUrl: string
}

export const initialRecentVideos: VideoItem[] = [
  {
    id: "v1",
    title: "A Beginner's Roadmap to Becoming a Front-End Developer.",
    thumbnailUrl:
      "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    videoUrl: "https://example.com/frontend-video.mp4",
    category: "FRONT_END",
    mentorName: "Leonardo Samsul",
    mentorAvatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    id: "v_empty_1", // Placeholder 1
    title: "Tutorial: Photosynthesis Basics",
    thumbnailUrl: "", 
    videoUrl: "",
    category: "FRONT_END",
    mentorName: "Mentor", 
    mentorAvatar: "",
  },
  {
    id: "v_empty_2", // Placeholder 2
    title: "Module 3: Cell Structure",
    thumbnailUrl: "", 
    videoUrl: "",
    category: "FRONT_END",
    mentorName: "Mentor", 
    mentorAvatar: "",
  },
]

export const initialUploadedDocuments: DocumentItem[] = [
  { id: "d1", name: "Algebra_Homework.pdf", fileType: "PDF", downloadUrl: "https://example.com/algebra.pdf" },
]

// --- NavButton Component (Retained) ---
export const NavButton = ({ title, onPress, style = "primary" }: any) => {
  let buttonStyle = styles.buttonPrimary
  let textStyle = styles.buttonTextPrimary

  if (style === "secondary") {
    buttonStyle = styles.buttonSecondary
    textStyle = styles.buttonTextSecondary
  } else if (style === "live") {
    buttonStyle = styles.buttonLive
    textStyle = styles.buttonTextLive
  } else if (style === "upload") {
    buttonStyle = styles.buttonUpload
    textStyle = styles.buttonTextUpload
  }

  return (
    <TouchableOpacity style={[styles.buttonBase, buttonStyle]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

// --- Video Card with 3D effect (Retained) ---
const VideoCard = ({ video, onView }: { video: VideoItem; onView: (url: string) => void }) => {
  const scale = new Animated.Value(1)

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start()
  }
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start()
  }

  const { tagStyle, text: tagText } =
    video.category === "FRONT_END"
      ? { tagStyle: styles.tagFrontEnd, text: "FRONT END" }
      : video.category === "BRANDING"
      ? { tagStyle: styles.tagBranding, text: "BRANDING" }
      : { tagStyle: styles.tagUIUX, text: "UI/UX DESIGN" }

  const isEmptyCard = !video.thumbnailUrl && !video.mentorAvatar;

  return (
    <Animated.View style={{ transform: [{ scale }], marginRight: 15 }}>
      <TouchableOpacity
        style={styles.videoCard3D}
        onPress={() => !isEmptyCard && onView(video.videoUrl)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={isEmptyCard ? 1 : 0.9}
      >
        {isEmptyCard ? (
          <View style={styles.emptyVideoCardContent}></View>
        ) : (
          <Image source={{ uri: video.thumbnailUrl }} style={styles.videoImage} />
        )}
        
        <View style={styles.videoContent}>
          <View style={[styles.tagBase, tagStyle]}>
            <Text style={styles.tagText}>{tagText}</Text>
          </View>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {video.title}
          </Text>

          {!isEmptyCard && (
            <View style={styles.mentorContainer}>
              <Image source={{ uri: video.mentorAvatar }} style={styles.mentorImage} />
              <View>
                <Text style={styles.mentorNameText}>{video.mentorName}</Text>
                <Text style={styles.mentorRoleText}>Mentor</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

// --- Document Row (Retained) ---
const DocumentRow = ({ document }: { document: DocumentItem }) => {
  const handleView = async (url: string) => {
    const supported = await Linking.canOpenURL(url)
    if (supported) await Linking.openURL(url)
    else Alert.alert("Cannot open URL", `The link for ${document.name} is not supported.`)
  }
  return (
    <View style={styles.documentRow}>
      <View style={styles.documentInfo}>
        <Text style={styles.documentName}>{document.name}</Text>
        <Text style={styles.documentType}>({document.fileType})</Text>
      </View>
      <TouchableOpacity style={styles.documentActionButton} onPress={() => handleView(document.downloadUrl)}>
        <Text style={styles.documentActionText}>View</Text>
      </TouchableOpacity>
    </View>
  )
}


// --- Main Screen Component ---
const StudentNotesScreen = () => {
  const [recentVideos, setRecentVideos] = useState<VideoItem[]>(initialRecentVideos)
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentItem[]>(initialUploadedDocuments)
  const [showAllVideos, setShowAllVideos] = useState(false)

  const handleVideoView = (url: string) => {
    if (url) { 
      Alert.alert("View Video", `Playing: ${url}`)
    }
  }

  // --- 🎥 VIDEO UPLOAD HANDLER (Lazy Loaded and Platform-Safe) ---
  const handleUploadVideo = async () => {
    if (Platform.OS === 'web') {
      // Web fallback: Avoids Native Module crash and performs mock upload
      Alert.alert("Web Upload Simulation", "On the web, file selection is handled by a standard HTML input. Mock video added.");
      
      const newVideo: VideoItem = {
        id: `v${Date.now()}`,
        title: "Web Uploaded Lecture",
        thumbnailUrl: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        videoUrl: "https://example.com/web-upload.mp4",
        category: "FRONT_END", 
        mentorName: "Web User",
        mentorAvatar: "https://i.pravatar.cc/150?img=1",
      };
      
      const emptyCardIndex = recentVideos.findIndex(v => v.id === 'v_empty_1');
      if (emptyCardIndex !== -1) {
          const updatedVideos = [...recentVideos];
          updatedVideos[emptyCardIndex] = newVideo;
          setRecentVideos(updatedVideos);
      } else {
          setRecentVideos([newVideo, ...recentVideos]);
      }
      return;
    }

    // ANDROID / IOS LOGIC: Lazy Load DocumentPicker
    try {
        // 🔑 KEY CHANGE: Use require() to load the module only on native platforms
        const DocumentPicker = require('react-native-document-picker').default;

        const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.video], 
            copyTo: 'cachesDirectory',
        });

        const selectedFile = result[0];
      
        const newVideo: VideoItem = {
            id: `v${Date.now()}`,
            title: selectedFile.name || "Uploaded Video",
            thumbnailUrl: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
            videoUrl: selectedFile.uri, // Local URI
            category: "FRONT_END", 
            mentorName: "Student Upload",
            mentorAvatar: "https://i.pravatar.cc/150?img=1",
        };

        const emptyCardIndex = recentVideos.findIndex(v => v.id === 'v_empty_1');
        if (emptyCardIndex !== -1) {
            const updatedVideos = [...recentVideos];
            updatedVideos[emptyCardIndex] = newVideo;
            setRecentVideos(updatedVideos);
        } else {
            setRecentVideos([newVideo, ...recentVideos]);
        }

        Alert.alert("Success", `Video selected: ${selectedFile.name}`);

    } catch (err) {
        // Handle error logic as before
        if (require('react-native-document-picker').isCancel(err)) {
            console.log("Video upload cancelled");
        } else {
            Alert.alert("Error", "Failed to select video. Ensure permissions are granted.");
            console.error(err);
        }
    }
  };

  // --- 📄 DOCUMENT UPLOAD HANDLER (Lazy Loaded and Platform-Safe) ---
  const handleUploadDocument = async () => {
    if (Platform.OS === 'web') {
      // Web fallback: Avoids Native Module crash and performs mock upload
      Alert.alert("Web Upload Simulation", "On the web, file selection is handled by a standard HTML input. Mock document added.");

      const newDocument: DocumentItem = { 
        id: `d${Date.now()}`, 
        name: "Web_Uploaded_Doc.pdf", 
        fileType: "PDF", 
        downloadUrl: "https://example.com/web-upload.pdf", 
      };
      setUploadedDocuments([newDocument, ...uploadedDocuments]);
      return;
    }
    
    // ANDROID / IOS LOGIC: Lazy Load DocumentPicker
    try {
        // 🔑 KEY CHANGE: Use require() to load the module only on native platforms
        const DocumentPicker = require('react-native-document-picker').default;

        const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
            copyTo: 'cachesDirectory',
        });

        const selectedFile = result[0];

        const newDocument: DocumentItem = {
            id: `d${Date.now()}`,
            name: selectedFile.name || "Uploaded Document",
            fileType: selectedFile.name?.split('.').pop()?.toUpperCase() || "FILE",
            downloadUrl: selectedFile.uri,
        };
        
        setUploadedDocuments([newDocument, ...uploadedDocuments]);
        Alert.alert("Success", `Document selected: ${selectedFile.name}`);
        
    } catch (err) {
        // Handle error logic as before
        if (require('react-native-document-picker').isCancel(err)) {
            console.log("Document upload cancelled");
        } else {
            Alert.alert("Error", "Failed to select document. Ensure permissions are granted.");
            console.error(err);
        }
    }
  };


  if (showAllVideos) {
    return (
      <View style={styles.container}>
        <UploadedVideoItem onBack={() => setShowAllVideos(false)} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>NOTES</Text>

        {/* Top Navigation Buttons */}
        <View style={styles.topNavButtonsContainer}>
          <NavButton title="VIEW ALL VIDEOS" onPress={() => setShowAllVideos(true)} style="secondary" />
          <NavButton title="JOIN LIVE CLASS" onPress={() => Linking.openURL("https://example.com/live")} style="live" />
          <NavButton title="ALL DOWNLOADS" onPress={() => { /* Add navigation logic here */ }} style="secondary" />
          <NavButton title="RECORDED LECTURES" onPress={() => { /* Add navigation logic here */ }} style="secondary" />
        </View>

        {/* Recent Videos Section */}
        <View style={styles.sectionHeaderWithUpload}>
            <Text style={styles.subHeader}>RECENT VIDEOS</Text>
            <NavButton title="UPLOAD VIDEO" onPress={handleUploadVideo} style="upload" /> 
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.videoList}
        >
          {recentVideos.map((item) => (
            <VideoCard
              key={item.id}
              video={item}
              onView={handleVideoView}
            />
          ))}
        </ScrollView>
        
        <View style={styles.divider} />

        {/* Documents & PDFs Section */}
        <View style={styles.sectionHeaderWithUpload}>
          <Text style={styles.subHeader}>DOCUMENTS & PDFS</Text>
          <NavButton title="UPLOAD DOCUMENT" onPress={handleUploadDocument} style="upload" /> 
        </View>
        <FlatList
          data={uploadedDocuments}
          renderItem={({ item }) => <DocumentRow document={item} />}
          keyExtractor={(i) => i.id}
          scrollEnabled={false} 
        />
      </ScrollView>
    </View>
  )
}

// --- Styles (Retained) ---
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f3f8" },
  scrollContent: { padding: 15 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#333", marginBottom: 20 },
  
  topNavButtonsContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 20,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  buttonBase: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginVertical: 5, alignItems: "center" },
  buttonPrimary: { backgroundColor: "#2ecc71" },
  buttonSecondary: { backgroundColor: "#87CEEB", width: screenWidth * 0.22, }, 
  buttonLive: { backgroundColor: "#e74c3c", width: screenWidth * 0.22, }, 
  buttonUpload: { backgroundColor: "#FFD700", width: screenWidth * 0.22, }, 

  buttonTextPrimary: { color: "#000", fontWeight: "bold", fontSize: 12 },
  buttonTextSecondary: { color: "#000", fontWeight: "bold", fontSize: 12 },
  buttonTextLive: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  buttonTextUpload: { color: "#000", fontWeight: "bold", fontSize: 12 }, 
  
  divider: { height: 1, backgroundColor: "#ddd", marginVertical: 12 },
  sectionHeaderWithUpload: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginRight: 0,
    marginBottom: 10,
  },
  subHeader: { fontSize: 18, fontWeight: "bold", color: "#333" }, 
  videoList: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 0, 
    marginBottom: 20, 
  },
  
  videoCard3D: {
    width: screenWidth * 0.3, 
    height: 200, 
    backgroundColor: "#fff",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 5,
    elevation: 5,
    transform: [{ perspective: 1000 }],
    marginRight: 15, 
  },
  videoImage: { width: "100%", height: 120, borderTopLeftRadius: 14, borderTopRightRadius: 14 }, 
  videoContent: { padding: 8 }, 
  tagBase: {
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 6,
  },
  tagFrontEnd: { backgroundColor: "#fff" },
  tagBranding: { backgroundColor: "#fff" },
  tagUIUX: { backgroundColor: "#fff" },
  tagText: { fontSize: 9, fontWeight: "bold", color: "#6A0DAD" },
  videoTitle: { fontSize: 11, fontWeight: "bold", color: "#333", marginBottom: 5, lineHeight: 14 },
  mentorContainer: { flexDirection: "row", alignItems: "center", marginTop: 4, justifyContent: "flex-start" },
  mentorImage: { width: 24, height: 24, borderRadius: 12, marginRight: 6 }, 
  mentorNameText: { fontSize: 10, fontWeight: "600", color: "#333" },
  mentorRoleText: { fontSize: 8, color: "#777" },
  
  emptyVideoCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  documentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 6,
    elevation: 3,
  },
  documentInfo: { flexDirection: "row", alignItems: "center" },
  documentName: { fontSize: 14, fontWeight: "500", color: "#333", marginRight: 5 },
  documentType: { fontSize: 12, color: "#888" },
  documentActionButton: {
    borderColor: "#3498db",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  documentActionText: { color: "#3498db", fontWeight: "600", fontSize: 12 },
})

export default StudentNotesScreen