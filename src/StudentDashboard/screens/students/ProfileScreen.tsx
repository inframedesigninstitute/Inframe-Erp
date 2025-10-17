import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// NOTE: In a real project, you would import a library here:
// import * as ImagePicker from 'react-native-image-picker'; 

const { width } = Dimensions.get('window');

// --- CONSTANTS ---
const PRIMARY_COLOR = '#4a90e2';
const TEXT_COLOR = '#333333';
const LIGHT_GREY = '#f7f7f7';
const BORDER_COLOR = '#e0eeef';
const INFO_LABEL_COLOR = '#777777';
const INFO_VALUE_COLOR = '#333333';
const EDIT_ICON = '📸'; 
const DEFAULT_BANNER = 'https://images.pexels.com/photos/1018617/pexels-photo-1018617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
const DEFAULT_PROFILE = 'https://i.pravatar.cc/150?img=6';


// --- IMAGE SOURCES for Simulation (for cycling) ---
const bannerImages = [
    DEFAULT_BANNER, 
    'https://images.pexels.com/photos/3225526/pexels-photo-3225526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const profileImages = [
    DEFAULT_PROFILE, 
    'https://i.pravatar.cc/150?img=1', 
    'https://i.pravatar.cc/150?img=2', 
    'https://i.pravatar.cc/150?img=3', 
];

// --- INITIAL DATA STRUCTURE ---
const initialProfileData = {
    name: 'Vikram',
    fatherName: 'Mr. R. Sharma',
    rollNumber: '2023CSB101',
    branch: 'Computer Science',
    college: 'Apex Engineering College',
    postsCount: 0,
    bannerImage: bannerImages[0], 
    profileImage: profileImages[0],
};

const recentSearchData = {
    businessName: 'Apex Academy Sr. Sec. School',
    addressLine1: 'Pal Road, Jodhpur',
};


// ------------------------------------------------------------------
// --- NEW COMPONENT: Image Selection Modal ---
// ------------------------------------------------------------------

interface ImageSelectionModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSelectOption: (option: 'gallery' | 'camera' | 'remove') => void;
    imageType: 'Profile Picture' | 'Banner Image';
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({ 
    isVisible, 
    onClose, 
    onSelectOption,
    imageType
}) => {
    
    // Helper function to create the option buttons
    const OptionButton = ({ icon, text, onPress }: { icon: string, text: string, onPress: () => void }) => (
        <TouchableOpacity style={modalStyles.optionButton} onPress={onPress}>
            <Text style={modalStyles.optionIcon}>{icon}</Text>
            <Text style={modalStyles.optionText}>{text}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.modalHeader}>Edit {imageType}</Text>

                    <OptionButton 
                        icon="📂" 
                        text="Open Gallery" 
                        onPress={() => onSelectOption('gallery')}
                    />
                    <OptionButton 
                        icon="📷" 
                        text="Take Photo" 
                        onPress={() => onSelectOption('camera')}
                    />
                    <OptionButton 
                        icon="🗑️" 
                        text="Remove Photo" 
                        onPress={() => onSelectOption('remove')}
                    />

                    <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
                        <Text style={modalStyles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end', 
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TEXT_COLOR,
        marginBottom: 20,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
    },
    optionIcon: {
        fontSize: 24,
        marginRight: 15,
    },
    optionText: {
        fontSize: 18,
        color: TEXT_COLOR,
        fontWeight: '500',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: LIGHT_GREY,
        borderRadius: 10,
        padding: 12,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: TEXT_COLOR,
        fontWeight: 'bold',
        fontSize: 16,
    }
});

// ------------------------------------------------------------------
// --- Profile Screen Components (Rest of the code) ---
// ------------------------------------------------------------------

