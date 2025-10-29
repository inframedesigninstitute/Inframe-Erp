import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, // 👈 NEW: Import Modal
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// NOTE: You must install 'react-native-vector-icons'

// --- Constants and Types ---
const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

// Example Data for Dropdowns
const dropdownData = {
  Faculty: ['Arts', 'Science', 'Commerce', 'Engineering'],
  Program: ['B.Tech', 'M.Tech', 'BBA', 'MBA'],
  Session: ['2023-2024', '2024-2025'],
  Department: ['CS', 'EE', 'ME', 'Civil'],
  Course: ['Math 101', 'Physics 202', 'English 303'],
  FacultyRole: ['Student', 'Teacher', 'Admin', 'Guest'],
  Semester: ['1st', '2nd', '3rd', '4th'],
};

interface StudentData {
  name: string;
  rollNo: string;
  status: 'Present' | 'Absent' | 'Late';
  secondaryStatus: 'Present' | 'Absent' | 'Late' | 'Leave';
  // 👈 NEW: Added for filtering demonstration
  program: string;
  department: string;
}

const initialStudentData: StudentData[] = [
  { name: 'Opon Raries', rollNo: '541.00.00', status: 'Present', secondaryStatus: 'Absent', program: 'B.Tech', department: 'CS' },
  { name: 'Nolige Testy', rollNo: '401.00.00', status: 'Absent', secondaryStatus: 'Late', program: 'B.Tech', department: 'EE' },
  { name: 'Doyragupens', rollNo: '571.00.00', status: 'Late', secondaryStatus: 'Absent', program: 'M.Tech', department: 'CS' },
  { name: 'Dunalule Max', rollNo: '561.00.00', status: 'Present', secondaryStatus: 'Late', program: 'BBA', department: 'Civil' },
  { name: 'Alice Smith', rollNo: '123.45.67', status: 'Present', secondaryStatus: 'Present', program: 'B.Tech', department: 'ME' },
  { name: 'Bob Johnson', rollNo: '890.12.34', status: 'Absent', secondaryStatus: 'Leave', program: 'MBA', department: 'EE' },
  { name: 'Charlie Day', rollNo: '111.22.33', status: 'Late', secondaryStatus: 'Present', program: 'B.Tech', department: 'CS' },
];

// --- Statuses for Edit Modal
const ATTENDANCE_STATUSES: Array<'Present' | 'Absent' | 'Late' | 'Leave'> = ['Present', 'Absent', 'Late', 'Leave'];

// --- Custom Combobox Dropdown Component (Unchanged) ---
// (ComboboxDropdown component remains the same as provided)
interface ComboboxDropdownProps {
  label: string;
  options: string[];
  isText: boolean;
  selectedValue: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  dynamicZIndex: number;
}

const ComboboxDropdown: React.FC<ComboboxDropdownProps> = ({
  label,
  options,
  isText,
  selectedValue,
  onSelect,
  isOpen,
  onToggle,
  dynamicZIndex
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  if (isText) {
    return (
      <View style={styles.filterBox}>
        <TextInput
          placeholder={label}
          style={styles.filterTextInput}
          value={selectedValue}
          onChangeText={onSelect}
        />
      </View>
    );
  }

  const displayValue = selectedValue === label ? `Select ${label}...` : selectedValue;

  return (
    <View style={[styles.filterBox, { zIndex: isOpen ? dynamicZIndex : 1 }]}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => {
          onToggle();
          setSearchTerm('');
        }}
      >
        <Text style={[styles.filterText, selectedValue !== label && styles.selectedFilterText]}>
          {displayValue}
        </Text>
        <Icon
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={16}
          color="#333"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownOptions}>
          <TextInput
            style={styles.dropdownSearchInput}
            placeholder={`Search ${label}...`}
            value={searchTerm}
            onChangeText={setSearchTerm}
            autoFocus={true}
          />
          <ScrollView style={styles.dropdownScroll} keyboardShouldPersistTaps="always">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    onSelect(option);
                    onToggle();
                  }}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                  <Icon
                    name="checkmark-outline"
                    size={18}
                    color={selectedValue === option ? '#1A73E8' : 'transparent'}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.commandEmpty}>
                <Text style={styles.commandEmptyText}>No {label} found.</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};


// --- StudentAttendanceDateRangePicker Component (Unchanged) ---
// (StudentAttendanceDateRangePicker component remains the same as provided)

interface StudentAttendanceDateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  dynamicZIndex: number;
}

