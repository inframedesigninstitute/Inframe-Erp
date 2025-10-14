// src/web/screens/CanteenScreen.tsx (Overflow Fixed)

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

// NOTE: Keeping old Canteen component names
import CanteenHeader from '../components/CanteenHeader';
import CanteenQuickOrderSidebar from '../components/CanteenQuickOrderSidebar'; // Categories
import CanteenTopSection from '../components/CanteenTopSection'; // Favorites Grid
import CanteenTrendingEats from '../components/CanteenTrendingEats'; // Trending List

const CanteenScreen: React.FC = () => {
    // Current screen width check, useful for dynamic layouts
    const { width } = useWindowDimensions(); 

    return (
        <SafeAreaView style={styles.safeArea}>
            <CanteenHeader />
            
            <ScrollView contentContainerStyle={styles.container}>
                
                <View style={styles.contentArea}>
                    
                    <View style={styles.categoriesContainer}>
                        <CanteenQuickOrderSidebar /> 
                    </View>
                    
                    <View style={styles.favoritesContainer}>
                        <CanteenTopSection />
                    </View>
                    
                    <View style={styles.trendingMenusContainer}>
                        <CanteenTrendingEats />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff7f2',  
    },
    container: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 0, 
    },
    contentArea: {
        flexDirection: 'row', 
        marginTop: 20,
        gap: 20, 
        alignItems: 'flex-start',
      
    },
    categoriesContainer: {
        flex: 1, 
    },
    favoritesContainer: {
        flex: 2, 
    },
    trendingMenusContainer: {
        flex: 1.2, 
        backgroundColor: '#fff', 
        borderRadius: 18, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
});

export default CanteenScreen;