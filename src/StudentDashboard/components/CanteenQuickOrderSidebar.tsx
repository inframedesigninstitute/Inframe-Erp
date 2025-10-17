import React, { useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- Image Source ---
const HIGH_CLASS_IMAGE_URI = 'https://www.burgersinghonline.com/wp-content/uploads/2025/05/Website_Menu_VEG-ONLY.jpg'; 

// --- 1. Data and Interfaces ---

interface Category {
    name: string;
    options: string;
    icon: string; 
}

const categories: Category[] = [
    { name: 'Popular', options: '548+ options', icon: 'star' },
    { name: 'High Class', options: '50+ options', icon: 'wine' }, // Target for IMAGE MODAL
    { name: 'Dine In', options: '548+ options', icon: 'restaurant' },
    // ... (other categories)
];


interface ImageModalProps {
    visible: boolean;
    onClose: () => void;
    imageUri: string; // Prop for the image source
}

const ImageModal: React.FC<ImageModalProps> = ({ visible, onClose, imageUri }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible} 
            onRequestClose={onClose} 
        >
            <View style={styles.imageModalContainer}>
                <View style={styles.imageModalContent}>
                    
                    {/* Close Button */}
                    <TouchableOpacity 
                        style={styles.imageModalCloseButton}
                        onPress={onClose}
                    >
                        <Ionicons name="close-circle" size={30} color="#fff" />
                    </TouchableOpacity>

                    {/* Image Display */}
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.modalImage}
                        resizeMode="contain" 
                    />
                </View>
            </View>
        </Modal>
    );
};

// --- 3. Sidebar Item Component (Updated Prop) ---

interface CategoryItemProps {
    item: Category;
    onItemPress: (categoryName: string) => void;
    isActive: boolean; // 🎯 Added isActive prop
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, onItemPress, isActive }) => (
    <TouchableOpacity 
        style={[
            styles.itemContainer, 
            // 🎯 Use the passed isActive prop to apply active styles
            isActive && styles.activeItem, 
        ]}
        onPress={() => onItemPress(item.name)} 
    >
        <View style={styles.iconWrapper}>
            <Ionicons 
                name={item.icon}
                size={22}
                // 🎯 Change icon color based on isActive
                color={isActive ? '#000000ff' : '#45466dff'}
            />
        </View>
        
        <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemOptions}>{item.options}</Text>
        </View>
        <Text style={styles.arrowIcon}>&gt;</Text>
    </TouchableOpacity>
);

// --- 4. Main Wrapper Component (State Logic Added) ---

const QuickOrderMenuWrapper: React.FC = () => {
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    // 🎯 New state to track the currently active category (default to 'Popular')
    const [activeCategory, setActiveCategory] = useState('Popular'); 

    const openImageModal = () => setIsImageModalVisible(true);
    const closeImageModal = () => setIsImageModalVisible(false);

    const handleCategoryPress = (categoryName: string) => {
        if (categoryName === 'High Class') {
            // 1. If 'High Class', open the modal
            openImageModal();
            // 2. We still set it as active to show the highlight, but keep the modal logic separate
            setActiveCategory(categoryName);
        } else {
            // If any other category, just set it as active
            setActiveCategory(categoryName);
            console.log(`Filtering sidebar content by: ${categoryName}`);
        }
    };

    return (
        <View style={styles.wrapperContainer}>
            <View style={styles.sidebar}>
                <View style={styles.header}>
                    <Text style={styles.title}>Categories</Text>
                    <TouchableOpacity><Text style={styles.seeMore}>See More</Text></TouchableOpacity>
                </View>
                {categories.map((cat, index) => (
                    <CategoryItem 
                        key={index} 
                        item={cat} 
                        onItemPress={handleCategoryPress} 
                        // 🎯 Check if the current item's name matches the activeCategory state
                        isActive={cat.name === activeCategory} 
                    />
                ))}
            </View>

            {/* Render the Image Modal */}
            <ImageModal 
                visible={isImageModalVisible} 
                onClose={closeImageModal} 
                imageUri={HIGH_CLASS_IMAGE_URI}
            />
        </View>
    );
};

// --- 5. Styles ---

const styles = StyleSheet.create({
    // Wrapper Styles
    wrapperContainer: { flex: 1, padding: 10, },
    sidebar: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    // 🎯 IMAGE MODAL STYLES
    imageModalContainer: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.9)', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    imageModalContent: {
        width: '90%',
        height: '80%',
        backgroundColor: '#000',
        borderRadius: 10,
        position: 'relative',
    },
    modalImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    imageModalCloseButton: { 
        position: 'absolute', 
        top: 10, 
        right: 10, 
        zIndex: 10, 
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        padding: 5,
    },
    // ---

    // Sidebar Styles
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15, paddingHorizontal: 5, },
    title: { fontSize: 18, fontWeight: 'bold', color: '#333', },
    seeMore: { fontSize: 14, color: '#e74c3c', },
    itemContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10, marginBottom: 8, backgroundColor: '#fff', },
    
    // 🎯 This style determines the active/highlighted look
    activeItem: { 
        backgroundColor: '#ffefeb', 
        shadowColor: '#e74c3c', 
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 4, 
        elevation: 2, 
        borderWidth: 1, 
        borderColor: '#e74c3c', 
    },
    
    iconWrapper: { width: 35, height: 35, borderRadius: 8, marginRight: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c6c6c9ff', },
    textContainer: { flex: 1, },
    itemName: { fontSize: 15, fontWeight: '600', color: '#2b1a4bff', },
    itemOptions: { fontSize: 12, color: '#999', },
    arrowIcon: { fontSize: 18, color: '#ccc', },
});

export default QuickOrderMenuWrapper;