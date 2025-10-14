import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Local image paths (UPDATE THESE PATHS TO YOUR ACTUAL IMAGE LOCATIONS)
const LOCAL_ILLUSTRATION = require('../assets/readdatop.jpg'); 
// 1. ADD THIS NEW CONSTANT FOR THE SIDE PANEL BACKGROUND IMAGE
//    NOTE: You MUST ensure 'your_background_image.jpg' actually exists at this path.
const SIDE_PANEL_BACKGROUND = require('../assets/sidepanel_bg.jpg'); 


interface PromotionBannerProps {
  userName: string;
  courseName: string;
  completedUsers: number;
}

const PromotionBanner: React.FC<PromotionBannerProps> = ({ userName, courseName, completedUsers }) => {
  return (
    <View style={styles.container}>
      {/* Main Banner Box with 3D-like effect */}
      <View style={styles.bannerBox}>
        {/* Left Side Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={LOCAL_ILLUSTRATION}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        {/* Center Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.greetingText}>
            Hello <Text style={{ fontWeight: 'bold' }}>{userName}</Text>, Welcome Back!
          </Text>
          <Text style={styles.infoText}>
            Your course <Text style={{ fontWeight: 'bold' }}>{courseName}</Text> was completed by <Text style={{ fontWeight: 'bold' }}>{completedUsers}</Text> new users this week!
          </Text>
        </View>
      </View>

      {/* Right Side 'Create New Course' Section */}
      <ImageBackground
        // 2. USE THE NEW CONSTANT HERE
        source={SIDE_PANEL_BACKGROUND} 
        style={styles.sidePanel} 
        imageStyle={styles.backgroundImage} 
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Create New Course</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
  },
  bannerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0FF',
    borderRadius: 12,
    shadowColor: '#1A73E8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    width: width * 0.45,
    padding: 15,
  },
  illustrationContainer: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingRight: 10,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A73E8',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#4A4A4A',
    lineHeight: 18,
  },
  backgroundImage: {
    resizeMode: 'cover', 
    opacity: 0.7,
    borderRadius: 12, 
  },
  sidePanel: {
    width:300,
    height: 150,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12, 
    overflow: 'hidden', 
  },
  sidePanelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF', 
    textAlign: 'center',
    marginBottom: 8, 
    // width: width * 0.2, // This width was too small; removed or adjusted it.
  },
  button: {
    backgroundColor: '#1A73E8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#1A73E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, top:39
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default PromotionBanner;