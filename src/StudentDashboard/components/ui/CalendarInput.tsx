// components/ui/CalendarInput.tsx
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const generateDates = (start: moment.Moment) => {
    const dates = [];
    let date = start.clone().startOf('week');
    
   
    for (let i = 0; i < 42; i++) {
        dates.push({
            day: date.format('D'),
            isCurrentMonth: date.month() === start.month(),
            isToday: date.isSame(moment(), 'day'),
            date: date.format('YYYY-MM-DD'),
            hasEvent: (i % 7) === 0 || (i % 10) === 0, 
        });
        date.add(1, 'day');
    }
    return dates;
};

export const CalendarInput: React.FC<{ label: string }> = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const startDate = moment().startOf('month');
    const dates = generateDates(startDate);

    const WeekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <View style={calendarStyles.calendarContainer}>
            {/* Weekday Headers */}
            <View style={calendarStyles.weekdaysRow}>
                {WeekDays.map((day, index) => (
                    <Text key={index} style={calendarStyles.weekdayText}>
                        {day}
                    </Text>
                ))}
            </View>

            <View style={calendarStyles.datesGrid}>
                {dates.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            calendarStyles.dateCell,
                            !item.isCurrentMonth && calendarStyles.disabledDate,
                            item.isToday && calendarStyles.todayCell,
                            item.date === selectedDate && calendarStyles.selectedCell,
                        ]}
                        onPress={() => setSelectedDate(item.date)}
                        disabled={!item.isCurrentMonth}
                    >
                        <Text style={[
                            calendarStyles.dateText,
                            !item.isCurrentMonth && calendarStyles.disabledText,
                            item.isToday && calendarStyles.todayText,
                            item.date === selectedDate && calendarStyles.selectedText,
                        ]}>
                            {item.day}
                        </Text>
                        {item.hasEvent && <View style={calendarStyles.eventDot} />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const calendarStyles = StyleSheet.create({
    calendarContainer: {
        width: '100%', 
        paddingTop: 5,
    },
    weekdaysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    weekdayText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#6b7280',
        width: '14.28%', // 1/7th of the width for 7 days
        textAlign: 'center',
    },
    datesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Key property for grid layout!
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dateCell: {
        width: '14.28%', // 1/7th of the width
        aspectRatio: 1, // Makes it a square
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 5,
        marginVertical: 2,
    },
    dateText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    disabledDate: {
        opacity: 0.4,
    },
    disabledText: {
        color: '#999',
    },
    todayCell: {
        backgroundColor: '#e0f2fe',
        borderColor: '#3b82f6',
        borderWidth: 1,
    },
    todayText: {
        color: '#1d4ed8',
        fontWeight: '700',
    },
    selectedCell: {
        backgroundColor: '#3b82f6',
    },
    selectedText: {
        color: '#fff',
        fontWeight: '700',
    },
    eventDot: {
        position: 'absolute',
        bottom: 5,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ef4444',
    },
});