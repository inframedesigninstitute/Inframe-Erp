import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Modal // 👈 Modal component added here
    ,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 🚨 IMPORTANT: Replace this placeholder with the actual RNFS import 
// after installing 'react-native-fs' library.
const RNFS = {
    DocumentDirectoryPath: 'file://document/',
    DownloadDirectoryPath: 'file://download/',
    downloadFile: ({ fromUrl, toFile }: { fromUrl: string; toFile: string; }) => ({
        promise: new Promise((resolve) => {
            setTimeout(() => {
                resolve({ 
                    jobId: 1, 
                    statusCode: 200, 
                    bytesWritten: 1024 * 1024 
                });
            }, 2000);
        }),
        jobId: 1,
    }),
};

// --- TypeScript Interfaces for RNFS (To avoid TS errors) ---
interface DownloadResult {
    jobId: number;
    statusCode: number;
    bytesWritten: number;
}
interface DownloadPromise {
    promise: Promise<DownloadResult>;
    jobId: number;
}
interface RNFSType {
    DocumentDirectoryPath: string;
    DownloadDirectoryPath: string;
    downloadFile: (options: { fromUrl: string; toFile: string; }) => DownloadPromise;
}
// RNFS placeholder type casted for clarity
const RNFS_TYPED: RNFSType = RNFS as any; 
// --- END RNFS Interfaces ---


const { width } = Dimensions.get('window');

// 1. Data Structure
interface Notice {
    noticeNo: string;
    title: string;
    category: string;
    publishDate: string;
    fileUrl: string;
    fileType: 'pdf' | 'image' | 'none';
}

// 2. Sample Data
const NOTICES: Notice[] = [
    {
        noticeNo: '#1004',
        title: 'Winter Vacation Pick On From Sunday (PDF Attached)',
        category: 'Vacation',
        publishDate: '04-10-2022',
        fileUrl: 'https://example.com/files/notice1004.pdf', 
        fileType: 'pdf',
    },
    {
        noticeNo: '#4235235',
        title: 'Final Exam Schedule for all Departments (Image Attached)',
        category: 'Exam',
        publishDate: '04-10-2025',
        fileUrl: 'https://example.com/images/exam_schedule.jpg', 
        fileType: 'image',
    },
    {
        noticeNo: '#5009',
        title: 'Annual Sports Day Postponed (No File)',
        category: 'Sports',
        publishDate: '15-11-2024',
        fileUrl: '',
        fileType: 'none',
    },
];

// --- NoticeDetailModal Component ---
interface NoticeDetailModalProps {
    visible: boolean;
    notice: Notice | null;
    onClose: () => void;
    onDownload: (notice: Notice) => Promise<void>;
}

