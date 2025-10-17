// DownloadListScreen.tsx

import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    ListRenderItem,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// --- 1. DATA AND INTERFACE DEFINITION ---

interface DownloadItem {
  id: string;
  title: string;
  type: string;
  date: string;
  // 💡 Add a property for the file URL/path
  fileUrl: string; 
}

const DOWNLOAD_DATA: DownloadItem[] = [
  { id: '1', title: '2nd Class Of English - Grammar Notes', type: 'Lecture Sheet', date: '04-10-2022', fileUrl: 'https://example.com/english_notes.pdf' },
  { id: '2', title: 'Chapter 5: Linear Equations Exercise', type: 'Homework', date: '28-09-2022', fileUrl: 'https://example.com/math_homework.pdf' },
  { id: '3', title: 'Physics - Heat and Thermodynamics Summary', type: 'Summary PDF', date: '15-09-2022', fileUrl: 'https://example.com/physics_summary.pdf' },
  { id: '4', title: 'Chemistry Final Exam Questions', type: 'Test Paper', date: '01-10-2022', fileUrl: 'https://example.com/chemistry_test.pdf' },
  { id: '5', title: 'History of India - Full Course Material', type: 'eBook', date: '10-08-2022', fileUrl: 'https://example.com/history_ebook.pdf' },
];

// --- 2. DOWNLOAD CARD COMPONENT (INTERNAL) ---
// (Card component remains the same, using cardStyles)
// ... (Your existing DownloadCard component and cardStyles are here) ...

interface DownloadCardProps {
    item: DownloadItem;
    onView: (item: DownloadItem) => void;
    onDownload: (item: DownloadItem) => void;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ item, onView, onDownload }) => {
    return (
        <View style={cardStyles.card}>
            <View style={cardStyles.contentContainer}>
                <Text style={cardStyles.title} numberOfLines={2}>
                    {item.title}
                </Text>
                <View style={cardStyles.metadataContainer}>
                    <Text style={cardStyles.metaText}>
                        <Feather name="tag" size={12} color="#666" /> {item.type}
                    </Text>
                    <Text style={cardStyles.metaText}>
                        <Feather name="calendar" size={12} color="#666" /> {item.date}
                    </Text>
                </View>
            </View>
            <View style={cardStyles.actionContainer}>
                <TouchableOpacity
                    style={[cardStyles.actionButton, cardStyles.viewButton]}
                    onPress={() => onView(item)}
                >
                    <Feather name="eye" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[cardStyles.actionButton, cardStyles.downloadButton]}
                    onPress={() => onDownload(item)}
                >
                    <Feather name="download-cloud" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const cardStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    contentContainer: {
        flex: 1,
        marginRight: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    metadataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        marginTop: 5,
    },
    metaText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    viewButton: {
        backgroundColor: '#00c6a7',
    },
    downloadButton: {
        backgroundColor: '#2c3e50',
    },
});

// --- 4. FILE VIEWER MODAL COMPONENT ---

interface FileViewerModalProps {
    visible: boolean;
    item: DownloadItem | null;
    onClose: () => void;
}

