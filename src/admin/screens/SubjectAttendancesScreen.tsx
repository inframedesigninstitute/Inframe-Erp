import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
};

interface StudentData {
  name: string;
  rollNo: string;
  status: 'Present' | 'Absent' | 'Late';
  secondaryStatus: 'Present' | 'Absent' | 'Late' | 'Leave';
}

const initialStudentData: StudentData[] = [
  { name: 'Opon Raries', rollNo: '541.00.00', status: 'Present', secondaryStatus: 'Absent' },
  { name: 'Nolige', rollNo: '401.00.00', status: 'Absent', secondaryStatus: 'Late' },
  { name: 'Doyragupens', rollNo: '571.00.00', status: 'Late', secondaryStatus: 'Absent' },
  { name: 'Dunalule', rollNo: '561.00.00', status: 'Present', secondaryStatus: 'Late' },
];

// --- Custom Combobox Dropdown Component (Unchanged) ---

interface ComboboxDropdownProps {
  label: string;
  options: string[];
  isText: boolean;
  selectedValue: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  // Z-Index Fix: Dynamic z-index is passed to ensure the open dropdown is on top
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
  dynamicZIndex // <-- NEW PROP
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);
  
  // Handle text inputs (like Emsds) separately
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

  // Combobox style dropdown
  const displayValue = selectedValue === label ? `Select ${label}...` : selectedValue;

  return (
    // FIX: Apply dynamic zIndex. If open, use the high dynamicZIndex. If closed, use zIndex 1.
    <View style={[styles.filterBox, { zIndex: isOpen ? dynamicZIndex : 1 }]}> 
      {/* Popover Trigger (The visible button) */}
      <TouchableOpacity 
        style={styles.filterButton} 
        onPress={() => { 
          onToggle(); 
          setSearchTerm(''); // Reset search when opening
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
      
      {/* Popover Content (The searchable command box) */}
      {isOpen && (
        <View style={styles.dropdownOptions}>
          {/* CommandInput */}
          <TextInput
            style={styles.dropdownSearchInput}
            placeholder={`Search ${label}...`}
            value={searchTerm}
            onChangeText={setSearchTerm}
            autoFocus={true}
          />
          {/* CommandList/CommandGroup */}
          <ScrollView style={styles.dropdownScroll} keyboardShouldPersistTaps="always">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    onSelect(option);
                    onToggle(); // Close after selection
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


// --- 🚀 NEW COMPONENT: StudentAttendanceDateRangePicker 🚀 ---

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

  // Display value for the trigger button
  const displayValue = 
    startDate || endDate 
    ? `${startDate || 'Start Date'} - ${endDate || 'End Date'}`
    : 'Select Date Range...';

  return (
    // Dynamic ZIndex for the main box
    // Note: We use styles.filterBox size logic but dateStyles for visual parts
    <View style={[styles.filterBox, dateStyles.filterBoxOverride, { zIndex: isOpen ? dynamicZIndex : 1 }]}>
      
      {/* Popover Trigger Button */}
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
          color="#333" 
        />
      </TouchableOpacity>

      {/* Popover Content (Input Fields & Calendar Icon) */}
      {isOpen && (
        <View style={dateStyles.dropdownOptions}>
          <Text style={dateStyles.dateRangeLabel}>Date Range</Text>
          
          <View style={dateStyles.dateInputRow}>
            {/* Start Date Input */}
            <TextInput
              style={dateStyles.dateInput}
              placeholder="Start Date"
              value={startDate}
              onChangeText={onStartDateChange}
              // Ideally, this focus opens a native date picker or modal calendar
            />
            
            {/* End Date Input */}
            <TextInput
              style={[dateStyles.dateInput, { marginRight: 0 }]} // Adjusted style
              placeholder="End Date"
              value={endDate}
              onChangeText={onEndDateChange}
              // Ideally, this focus opens a native date picker or modal calendar
            />
            
            {/* Calendar Icon Button */}
            <TouchableOpacity style={dateStyles.calendarIcon} onPress={() => alert('Open Calendar Picker')}>
              <Icon name="calendar-outline" size={18} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// 2. Status Badge (Same as before)
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

// --- Main Component ---

const SubjectAttendanceManagement: React.FC = () => {
  const [students, setStudents] = useState<StudentData[]>(initialStudentData);
  
  // State to manage all filter selections
  const [filters, setFilters] = useState({
    Faculty: 'Faculty', 
    Program1: 'Program',
    Session: 'Session',
    Emsds: '', 
    Program2: 'Program',
    Semester1: 'Semester',
    Semester2: 'Semester',
    Niuss: '', 
    Department: 'Department',
    Course1: 'Course',
    Llanl: '', 
    Phutty: '', 
    Course2: 'Course',
    DateRangeStart: '',
    DateRangeEnd: '',
  });

  // State to manage which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleFilterSelect = (key: keyof typeof filters, value: string) => {
    const finalValue = (value === filters[key]) ? key : value;
    setFilters(prev => ({ ...prev, [key]: finalValue }));
  };

  const handleToggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleEdit = (rollNo: string) => {
    alert(`Editing attendance for Roll No: ${rollNo}`);
  };
  
  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    alert('Search function triggered! Check console for filters.');
  };
  
  // Z-Index Fix: Calculate a high, descending zIndex for each row/column
  // We start from a high number (e.g., 20) and decrease it for each filter.
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
            dynamicZIndex={currentZIndex--} // Assign zIndex and decrement
          />
          <ComboboxDropdown 
            label="Program" options={dropdownData.Program} isText={false}
            selectedValue={filters.Program1} onSelect={(v) => handleFilterSelect('Program1', v)}
            isOpen={openDropdown === 'Program1'} onToggle={() => handleToggleDropdown('Program1')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown 
            label="Session" options={dropdownData.Session} isText={false}
            selectedValue={filters.Session} onSelect={(v) => handleFilterSelect('Session', v)}
            isOpen={openDropdown === 'Session'} onToggle={() => handleToggleDropdown('Session')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown 
            label="Emsds" options={[]} isText={true}
            selectedValue={filters.Emsds} onSelect={(v) => handleFilterSelect('Emsds', v)}
            isOpen={false} onToggle={() => {}}
            dynamicZIndex={currentZIndex--}
          />

          {/* Row 2 (4 items) */}
          <ComboboxDropdown 
            label="Program" options={dropdownData.Program} isText={false}
            selectedValue={filters.Program2} onSelect={(v) => handleFilterSelect('Program2', v)}
            isOpen={openDropdown === 'Program2'} onToggle={() => handleToggleDropdown('Program2')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown 
            label="Semester" options={['1st', '2nd', '3rd', '4th']} isText={false}
            selectedValue={filters.Semester1} onSelect={(v) => handleFilterSelect('Semester1', v)}
            isOpen={openDropdown === 'Semester1'} onToggle={() => handleToggleDropdown('Semester1')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown 
            label="Semester" options={['1st', '2nd', '3rd', '4th']} isText={false}
            selectedValue={filters.Semester2} onSelect={(v) => handleFilterSelect('Semester2', v)}
            isOpen={openDropdown === 'Semester2'} onToggle={() => handleToggleDropdown('Semester2')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown 
            label="Niuss" options={[]} isText={true}
            selectedValue={filters.Niuss} onSelect={(v) => handleFilterSelect('Niuss', v)}
            isOpen={false} onToggle={() => {}}
            dynamicZIndex={currentZIndex--}
          />

          {/* Row 3 (4 items) */}
          <ComboboxDropdown 
            label="Department" options={dropdownData.Department} isText={false}
            selectedValue={filters.Department} onSelect={(v) => handleFilterSelect('Department', v)}
            isOpen={openDropdown === 'Department'} onToggle={() => handleToggleDropdown('Department')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown 
            label="Course" options={dropdownData.Course} isText={false}
            selectedValue={filters.Course1} onSelect={(v) => handleFilterSelect('Course1', v)}
            isOpen={openDropdown === 'Course1'} onToggle={() => handleToggleDropdown('Course1')}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown 
            label="Llanl" options={[]} isText={true}
            selectedValue={filters.Llanl} onSelect={(v) => handleFilterSelect('Llanl', v)}
            isOpen={false} onToggle={() => {}}
            dynamicZIndex={currentZIndex--}
          />
          <ComboboxDropdown 
            label="Phutty" options={[]} isText={true}
            selectedValue={filters.Phutty} onSelect={(v) => handleFilterSelect('Phutty', v)}
            isOpen={false} onToggle={() => {}}
            dynamicZIndex={currentZIndex--}
          />
          
          {/* Row 4 (1 Combobox and 1 Date Range Picker) */}
          <ComboboxDropdown 
            label="Course" options={dropdownData.Course} isText={false}
            selectedValue={filters.Course2} onSelect={(v) => handleFilterSelect('Course2', v)}
            isOpen={openDropdown === 'Course2'} onToggle={() => handleToggleDropdown('Course2')}
            dynamicZIndex={currentZIndex--}
          />
          
          {/* 🚀 Date Range Picker Integration 🚀 */}
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

        {/* --- Data Table Section --- */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableScroll}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.tableHeader, styles.colName]}>Student Name</Text>
              <Text style={[styles.tableHeader, styles.colRollNo]}>Roll No.</Text>
              <Text style={[styles.tableHeader, styles.colStatus]}>Status</Text>
              <Text style={[styles.tableHeader, styles.colStatus]}>Status</Text>
              <Text style={[styles.tableHeader, styles.colActions]}>Actions</Text>
            </View>

            {/* Table Body */}
            {students.map((student, index) => (
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
                  <TouchableOpacity style={styles.actionButtonSmall}>
                    <Icon name="create-outline" size={16} color="#333" />
                  </TouchableOpacity>
                  
                  {student.name === 'Dunalule' && (
                    <TouchableOpacity style={styles.actionButtonHistory}>
                      <Icon name="time-outline" size={16} color="#333" style={{marginRight: 4}}/>
                      <Text style={styles.actionButtonTextHistory}>View History</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        {/* --- Footer and Pagination --- */}
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportButtonText}>Export Report</Text>
          </TouchableOpacity>
          
          {/* Pagination Placeholder */}
          <View style={styles.pagination}>
             <Icon name="chevron-back-outline" size={18} color="#999" style={styles.pageIcon} />
             <Text style={styles.pageIndicator}>+</Text>
             <Text style={styles.pageIndicator}>-</Text>
             <Text style={styles.pageIndicator}>=</Text>
             <Icon name="chevron-forward-outline" size={18} color="#333" style={styles.pageIcon} />
          </View>
        </View>
      </View>
    </View>
  );
};

// --- Date Range Picker Styles (New Styles) ---
const dateStyles = StyleSheet.create({
    filterBoxOverride: {
        width: isLargeScreen ? '48%' : '100%', // Adjust width as per design needs
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
        marginRight: 5, // Spacing between the two date inputs
    },
    calendarIcon: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        backgroundColor: '#f0f0f0',
        marginLeft: -1, // Overlap slightly for seamless look
    },
});

// --- Stylesheet (Cleaned up: Removed old Date Range Styles) ---
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    width: '100%', 
    padding: 20, 
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
    backgroundColor: '#4B66E9', // Primary Blue
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
    zIndex: 10, // Base Z-index for the whole grid
  },
  filterBox: {
    width: isLargeScreen ? '23.5%' : '48%', 
    marginBottom: 15,
    position: 'relative',
    height: 40,
    // zIndex is dynamically set in the component logic
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
  
  // Combobox Dropdown Specific Styles
  dropdownOptions: {
    position: 'absolute',
    top: 40, 
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    zIndex: 2, // Relative to its parent (filterBox), which now has the high zIndex
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
    backgroundColor: '#1A73E8', // Search Blue
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
    maxHeight: 300, 
    zIndex: 0, 
  },
  table: {
    minWidth: 700, 
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
  colName: { width: '30%' },
  colRollNo: { width: '15%' },
  colStatus: { width: '15%' },
  colActions: { width: '25%' },
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
  actionButtonSmall: {
    padding: 5,
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
  }
});

export default SubjectAttendanceManagement;