// File: StudentAttendanceDateRangePicker.tsx

import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

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
    <View style={[dateStyles.filterBox, { zIndex: isOpen ? dynamicZIndex : 1 }]}>
      
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
            <TouchableOpacity style={dateStyles.calendarIcon}>
              <Icon name="calendar-outline" size={18} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// --- Stylesheet for Date Range Picker ---
const dateStyles = StyleSheet.create({
    filterBox: {
        width: isLargeScreen ? '74%' : '100%', 
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

export default StudentAttendanceDateRangePicker; // Exporting as default