const FileViewerModal: React.FC<FileViewerModalProps> = ({ visible, item, onClose }) => {
  if (!item) return null;

  // 💡 Note: React Native cannot display PDF content directly like a web browser.
  // You must use a third-party library like react-native-pdf for actual viewing.
  // For this example, we show the viewer layout and details.

  const handleAttachDownload = () => {
      // Re-use the main download logic or prompt
      Alert.alert('Download', `Downloading ${item.title} from viewer...`);
      // You can also call onClose() after starting the download
  };

  return (
    <Modal
      animationType="slide"
      transparent={false} // Full screen modal
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalContainer}>
        {/* Header */}
        <View style={modalStyles.header}>
          <Text style={modalStyles.headerTitle}>{item.title}</Text>
          <TouchableOpacity onPress={onClose} style={modalStyles.backButton}>
            <Feather name="arrow-left" size={20} color="#fff" />
            <Text style={modalStyles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Details Section (like your image_3f153a.png) */}
        <View style={modalStyles.detailsSection}>
            <Text style={modalStyles.detailText}>
                <Text style={{fontWeight: 'bold'}}>Category:</Text> {item.type}
            </Text>
            <Text style={modalStyles.detailText}>
                <Text style={{fontWeight: 'bold'}}>Date:</Text> {item.date}
            </Text>
            
            {/* Download/Attach Button */}
            <TouchableOpacity onPress={handleAttachDownload} style={modalStyles.attachButton}>
                <Feather name="download" size={24} color="#333" />
            </TouchableOpacity>
        </View>
        
        {/* Document Viewer Area */}
        <View style={modalStyles.viewerArea}>
            <Text style={modalStyles.viewerPlaceholder}>
                [PDF Viewer Placeholder: Use 'react-native-pdf' or 'WebView' for actual PDF display from: {item.fileUrl}]
            </Text>
            {/* This is where your PDF library component would go */}
            
            {/* Navigation/Zoom Bar (Mockup based on your image) */}
            <View style={modalStyles.pdfControls}>
                <Text style={modalStyles.controlText}>Page 1 / 1</Text>
                <Feather name="search-minus" size={20} color="#fff" style={{marginLeft: 15}} />
                <Feather name="search-plus" size={20} color="#fff" style={{marginLeft: 15}} />
            </View>
        </View>

      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#f5ffef',
        width:600,
        height:600,
        maxHeight:"70%",
        alignSelf:"center"
    },
    header: {
        backgroundColor: '#fafafaff', // Blue background for header
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000ff',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#302e2eff',
        borderRadius: 4,
    },
    backButtonText: {
        color: '#ffffffff',
        marginLeft: 5,
        fontWeight: '500',
    },
    detailsSection: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#000000ff',
    },
    detailText: {
        fontSize: 14,
        color: '#000000ff',
        marginBottom: 5,
    },
    attachButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        backgroundColor: '#ecf0f1',
        borderRadius: 5,
    },
    viewerArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc', // Placeholder background
    },
    viewerPlaceholder: {
        color: '#000000ff',
        textAlign: 'center',
        padding: 20,
    },
    pdfControls: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 20,
    },
    controlText: {
        color: '#000000ff',
        fontSize: 14,
        fontWeight: 'bold',
    }
});


// --- 5. MAIN SCREEN COMPONENT (Updated) ---

const DownloadListScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  // 💡 State to manage the modal visibility and the item to view
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DownloadItem | null>(null);

  const filteredData = DOWNLOAD_DATA.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleView = (item: DownloadItem) => {
    // 💡 Open the modal with the selected item
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleDownload = (item: DownloadItem) => {
    // 💡 For a web-based React App (if you are running in browser):
    // window.open(item.fileUrl, '_blank');

    // 💡 For Native Mobile App (Android/iOS):
    // You must use a library like 'rn-fetch-blob' or 'react-native-fs' 
    // to actually download the file to the device's storage.
    Alert.alert(
      'Download Initiated', 
      `Downloading ${item.title} to device storage from:\n${item.fileUrl}`,
      [{ text: 'OK' }]
    );
  };

  const renderItem: ListRenderItem<DownloadItem> = ({ item }) => (
    <DownloadCard
      item={item}
      onView={handleView}
      onDownload={handleDownload}
    />
  );

  return (
    <View style={styles.container}>
      {/* ... (Header and Search Bar remains the same) ... */}
      <Text style={styles.headerTitle}>Download Materials</Text>

      <View style={styles.searchBarContainer}>
        <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Title..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* LIST CONTENT */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No materials found.</Text>
        )}
      />

      {/* 💡 FILE VIEWER MODAL */}
      <FileViewerModal 
        visible={modalVisible} 
        item={selectedItem}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({ 
  // ... (Your existing styles for the main screen) ...
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginBottom: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
    fontSize: 16,
  },
  filterButton: {
    padding: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
});

export default DownloadListScreen;