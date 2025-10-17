import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// --- Types ---
type Exam = {
    id: string;
    course: string;
    teacher: string;
    room: string;
    date: string;
    startTime: string;
    endTime: string;
};

// --- Mock Data ---
const mockExams: Exam[] = [
    { id: '1', course: 'CSE607 - Data Structures and Algorithms', teacher: 'Meredith Hancock, Daphne Padilla', room: '202B, 306A', date: 'Dec 15', startTime: '9:00 AM', endTime: '11:00 AM' },
    { id: '2', course: 'EN105 - Freshman English', teacher: 'Emmanuel Harmon', room: 'Online (Zoom)', date: 'Dec 18', startTime: '2:00 PM', endTime: '4:00 PM' },
    { id: '3', course: 'MAT211 - Discrete Mathematics', teacher: 'Meredith Hancock, Zorita Rivas', room: '201A', date: 'Jan 05', startTime: '10:00 AM', endTime: '12:00 PM' },
    { id: '4', course: 'PH308 - Optical Physics', teacher: 'Zorita Rivas', room: 'Lab B', date: 'Jan 10', startTime: '1:00 PM', endTime: '3:00 PM' },
];

const ExamScheduleScreen = () => {
    const [examType, setExamType] = useState("Final Exam");
    const [searchText, setSearchText] = useState("");
    const [exams, setExams] = useState<Exam[]>([]);
    const [showSchedule, setShowSchedule] = useState(false);
    const [filterTab, setFilterTab] = useState("Upcoming Exams"); 

    // --- Utility Functions ---
    const getDaysLeft = (dateStr: string) => {
        // Mock function for demonstration
        const days = { 'Dec 15': 'Result Summary', 'Dec 18': 'Result Summary', 'Jan 05': 'Upcoming Exams', 'Jan 10': 'Upcoming Exams' };
        // @ts-ignore
        const daysLeft = days[dateStr] || 'N/A';
        return daysLeft;
    };

    const handleSearch = () => {
        // API call logic here. For now, use mock data.
        if (examType) {
            setExams(mockExams);
            setShowSchedule(true);
        } else {
            setShowSchedule(false);
            setExams([]);
        }
    };
    
    // --- Filtering Logic ---
    const getFilteredAndSearchedExams = () => {
        let filteredData = exams.filter(exam => {
            const status = getDaysLeft(exam.date);
            
            // 1. Filter based on the selected tab (Upcoming or Completed)
            if (filterTab === 'Upcoming Exams' && status !== 'Upcoming Exams') {
                return false;
            }
            if (filterTab === 'Result Summary' && status !== 'Result Summary') {
                return false;
            }
            
            // 2. Filter based on the search text
            if (searchText) {
                const searchLower = searchText.toLowerCase();
                return (
                    exam.course.toLowerCase().includes(searchLower) ||
                    exam.teacher.toLowerCase().includes(searchLower)
                );
            }
            
            return true;
        });

        return filteredData;
    };

    const dataToDisplay = getFilteredAndSearchedExams();

    // --- Render Components ---
    const renderItem = ({ item }: { item: Exam }) => {
        const daysLeft = getDaysLeft(item.date);

        // Card colors are set to very light/off-white 
        const cardPalette = [
            { color: '#f0f4ff', icon: 'calculator' },
            { color: '#fff9e6', icon: 'book' },     
            { color: '#f3e8ff', icon: 'atom' },     
            { color: '#ffe6e8', icon: 'chalkboard-teacher' },
        ];
        const { color: cardColor, icon: iconName } = cardPalette[parseInt(item.id) % cardPalette.length];

        let statusChipStyle;
        let statusText;
        // Updated logic to show 'Completed' status correctly
        if (daysLeft === 'Upcoming') {
            statusChipStyle = styles.upcomingChip; 
            statusText = 'Upcoming';
        } else if (daysLeft === 'Completed') {
            statusChipStyle = styles.daysLeftChip; 
            statusText = 'Completed';
        } else {
            statusChipStyle = styles.daysLeftChip; 
            statusText = daysLeft;
        }


        return (
            <View style={[styles.examCardContainer, { backgroundColor: cardColor }]}> 
                {/* Top Section */}
                <View style={styles.cardHeader}>
                    {/* Updated icon color for better contrast */}
                    <FontAwesome5 name={iconName} size={24} color="#333" /> 
                    <View style={{ marginLeft: 10, flex: 1 }}>
                        <Text style={styles.cardCourse}>{item.course.split(' - ')[0]}</Text>
                        <Text style={styles.cardTeacher}>Prof. {item.teacher.split(',')[0].trim()}</Text>
                    </View>
                </View>

                {/* Details Section */}
                <View style={styles.cardDetails}>
                    <Text style={styles.detailText}>{item.date}</Text>
                    <Text style={styles.detailText}>{' | '}</Text>
                    <Text style={styles.detailText}>{item.startTime} - {item.endTime.split(' ')[0]}</Text>
                    <Text style={[styles.detailText, styles.detailRoom]}>{item.room.split(',')[0].trim()}</Text>
                </View>

                {/* Status/Chip Section (Black Text on Light Chip) */}
                <View style={styles.cardFooter}>
                    <View style={[styles.statusChip, statusChipStyle]}>
                        <Text style={styles.statusText}>{statusText}</Text>
                    </View>
                </View>
            </View>
        );
    };

    // --- Main Component Render ---
    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}> 
            <Text style={styles.title}>Exam and Result Sammary</Text>

            <View style={styles.mainCard}>
                <Text style={styles.label}>Exam Type <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.filterContainer}>
                    
                    <View style={styles.pickerWrapperClay}> 
                        <Picker
                            selectedValue={examType}
                            style={styles.picker}
                            onValueChange={(itemValue) => setExamType(itemValue)}
                        >
                            <Picker.Item label="Final Exam" value="Final Exam" />
                            <Picker.Item label="Midterm Exam" value="Midterm Exam" />
                            <Picker.Item label="Test Exam" value="Test Exam" />
                        </Picker>
                    </View>

                    {/* Search Button Section - Padding Adjusted */}
                    <TouchableOpacity
                        style={styles.searchButtonClay} 
                        onPress={handleSearch}
                    >
                        <FontAwesome5 name="search" size={14} color="#050505ff" style={{ marginRight: 6 }} />
                        <Text style={styles.searchText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Schedule Cards Section */}
            {showSchedule && (
                <View style={styles.scheduleSection}>
                    {/* Tabs and Search Bar (Simplified Toolbar) */}
                    <View style={styles.toolbar}>
                        {/* Tabs with Claymorphism style */}
                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[styles.tabButton, filterTab === 'Upcoming Exams' && styles.activeTabClay]} 
                                onPress={() => setFilterTab('Upcoming Exams')} 
                            >
                                <Text style={[styles.tabText, filterTab === 'Upcoming Exams' && styles.activeTabText]}>Upcoming Exams </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tabButton, filterTab === 'Result Summary' && styles.activeTabClay]} 
                                onPress={() => setFilterTab('Result Summary')} 
                            >
                                <Text style={[styles.tabText, filterTab === 'Result Summary' && styles.activeTabText]}>Result Summary</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Course/Teacher..."
                            placeholderTextColor="#888"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>

                    {/* 3D Exam Cards List */}
                    <FlatList
                        data={dataToDisplay} 
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false} 
                        contentContainerStyle={styles.cardListContainer}
                        ListEmptyComponent={() => (
                            <Text style={styles.noDataText}>
                                {dataToDisplay.length === 0 ? `No ${filterTab} exams found.` : "No results found."}
                            </Text>
                        )}
                    />
                </View>
            )}
        </ScrollView>
    );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff", 
        padding: 16
    },
    title: {
        fontSize: 24, 
        fontWeight: "700", 
        marginBottom: 16,
        color: "#111", 
    },
    // --- Card/Filter Section Styles ---
    mainCard: {
        backgroundColor: '#f7f7f7', 
        borderRadius: 20, 
        padding: 18,
        marginBottom: 25,
        shadowColor: '#333',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    // Professional Black Text Label Style
    label: {
        fontSize: 15, 
        color: '#1b1919ff', 
        fontWeight: '600', 
        marginBottom: 6,
    },
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    pickerWrapperClay: {
        flex: 3,
       
        borderColor: "#ffffffff", 
        borderRadius: 12, 
        overflow: 'hidden',
        height: 48,
        justifyContent: 'center',
        backgroundColor: '#fff', 
        paddingHorizontal: 10, 
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1, 
    },
    picker: {
        height: 48,
        // Removed custom font styles here as Picker item styles are tricky on some platforms
        color: "#050505ff", 
    },
    searchButtonClay: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#f3f9ffff", 
        paddingVertical: 10,
        paddingHorizontal: 18, 
        borderRadius: 12, 
        marginLeft: 12,
        height: 48,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4, 
    },
    // Black text on light button
    searchText: {
        color: "#000000ff",
        fontWeight: "700", 
        fontSize: 16, 
    },
    // --- Schedule Section & Toolbar ---
    scheduleSection: {
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#f7f7f7', 
        borderRadius: 25, 
        padding: 4,
        shadowColor: '#333',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    tabButton: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    activeTabClay: {
        backgroundColor: '#495057', 
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600', 
        color: '#666', 
    },
    activeTabText: {
        color: '#fff', 
        fontWeight: '800', 
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 45,
        width: 180,
        fontSize: 14,
        backgroundColor: '#fff',
        color: '#111' 
    },
    // --- 3D Exam Card Styles ---
    cardListContainer: {
        paddingBottom: 20, 
    },
    examCardContainer: {
        borderRadius: 24, 
        padding: 20,
        marginBottom: 16,
        shadowColor: '#333',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6, 
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardCourse: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111', 
    },
    cardTeacher: {
        fontSize: 14,
        color: '#444', 
        marginTop: 2,
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    detailText: {
        fontSize: 14,
        color: '#444',
        fontWeight: '500',
    },
    detailRoom: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111', 
        marginLeft: 10,
    },
    cardFooter: {
        alignItems: 'flex-end',
    },
    // --- Status Chip Styles (Greyscale with Black Text) ---
    statusChip: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 18, 
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    daysLeftChip: {
        backgroundColor: '#cccccc', 
    },
    upcomingChip: {
        backgroundColor: '#cccccc', 
    },
    statusText: {
        fontSize: 15, 
        fontWeight: '700', 
        color: '#030303', 
        textShadowColor: 'rgba(255, 255, 255, 0.3)', 
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    noDataText: {
        textAlign: "center",
        padding: 20,
        color: "#888",
        fontSize: 16,
    }
});

export default ExamScheduleScreen;