const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({ visible, notice, onClose, onDownload }) => {
    if (!notice) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.title}>Notice Details</Text>
                    <View style={modalStyles.detailRow}>
                        <Text style={modalStyles.label}>Notice No:</Text>
                        <Text style={modalStyles.value}>{notice.noticeNo}</Text>
                    </View>
                    <View style={modalStyles.detailRow}>
                        <Text style={modalStyles.label}>Title:</Text>
                        <Text style={modalStyles.value}>{notice.title}</Text>
                    </View>
                    <View style={modalStyles.detailRow}>
                        <Text style={modalStyles.label}>Category:</Text>
                        <Text style={modalStyles.value}>{notice.category}</Text>
                    </View>
                    <View style={modalStyles.detailRow}>
                        <Text style={modalStyles.label}>Publish Date:</Text>
                        <Text style={modalStyles.value}>{notice.publishDate}</Text>
                    </View>

                    {notice.fileType !== 'none' && (
                        <View style={modalStyles.detailRow}>
                            <Text style={modalStyles.label}>Attachment:</Text>
                            <Text style={modalStyles.value}>{notice.fileType.toUpperCase()} File</Text>
                        </View>
                    )}

                    <View style={modalStyles.buttonContainer}>
                        <TouchableOpacity 
                            style={[modalStyles.button, modalStyles.closeButton]} 
                            onPress={onClose}
                        >
                            <Text style={modalStyles.textStyle}>Close</Text>
                        </TouchableOpacity>

                        {notice.fileType !== 'none' && (
                            <TouchableOpacity 
                                style={[modalStyles.button, modalStyles.downloadButton]} 
                                onPress={() => onDownload(notice)}
                            >
                                <Icon name="download" size={20} color="#fff" style={{ marginRight: 5 }} />
                                <Text style={modalStyles.downloadTextStyle}>Download</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};
// --- END NoticeDetailModal Component ---


// 3. NoticeCard Component
interface NoticeCardProps {
    notice: Notice;
    onViewDetail: (notice: Notice) => void; 
    onDownload: (notice: Notice) => Promise<void>;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onViewDetail, onDownload }) => {
    
    // Updated handleView to call parent's onViewDetail
    const handleView = () => {
        onViewDetail(notice);
    };

    // The download logic remains the same (just calling the prop function now)
    const handleDownload = () => onDownload(notice);

    return (
        <View style={styles.cardContainer}>
            {/* ... HeaderRow and Title (unchanged) ... */}
            <View style={styles.headerRow}>
                <Text style={styles.noticeNo}>Notice No: **{notice.noticeNo}**</Text>
                <Text style={styles.categoryBadge}>{notice.category}</Text>
            </View>

            <Text style={styles.title}>{notice.title}</Text>
            
            <View style={styles.detailsRow}>
                <Icon name="calendar" size={14} color={styles.publishDate.color} style={{ marginRight: 5 }} />
                <Text style={styles.publishDate}>Published on: {notice.publishDate}</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionRow}>
                {/* View Button: Icon is now always 'eye-outline' as requested */}
                <TouchableOpacity style={[styles.actionButton, styles.viewButton]} onPress={handleView}>
                    <Icon name="eye-outline" size={20} color={styles.actionIcon.color} />
                </TouchableOpacity>

                {/* Download Button (Hidden if no file) */}
                {notice.fileType !== 'none' && (
                    <TouchableOpacity style={[styles.actionButton, styles.downloadButton]} onPress={handleDownload}>
                        <Icon name="download" size={20} color={styles.actionIcon.color} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};


// 4. Main NoticeBoardScreen Component
const NoticeBoardScreen: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredNotices, setFilteredNotices] = useState(NOTICES);
    
    // State for Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

    // Filter Logic
    useEffect(() => {
        if (searchText === '') {
            setFilteredNotices(NOTICES);
        } else {
            const lowercasedSearch = searchText.toLowerCase();
            const filtered = NOTICES.filter(notice => 
                notice.title.toLowerCase().includes(lowercasedSearch) ||
                notice.category.toLowerCase().includes(lowercasedSearch) ||
                notice.noticeNo.includes(searchText)
            );
            setFilteredNotices(filtered);
        }
    }, [searchText]);
    
    // Modal Open Handler
    const handleViewDetail = (notice: Notice) => {
        setSelectedNotice(notice);
        setModalVisible(true);
    };

    // Global Download Handler (Moved from NoticeCard to here for simplicity)
    const handleDownloadNotice = async (notice: Notice) => {
        setModalVisible(false); // Close modal on download start

        if (!(await checkStoragePermission())) {
            Alert.alert('Permission Denied', 'Storage permission is required to download files.');
            return;
        }

        const fileName = `${notice.title.replace(/[^a-z0-9]/gi, '_')}_${notice.noticeNo}.${notice.fileType}`;
        const downloadDir = Platform.select({
            ios: RNFS_TYPED.DocumentDirectoryPath,
            android: RNFS_TYPED.DownloadDirectoryPath,
        });
        const path = `${downloadDir}/${fileName}`;

        Alert.alert('Download Started', `Downloading "${fileName}"...`);
        
        try {
            const result = RNFS_TYPED.downloadFile({
                fromUrl: notice.fileUrl,
                toFile: path,
            });

            const res = await result.promise;

            if (res.statusCode === 200) {
                Alert.alert('Download Successful', `File saved to your device: ${path}`);
            } else {
                Alert.alert('Download Failed', `Server error: Status ${res.statusCode}`);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Download Error', 'An error occurred during download.');
        }
    };

    // Permission Check
    const checkStoragePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage Permission Required",
                        message: "App needs access to your storage to download files",
                        buttonPositive: "OK",
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true; 
    };

    const renderNoticeCard = ({ item }: { item: Notice }) => (
        <NoticeCard 
            notice={item} 
            onViewDetail={handleViewDetail}
            onDownload={handleDownloadNotice}
        />
    );

    return (
        <SafeAreaView style={styles.screenContainer}>
            <Text style={styles.mainTitle}>⚫ Notice Board</Text>
            
            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search notices by title, category, or number..."
                placeholderTextColor={styles.publishDate.color}
                value={searchText}
                onChangeText={setSearchText}
            />

            {/* Notice List */}
            <FlatList
                data={filteredNotices}
                renderItem={renderNoticeCard}
                keyExtractor={(item) => item.noticeNo}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => <Text style={styles.emptyText}>No notices found matching "{searchText}"</Text>}
                showsVerticalScrollIndicator={false}
            />

            {/* Modal Component */}
            <NoticeDetailModal 
                visible={modalVisible}
                notice={selectedNotice}
                onClose={() => setModalVisible(false)}
                onDownload={handleDownloadNotice}
            />
        </SafeAreaView>
    );
};

// 5. Styles (General & Monochrome)
const styles = StyleSheet.create({
    screenContainer: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 15, },
    mainTitle: { fontSize: 26, fontWeight: '700', color: '#1a1a1a', marginTop: 15, marginBottom: 20, },
    searchBar: { height: 45, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, marginBottom: 20, borderWidth: 1, borderColor: '#ccc', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2, color: '#1a1a1a', },
    listContent: { paddingBottom: 20, },
    cardContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 18, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 8, borderLeftWidth: 5, borderLeftColor: '#444', },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, },
    noticeNo: { fontSize: 13, color: '#666', fontWeight: '500', },
    categoryBadge: { fontSize: 12, fontWeight: 'bold', color: '#1a1a1a', backgroundColor: '#e0e0e0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#bbb', },
    title: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 15, },
    detailsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#eee', },
    publishDate: { fontSize: 14, color: '#666', },
    actionRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15, },
    actionButton: { padding: 10, borderRadius: 50, width: 45, height: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a', },
    viewButton: { /* No change */ },
    downloadButton: { /* No change */ },
    actionIcon: { color: '#fff', },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999', }
});

// 6. Modal Specific Styles
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dim background
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444',
    },
    value: {
        fontSize: 14,
        color: '#666',
        maxWidth: '65%',
        textAlign: 'right',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 25,
    },
    button: {
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#666',
    },
    downloadButton: {
        backgroundColor: '#1a1a1a', // Black
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    downloadTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default NoticeBoardScreen;