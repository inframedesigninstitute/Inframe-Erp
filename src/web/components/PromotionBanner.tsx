import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const LOCAL_ILLUSTRATION = require('../assets/readdatop.jpg'); 
const SIDE_PANEL_BACKGROUND = require('../assets/sidepanel_bg.jpg'); 

interface PromotionBannerProps {
  userName: string;
  courseName: string;
  completedUsers: number;
}

const PromotionBanner: React.FC<PromotionBannerProps> = ({ userName, courseName, completedUsers }) => {
  return (
    <View style={styles.container}>
      {/* Main Banner Box with 3D effect */}
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
    backgroundColor: '#f0f3f7',
  },
  bannerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0FF',
    borderRadius: 16,
    width: width * 0.45,
    padding: 15,
    // 3D / Neumorphic effect
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
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
    borderRadius: 16, 
  },
  sidePanel: {
    width: 300,
    height: 150,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    // 3D / Neumorphic effect
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  sidePanelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF', 
    textAlign: 'center',
    marginBottom: 8, 
  },
  button: {
    backgroundColor: '#1A73E8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    // 3D / Neumorphic shadow
    shadowColor: '#1565C0',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    top: 39,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default PromotionBanner;