const StudentAttendanceDateRangePicker: React.FC<StudentAttendanceDateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  dynamicZIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const displayValue =
    startDate || endDate
      ? `${startDate || 'Start Date'} - ${endDate || 'End Date'}`
      : 'Select Date Range...';

  return (
    <View style={[styles.filterBox, dateStyles.filterBoxOverride, { zIndex: isOpen ? dynamicZIndex : 1 }]}>

      <TouchableOpacity
        style={dateStyles.filterButton}
        onPress={toggleOpen}
      >
        <Text style={[dateStyles.filterText, (startDate || endDate) && dateStyles.selectedFilterText]}>
          {displayValue}
        </Text>
        <Icon
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={16}
          color="#161515ff"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={dateStyles.dropdownOptions}>
          <Text style={dateStyles.dateRangeLabel}>Date Range</Text>

          <View style={dateStyles.dateInputRow}>
            <TextInput
              style={dateStyles.dateInput}
              placeholder="Start Date (DD/MM/YYYY)" // Added format hint
              value={startDate}
              onChangeText={onStartDateChange}
            />

            <TextInput
              style={[dateStyles.dateInput, { marginRight: 0 }]}
              placeholder="End Date (DD/MM/YYYY)" // Added format hint
              value={endDate}
              onChangeText={onEndDateChange}
            />

            <TouchableOpacity style={dateStyles.calendarIcon} onPress={() => alert('Open Calendar Picker')}>
              <Icon name="calendar-outline" size={18} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// --- Status Badge (Same as before)
interface StatusBadgeProps {
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
}
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let backgroundColor: string;
  let color: string;

  switch (status) {
    case 'Present':
      backgroundColor = '#E6FFEE';
      color = '#00A859';
      break;
    case 'Absent':
      backgroundColor = '#FFE6E6';
      color = '#FF4D4F';
      break;
    case 'Late':
      backgroundColor = '#FFFEE6';
      color = '#FF9900';
      break;
    case 'Leave':
      backgroundColor = '#E0F0FF';
      color = '#1A73E8';
      break;
    default:
      backgroundColor = '#ccc';
      color = '#333';
  }

  return (
    <View style={[styles.statusBadge, { backgroundColor }]}>
      <Text style={[styles.statusText, { color }]}>{status}</Text>
    </View>
  );
};

// --- 🚀 NEW/UPDATED Modal Components 🚀 ---

// 1. View History Modal
interface HistoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  student: StudentData | null;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isVisible, onClose, student }) => {
  if (!student) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={modalStyles.centeredView}>
          <TouchableWithoutFeedback onPress={() => { /* Prevent closing when tapping inside modal */ }}>
            <View style={modalStyles.modalView}>
              <View style={modalStyles.modalHeader}>
                <Text style={modalStyles.modalTitle}>Attendance History for {student.name}</Text>
                <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                  <Icon name="close-circle-outline" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <Text style={modalStyles.modalBodyText}><Text style={{ fontWeight: 'bold' }}>Roll No:</Text> {student.rollNo}</Text>
              <Text style={modalStyles.modalBodyText}><Text style={{ fontWeight: 'bold' }}>Program:</Text> {student.program}</Text>
              <Text style={modalStyles.modalBodyText}><Text style={{ fontWeight: 'bold' }}>Department:</Text> {student.department}</Text>
              <Text style={modalStyles.modalBodyText}><Text style={{ fontWeight: 'bold' }}>Current Status 1:</Text> <StatusBadge status={student.status} /></Text>
              <Text style={modalStyles.modalBodyText}><Text style={{ fontWeight: 'bold' }}>Current Status 2:</Text> <StatusBadge status={student.secondaryStatus} /></Text>

