import { FontAwesome5 } from '@expo/vector-icons'; // For search icon
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Exam = {
  id: string;
  course: string;
  teacher: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
};

// **Mock Data for demonstration** - Real data will come from an API call
const mockExams: Exam[] = [
  { id: '1', course: 'CSE607 - Data Structures and Algorithms', teacher: 'Meredith Hancock, Daphne Padilla', room: '202B, 306A', date: '10-10-2022', startTime: '12:47 PM', endTime: '02:47 PM' },
  { id: '2', course: 'EN105 - Freshman English', teacher: 'Emmanuel Harmon', room: '205B, 306A', date: '12-10-2022', startTime: '12:47 PM', endTime: '02:47 PM' },
  { id: '3', course: 'MAT211 - Discrete Mathematics', teacher: 'Meredith Hancock, Zorita Rivas', room: '201A', date: '14-10-2022', startTime: '12:48 PM', endTime: '02:48 PM' },
  { id: '4', course: 'PH308 - Optical Physics', teacher: 'Emmanuel Harmon, Zorita Rivas', room: '202B, 306A', date: '16-10-2022', startTime: '12:48 PM', endTime: '02:48 PM' },
];

const ExamScheduleScreen = () => {
  const [examType, setExamType] = useState("Final Exam"); // Default to Final Exam as per image
  const [searchText, setSearchText] = useState("");
  const [exams, setExams] = useState<Exam[]>([]);
  const [showSchedule, setShowSchedule] = useState(false); // **New State to control visibility**

  const handleSearch = () => {
    // **Search Logic goes here**
    // In a real app, you would make an API call using `examType`
    // For this example, we'll just set the mock data and show the schedule
    
    if (examType) { // Only show if an exam type is selected (though mandatory here)
        setExams(mockExams); 
        setShowSchedule(true);
    } else {
        // Handle case where no exam type is selected, e.g., show an alert
        setShowSchedule(false);
        setExams([]);
    }
  };

  const renderHeader = () => (
    <View style={[styles.tableRow, styles.headerRow]}>
      <Text style={[styles.tableCell, styles.headerCell, {flex: 0.3}]}>#</Text>
      <Text style={[styles.tableCell, styles.headerCell, {flex: 2}]}>Course</Text>
      <Text style={[styles.tableCell, styles.headerCell, {flex: 2}]}>Teacher</Text>
      <Text style={[styles.tableCell, styles.headerCell, {flex: 1}]}>Room</Text>
      <Text style={[styles.tableCell, styles.headerCell, {flex: 1.2}]}>Date</Text>
      <Text style={[styles.tableCell, styles.headerCell, {flex: 1.5}]}>Start Time</Text>
      <Text style={[styles.tableCell, styles.headerCell, {flex: 1.5}]}>End Time</Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: Exam; index: number }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, {flex: 0.3}]}>{index + 1}</Text>
      <Text style={[styles.tableCell, {flex: 2, textAlign: 'left'}]}>{item.course}</Text>
      <Text style={[styles.tableCell, {flex: 2, textAlign: 'left'}]}>{item.teacher}</Text>
      <Text style={[styles.tableCell, {flex: 1}]}>{item.room}</Text>
      <Text style={[styles.tableCell, {flex: 1.2}]}>{item.date}</Text>
      <Text style={[styles.tableCell, {flex: 1.5}]}>{item.startTime}</Text>
      <Text style={[styles.tableCell, {flex: 1.5}]}>{item.endTime}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exam Schedule</Text>

      {/* Exam Type Dropdown and Search Button */}
      <View style={styles.card}>
        <Text style={styles.label}>Exam Type <Text style={{color: 'red'}}>*</Text></Text>
        <View style={styles.filterContainer}>
          <View style={styles.pickerWrapper}>
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
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleSearch} // **Call handleSearch on press**
          >
            <FontAwesome5 name="search" size={14} color="#fff" style={{marginRight: 6}} />
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Search Bar and Table - Only render if showSchedule is true */}
      {showSchedule && (
        <View style={styles.scheduleSection}>
          <View style={styles.toolbar}>
            {/* Action Buttons (Print, Export etc.) */}
            <View style={styles.actionButtons}>
              {/* You can add icons here for print, export etc. */}
              <Text>Action Buttons Here</Text>
            </View>
            {/* Search Input */}
            <View style={styles.searchInputContainer}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Search:"
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            <FlatList
                ListHeaderComponent={renderHeader}
                data={exams.filter(exam => 
                    exam.course.toLowerCase().includes(searchText.toLowerCase()) ||
                    exam.teacher.toLowerCase().includes(searchText.toLowerCase())
                    // Add other fields for search
                )}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                stickyHeaderIndices={[0]} // Keep the header fixed
                ListEmptyComponent={() => (
                    <Text style={styles.noDataText}>
                        {exams.length === 0 ? "No data available in table" : "No results found"}
                    </Text>
                )}
            />
          </View>

          {/* Footer/Pagination */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Showing 1 to {exams.length} of {exams.length} entries</Text>
            <View style={styles.pagination}>
              <TouchableOpacity style={styles.pageButton}>
                <Text style={styles.pageText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.pageButton, styles.activePage]}>
                <Text style={[styles.pageText, {color: '#fff'}]}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pageButton}>
                <Text style={styles.pageText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f5f7fa", // Light background for the whole screen
    padding: 16 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "600", 
    marginBottom: 12, 
    color: "#495057" 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // for Android
  },
  label: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  filterContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    overflow: 'hidden', // Required for Android to clip the picker
    height: 40, // Fixed height for alignment
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  picker: { 
    height: 40,
    color: "#495057",
    // Remove the flex: 1 from here as it's in the wrapper
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#4db8ff", // Blue color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
    height: 40, // Fixed height for alignment
  },
  searchText: { 
    color: "#fff", 
    fontWeight: "500",
    fontSize: 14,
  },
  scheduleSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButtons: {
    // Styling for your print/export buttons
    flexDirection: 'row',
  },
  searchInputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: 150,
    height: 35,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 0,
  },
  tableContainer: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 4, 
    marginTop: 0, // Removed extra space
  },
  tableRow: { 
    flexDirection: "row", 
    paddingVertical: 10, 
    paddingHorizontal: 4, 
    borderBottomWidth: 1, 
    borderBottomColor: "#eee", // Lighter separator
    alignItems: 'center',
  },
  headerRow: {
    borderBottomColor: '#ccc',
  },
  tableCell: { 
    color: "#495057", 
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 2,
    flexWrap: 'wrap', // Allows long text to wrap
  },
  headerCell: { 
    fontWeight: "bold", 
    backgroundColor: "#4db8ff", 
    color: "#fff", 
    paddingVertical: 8, // More padding for header
    textAlign: "center",
  },
  noDataText: { 
    textAlign: "center", 
    padding: 16, 
    color: "#888" 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
  pagination: { 
    flexDirection: "row", 
    justifyContent: "flex-end", 
  },
  pageButton: { 
    backgroundColor: "#f0f0f0", 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 4, 
    marginLeft: 4, 
  },
  pageText: { 
    color: "#495057", 
    fontSize: 12,
  },
  activePage: {
    backgroundColor: '#4db8ff',
  }
});

export default ExamScheduleScreen;