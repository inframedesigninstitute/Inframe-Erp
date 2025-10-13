import { Picker } from "@react-native-picker/picker";
import { useMemo, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AttendanceStatus = "P" | "A" | "L" | "H" | "";

type CourseAttendance = {
    course: string;
    days: AttendanceStatus[];
};

interface DummyDatePickerProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: (date: Date) => void;
    date: Date;
}

const DummyDatePicker = ({ isVisible, onClose, onConfirm, date }: DummyDatePickerProps) => { 
    if (!isVisible) return null;
    return (
        <View style={styles.dummyDatePickerOverlay}>
            <View style={styles.dummyDatePickerContainer}>
                <Text style={styles.dummyDatePickerTitle}>Select Date</Text>
                <Text style={styles.dummyDatePickerDate}>
                    {date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
                </Text>
                <View style={styles.dummyDatePickerActions}>
                    <TouchableOpacity onPress={onClose} style={[styles.dateButton, {backgroundColor: '#ef4444'}]}>
                        <Text style={styles.fullMonthButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onConfirm(date)} style={styles.dateButton}> 
                        <Text style={styles.fullMonthButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

interface CourseDetailModalProps {
    isVisible: boolean;
    onClose: () => void;
    course: CourseAttendance | null;
}

const CourseDetailModal = ({ isVisible, onClose, course }: CourseDetailModalProps) => { 
    if (!course) return null;

    const { p, a, l, h, pct } = summarize(course.days);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Attendance Details: {course.course}</Text>
                    <Text style={styles.modalSubtitle}>Summary for the selected month/range</Text>
                    
                    <View style={styles.summaryGrid}>
                        <Text style={styles.summaryLabel}>Present (P):</Text><Text style={styles.summaryValue}>{p}</Text>
                        <Text style={styles.summaryLabel}>Absent (A):</Text><Text style={styles.summaryValue}>{a}</Text>
                        <Text style={styles.summaryLabel}>Leave (L):</Text><Text style={styles.summaryValue}>{l}</Text>
                        <Text style={styles.summaryLabel}>Holiday (H):</Text><Text style={styles.summaryValue}>{h}</Text>
                        <Text style={styles.summaryLabelPct}>Percentage:</Text><Text style={styles.summaryValuePct}>{pct} %</Text>
                    </View>
                    
                    <TouchableOpacity onPress={onClose} style={[styles.fullMonthButtonClay, styles.modalCloseButton]}>
                        <Text style={styles.fullMonthButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


const MONTHS = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
];

const YEARS = [2025, 2024, 2023, 2022, 2021];

function getDaysInMonth(year: number, month1to12: number) {
    return new Date(year, month1to12, 0).getDate();
}

function padDay(n: number) {
    return n < 10 ? `0${n}` : String(n);
}

function summarize(days: AttendanceStatus[]) {
    const p = days.filter((d) => d === "P").length;
    const a = days.filter((d) => d === "A").length;
    const l = days.filter((d) => d === "L").length;
    const h = days.filter((d) => d === "H").length;
    const denom = p + a + l;
    const pct = denom > 0 ? Math.round((p / denom) * 100) : 0;
    return { p, a, l, h, pct };
}

function createEmptyAttendance(daysInMonth: number) {
    const empty = Array.from({ length: daysInMonth }, () => "" as AttendanceStatus);
    return [
        { course: "CSE607", days: [...empty] },
        { course: "EN105", days: [...empty] },
        { course: "MAT211", days: [...empty] },
        { course: "PH308", days: [...empty] },
        { course: "BIO101", days: [...empty] },
        { course: "CHM102", days: [...empty] },
        { course: "GEO405", days: [...empty] },
        { course: "HIS301", days: [...empty] },
        { course: "ECO707", days: [...empty] },
        { course: "MTH808", days: [...empty] },
    ];
}

function generateRandomStatus(): AttendanceStatus {
    const statuses: AttendanceStatus[] = ["P", "P", "P", "A", "L", "H", ""]; 
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
}


export default function Lecture_wise_AttendanceScreen() {
    const [month, setMonth] = useState<number>(10);
    const [year, setYear] = useState<number>(2025);

    const [startDate, setStartDate] = useState(new Date(2025, 9, 1)); 
    const [endDate, setEndDate] = useState(new Date(2025, 9, 31)); 
    const [isDatePickerVisible, setIsDatePickerVisible] = useState<"start" | "end" | null>(null);
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseAttendance | null>(null);
    
    const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);
    const dayNumbers = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);

    const [courses, setCourses] = useState<CourseAttendance[]>(() =>
        createEmptyAttendance(getDaysInMonth(2025, 10))
    );

    useMemo(() => {
        setCourses(createEmptyAttendance(daysInMonth));
    }, [daysInMonth, month, year]);

    // --- Date Picker Logic ---
    const showDatePicker = (type: "start" | "end") => setIsDatePickerVisible(type);
    const hideDatePicker = () => setIsDatePickerVisible(null);

    const handleDateChange = (date: Date) => {
        if (isDatePickerVisible === "start") {
            setStartDate(date);
        } else if (isDatePickerVisible === "end") {
            setEndDate(date);
        }
        hideDatePicker();
    };

    // --- Modal Logic ---
    const handleShowDetails = (course: CourseAttendance) => {
        setSelectedCourse(course);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedCourse(null);
    };
    
    const handleShowFullMonth = () => {
        const newCourses: CourseAttendance[] = courses.map((course) => {
            const newDays: AttendanceStatus[] = Array.from({ length: daysInMonth }, () =>
                generateRandomStatus()
            );
            return { ...course, days: newDays };
        });
        setCourses(newCourses);
    };
    
    // 💥 FIX 1: Defined SummaryHeader inside the main component
    const SummaryHeader = () => (
        <>
            <View style={[styles.cellSummary, styles.headerCell]}>
                <Text style={styles.headerText}>P</Text>
            </View>
            <View style={[styles.cellSummary, styles.headerCell]}>
                <Text style={styles.headerText}>A</Text>
            </View>
            <View style={[styles.cellSummary, styles.headerCell]}>
                <Text style={styles.headerText}>L</Text>
            </View>
            <View style={[styles.cellSummary, styles.headerCell]}>
                <Text style={styles.headerText}>H</Text>
            </View>
            <View style={[styles.cellPct, styles.headerCell]}>
                <Text style={styles.headerText}>%</Text>
            </View>
            <View style={[styles.cellDetails, styles.headerCell]}> 
                <Text style={styles.headerText}>Details</Text>
            </View>
        </>
    );

    // 💥 FIX 2: Defined SummaryBody inside the main component, giving it access to handleShowDetails and summarize
    const SummaryBody = ({ c, isLastRow }: { c: CourseAttendance, isLastRow: boolean }) => {
        const { p, a, l, h, pct } = summarize(c.days); // summarize is accessible
        return (
            <>
                <View style={[styles.cellSummary, styles.bodyCell, isLastRow && styles.lastBodyCell]}>
                    <Text style={styles.bodyText}>{p}</Text>
                </View>
                <View style={[styles.cellSummary, styles.bodyCell, isLastRow && styles.lastBodyCell]}>
                    <Text style={styles.bodyText}>{a}</Text>
                </View>
                <View style={[styles.cellSummary, styles.bodyCell, isLastRow && styles.lastBodyCell]}>
                    <Text style={styles.bodyText}>{l}</Text>
                </View>
                <View style={[styles.cellSummary, styles.bodyCell, isLastRow && styles.lastBodyCell]}>
                    <Text style={styles.bodyText}>{h}</Text>
                </View>
                <View style={[styles.cellPct, styles.bodyCell, isLastRow && styles.lastBodyCell, styles.lastColBackground]}>
                    <Text style={styles.bodyText}>{pct} %</Text>
                </View>
                <View style={[styles.cellDetails, styles.bodyCell, isLastRow && styles.lastBodyCell]}>
                    <TouchableOpacity 
                        onPress={() => handleShowDetails(c)} // handleShowDetails is now accessible
                        style={styles.detailsButton}
                    >
                        <Text style={styles.detailsButtonText}>View</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    };


    return (
        <ScrollView style={styles.outerContainer} contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
                <Text style={styles.title}>Attendance</Text>

                <View style={styles.filters}>
                    <View style={styles.clayPickerContainer}>
                        <Text style={styles.label}>Month</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker selectedValue={month} onValueChange={(v) => setMonth(v as number)} style={styles.picker}>
                                {MONTHS.map((m) => (
                                    <Picker.Item key={m.value} label={m.label} value={m.value} color="#1f2937" />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.clayPickerContainer}>
                        <Text style={styles.label}>Year</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker selectedValue={year} onValueChange={(v) => setYear(v as number)} style={styles.picker}>
                                {YEARS.map((y) => (
                                    <Picker.Item key={y} label={String(y)} value={y} color="#000000ff" />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                <View style={styles.filters}>
                    <View style={styles.clayPickerContainer}>
                        <Text style={styles.label}>Start Date</Text>
                        <TouchableOpacity onPress={() => showDatePicker('start')} style={styles.dateRangeButton}>
                            <Text style={styles.dateRangeText}>{startDate.toLocaleDateString('en-GB')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.clayPickerContainer}>
                        <Text style={styles.label}>End Date</Text>
                        <TouchableOpacity onPress={() => showDatePicker('end')} style={styles.dateRangeButton}>
                            <Text style={styles.dateRangeText}>{endDate.toLocaleDateString('en-GB')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.legendClay}>
                    <Text style={styles.legendText}>
                        Present: <Text style={[styles.legendCode, styles.present]}>P</Text> |
                        Absent: <Text style={[styles.legendCode, styles.absent]}>A</Text> |
                        Leave: <Text style={[styles.legendCode, styles.leave]}>L</Text> |
                        Holiday: <Text style={[styles.legendCode, styles.holiday]}>H</Text>
                    </Text>
                </View>

                <TouchableOpacity onPress={handleShowFullMonth} style={[styles.fullMonthButtonClay, styles.smallButton]}>
                    <Text style={styles.smallButtonText}>Show Dummy Data</Text>
                </TouchableOpacity>

                <View style={styles.tableCard}>

                    {/* Table Header with Fixed Course and Summary */}
                    <View style={[styles.row, styles.headerRow]}>
                        <View style={[styles.cellCourse, styles.headerCell, styles.fixedCourse]}>
                            <Text style={styles.headerText}>Course</Text>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysHeaderScrollView}>
                            {dayNumbers.map((d) => (
                                <View key={`hdr-${d}`} style={[styles.cellDay, styles.headerCell]}>
                                    <Text style={styles.headerText}>{padDay(d)}</Text>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={[styles.row, styles.fixedSummary, styles.fixedSummaryHeader]}>
                            <SummaryHeader />
                        </View>
                    </View>

                    {/* Table Body - Vertical Scroll for Rows */}
                    <ScrollView style={styles.verticalScrollView} showsVerticalScrollIndicator={true}>
                        {courses.map((c, rowIndex) => {
                            const isLastRow = rowIndex === courses.length - 1;
                            
                            return (
                                <View key={c.course} style={[styles.row, isLastRow && styles.lastRow]}>
                                    {/* Fixed Course Column */}
                                    <View style={[styles.cellCourse, styles.bodyCell, isLastRow && styles.lastBodyCell, styles.firstColBackground, styles.fixedCourse]}>
                                        <Text style={styles.bodyText}>{c.course}</Text>
                                    </View>

                                    {/* Scrollable Days Data */}
                                    <ScrollView 
                                        horizontal 
                                        showsHorizontalScrollIndicator={false} 
                                        style={styles.horizontalScrollView}
                                        contentContainerStyle={styles.horizontalScrollContent}
                                    >
                                        <View style={styles.row}>
                                            {dayNumbers.map((d, idx) => {
                                                const val = c.days[idx] || "";
                                                const statusStyle =
                                                    val === "P" ? styles.present :
                                                    val === "A" ? styles.absent :
                                                    val === "L" ? styles.leave :
                                                    val === "H" ? styles.holiday :
                                                    styles.empty;
                                                return (
                                                    <View key={`${c.course}-${d}`} style={[styles.cellDay, styles.bodyCell, isLastRow && styles.lastBodyCell]}>
                                                        <Text style={[styles.bodyText, statusStyle]}>{val}</Text>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    </ScrollView>

                                    {/* Fixed Summary Columns */}
                                    <View style={[styles.row, styles.fixedSummary]}>
                                        <SummaryBody c={c} isLastRow={isLastRow} />
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        
            <DummyDatePicker 
                isVisible={isDatePickerVisible === 'start'} 
                onClose={hideDatePicker} 
                onConfirm={handleDateChange}
                date={startDate}
            />
            <DummyDatePicker 
                isVisible={isDatePickerVisible === 'end'} 
                onClose={hideDatePicker} 
                onConfirm={handleDateChange}
                date={endDate}
            />

            <CourseDetailModal
                isVisible={isModalVisible}
                onClose={closeModal}
                course={selectedCourse}
            />

        </ScrollView>
    );
}

const BASE_COLOR = "#f0f0f0"; 
const SHADOW_LIGHT = "#ffffff";
const SHADOW_DARK = "#d1d9e6";

const COURSE_COL_WIDTH = 96;
const DAY_COL_WIDTH = 44;
const SUMMARY_P_A_L_H_WIDTH = 44;
const SUMMARY_PCT_WIDTH = 64;
const DETAILS_COL_WIDTH = 80;
const FIXED_SUMMARY_WIDTH = (SUMMARY_P_A_L_H_WIDTH * 4) + SUMMARY_PCT_WIDTH + DETAILS_COL_WIDTH;

const styles = StyleSheet.create({
    outerContainer: { 
        flex: 1, 
        backgroundColor: BASE_COLOR, 
    },
    scrollContent: {
        padding: 20, 
        flexGrow: 1,
    },
    card: { 
        padding: 16, 
        backgroundColor: BASE_COLOR,
        borderRadius: 24,
        shadowColor: SHADOW_DARK,
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 8, 
        borderWidth: 1,
        borderColor: SHADOW_LIGHT,
    },
    title: { 
        fontSize: 24, 
        fontWeight: "700", 
        color: "#1f2937", 
        textAlign: 'center', 
        marginBottom: 20 
    },

    filters: { flexDirection: "row", gap: 16, marginBottom: 16 },
    dateRangeButton: {
        backgroundColor: BASE_COLOR,
        borderRadius: 12,
        shadowColor: SHADOW_DARK,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: SHADOW_LIGHT,
        padding: 10,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        flex: 1,
    },
    dateRangeText: {
        color: "#1f2937", 
        fontWeight: '600',
    },
    clayPickerContainer: { flex: 3, alignItems: 'center' },
    label: { fontSize: 14, color: "#040505ff", marginBottom: 6, fontWeight: '600' },
    pickerWrapper: {
        backgroundColor: BASE_COLOR,
        borderRadius: 12,
        shadowColor: SHADOW_DARK,
        shadowOffset: { width: -3, height: -3 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: SHADOW_LIGHT,
        overflow: 'hidden', 
        width: '100%',
        height: 48,
        justifyContent: 'center',
    },
    picker: { width: '100%', color: "#000000ff" },
    fullMonthButtonClay: {
        backgroundColor: "#3b82f6", 
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#1d4ed8", 
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 6,
    },
    fullMonthButtonText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
    smallButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: 'center',
        maxWidth: '80%',
    },
    smallButtonText: {
        color: "#ffffff",
        fontWeight: "600",
        fontSize: 14,
    },
    legendClay: { 
        marginBottom: 16, 
        padding: 10, 
        backgroundColor: BASE_COLOR, 
        borderRadius: 12, 
        alignItems: 'center',
        shadowColor: SHADOW_DARK,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 4,
    },
    legendText: { color: "#374151", fontSize: 13 },
    legendCode: { fontWeight: "800" },
    present: { color: "#10b981" }, 
    absent: { color: "#ef4444" }, 
    leave: { color: "#3b82f6" }, 
    holiday: { color: "#f59e0b" }, 
    empty: { color: "#9ca3af" }, 
    
    detailsButton: {
        backgroundColor: '#4ade80',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsButtonText: {
        color: '#166534',
        fontWeight: 'bold',
        fontSize: 12,
    },

    tableCard: {
        backgroundColor: BASE_COLOR,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: SHADOW_LIGHT,
        shadowColor: SHADOW_DARK,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        elevation: 6,
    },
    
    row: { 
        flexDirection: "row",
    },
    lastRow: {}, 
    // --- Fixed Column Styles ---
    fixedCourse: {
        zIndex: 3, // Increased zIndex for Course column
        left: 0,
        position: 'absolute', 
        width: COURSE_COL_WIDTH,
        backgroundColor: '#f9fafb',
    },
    fixedSummary: {
        zIndex: 2, // Increased zIndex for Summary columns
        position: 'absolute',
        right: 0,
        width: FIXED_SUMMARY_WIDTH, 
    },
    fixedSummaryHeader: {
        top: 0,
        backgroundColor: '#dbeafe', 
    },
    // --- Scroll Area Styles ---
    daysHeaderScrollView: {
        flexGrow: 1,
        marginLeft: COURSE_COL_WIDTH, 
        marginRight: FIXED_SUMMARY_WIDTH, 
        
    },
    horizontalScrollView: {
        flex: 1,
        marginLeft: COURSE_COL_WIDTH, 
        marginRight: FIXED_SUMMARY_WIDTH, 
    },
    horizontalScrollContent: {
        flexDirection: 'row', 
    },
    verticalScrollView: {
        maxHeight: 300, 
        flex: 1,
    },
    // --- Cell Styles ---
    headerRow: { 
        backgroundColor: "#dbeafe", 
        borderBottomWidth: 2, 
        borderColor: "#93c5fd",
        position: 'relative', 
        height: 42, 
        overflow: 'hidden',
    },
    headerCell: { 
        paddingVertical: 10, 
        paddingHorizontal: 6, 
        borderRightWidth: 1, 
        borderColor: "#bfdbfe",
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: { 
        color: "#1f2937", 
        fontWeight: "700", 
        textAlign: "center", 
        fontSize: 12 
    },

    bodyCell: { 
        paddingVertical: 10, 
        paddingHorizontal: 6, 
        borderRightWidth: 1, 
        borderBottomWidth: 1, 
        borderColor: "#e5e7eb", 
        justifyContent: "center",
        alignItems: 'center',
        height: 40, 
    },
    lastBodyCell: {
        borderBottomWidth: 0, 
    },
    bodyText: { 
        color: "#111827", 
        textAlign: "center", 
        fontSize: 14 
    },

    cellCourse: { width: COURSE_COL_WIDTH }, 
    cellDay: { width: DAY_COL_WIDTH },
    cellSummary: { width: SUMMARY_P_A_L_H_WIDTH },
    cellPct: { width: SUMMARY_PCT_WIDTH }, 
    cellDetails: { width: DETAILS_COL_WIDTH, borderRightWidth: 0 }, 

    firstColBackground: {
        backgroundColor: '#f9fafb',
    },
    lastColBackground: {
        backgroundColor: '#eff6ff',
    },

    // --- Modal Styles ---
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: BASE_COLOR,
        borderRadius: 20,
        shadowColor: SHADOW_DARK,
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 8, 
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 20,
    },
    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    summaryLabel: {
        width: '45%',
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
        paddingVertical: 4,
    },
    summaryValue: {
        width: '45%',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'right',
        paddingVertical: 4,
    },
    summaryLabelPct: {
        width: '45%',
        fontSize: 16,
        color: '#3b82f6',
        fontWeight: '700',
        paddingVertical: 8,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    summaryValuePct: {
        width: '45%',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3b82f6',
        textAlign: 'right',
        paddingVertical: 8,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    modalCloseButton: {
        marginBottom: 0,
        marginTop: 10,
    },

    // --- Dummy Date Picker Styles ---
    dummyDatePickerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    dummyDatePickerContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    dummyDatePickerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dummyDatePickerDate: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#3b82f6',
        marginBottom: 20,
    },
    dummyDatePickerActions: {
        flexDirection: 'row',
        gap: 10,
    },
    dateButton: {
        flex: 1,
        backgroundColor: "#3b82f6", 
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    }
});