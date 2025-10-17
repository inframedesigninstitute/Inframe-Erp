import {
    Alert,
    Animated,
    Dimensions,
    FlatList,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const contentWidth = screenWidth - 30;

// --- Mock Data ---
interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: 'FRONT_END' | 'BRANDING' | 'UI_UX';
  mentorName: string;
  mentorAvatar: string;
}

interface DocumentItem {
  id: string;
  name: string;
  fileType: string;
  downloadUrl: string;
}

const recentVideos: VideoItem[] = [
  {
    id: 'v1',
    title: "A Beginner's Roadmap to Becoming a Professional Front-End Developer.",
    thumbnailUrl:
      'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/frontend-video.mp4',
    category: 'FRONT_END',
    mentorName: 'Leonardo Samsul',
    mentorAvatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    id: 'v2',
    title: 'Enhancing Digital Experiences through Exceptional UI/UX Design.',
    thumbnailUrl:
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/branding-video.mp4',
    category: 'BRANDING',
    mentorName: 'Padhang Satrio',
    mentorAvatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'v3',
    title: 'Rejuvenating and Modernizing the Company Image.',
    thumbnailUrl:
      'https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/uiux-video.mp4',
    category: 'UI_UX',
    mentorName: 'Zakir Horizontal',
    mentorAvatar: 'https://i.pravatar.cc/150?img=52',
  },
  {
    id: 'v4',
    title: 'Advanced React and State Management Techniques.',
    thumbnailUrl:
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://example.com/react-video.mp4',
    category: 'FRONT_END',
    mentorName: 'Deepak Sharma',
    mentorAvatar: 'https://i.pravatar.cc/150?img=4',
  },
];

const uploadedDocuments: DocumentItem[] = [
  { id: 'd1', name: 'Algebra_Homework.pdf', fileType: 'PDF', downloadUrl: 'https://example.com/algebra.pdf' },
  { id: 'd2', name: 'Biology_Notes.docx', fileType: 'DOCX', downloadUrl: 'https://example.com/biology.docx' },
  { id: 'd3', name: 'Research_Paper.pdf', fileType: 'PDF', downloadUrl: 'https://example.com/research.pdf' },
];

// --- NavButton ---
const NavButton = ({ title, onPress, style = 'primary' }: any) => {
  let buttonStyle = styles.buttonPrimary;
  let textStyle = styles.buttonTextPrimary;

  if (style === 'secondary') {
    buttonStyle = styles.buttonSecondary;
    textStyle = styles.buttonTextSecondary;
  } else if (style === 'live') {
    buttonStyle = styles.buttonLive;
    textStyle = styles.buttonTextLive;
  }

  return (
    <TouchableOpacity style={[styles.buttonBase, buttonStyle]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

// --- Video Card with 3D effect ---
const VideoCard = ({ video, onView }: any) => {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
  };

  const { tagStyle, text: tagText } =
    video.category === 'FRONT_END'
      ? { tagStyle: styles.tagFrontEnd, text: 'FRONT END' }
      : video.category === 'BRANDING'
      ? { tagStyle: styles.tagBranding, text: 'BRANDING' }
      : { tagStyle: styles.tagUIUX, text: 'UI/UX DESIGN' };

  return (
    <Animated.View style={{ transform: [{ scale }], marginRight: 14 }}>
      <TouchableOpacity
        style={styles.videoCard3D}
        onPress={() => onView(video.videoUrl)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Image source={{ uri: video.thumbnailUrl }} style={styles.videoImage} />
        <View style={styles.videoContent}>
          <View style={[styles.tagBase, tagStyle]}>
            <Text style={styles.tagText}>{tagText}</Text>
          </View>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {video.title}
          </Text>

          <View style={styles.mentorContainer}>
            <Image source={{ uri: video.mentorAvatar }} style={styles.mentorImage} />
            <View>
              <Text style={styles.mentorNameText}>{video.mentorName}</Text>
              <Text style={styles.mentorRoleText}>Mentor</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- Document Row ---
const DocumentRow = ({ document }: any) => {
  const handleView = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
    else Alert.alert(`Cannot open URL: ${url}`);
  };
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
  );
};

// --- Main Screen ---
const NotesScreen = () => {
  const handleVideoView = (url: string) => Alert.alert('View Video', `Playing: ${url}`);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>NOTES</Text>

        <View style={styles.navButtonsContainer}>
          <NavButton title="VIEW ALL VIDEOS" onPress={() => {}} style="secondary" />
          <NavButton title="JOIN LIVE CLASS" onPress={() => Linking.openURL('https://example.com/live')} style="live" />
          <NavButton title="ALL DOWNLOADS" onPress={() => {}} style="secondary" />
          <NavButton title="RECORDED LECTURES" onPress={() => {}} style="secondary" />
        </View>

      <Text style={styles.subHeader}>RECENT VIDEOS</Text>

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
        <Text style={styles.subHeader}>DOCUMENTS & PDFS</Text>
        <FlatList data={uploadedDocuments} renderItem={({ item }) => <DocumentRow document={item} />} keyExtractor={(i) => i.id} />
      </ScrollView>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f8' },
  scrollContent: { padding: 15 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: 20 },

  navButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonBase: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginVertical: 5, alignItems: 'center' },
  buttonPrimary: { backgroundColor: '#2ecc71' },
  buttonSecondary: { backgroundColor: '#87CEEB' },
  buttonLive: { backgroundColor: '#e74c3c' },
  buttonTextPrimary: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  buttonTextSecondary: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  buttonTextLive: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  videoList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  // --- 3D Video Card ---
  videoCard3D: {
    width: 260,
    height: 290,
    backgroundColor: '#fff',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ perspective: 1000 }],
  },
  videoImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  videoContent: { padding: 10 },
  tagBase: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 6,
  },
  tagFrontEnd: { backgroundColor: '#fff' },
  tagBranding: { backgroundColor: '#fff' },
  tagUIUX: { backgroundColor: '#fff' },
  tagText: { fontSize: 9, fontWeight: 'bold', color: '#6A0DAD' },
  videoTitle: { fontSize: 11, fontWeight: 'bold', color: '#333', marginBottom: 8, lineHeight: 14 },

  mentorContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  mentorImage: { width: 28, height: 28, borderRadius: 14, marginRight: 8 },
  mentorNameText: { fontSize: 10, fontWeight: '600', color: '#333' },
  mentorRoleText: { fontSize: 8, color: '#777' },

  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 12 },

  documentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 6,
    elevation: 3,
  },
  documentInfo: { flexDirection: 'row', alignItems: 'center' },
  documentName: { fontSize: 14, fontWeight: '500', color: '#333', marginRight: 5 },
  documentType: { fontSize: 12, color: '#888' },
  documentActionButton: {
    borderColor: '#3498db',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  documentActionText: { color: '#3498db', fontWeight: '600', fontSize: 12 },
});

export default NotesScreen;