              {/* Placeholder for actual history details */}
              <ScrollView style={modalStyles.historyScroll}>
                <Text style={modalStyles.historyText}>[Placeholder: Detailed history log for past sessions and dates would be displayed here.]</Text>
                <Text style={modalStyles.historyText}>01/01/2024: Present, 02/01/2024: Absent, 03/01/2024: Late</Text>
                <Text style={modalStyles.historyText}>04/01/2024: Present, 05/01/2024: Leave, 06/01/2024: Present</Text>
                {/* ... more history entries */}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// 2. Edit Attendance Modal
interface EditModalProps {
  isVisible: boolean;
  onClose: () => void;
  student: StudentData | null;
  onSave: (rollNo: string, newStatus: StudentData['status'], newSecondaryStatus: StudentData['secondaryStatus']) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isVisible, onClose, student, onSave }) => {
  // Use state for the status inside the modal
  const [newStatus, setNewStatus] = useState<StudentData['status'] | undefined>(student?.status);
  const [newSecondaryStatus, setNewSecondaryStatus] = useState<StudentData['secondaryStatus'] | undefined>(student?.secondaryStatus);

  // Update local state when student prop changes (when modal opens)
  React.useEffect(() => {
    if (student) {
      setNewStatus(student.status);
      setNewSecondaryStatus(student.secondaryStatus);
    }
  }, [student]);

  if (!student) return null;

  const handleSave = () => {
    if (newStatus && newSecondaryStatus) {
      onSave(student.rollNo, newStatus, newSecondaryStatus);
      onClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={modalStyles.centeredView}>
          <TouchableWithoutFeedback onPress={() => { /* Prevent closing when tapping inside modal */ }}>
            <View style={modalStyles.modalView}>
              <View style={modalStyles.modalHeader}>
                <Text style={modalStyles.modalTitle}>Edit Attendance for {student.name}</Text>
                <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                  <Icon name="close-circle-outline" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <Text style={modalStyles.modalLabel}>Primary Status ({student.rollNo})</Text>
              <View style={modalStyles.statusGrid}>
                {ATTENDANCE_STATUSES.filter(s => s !== 'Leave').map(status => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      modalStyles.statusButton,
                      newStatus === status && modalStyles.statusButtonSelected,
                    ]}
                    onPress={() => setNewStatus(status)}
                  >
                    <StatusBadge status={status} />
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={modalStyles.modalLabel}>Secondary Status (Date: 29/10/2025)</Text>
              <View style={modalStyles.statusGrid}>
                {ATTENDANCE_STATUSES.map(status => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      modalStyles.statusButton,
                      newSecondaryStatus === status && modalStyles.statusButtonSelected,
                    ]}
                    onPress={() => setNewSecondaryStatus(status)}
                  >
                    <StatusBadge status={status} />
                  </TouchableOpacity>
                ))}
              </View>


              <TouchableOpacity style={modalStyles.saveButton} onPress={handleSave}>
                <Text style={modalStyles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


// --- Main Component ---

const SubjectAttendanceManagement: React.FC = () => {
  const [students, setStudents] = useState<StudentData[]>(initialStudentData);
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>(initialStudentData); // 👈 NEW: Data shown in table

  // State to manage all filter selections (Simplified)
  const [filters, setFilters] = useState({
    Faculty: 'Faculty',
    Program: 'Program',
    Session: 'Session',
    Semester: 'Semester',
    Department: 'Department',
    Course: 'Course',
    DateRangeStart: '',
    DateRangeEnd: '',
  });

  // State to manage which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // State for Modals
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

  const handleFilterSelect = (key: keyof typeof filters, value: string) => {
    // Only update filter value, do not trigger search immediately
    const finalValue = (value === filters[key]) ? key : value;
    setFilters(prev => ({ ...prev, [key]: finalValue }));
  };

  const handleToggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleEdit = (rollNo: string) => {
    const student = students.find(s => s.rollNo === rollNo);
    if (student) {
      setSelectedStudent(student);
      setEditModalVisible(true);
    }
  };

  const handleViewHistory = (student: StudentData) => {
    setSelectedStudent(student);
    setHistoryModalVisible(true);
  };

  const handleSaveAttendance = (
    rollNo: string,
    newStatus: StudentData['status'],
    newSecondaryStatus: StudentData['secondaryStatus']
  ) => {
    // 1. Update the main student data source
    const updatedStudents = students.map(s =>
      s.rollNo === rollNo
        ? { ...s, status: newStatus, secondaryStatus: newSecondaryStatus }
        : s
    );
    setStudents(updatedStudents);

    // 2. Re-apply the current search/filter to the *new* data
    const newFiltered = applyFilters(updatedStudents, filters);
    setFilteredStudents(newFiltered);

    alert(`Attendance for ${rollNo} updated successfully!`);
  };

  // 👈 NEW: Filtering Logic (Applied when Search is clicked)
  const applyFilters = (data: StudentData[], currentFilters: typeof filters): StudentData[] => {
    return data.filter(student => {
      // Filter logic: Only include a student if ALL non-default filters match
      const programMatch = currentFilters.Program === 'Program' || student.program === currentFilters.Program;
      const departmentMatch = currentFilters.Department === 'Department' || student.department === currentFilters.Department;

      // NOTE: Other filters (Faculty, Session, Semester, Course, DateRange) would require more complex data structures and logic.
      // For this example, we will filter by Program and Department.

      return programMatch && departmentMatch;
    });
  }

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    // Apply filters to the complete list of students
    const newFilteredStudents = applyFilters(students, filters);
    setFilteredStudents(newFilteredStudents);
    alert(`Search function triggered! Showing ${newFilteredStudents.length} results.`);
  };

  // Z-Index Fix: Calculate a high, descending zIndex for each row/column
  let currentZIndex = 20;


  return (
    <View style={styles.mainContainer}>
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Subject Attendance Management</Text>
          <TouchableOpacity style={styles.importButton}>
            <Icon name="cloud-upload-outline" size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.importButtonText}>Import</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Section (Grid/Flex Layout) */}
        <View style={styles.filterGrid}>

          {/* Row 1 (4 items) */}
          <ComboboxDropdown
            label="Faculty" options={dropdownData.FacultyRole} isText={false}
            selectedValue={filters.Faculty} onSelect={(v) => handleFilterSelect('Faculty', v)}
            isOpen={openDropdown === 'Faculty'} onToggle={() => handleToggleDropdown('Faculty')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown
            label="Program" options={dropdownData.Program} isText={false}
            selectedValue={filters.Program} onSelect={(v) => handleFilterSelect('Program', v)}
            isOpen={openDropdown === 'Program'} onToggle={() => handleToggleDropdown('Program')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown
            label="Session" options={dropdownData.Session} isText={false}
            selectedValue={filters.Session} onSelect={(v) => handleFilterSelect('Session', v)}
            isOpen={openDropdown === 'Session'} onToggle={() => handleToggleDropdown('Session')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown
            label="Semester" options={dropdownData.Semester} isText={false}
            selectedValue={filters.Semester} onSelect={(v) => handleFilterSelect('Semester', v)}
            isOpen={openDropdown === 'Semester'} onToggle={() => handleToggleDropdown('Semester')}
            dynamicZIndex={currentZIndex--}
          />

          {/* Row 2 (2 items) */}
          <ComboboxDropdown
            label="Department" options={dropdownData.Department} isText={false}
            selectedValue={filters.Department} onSelect={(v) => handleFilterSelect('Department', v)}
            isOpen={openDropdown === 'Department'} onToggle={() => handleToggleDropdown('Department')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown
            label="Course" options={dropdownData.Course} isText={false}
            selectedValue={filters.Course} onSelect={(v) => handleFilterSelect('Course', v)}
            isOpen={openDropdown === 'Course'} onToggle={() => handleToggleDropdown('Course')}
            dynamicZIndex={currentZIndex--}
          />

          {/* Row 3 (Date Range Picker) */}
          {/* Note: In a 4-column layout, this will take up a whole row or two columns, depending on the remaining space. */}
          <StudentAttendanceDateRangePicker
            startDate={filters.DateRangeStart}
            endDate={filters.DateRangeEnd}
            onStartDateChange={(v) => handleFilterSelect('DateRangeStart', v)}
            onEndDateChange={(v) => handleFilterSelect('DateRangeEnd', v)}
            dynamicZIndex={currentZIndex--}
          />

        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {/* --- Data Table Section (Uses filteredStudents) --- */}
        {filteredStudents.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableScroll}>
            {/* 👈 NEW: max-width is controlled by container, min-width forces scroll */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeader, styles.colName]}>Student Name</Text>
                <Text style={[styles.tableHeader, styles.colRollNo]}>Roll No.</Text>
                <Text style={[styles.tableHeader, styles.colStatus]}>Status (1)</Text>
                <Text style={[styles.tableHeader, styles.colStatus]}>Status (2)</Text>
                <Text style={[styles.tableHeader, styles.colActions]}>Actions</Text>
              </View>

              {/* Table Body */}
              {filteredStudents.map((student, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.colName]}>{student.name}</Text>
                  <Text style={[styles.tableCell, styles.colRollNo]}>{student.rollNo}</Text>

                  {/* Status Badges */}
                  <View style={[styles.tableCell, styles.colStatus, { flexDirection: 'row', alignItems: 'center' }]}>
                    <StatusBadge status={student.status} />
                  </View>
                  <View style={[styles.tableCell, styles.colStatus, { flexDirection: 'row', alignItems: 'center' }]}>
                    <StatusBadge status={student.secondaryStatus} />
                  </View>

                  {/* Actions */}
                  <View style={[styles.tableCell, styles.colActions, styles.actionsCell]}>
                    <TouchableOpacity style={styles.actionButtonEdit} onPress={() => handleEdit(student.rollNo)}>
                      <Text style={styles.actionButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButtonHistory} onPress={() => handleViewHistory(student)}>
                      <Icon name="time-outline" size={16} color="#333" style={{ marginRight: 4 }} />
                      <Text style={styles.actionButtonTextHistory}>View History</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No students found. Try a different filter or click 'Search'.</Text>
          </View>
        )}

        {/* --- Footer and Pagination --- */}
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportButtonText}>Export Report</Text>
          </TouchableOpacity>

          {/* Pagination Placeholder */}
          <View style={styles.pagination}>
            <Icon name="chevron-back-outline" size={18} color="#999" style={styles.pageIcon} />
            <Text style={styles.pageIndicator}>1</Text>
            <Text style={styles.pageIndicator}>2</Text>
            <Text style={styles.pageIndicator}>3</Text>
            <Icon name="chevron-forward-outline" size={18} color="#333" style={styles.pageIcon} />
          </View>
        </View>
      </View>

      {/* Modals */}
      <HistoryModal
        isVisible={historyModalVisible}
        onClose={() => setHistoryModalVisible(false)}
        student={selectedStudent}
      />
      <EditModal
        isVisible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        student={selectedStudent}
        onSave={handleSaveAttendance}
      />
    </View>
  );
};

