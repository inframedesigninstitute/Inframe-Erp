// CanteenMainScreen.tsx

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

// FIX: 'components/' prefix removed from imports, assuming all files are in the same directory.
import CanteenTopSection from '../components/CanteenTopSection';
import CanteenHeader from './CanteenHeader';
import CanteenQuickOrderSidebar from './CanteenQuickOrderSidebar';
import CanteenTrendingEats from './CanteenTrendingEats';

const CanteenMainScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CanteenHeader />
      
      <ScrollView contentContainerStyle={styles.container}>
        <CanteenTopSection />
        
        {/* Main Content Area: Trending Eats and Sidebar */}
        <View style={styles.contentArea}>
          {/* Left Side */}
          <View style={styles.trendingContainer}>
            <CanteenTrendingEats />
          </View>
          
          {/* Right Side */}
          <View style={styles.sidebarContainer}>
            <CanteenQuickOrderSidebar />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  contentArea: {
    flexDirection: 'row', 
    marginTop: 20,
  },
  trendingContainer: {
    flex: 2.5, 
    marginRight: 20,
  },
  sidebarContainer: {
    flex: 1, 
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    height: 350, 
  },
});

export default CanteenMainScreen;