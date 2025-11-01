// ExploreCoursesScreen.tsx (The main file you provided, with updates)

import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // npm install react-native-linear-gradient
import React, { useState } from "react"; // Added useState
import {
    Image,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

// --- NEW IMPORT ---
import CourseContentScreen from "../components/CourseContentScreen"; // Assuming you save the new file as CourseContentScreen.tsx

interface Course {
    id: number;
    title: string;
    subtitle: string;
    author: string;
    nextLesson: string;
    progress: string;
    tag: string;
    image: string;
    gradient: { start: string; end: string };
}

const coursesData: Course[] = [
    {
        id: 1,
        title: "Full Stack Web Development Course",
        subtitle: "Self-Paced Sessions | Resource Hub",
        author: "By WsCube Tech Pvt Ltd",
        nextLesson: "07 May 2025",
        progress: "3%",
        tag: "WSB-142",
        image: "https://i.ibb.co/L5T9WvB/author1.png",
        gradient: { start: "#7F00FF", end: "#E100FF" },
    },
    {
        id: 2,
        title: "React + Node.js Developer Track",
        subtitle: "Web Development Resource Hub",
        author: "By WsCube Tech Pvt Ltd",
        nextLesson: "07 May 2025",
        progress: "12%",
        tag: "Resource Hub",
        image: "https://i.ibb.co/L5T9WvB/author2.png",
        gradient: { start: "#007AFF", end: "#00D4FF" },
    },
];

const categories = [
    "Digital Marketing",
    "Data Development",
    "Data Science",
    "Mobile App Development",
];

// --- Sidebar Component ---
// (SideBar component remains unchanged)
const SideBar: React.FC = () => (
    <View style={styles.sidebar}>
        <Text style={styles.sidebarLogo}>Resouries</Text>
        <View style={styles.sidebarSection}>
            <Text style={styles.sidebarHeader}>Categories</Text>
            {categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.sidebarItem}>
                    <Feather
                        name={
                            category.toLowerCase().includes("mobile") ? "smartphone" : "book"
                        }
                        size={18}
                        color="#6C757D"
                        style={styles.sidebarIcon}
                    />
                    <Text style={styles.sidebarText}>{category}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

// --- Course Card with 3D Gradient ---
interface CourseCardProps extends Course { // Extend the Course interface
    onViewContent: (courseId: number) => void; // New prop for click handler
}

const CourseCard: React.FC<CourseCardProps> = ({
    id, // Added id
    title,
    subtitle,
    author,
    nextLesson,
    progress,
    tag,
    image,
    gradient,
    onViewContent, // Destructured the new prop
}) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.cardWrapper,
                pressed && { transform: [{ scale: 0.97 }] },
            ]}
        >
            {/* 3D Gradient Background */}
            <LinearGradient
                colors={[gradient.start, gradient.end]}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.cardTop}>
                    <Text style={styles.cardTag}>{tag}</Text>
                    <Text style={styles.cardTitleTop}>{title}</Text>
                    <Text style={styles.cardSubtitleTop}>{subtitle}</Text>
                    <Image source={{ uri: image }} style={styles.cardImage} />
                </View>
            </LinearGradient>

            {/* 3D Shadow Layer */}
            <View style={styles.cardShadowLayer} />

            {/* Bottom Content */}
            <View style={styles.cardBottom}>
                <Text style={styles.cardDescription}>{subtitle}</Text>
                <Text style={styles.cardAuthor}>{author}</Text>
                <Text style={styles.cardNextLesson}>
                    Next lesson:{" "}
                    <Text style={{ fontWeight: "700", color: "#007AFF" }}>
                        {nextLesson} ({progress})
                    </Text>
                </Text>
                {/* --- UPDATED TouchableOpacity to handle navigation --- */}
                <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => onViewContent(id)} // Call the new handler
                >
                    <Text style={styles.cardButtonText}>View Content</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};

// --- Main Screen ---
const ExploreCoursesScreen: React.FC = () => {
    // --- NEW STATE FOR NAVIGATION ---
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    const handleViewContent = (courseId: number) => {
        // Simple navigation: set the course ID to show the content screen
        setSelectedCourseId(courseId);
    };

    const handleBackToExplore = () => {
        // Navigate back: clear the selected course ID
        setSelectedCourseId(null);
    };
    // ---------------------------------

    // --- RENDER LOGIC ---
    if (selectedCourseId !== null) {
        // Display the Course Content Screen if a course is selected
        return (
            <CourseContentScreen
                onBack={handleBackToExplore}
                // You would typically pass the course details here
            />
        );
    }

    // Display the Explore Courses Screen
    return (
        <View style={styles.container}>
            {Platform.OS === "web" && <SideBar />}

            <View style={styles.mainContent}>
                <Text style={styles.screenTitle}>Explore Courses</Text>

                <View style={styles.filtersContainer}>
                    <View style={styles.searchBox}>
                        <Feather name="search" size={16} color="#A0A0A0" />
                        <TextInput
                            placeholder="Search product names"
                            style={styles.searchInput}
                        />
                    </View>
                </View>

                <ScrollView style={styles.cardsScroll}>
                    <View style={styles.cardsGrid}>
                        {coursesData.map((course) => (
                            <CourseCard
                                key={course.id}
                                {...course}
                                onViewContent={handleViewContent} // Pass the handler
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

// --- Styles ---
// (Styles remain the same as your original code, no need to repeat them here,
// assuming they are still defined correctly at the bottom of the original file)
const styles = StyleSheet.create({
    // ... all your original styles go here ...
    container: {
        flex: 1,
        flexDirection: Platform.OS === "web" ? "row" : "column",
        backgroundColor: "#F3F4F6",
    },
    sidebar: {
        width: 260,
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRightWidth: 1,
        borderRightColor: "#EEE",
    },
    sidebarLogo: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 30,
    },
    sidebarSection: { marginBottom: 30 },
    sidebarHeader: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
    sidebarItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    sidebarIcon: { width: 24, textAlign: "center" },
    sidebarText: { marginLeft: 10, color: "#555" },

    mainContent: { flex: 1, padding: 30 },
    screenTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 20,
    },
    filtersContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        width: 300,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        marginLeft: 6,
    },

    cardsScroll: { flex: 1 },
    cardsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 25,
    },

    // Card styles
    cardWrapper: {
        width: 330,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        position: "relative",
    },
    cardGradient: {
        height: 160,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        justifyContent: "flex-end",
        padding: 15,
    },
    cardTop: {
        position: "relative",
    },
    cardTag: {
        backgroundColor: "rgba(255,255,255,0.25)",
        color: "#FFF",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5,
        fontWeight: "600",
        fontSize: 12,
        marginBottom: 4,
    },
    cardTitleTop: {
        color: "#FFF",
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 4,
    },
    cardSubtitleTop: {
        color: "#EDEDED",
        fontSize: 13,
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#FFF",
        position: "absolute",
        bottom: -30,
        right: 15,
    },
    cardShadowLayer: {
        position: "absolute",
        top: 8,
        left: 8,
        right: 8,
        bottom: 8,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.05)",
        shadowColor: "#FFF",
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    cardBottom: {
        backgroundColor: "#FFF",
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        padding: 15,
        marginTop: 30,
    },
    cardDescription: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },
    cardAuthor: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 8,
    },
    cardNextLesson: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 12,
    },
    cardButton: {
        backgroundColor: "#007AFF",
        borderRadius: 8,
        alignItems: "center",
        paddingVertical: 10,
    },
    cardButtonText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 15,
    },
});

export default ExploreCoursesScreen;