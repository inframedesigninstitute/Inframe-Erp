// components/CanteenHeader.tsx (Updated & Fixed)

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ✅ Reliable image URLs
const RecipeBannerImage = { uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' };

// 🟢 Replaced the broken Googleusercontent link with a working burger image
const AdBannerImage = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkgmQkc2nkWZf5D1YsEnYOeM5UtT1tsq5UfEw0kUz6aYLK3WrKAIES3Rz1EbYuLN34ldI&usqp=CAU' };

const CanteenHeader: React.FC = () => {

  // Error logging for debugging
  const handleError = (error: any, imageName: string) => {
    console.error(`🔴 Failed to load image: ${imageName}`, error?.nativeEvent?.error);
  };

  return (
    <View style={styles.headerContainer}>
      
      {/* Left: Recipe Banner */}
      <View style={styles.recipeBanner}>
        <Image 
          source={RecipeBannerImage} 
          style={styles.kitchenImage} 
          resizeMode="cover" 
          onError={(e) => handleError(e, 'RecipeBannerImage')}
        />
        
        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>All Best Recipes</Text>
          <Text style={styles.recipeTitleBold}>In One Place</Text>
          <Text style={styles.recipeSubtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat...
          </Text>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Right: Single Ad Image */}
      <View style={styles.adBanner}>
        <Image 
          source={AdBannerImage} 
          style={styles.foodImage} 
          resizeMode="cover" 
          onError={(e) => handleError(e, 'AdBannerImage')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  // --- Left Banner ---
  recipeBanner: {
    flex: 3,
    backgroundColor: '#ffdbb6',
    borderRadius: 18,
    height: 250,
    overflow: 'hidden',
    position: 'relative',
  },
  kitchenImage: {
    position: 'absolute',
    right: 0,
    width: '70%',
    height: '100%',
  },
  recipeContent: {
    padding: 30,
    zIndex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '60%',
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000',
  },
  recipeTitleBold: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginTop: -5,
  },
  recipeSubtitle: {
    fontSize: 12,
    color: '#333',
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 18,
  },
  orderButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e74c3c',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    width: 130,
  },
  orderButtonText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },

  // --- Right Banner ---
  adBanner: {
    flex: 1.2,
    backgroundColor: '#ff9057',
    borderRadius: 18,
    height: 250,
    overflow: 'hidden',
    position: 'relative',
  },
  foodImage: { 
    width: '100%',
    height: '100%', 
    borderRadius: 18,
  },
});

export default CanteenHeader;
