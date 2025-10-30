"use client"

import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Assuming you have installed 'react-native-web-linear-gradient' or similar
import LinearGradient from 'react-native-web-linear-gradient';

// --- DATA LISTS for Dropdowns ---
const SEMESTER_OPTIONS = ["", "Semester 1", "Semester 2", "Semester 3", "Semester 4"];
const FACULTY_OPTIONS = ["", "BSc IT", "BBA", "BTech CSE", "MCA"];
const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


// --- Type Definitions for CRUD & Stylish TimeTable ---
interface TimeTable {
    id: string
    subject: string
    day: string
    time: string
    semester: string
    faculty: string
}

interface ClassItem extends TimeTable {
    code: string;
    room: string;
    instructor: string;
    color: string;
}

// Fixed TIME SLOTS for horizontal display
const TIME_SLOTS = ['9-10', '10-11', '11-12', '12-1', '1-2', '2-3', ];

// --- Initial Dummy Data for demonstration ---
const INITIAL_TIMETABLES: TimeTable[] = [
    { id: '101', subject: 'Maths I', day: 'Monday', time: '9-10', semester: 'Semester 2', faculty: 'BTech CSE' },
    { id: '102', subject: 'Physics', day: 'Monday', time: '11-12', semester: 'Semester 2', faculty: 'BTech CSE' },
    { id: '103', subject: 'C-Programming', day: 'Tuesday', time: '9-10', semester: 'Semester 2', faculty: 'BTech CSE' },
    { id: '201', subject: 'Database Systems', day: 'Wednesday', time: '10-11', semester: 'Semester 2', faculty: 'BTech CSE' },
    { id: '202', subject: 'Operating System', day: 'Thursday', time: '1-2', semester: 'Semester 2', faculty: 'BTech CSE' },
    { id: '301', subject: 'Marketing', day: 'Monday', time: '10-11', semester: 'Semester 3', faculty: 'BBA' },
];

// --- Helper Function for 3D Shade ---
function shadeColor(color: string, percent: number) {
    const f = parseInt(color.slice(1), 16);
    const t = percent < 0 ? 0 : 255;
    const p = Math.abs(percent) / 100;
    const R = f >> 16;
    const G = (f >> 8) & 0x00ff;
    const B = f & 0x0000ff;
    return (
        '#' +
        (
            0x1000000 +
            (Math.round((t - R) * p) + R) * 0x10000 +
            (Math.round((t - G) * p) + G) * 0x100 +
            (Math.round((t - B) * p) + B)
        )
            .toString(16)
            .slice(1)
    );
}

// --- 3D Gradient Class Card ---
interface CardProps {
    classItem: ClassItem;
    onEditPress: (item: TimeTable) => void;
}