// --- Helper Component: Rating Star ---
interface RatingStarProps {
    starIndex: number;
    currentRating: number;
    onRate: (rating: number) => void;
}
const RatingStar: React.FC<RatingStarProps> = ({ starIndex, currentRating, onRate }) => (
    <TouchableOpacity 
        style={styles.ratingStarButton} 
        onPress={() => onRate(starIndex + 1)}
    >
        <Text style={[
            styles.ratingStarText, 
            { color: starIndex < currentRating ? PRIMARY_COLOR : '#D0D0D0' }
        ]}>
            {starIndex < currentRating ? '★' : '☆'}
        </Text>
    </TouchableOpacity>
);

// --- Component: Profile Card ---
interface ProfileCardProps {
    data: typeof initialProfileData;
    onEdit: () => void;
    onBannerPress: () => void; 
    onProfilePress: () => void;
}
const ProfileCard: React.FC<ProfileCardProps> = ({ data, onEdit, onBannerPress, onProfilePress }) => (
    <View style={styles.newCard}>
        {/* Banner Image as TouchableOpacity */}
        <TouchableOpacity style={styles.bannerContainer} onPress={onBannerPress}>
            <Image source={{ uri: data.bannerImage }} style={styles.bannerImage} />
            {/* Edit Icon Overlay for Banner */}
            <View style={styles.bannerEditOverlay}>
                <Text style={styles.editIconText}>{EDIT_ICON}</Text>
            </View>
        </TouchableOpacity>

        <View style={styles.profileContent}>
            {/* Profile Image (Avatar) as TouchableOpacity */}
            <TouchableOpacity style={styles.profileImageContainer} onPress={onProfilePress}>
                <Image 
                    source={{ uri: data.profileImage }} 
                    style={styles.newProfileImage} 
                />
                {/* Edit Icon Overlay for Profile Image */}
                <View style={styles.profileEditOverlay}>
                    <Text style={styles.editIconTextSmall}>{EDIT_ICON}</Text>
                </View>
            </TouchableOpacity>
            
            <View style={styles.profileInfo}>
                <Text style={styles.newName}>{data.name}</Text>
                <Text style={styles.newPostsCount}>{data.postsCount} posts</Text>
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity style={styles.newEditButton} onPress={onEdit}>
                <Text style={styles.newEditButtonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// --- Component: Profile Details Card ---
interface ProfileDetailsCardProps {
    data: typeof initialProfileData;
}
const ProfileDetailsCard: React.FC<ProfileDetailsCardProps> = ({ data }) => (
    <View style={[styles.newCard, { marginTop: 0, padding: 20 }]}>
        <Text style={styles.detailsHeader}>My Student Profile</Text>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Father's Name:</Text>
            <Text style={styles.infoValue}>{data.fatherName}</Text>
        </View>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Roll Number:</Text>
            <Text style={styles.infoValue}>{data.rollNumber}</Text>
        </View>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Branch:</Text>
            <Text style={styles.infoValue}>{data.branch}</Text>
        </View>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>College:</Text>
            <Text style={styles.infoValue}>{data.college}</Text>
        </View>
    </View>
);


// --- Component: Recent Search Card ---
const RecentSearchCard = () => {
    const [rating, setRating] = useState(0);

    const handleRating = (newRating: number) => {
        setRating(newRating);
        console.log(`Rated ${recentSearchData.businessName} ${newRating} stars.`);
    };

    return (
        <View style={styles.newCard}>
            <Text style={styles.recentSearchHeader}>Recent Search</Text>
            
            <View style={styles.searchItemContainer}>
                <Text style={styles.businessName}>{recentSearchData.businessName}</Text>
                <Text style={styles.businessAddress}>{recentSearchData.addressLine1}</Text>
            </View>

            <Text style={styles.rateBusinessText}>Rate this Business</Text>
            
            <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, index) => (
                    <RatingStar 
                        key={index} 
                        starIndex={index}
                        currentRating={rating}
                        onRate={handleRating}
                    />
                ))}
            </View>
        </View>
    );
};

