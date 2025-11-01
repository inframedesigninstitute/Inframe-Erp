// CourseContentScreen.tsx (Fixed Version - Final)

import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// --- INTERFACES & MOCK DATA ---

interface LessonModule {
    id: number;
    type: "lesson" | "header" | "assignment" | "project";
    title: string;
    duration?: string;
    status: "complete" | "pending"; // Union Type
    mainTitle?: string;
    videoTitle?: string;
    videoSubtitle?: string;
    videoUrl?: string; 
    description?: string;
}

// Mock Data remains the same
const initialModuleData: LessonModule[] = [
    {
        id: 1,
        type: "lesson",
        title: "Google Fonts, FontAwesome & CSS Transitions",
        duration: "29:35",
        status: "complete",
        mainTitle: "Google Fonts, FontAwesome & CSS Transitions",
        videoTitle: "GOOGLE FONT",
        videoSubtitle: "FONTAWESOME & CSS TRANSITIONS",
        videoUrl: "https://mock-video.com/google_fonts_lesson.mp4",
        description: "Learn how to incorporate Google Fonts and FontAwesome icons into your web projects, and master the creation of smooth, engaging UI effects using CSS Transitions.",
    },
    {
        id: 2,
        type: "lesson",
        title: "One-page Website",
        duration: "38:56",
        status: "pending",
        mainTitle: "Building a Responsive One-Page Website",
        videoTitle: "ONE PAGE",
        videoSubtitle: "RESPONSIVE WEBSITE",
        videoUrl: "https://mock-video.com/one_page_website.mp4",
        description: "A comprehensive guide on designing and implementing a stunning, responsive one-page website from scratch using modern CSS techniques.",
    },
    {
        id: 0, 
        type: "header",
        title: "Module - 04 | CSS3",
        status: "pending",
    },
    {
        id: 3,
        type: "assignment",
        title: "Assignment 15 | Create Image Hover Effect...",
        status: "pending",
        mainTitle: "Assignment: Image Hover Effects & Mega Menu",
        videoTitle: "ASSIGNMENT 15",
        videoSubtitle: "TRANSFORM & HOVER",
        videoUrl: "https://mock-video.com/assignment15_guidance.mp4",
        description: "Guidance on creating the required image hover effects, flip boxes, and mega menu using CSS Transform and Positioning.",
    },
    {
        id: 4,
        type: "lesson",
        title: "CSS3 Introduction, Compatibility, and Features",
        duration: "22:18",
        status: "pending",
        mainTitle: "CSS3: Introduction and New Features",
        videoTitle: "CSS3",
        videoSubtitle: "FEATURES & COMPATIBILITY",
        videoUrl: "https://mock-video.com/css3_intro.mp4",
        description: "An overview of CSS3's history, browser compatibility, and exciting new features like new selectors and properties.",
    },
];


type ModuleItemType = LessonModule;

interface CourseContentScreenProps {
    onBack: () => void;
}

interface ItemProps extends LessonModule {
    onSelect: (item: LessonModule) => void;
    isSelected: boolean;
}

// --- Lesson/Item Component (No changes needed here) ---
const ModuleItem: React.FC<ItemProps> = (props) => {
    const { type, title, duration, status, onSelect, isSelected } = props;

    if (type === "header") {
        return <Text style={styles.moduleHeader}>{title}</Text>;
    }

    const isComplete = status === "complete";

    const handlePress = () => {
        onSelect(props);
    };

    return (
        <TouchableOpacity
            style={[
                styles.moduleItem,
                isSelected && styles.moduleItemSelected,
                isComplete && styles.moduleItemComplete,
            ]}
            onPress={handlePress}
            disabled={false}
        >
            <View style={styles.moduleIconContainer}>
                <Feather
                    name={isComplete ? "check-circle" : "circle"}
                    size={18}
                    color={isSelected ? "#FFF" : isComplete ? "#007AFF" : "#6C757D"}
                />
            </View>
            <View style={styles.moduleTextContainer}>
                <Text style={[styles.moduleTitle, isSelected && { color: "#FFF" }]}>{title}</Text>
                {duration && <Text style={[styles.moduleDuration, isSelected && { color: "#FFF" }]}>{duration}</Text>}
            </View>
        </TouchableOpacity>
    );
};


