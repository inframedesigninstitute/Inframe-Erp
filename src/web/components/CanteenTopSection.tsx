// components/CanteenTopSection.tsx (✅ Fixed with real food image URLs)

import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FoodItem {
    id: string;
    name: string;
    price: string;
    imageUri: string;
}

// ✅ Replaced placeholder.com URLs with working food images (Pexels)
const FavoriteItems: FoodItem[] = [
    { id: '1', name: 'Chicken Curry', price: '$152.10', imageUri: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: '2', name: 'Chicken Skewer', price: '$250.50', imageUri: 'https://images.pexels.com/photos/1117865/pexels-photo-1117865.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: '3', name: 'Penne Pasta', price: '$300.10', imageUri: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: '4', name: 'Delicious Pizza', price: '$152.10', imageUri: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: '5', name: 'Chicken Steak', price: '$250.50', imageUri: 'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: '6', name: 'Chicken Wings', price: '$300.10', imageUri: 'https://images.pexels.com/photos/1639564/pexels-photo-1639564.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: '7', name: 'Big Hamburger', price: '$152.10', imageUri: 'https://images.pexels.com/photos/1639564/pexels-photo-1639564.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: '8', name: 'Meat Soup', price: '$250.50', imageUri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: '9', name: 'Fresh Sushi Roll', price: '$300.10', imageUri: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const FavoriteCard: React.FC<{ item: FoodItem }> = ({ item }) => (
    <View style={styles.card}>
        <Image 
            source={{ uri: item.imageUri }} 
            style={styles.image} 
            resizeMode="cover"
            onError={(e) => console.error(`Failed to load ${item.name}`, e.nativeEvent.error)}
        />
        <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
        </View>
    </View>
);

const CanteenTopSection: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Most Favorites Items</Text>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Monthly</Text>
                    <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
            </View>

            {/* Food Grid */}
            <FlatList
                data={FavoriteItems}
                renderItem={({ item }) => <FavoriteCard item={item} />}
                keyExtractor={(item) => item.id}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    dropdownText: {
        fontSize: 14,
        color: '#333',
    },
    dropdownIcon: {
        fontSize: 10,
        marginLeft: 5,
        color: '#999',
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    card: {
        width: '31%',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    infoContainer: {
        paddingTop: 8,
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    name: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        minHeight: 30,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#e74c3c',
        marginTop: 4,
    },
});

export default CanteenTopSection;