// --- Main Profile Screen Component ---
export default function StudentProfileScreen() {
    const [profile, setProfile] = useState(initialProfileData);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [imageToEdit, setImageToEdit] = useState<'banner' | 'profile' | null>(null);
    const [tempProfile, setTempProfile] = useState(profile);

    const handleSaveProfile = () => {
        setProfile(tempProfile);
        setIsEditModalVisible(false);
        Alert.alert('Success', 'Profile details updated successfully!');
    };

    const handleCancelEdit = () => {
        setTempProfile(profile); 
        setIsEditModalVisible(false);
    };

    // --- Image Selection Handlers ---

    const openImageModal = (type: 'banner' | 'profile') => {
        setImageToEdit(type);
        setIsImageModalVisible(true);
    };

    const handleImageOptionSelect = (option: 'gallery' | 'camera' | 'remove') => {
        setIsImageModalVisible(false);
        if (!imageToEdit) return;

        // *** REAL-WORLD FILE SELECTION LOGIC STARTS HERE ***
        // In a real app, you would call ImagePicker.launchImageLibrary(), launchCamera(), etc.
        
        // This is the SIMULATION LOGIC:
        if (option === 'remove') {
            const defaultUri = imageToEdit === 'banner' ? DEFAULT_BANNER : DEFAULT_PROFILE;
            setProfile(prevProfile => ({
                ...prevProfile,
                [imageToEdit === 'banner' ? 'bannerImage' : 'profileImage']: defaultUri
            }));
            Alert.alert('Photo Removed', `${imageToEdit === 'banner' ? 'Banner' : 'Profile Picture'} has been reset.`);
            return;
        }

        // SIMULATION: Cycle to the next image to show a change
        const currentImages = imageToEdit === 'banner' ? bannerImages : profileImages;
        const currentImageUri = imageToEdit === 'banner' ? profile.bannerImage : profile.profileImage;
        
        let currentIndex = currentImages.indexOf(currentImageUri);
        // Find the next image, skipping index 0 (the default) if possible
        let nextIndex = (currentIndex + 1) % currentImages.length;
        if (nextIndex === 0) {
            nextIndex = 1; // Always skip the default image when cycling, start from the first "change"
        }
        
        const newUri = currentImages[nextIndex];

        setProfile(prevProfile => ({
            ...prevProfile,
            [imageToEdit === 'banner' ? 'bannerImage' : 'profileImage']: newUri
        }));

        Alert.alert(
            `Change Successful (${option.charAt(0).toUpperCase() + option.slice(1)})`, 
            `Your ${imageToEdit === 'banner' ? 'Banner' : 'Profile Picture'} has been updated from the simulated gallery/camera! URI: ${newUri.substring(0, 30)}...`
        );
    };


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* --- 1. Profile Card --- */}
                <ProfileCard 
                    data={profile} 
                    onEdit={() => setIsEditModalVisible(true)}
                    onBannerPress={() => openImageModal('banner')} // New modal trigger
                    onProfilePress={() => openImageModal('profile')} // New modal trigger
                />

                {/* --- 2. Profile Details Card --- */}
                <ProfileDetailsCard data={profile} />

                <View style={{ height: 20 }} />

                {/* --- 3. Recent Search Card --- */}
                <RecentSearchCard />
                
                <View style={{ height: 40 }} />

            </ScrollView>

            {/* --- Image Selection Modal --- */}
            <ImageSelectionModal
                isVisible={isImageModalVisible}
                onClose={() => setIsImageModalVisible(false)}
                onSelectOption={handleImageOptionSelect}
                imageType={imageToEdit === 'banner' ? 'Banner Image' : 'Profile Picture'}
            />

            {/* --- Edit Profile Modal (for Name/Details) --- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isEditModalVisible}
                onRequestClose={handleCancelEdit}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalHeader}>Edit Profile Details</Text>
                        
                        <ScrollView style={{ maxHeight: Dimensions.get('window').height * 0.5, width: '100%' }}>
                            {/* Input Fields for Student Details */}
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={tempProfile.name}
                                onChangeText={text => setTempProfile({...tempProfile, name: text})}
                            />
                             <Text style={styles.label}>Father's Name</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={tempProfile.fatherName}
                                onChangeText={text => setTempProfile({...tempProfile, fatherName: text})}
                            />
                            <Text style={styles.label}>Roll Number</Text>
                            <TextInput
                                style={[styles.modalInput, { backgroundColor: '#EAEAEA' }]}
                                value={tempProfile.rollNumber}
                                editable={false}
                            />
                            <Text style={styles.label}>Branch</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={tempProfile.branch}
                                onChangeText={text => setTempProfile({...tempProfile, branch: text})}
                            />
                             <Text style={styles.label}>College</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={tempProfile.college}
                                onChangeText={text => setTempProfile({...tempProfile, college: text})}
                            />
                        </ScrollView>

                        {/* Save / Cancel Buttons */}
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={[styles.modalButton, styles.buttonCancel]} onPress={handleCancelEdit}>
                                <Text style={[styles.textStyle, { color: TEXT_COLOR }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.buttonSave]} onPress={handleSaveProfile}>
                                <Text style={styles.textStyle}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// --- Stylesheet (General styles, modal styles are separate above) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT_GREY,
    },
    // --- Card Styles ---
    newCard: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    // --- Banner Styles ---
    bannerContainer: {
        width: '100%',
        height: 150,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bannerEditOverlay: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        padding: 5,
    },
    editIconText: {
        color: 'white',
        fontSize: 18,
    },
    // --- Profile Content ---
    profileContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        transform: [{ translateY: -50 }], 
        marginBottom: -50,
    },
    profileImageContainer: {
        // Container for image and edit icon
        position: 'relative',
        width: 100,
        height: 100,
        marginRight: 15,
    },
    newProfileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    profileEditOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 15,
        padding: 4,
        borderWidth: 2,
        borderColor: 'white',
    },
    editIconTextSmall: {
        color: 'white',
        fontSize: 14,
    },
    profileInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    newName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },
    newPostsCount: {
        fontSize: 14,
        color: '#777777',
        marginTop: 2,
    },
    newEditButton: {
        alignSelf: 'center',
        position: 'absolute',
        right: 20,
        top: 60, 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#D0D0D0',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    newEditButtonText: {
        color: TEXT_COLOR,
        fontWeight: '500',
        fontSize: 16,
    },
    // --- Profile Details Card Styles ---
    detailsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR,
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
    },
    infoLabel: {
        fontSize: 15,
        color: INFO_LABEL_COLOR,
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 15,
        color: INFO_VALUE_COLOR,
        fontWeight: '600',
        maxWidth: '60%',
        textAlign: 'right',
    },
    // --- Recent Search Card Styles (Rating Update) ---
    recentSearchHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR,
        padding: 20,
        paddingBottom: 5,
    },
    searchItemContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    businessName: {
        fontSize: 16,
        fontWeight: '500',
        color: TEXT_COLOR,
    },
    businessAddress: {
        fontSize: 14,
        color: '#999999',
        marginTop: 2,
    },
    rateBusinessText: {
        fontSize: 14,
        fontWeight: '500',
        color: TEXT_COLOR,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 20,
    },
    ratingStarButton: {
        padding: 5,
        marginRight: 5,
    },
    ratingStarText: {
        fontSize: 28,
    },
    // --- Edit Profile Modal Styles (for Name/Details) ---
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxWidth: 500,
    },
    modalHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: TEXT_COLOR,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: '#777777',
        marginBottom: 5,
        marginTop: 10,
    },
    modalInput: {
        width: '100%',
        height: 45,
        backgroundColor: LIGHT_GREY,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 16,
        color: TEXT_COLOR,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonSave: {
        backgroundColor: PRIMARY_COLOR,
    },
    buttonCancel: {
        backgroundColor: '#F4F4F4',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});