const ClassCard: React.FC<CardProps> = ({ classItem, onEditPress }) => {
    const darkerColor = shadeColor(classItem.color, -20);
    return (
        <TouchableOpacity
            onPress={() => onEditPress(classItem)} // Click to edit!
            style={{ width: '100%', height: '100%' }}
        >
            <LinearGradient
                colors={[classItem.color, darkerColor]}
                style={styles.classCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <Text style={styles.classSubject}>{classItem.subject}</Text>
                <Text style={styles.classRoom}>{classItem.room}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

// --- Dropdown Component ---
interface DropdownProps {
    value: string;
    setValue: (value: string) => void;
    options: string[];
    placeholder: string;
}

const SimpleDropdown: React.FC<DropdownProps> = ({ value, setValue, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity 
                style={[styles.inputHalf, {zIndex: isOpen ? 2 : 1}]}
                onPress={() => setIsOpen(!isOpen)}
            >
                <Text style={[styles.dropdownText, value === "" && { color: '#888' }]}>
                    {value || placeholder}
                </Text>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.dropdownList}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option || 'None'}
                            style={styles.dropdownItem}
                            onPress={() => {
                                setValue(option);
                                setIsOpen(false);
                            }}
                        >
                            <Text style={styles.dropdownText}>{option || placeholder}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};


// --- Stylish TimeTable Display Component (FIXED for Array Check) ---
interface StylishTimeTableProps {
    timetables: TimeTable[] | any;
    selectedSemester: string;
    selectedFaculty: string;
    onEditPress: (item: TimeTable) => void;
}

const StylishTimeTableDisplay: React.FC<StylishTimeTableProps> = ({ timetables, selectedSemester, selectedFaculty, onEditPress }) => {

    const headerText = (selectedFaculty && selectedSemester)
        ? `${selectedFaculty} / ${selectedSemester}`
        : 'Please Select Filter Criteria Above';

    const dataForDisplay = useMemo(() => {
        // *** FIX APPLIED: Ensure timetables is an array before using filter() ***
        const safeTimetables = Array.isArray(timetables) ? timetables : [];

        // Group the dynamic data based on the CURRENTLY SELECTED filters
        const grouped = ALL_DAYS.map(dayName => {
            const classes: ClassItem[] = safeTimetables
                .filter(t => 
                    t.day.toLowerCase() === dayName.toLowerCase() &&
                    t.faculty === selectedFaculty &&
                    t.semester === selectedSemester
                )
                .map(t => ({
                    ...t,
                    code: t.subject.substring(0, 4).toUpperCase(),
                    room: t.faculty,
                    instructor: t.semester,
                    color: t.faculty === 'BTech CSE' ? '#20B2AA' : (t.faculty === 'BBA' ? '#008080' : '#8FBC8F')
                }));
            
            return { name: dayName, classes };
        });

        return grouped;
    }, [timetables, selectedSemester, selectedFaculty]); // Dependency array remains correct

    return (
        <SafeAreaView style={styles.stylishSafe}>
            <Text style={styles.stylishHeader}>📅 Time Table for: {headerText}</Text>
            <ScrollView horizontal contentContainerStyle={{paddingBottom: 20}}>
                <View style={styles.stylishContainer}>
                    {/* Header */}
                    <View style={styles.stylishTopHeader}>
                        <Text style={styles.universityName}>ACADEMIC TIMETABLE (Live Data)</Text>
                        <View style={styles.courseInfo}>
                            <Text style={styles.courseName}>{selectedFaculty || 'N/A'}</Text>
                            <Text style={styles.semesterInfo}>{selectedSemester || 'N/A'}</Text>
                        </View>
                    </View>

                    {/* Time Table Grid */}
                    <View style={styles.timetableContainer}>
                        {/* Time Header Row */}
                        <View style={styles.timeHeaderRow}>
                            <View style={styles.dayLabelCell}></View>
                            {TIME_SLOTS.map((time) => (
                                <View key={time} style={styles.timeHeaderCell}>
                                    <Text style={styles.timeHeaderText}>{time}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Day Rows */}
                        {ALL_DAYS.map((dayName) => {
                            const dayData = dataForDisplay.find(d => d.name === dayName);

                            return (
                                <View key={dayName} style={styles.dayRow}>
                                    <View style={styles.dayLabelCell}>
                                        <Text style={styles.dayLabelText}>{dayName}</Text>
                                    </View>
                                    {TIME_SLOTS.map((timeSlot) => {
                                        const classForTime = dayData?.classes.find((cls) => cls.time === timeSlot);
                                        return (
                                            <View key={timeSlot} style={styles.timeSlotCell}>
                                                {classForTime 
                                                    ? <ClassCard classItem={classForTime} onEditPress={onEditPress} /> 
                                                    : <View style={styles.emptySlot} />
                                                }
                                            </View>
                                        );
                                    })}
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


// --- Main TimeTableScreen Component with CRUD ---
export default function TimeTableScreen() {
    // Initialise with some dummy data
    const [timetables, setTimetables] = useState<TimeTable[]>(INITIAL_TIMETABLES);

    // Filter/Add criteria
    const [semester, setSemester] = useState("Semester 2"); // Default selection for better view
    const [faculty, setFaculty] = useState("BTech CSE"); // Default selection for better view
    
    // CRUD Form state
    const [subject, setSubject] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [editId, setEditId] = useState<string | null>(null);

    // List View Filter state
    const [searchPressed, setSearchPressed] = useState(false);
    const [filteredTimetables, setFilteredTimetables] = useState<TimeTable[]>([]);


    // ✅ Edit Entry (Used by both FlatList and ClassCard)
    const handleEdit = (item: TimeTable) => {
        setSubject(item.subject);
        setDay(item.day);
        setTime(item.time);
        setSemester(item.semester); // Set filter options to item's values
        setFaculty(item.faculty);   // Set filter options to item's values
        setEditId(item.id);         // Set edit ID to enter update mode
        setSearchPressed(false);    // Hide search results
        Alert.alert("Edit Mode", `Editing: ${item.subject} on ${item.day} (${item.time})`);
    }

    // ✅ Add or Edit TimeTable Entry
    const handleAddOrEdit = () => {
        if (!subject || !day || !time || !semester || !faculty) {
            Alert.alert("Missing Fields", "Please fill all fields before saving.");
            return;
        }

        const normalizedDay = day.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        const normalizedTime = time.trim();
        const normalizedSubject = subject.trim();

        if (!ALL_DAYS.map(d => d.toLowerCase()).includes(normalizedDay.toLowerCase())) {
             Alert.alert("Invalid Day", "Please enter a valid day (e.g., Monday, Tuesday).");
             return;
        }

        // 1. Check for existing entry with same criteria (Day, Time, Semester, Faculty)
        const existingEntry = timetables.find(item =>
            item.id !== editId && 
            item.day.toLowerCase() === normalizedDay.toLowerCase() &&
            item.time.toLowerCase() === normalizedTime.toLowerCase() &&
            item.semester === semester &&
            item.faculty === faculty
        );

        if (editId) {
            // **A. Update existing entry (via Edit button or editId)**
            setTimetables(prev =>
                prev.map(item =>
                    item.id === editId
                        ? { ...item, subject: normalizedSubject, day: normalizedDay, time: normalizedTime, semester, faculty }
                        : item
                )
            );
            setEditId(null);
            Alert.alert("Success", "Timetable updated successfully.");
        } 
        else if (existingEntry) {
            // **B. Update existing entry (via Add button, if criteria matches)**
            Alert.alert(
                "Entry Updated",
                `An entry for ${normalizedDay} at ${normalizedTime} already exists for this course. It has been updated with the new subject: ${normalizedSubject}.`
            );
            
            setTimetables(prev =>
                prev.map(item =>
                    item.id === existingEntry.id
                        ? { ...item, subject: normalizedSubject, day: normalizedDay, time: normalizedTime, semester, faculty }
                        : item
                )
            );
            
        } else {
            // **C. Add new entry (No conflict found)**
            const newEntry: TimeTable = {
                id: Date.now().toString(),
                subject: normalizedSubject,
                day: normalizedDay,
                time: normalizedTime,
                semester,
                faculty,
            }
            setTimetables(prev => [...prev, newEntry]);
            Alert.alert("Added", "New timetable added successfully.");
        }

        // Reset inputs after operation
        setSubject("");
        setDay("");
        setTime("");
        setSearchPressed(false);
    }

    // ✅ Filter by Semester & Faculty
    const handleSearch = () => {
        if (!semester || !faculty) {
            Alert.alert("Please select both semester and faculty.");
            return;
        }
        const filtered = timetables.filter(
            t => t.semester === semester && t.faculty === faculty
        );
        setFilteredTimetables(filtered);
        setSearchPressed(true);
    }

    // ✅ Delete Entry
    const handleDelete = (id: string) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this timetable entry?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        setTimetables(prev => prev.filter(item => item.id !== id));
                        // Update filtered list if search was active
                        if(searchPressed) {
                            setFilteredTimetables(prev => prev.filter(item => item.id !== id));
                        }
                        Alert.alert("Deleted", "Timetable entry removed.");
                    },
                    style: "destructive"
                }
            ]
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>🎓 Editable Time Table (CRUD)</Text>
            <Text style={styles.subHeader}>Select Filter/Add Criteria</Text>

            {/* Filters (Dropdowns) */}
            <View style={styles.row}>
                <SimpleDropdown
                    value={semester}
                    setValue={setSemester}
                    options={SEMESTER_OPTIONS}
                    placeholder="Select Semester"
                />
                <SimpleDropdown
                    value={faculty}
                    setValue={setFaculty}
                    options={FACULTY_OPTIONS}
                    placeholder="Select Faculty"
                />
                <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                    <Text style={styles.btnText}>Search</Text>
                </TouchableOpacity>
            </View>

            {/* Add/Edit Form */}
            <View style={styles.form}>
                <TextInput
                    style={styles.inputHalf}
                    placeholder="Subject Name"
                    value={subject}
                    onChangeText={setSubject}
                />
                <View style={styles.row}>
                    <TextInput
                        style={styles.inputHalf}
                        placeholder="Day (e.g. Monday)"
                        value={day}
                        onChangeText={setDay}
                    />
                    <TextInput
                        style={styles.inputHalf}
                        placeholder="Time (e.g. 10-11)"
                        value={time}
                        onChangeText={setTime}
                    />
                </View>
                
                <TouchableOpacity style={styles.addBtn} onPress={handleAddOrEdit}>
                    <Text style={styles.btnText}>
                        {editId ? "Update Timetable" : "Add/Update Entry"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Timetable List (CRUD Filter Results) */}
            {searchPressed && (
                <View style={styles.tableContainer}>
                    {filteredTimetables.length === 0 ? (
                        <Text style={styles.noData}>No timetable found for selected filters.</Text>
                    ) : (
                        <>
                        <Text style={styles.listHeader}>Filter Results ({filteredTimetables.length} Entries)</Text>
                        <FlatList
                            data={filteredTimetables}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.tableRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.subject}>{item.subject}</Text>
                                        <Text style={styles.details}>
                                            {item.day} | {item.time} | {item.semester} | {item.faculty}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handleEdit(item)}
                                        style={styles.editBtn}
                                    >
                                        <Text style={styles.btnText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleDelete(item.id)}
                                        style={styles.deleteBtn}
                                    >
                                        <Text style={styles.btnText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        </>
                    )}
                </View>
            )}
            
            {/* --- Dynamic Stylish Time Table Display --- */}
            <View style={styles.separator}></View>
            <StylishTimeTableDisplay 
                timetables={timetables} 
                selectedSemester={semester} 
                selectedFaculty={faculty}
                onEditPress={handleEdit}
            />

        </ScrollView>
    )
}


// --- Unified Styles (Unchanged) ---
const styles = StyleSheet.create({
    // --- General Styles ---
    container: { flex: 1, backgroundColor: "#f4f7fa", padding: 16 },
    header: {
      fontSize: 22,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 4,
      color: "#1a1a1a",
    },
    subHeader: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 12,
      color: "#555",
    },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10, zIndex: 1 },
    form: { marginBottom: 16 },
    inputHalf: {
      flex: 1,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 10,
      margin: 5,
    },
    btnText: { color: "#fff", fontWeight: "bold" },
    
    // --- Dropdown Styles ---
    dropdownContainer: {
      flex: 1,
    },
    dropdownText: { color: '#333' },
    dropdownList: {
      position: 'absolute',
      top: 50, // Height of input + some margin
      left: 5,
      right: 5,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      zIndex: 100, // IMPORTANT: Ensure the list is above everything else
      maxHeight: 200,
      overflow: 'scroll',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    dropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
  
    // --- Button & List Styles ---
    searchBtn: {
      backgroundColor: "#007bff",
      borderRadius: 10,
      justifyContent: "center",
      paddingHorizontal: 15,
      marginRight: 5,
      marginLeft: 5,
    },
    addBtn: {
      backgroundColor: "#28a745",
      borderRadius: 10,
      marginTop: 8,
      padding: 12,
      alignItems: "center",
    },
    tableContainer: {
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 10,
      elevation: 3,
      marginBottom: 20, 
    },
    listHeader: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
      marginTop: 5,
      paddingLeft: 5,
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 0.7,
      borderColor: "#ddd",
      paddingVertical: 8,
    },
    subject: { fontWeight: "600", fontSize: 16 },
    details: { color: "#555" },
    editBtn: {
      backgroundColor: "#17a2b8",
      padding: 6,
      borderRadius: 8,
      marginRight: 4,
    },
    deleteBtn: {
      backgroundColor: "#dc3545",
      padding: 6,
      borderRadius: 8,
    },
    noData: { textAlign: "center", color: "#888", marginVertical: 20 },
    separator: { 
      borderBottomWidth: 2, 
      borderColor: '#ccc', 
      marginVertical: 20,
      opacity: 0.5,
    },
  
    // --- Stylish TimeTable Styles ---
    stylishSafe: { backgroundColor: '#f0f0f0', padding: 0, marginTop: 10 },
    stylishHeader: {
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 12,
      color: "#1a1a1a",
    },
    stylishContainer: { flex: 1, backgroundColor: '#ffffff', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
    stylishTopHeader: { alignItems: 'center', marginBottom: 30 },
    universityName: { fontSize: 16, color: '#999999', fontWeight: '400', marginBottom: 8, textTransform: 'uppercase' },
    courseInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
    courseName: { fontSize: 20, fontWeight: 'bold', color: '#333333' },
    semesterInfo: { fontSize: 14, color: '#999999', fontWeight: '400' },
    timetableContainer: { backgroundColor: '#ffffff', borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', overflow: 'hidden' },
    timeHeaderRow: { flexDirection: 'row', backgroundColor: '#f8f9fa', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
    dayRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    dayLabelCell: { width: 120, height: 60, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#e0e0e0', backgroundColor: '#f8f9fa' },
    dayLabelText: { fontSize: 14, color: '#222121ff', fontWeight: '600' },
    timeHeaderCell: { width: 120, height: 50, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#e0e0e0' },
    timeHeaderText: { fontSize: 14, color: '#252424ff', fontWeight: '600' },
    timeSlotCell: { width: 120, height: 60, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#f0f0f0', paddingHorizontal: 4, paddingVertical: 4 },
    emptySlot: { width: '100%', height: '100%', backgroundColor: 'transparent' },
    classCard: { width: '100%', height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.35, shadowRadius: 6, elevation: 6, padding: 4 },
    classSubject: { color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
    classRoom: { color: '#ffffff', fontSize: 10, textAlign: 'center', marginTop: 2 },
  });