// --- Modal Styles (NEW STYLES) ---
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  modalBodyText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 10,
  },
  statusButton: {
    padding: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  statusButtonSelected: {
    borderColor: '#1A73E8',
    backgroundColor: '#E0F0FF',
  },
  saveButton: {
    backgroundColor: '#00A859', // Green for Save
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  historyScroll: {
    maxHeight: 100,
    marginTop: 10,
    paddingRight: 10,
  },
  historyText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  }
});


// --- Date Range Picker Styles (Unchanged) ---
const dateStyles = StyleSheet.create({
  filterBoxOverride: {
    width: isLargeScreen ? '48%' : '100%',
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  filterText: {
    color: '#999',
    fontSize: 14,
  },
  selectedFilterText: {
    color: '#333',
    fontWeight: '500',
  },
  dropdownOptions: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 10,
  },
  dateRangeLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginBottom: 5,
  },
  dateInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    flex: 1,
    height: 36,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#333',
    marginRight: 5,
  },
  calendarIcon: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    marginLeft: -1,
  },
});

// --- Stylesheet (Updated) ---
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    padding: 20, // 👈 PADDING: Main container has 20 padding
    backgroundColor: '#F7F9FC',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  importButton: {
    flexDirection: 'row',
    backgroundColor: '#4B66E9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  importButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonIcon: {
    marginRight: 5,
  },

  // --- Filter Styles ---
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
    zIndex: 10,
  },
  filterBox: {
    width: isLargeScreen ? '23.5%' : '48%', // For a 4-column desktop layout
    marginBottom: 15,
    position: 'relative',
    height: 40,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  filterText: {
    color: '#999',
    fontSize: 14,
  },
  selectedFilterText: {
    color: '#333',
    fontWeight: '500',
  },
  filterTextInput: {
    height: '100%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#333',
  },
  dropdownOptions: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dropdownSearchInput: {
    height: 36,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontSize: 14,
    color: '#333',
    margin: 0,
  },
  dropdownScroll: {
    maxHeight: 150,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  commandEmpty: {
    padding: 10,
    alignItems: 'center',
  },
  commandEmptyText: {
    fontSize: 14,
    color: '#999',
  },

  // Search Button
  searchButton: {
    flexDirection: 'row',
    backgroundColor: '#1A73E8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
    zIndex: 1,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  // --- Table Styles ---
  tableScroll: {
    maxHeight: 600,
    zIndex: 0,minHeight:"auto"
    // Note: The horizontal scroll will handle the table content
  },
  table: {
    // 👈 WIDTH: Ensure table container is at least 100% of the parent view (card body)
    // The minWidth ensures horizontal scroll on small screens.
    minWidth: 990,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',width:"100%"
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',width:"100%"
  },
  tableHeader: {
    fontWeight: '700',
    color: '#333',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableCell: {
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  // Column widths adjusted for an improved layout on desktop minWidth
  colName: { width: '25%' },
  colRollNo: { width: '15%' },
  colStatus: { width: '15%' },
  colActions: { width: '30%' },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: 2,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionsCell: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  actionButtonEdit: {
    backgroundColor: '#E0F0FF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  actionButtonText: {
    color: '#1A73E8',
    fontSize: 13,
    fontWeight: '600',
  },
  actionButtonHistory: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  actionButtonTextHistory: {
    color: '#333',
    fontSize: 13,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  exportButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#999',
  },
  exportButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageIcon: {
    paddingHorizontal: 5,
    opacity: 0.8,
  },
  pageIndicator: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  // 👈 NEW: No data found message
  noDataContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#fcfcfc',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  }
});

export default SubjectAttendanceManagement;