// src/web/components/EventsSection.tsx

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CalendarInput } from '../components/ui/CalendarInput';
import { EventProps, UpcomingEventsProps } from '../types';

// --- UpcomingEvent Component ---
const UpcomingEvent: React.FC<EventProps> = ({ id, date, title, time }) => (
    <View style={eventStyles.eventContainer}>
        <View style={eventStyles.dateBox}>
            <Text style={eventStyles.dateText}>{date}</Text>
        </View>
        <View style={eventStyles.infoBox}>
            <Text style={eventStyles.eventTitle}>{title}</Text>
            <Text style={eventStyles.eventTime}>{time}</Text>
        </View>
    </View>
);

const eventStyles = StyleSheet.create({
    eventContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dateBox: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 15,
        backgroundColor: '#dbeafe',
        borderRadius: 6,
        alignItems: 'center',
        minWidth: 50,
    },
    dateText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1e3a8a',
    },
    infoBox: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    eventTime: {
        fontSize: 12,
        color: '#777',
        marginTop: 2,
    }
});

// --- UpcomingEventsSection ---
export const UpcomingEventsSection: React.FC<UpcomingEventsProps> = ({ upcomingEvents }) => (
    <View style={[styles.card, styles.upcomingEventsCard]}>
        <View style={styles.cardHeaderSmall}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
        </View>
        <View style={styles.eventsList}>
            {upcomingEvents.map((event) => (
                <UpcomingEvent 
                    key={event.id}
                    id={event.id}       // ✅ pass id
                    date={event.date} 
                    title={event.title} 
                    time={event.time} 
                />
            ))}
        </View>
    </View>
);

// --- RightColumnSection ---
export const RightColumnSection: React.FC<UpcomingEventsProps> = ({ upcomingEvents }) => (
    <View style={styles.rightColumn}>
        <ScrollView 
            style={styles.rightColumnScrollView} 
            showsVerticalScrollIndicator={true}
        >
            {/* Calendar Card */}
            <View style={styles.calendarCard}>
                <View style={styles.cardHeaderSmall}>
                    <View style={styles.calendarNav}>
                       <MaterialCommunityIcons name="chevron-left" size={22} color="#555" />
                       <Text style={styles.calendarMonth}>January 2024</Text>
                       <MaterialCommunityIcons name="chevron-right" size={22} color="#555" />
                    </View>
                </View>
                <CalendarInput label="" /> 
            </View>
            
            <UpcomingEventsSection upcomingEvents={upcomingEvents} />
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    rightColumn: {
        flex: 1, 
        minWidth: 230, 
        paddingLeft: 2,
        top: 25,
        maxHeight: 1200, 
    },
    rightColumnScrollView: {
        flexGrow: 1, 
        paddingRight: 10, 
    },
    calendarCard: {
        padding: 15, 
        backgroundColor: "#fff",
        borderRadius: 12, 
        marginBottom: 30, 
        elevation: 5, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15, 
        shadowRadius: 8,
    },
    calendarNav: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    calendarMonth: {
        fontSize: 16, 
        fontWeight: '600',
        marginHorizontal: 15,
        color: '#333',
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12, 
        marginBottom: 30, 
        padding: 20, 
        elevation: 5, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15, 
        shadowRadius: 8,
        width:"100%"
    },
    cardHeaderSmall: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18, 
        fontWeight: "700",
        color: "#1f2937",
    },
    upcomingEventsCard: {
        padding: 20, 
        marginBottom: 0, 
    },
    eventsList: {
        marginTop: 5,
    }
});