// --- Main Course Content Screen Component ---
const CourseContentScreen: React.FC<CourseContentScreenProps> = ({ onBack }) => {
    
    const [moduleData, setModuleData] = useState<LessonModule[]>(initialModuleData);
    
    const initialLesson = moduleData.find(item => item.type !== 'header');
    
    const [selectedLesson, setSelectedLesson] = useState<LessonModule | null>(initialLesson || null);

    const handleLessonSelect = (item: LessonModule) => {
        setSelectedLesson(item);
    };

    const handleCompleteAndContinue = () => {
        if (!selectedLesson) return;

        let nextLessonId: number | null = null;
        
        // 1. Update the status of the current lesson to 'complete'
        const updatedData: LessonModule[] = moduleData.map((item, index) => {
            if (item.id === selectedLesson.id) {
                // Find the ID of the next selectable lesson/assignment/project
                for (let i = index + 1; i < moduleData.length; i++) {
                    if (moduleData[i].type !== 'header') {
                        nextLessonId = moduleData[i].id;
                        break;
                    }
                }
                
                // FIX for 2345: Explicitly set status to the literal type "complete"
                return { ...item, status: "complete" as "complete" }; 
            }
            return item;
        });

        // FIX for 2345: Ensure setModuleData receives the correctly typed array
        setModuleData(updatedData); // Line 175 is now safe

        // 2. Navigate to the next lesson or stop if finished
        if (nextLessonId !== null) {
            const nextLesson = updatedData.find(item => item.id === nextLessonId);
            if (nextLesson) {
                // FIX for 2345: The nextLesson found from updatedData is already correctly typed
                setSelectedLesson(nextLesson); // Line 181 is now safe
            }
        } else {
            console.log("Course Completed!");
        }
    };

    if (!selectedLesson || selectedLesson.type === 'header') {
        return (
            <View style={styles.container}>
                <Text style={{ padding: 30, fontSize: 18 }}>Please select an interactive lesson from the list.</Text>
            </View>
        );
    }
    
    // Derived values for clean JSX
    const mainTitle = selectedLesson.mainTitle || selectedLesson.title;
    const videoTitle = selectedLesson.videoTitle || 'CONTENT';
    const videoSubtitle = selectedLesson.videoSubtitle || 'PREVIEW';
    const description = selectedLesson.description || "No detailed description available for this module.";
    const isCompleted = selectedLesson.status === 'complete';
    const buttonText = isCompleted ? 'Continue to Next Module' : 'Complete and Continue';

    return (
        <View style={styles.container}>
            {/* --- LEFT PANEL: LESSON LIST (Sidebar) --- */}
            <View style={styles.sidebar}>
                <View style={styles.sidebarHeader}>
                    <TouchableOpacity onPress={onBack}>
                        <Feather name="arrow-left" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text style={styles.courseTitle}>Full Stack Web Development</Text>
                </View>

                <ScrollView contentContainerStyle={styles.moduleList}>
                    {moduleData.map((item, index) => (
                        <ModuleItem
                            key={item.id}
                            {...item}
                            onSelect={handleLessonSelect}
                            isSelected={item.id === selectedLesson.id}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* --- RIGHT PANEL: VIDEO PLAYER (Main Content) --- */}
            <View style={styles.mainContent}>
                <Text style={styles.mainTitle}>{mainTitle}</Text>

                <View style={styles.videoPlayer}>
                    <Image
                        source={{ uri: "https://i.ibb.co/S7R05jY/mock-video-thumb.jpg" }}
                        style={styles.videoThumbnail}
                        resizeMode="cover"
                    />
                    <View style={styles.videoOverlay}>
                        <Text style={styles.videoTitle}>{videoTitle}</Text>
                        <Text style={styles.videoSubtitle}>{videoSubtitle}</Text>
                         <Feather name="play-circle" size={60} color="#FFF" style={{marginTop: 15, opacity: 0.9}} />
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.completeButton}
                    onPress={handleCompleteAndContinue}
                    activeOpacity={0.8}
                >
                    <Text style={styles.completeButtonText}>{buttonText}</Text>
                    <Feather name="chevron-right" size={18} color="#FFF" />
                </TouchableOpacity>

                {/* Content Details */}
                <Text style={styles.sectionHeader}>Lesson Overview</Text>
                <Text style={styles.lessonDescription}>
                    {description}
                </Text>

                {/* Dynamic Video URL for DEMO/Debugging */}
                <View style={{ marginTop: 20, padding: 10, backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#DDD' }}>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: '#333' }}>Currently Loaded Video URL (Demo):</Text>
                    <Text style={{ fontSize: 13, color: '#007AFF', marginTop: 4 }}>{selectedLesson.videoUrl || 'N/A'}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: Platform.OS === "web" ? "row" : "column",
        backgroundColor: "#F3F4F6",
    },
    sidebar: {
        width: Platform.OS === "web" ? 350 : "100%",
        backgroundColor: "#FFFFFF",
        borderRightWidth: Platform.OS === "web" ? 1 : 0,
        borderBottomWidth: Platform.OS !== "web" ? 1 : 0,
        borderRightColor: "#EEE",
        borderBottomColor: "#EEE",
    },
    sidebarHeader: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 10,
        flexShrink: 1,
    },
    moduleList: {
        padding: 15,
    },
    moduleHeader: {
        fontSize: 14,
        fontWeight: "700",
        color: "#6B7280",
        textTransform: "uppercase",
        marginTop: 15,
        marginBottom: 8,
    },
    moduleItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 4,
    },
    moduleItemComplete: {
        backgroundColor: "rgba(0, 122, 255, 0.08)",
    },
    moduleItemSelected: {
        backgroundColor: "#007AFF",
    },
    moduleIconContainer: {
        paddingTop: 3,
    },
    moduleTextContainer: {
        marginLeft: 10,
        flex: 1,
    },
    moduleTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111827",
    },
    moduleDuration: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },

    mainContent: {
        flex: 1,
        padding: 30,
        overflow: "scroll",
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 20,
    },
    videoPlayer: {
        width: "100%",
        aspectRatio: 16 / 9,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#000",
        marginBottom: 20,
        position: "relative",
        ...Platform.select({
            web: {
                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
            },
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
            },
        }),
    },
    videoThumbnail: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
    },
    videoOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    videoTitle: {
        color: "#FFF",
        fontSize: 30,
        fontWeight: "900",
    },
    videoSubtitle: {
        color: "#DDD",
        fontSize: 14,
        fontWeight: "600",
    },
    completeButton: {
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor: "#007AFF",
        borderRadius: 8,
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 30,
        minWidth: 220,
        justifyContent: 'center',
    },
    completeButtonText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 15,
        marginRight: 5,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 10,
    },
    lessonDescription: {
        fontSize: 15,
        color: "#6B7280",
        lineHeight: 22,
    },
});

export default CourseContentScreen;