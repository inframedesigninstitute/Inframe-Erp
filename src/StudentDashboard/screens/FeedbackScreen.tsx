import React from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import FeedbackRelatedComponent from '../components/FeedbackRelatedComponent'; // Left/Main Content
import FeedbackSidebar from '../components/FeedbackSidebar'; // Right/Correction Panel

// Get the screen width to define a minimum threshold for the two-column layout
const { width } = Dimensions.get('window');
const TABLET_MIN_WIDTH = 768;

// --- DUMMY DATA FOR SIDEBAR (Kept the same) ---
const dummyGradeItems = [
    { id: 1, label: 'Points 1', points: 90 },
    { id: 2, label: 'Points 2', points: 85 },
    { id: 3, label: 'Points 3', points: 93 },
    { id: 4, label: 'Points 4', points: 90 },
    { id: 5, label: 'Points 5', points: 85 },
    { id: 6, label: 'Points 6', points: 93 },
    { id: 7, label: 'Points 7', points: 90 },
    { id: 8, label: 'Points 8', points: 85 },
    { id: 9, label: 'Points 9', points: 93 },
];

const dummyNotes =
    'Your design displays creativity in visual hierarchy. Remember, user-centered design and harmonizing functionality with aesthetics are key. Try diverse design iterations for improvements. Well done! To test scrolling, this note needs to be very long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// --- MAIN SCREEN COMPONENT ---
const FeedbackScreen: React.FC = () => {
    // Determine if the screen is wide enough for the two-column layout
    const isTabletOrDesktop = width >= TABLET_MIN_WIDTH;
    
    // Conditionally apply the two-column layout if the screen is wide
    const containerStyle = isTabletOrDesktop 
        ? screenStyles.twoColumnContainer 
        : screenStyles.singleColumnContainer;

    return (
        <SafeAreaView style={screenStyles.safeArea}>
            {/* 1. MAIN SCROLLVIEW: Scrolls the entire content (for header and mobile stacking) */}
            <ScrollView contentContainerStyle={screenStyles.scrollViewContent}>
                
                {/* Main Title Header - Full Width */}
                <View style={screenStyles.headerContainer}>
                    <Text style={screenStyles.mainTitle}>Feedback and grievance submission</Text>
                </View>

                {/* Content Area - Two Columns (or Stacked on Mobile) */}
                <View style={[containerStyle, isTabletOrDesktop && screenStyles.desktopContentArea]}>
                    
                    {/* LEFT COLUMN: Main Form Content (Wider) */}
                    <View style={isTabletOrDesktop ? screenStyles.mainContentWrapper : { flex: 1 }}>
                        {/* 💡 FIX: Added ScrollView for independent main content scrolling */}
                        <ScrollView
                            style={isTabletOrDesktop ? [screenStyles.mainContentScrollView, screenStyles.hideWebScrollbar] : undefined}
                            contentContainerStyle={screenStyles.mainContentScrollContent}
                            // Hides indicator on mobile/desktop apps
                            showsVerticalScrollIndicator={false} 
                        >
                            <FeedbackRelatedComponent />
                        </ScrollView>
                    </View>
                    
                    {/* RIGHT COLUMN: Correction Sidebar (Narrower) */}
                    <View style={isTabletOrDesktop ? screenStyles.sidebarWrapper : { flex: 1 }}>
                        {/* 💡 FIX: Added ScrollView for independent sidebar scrolling + scrollbar hiding */}
                        <ScrollView 
                            style={isTabletOrDesktop ? [screenStyles.sidebarScrollView, screenStyles.hideWebScrollbar] : undefined} 
                            contentContainerStyle={screenStyles.sidebarScrollContent}
                            // Hides indicator on mobile/desktop apps
                            showsVerticalScrollIndicator={false} 
                        >
                            <FeedbackSidebar 
                                initialGradeItems={dummyGradeItems}
                                initialNotes={dummyNotes} 
                                maxCharacters={500}
                            />
                        </ScrollView>
                    </View>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

// --- STYLES ---
const screenStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F7FAFC', 
    },
    scrollViewContent: {
        // Keeps it flexible
    },
    headerContainer: {
        padding: 20,
        paddingBottom: 0, 
        backgroundColor: '#F7FAFC',
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#2D3748',
        marginBottom: 10,
    },
    
    // ** SCROLLBAR HIDING STYLE (Applied to both Main and Sidebar ScrollViews) **
    hideWebScrollbar: Platform.select({
        web: {
            // Standard CSS to hide scrollbar while keeping scroll functionality
            overflow: 'scroll' as any, // Ensure scroll is enabled
            scrollbarWidth: 'none' as any, // Firefox
            '::-webkit-scrollbar': { // Chrome, Safari, Edge
                display: 'none',
            }
        },
        default: {},
    }),

    // ** TWO-COLUMN LAYOUT **
    twoColumnContainer: {
        flexDirection: 'row', 
        padding: 10,
        paddingTop: 0,
    },
    desktopContentArea: {
        alignItems: 'flex-start', 
    },

    // --- MAIN CONTENT WRAPPER ---
    mainContentWrapper: {
        flex: 2, 
        maxWidth: '66%', 
        minWidth: 400, 
        marginRight: 5, 
    },
    mainContentScrollView: {
        // Set MaxHeight to enable scroll relative to the screen size
        maxHeight: Dimensions.get('window').height * 0.8, 
        borderRadius: 8,
    },
    mainContentScrollContent: {
        padding: 10,
        paddingTop: 0,
    },

    // --- SIDEBAR WRAPPER ---
    sidebarWrapper: {
        flex: 1, 
        maxWidth: '33%', 
        marginLeft: 5, 
    },
    sidebarScrollView: {
        // Set MaxHeight to enable scroll relative to the screen size
        maxHeight: Dimensions.get('window').height * 0.8, 
        borderRadius: 8,
        backgroundColor: '#FFFFFF', 
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    sidebarScrollContent: {
        padding: 10,
    },

    // ** Mobile Fallback **
    singleColumnContainer: {
        flexDirection: 'column', 
        padding: 5,
    },
});

export default FeedbackScreen;