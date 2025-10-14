// ✅ src/components/CanteenTrendingEats.tsx (ScrollView enabled safely)

import React, { useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface TrendingMenu {
    id: string;
    name: string;
    price: string;
    orders: string;
    imageUri: string;
}

const fallbackImage = 'https://picsum.photos/80/80?blur=2';

// 🥗 Image URLs according to dish names
const TrendingMenus: TrendingMenu[] = [
    { id: 'a1', name: 'Medium Spicy Spagethi Italiano', price: '$5.6', orders: '89x', imageUri: 'https://veganwithgusto.com/wp-content/uploads/2021/05/spicy-spaghetti-arrabbiata.jpg' },
    { id: 'a2', name: 'Watermelon juice with ice', price: '$5.6', orders: '89x', imageUri: 'https://frommybowl.com/wp-content/uploads/2018/07/Watermelon_Slushie_Vegan_GlutenFree_4Ingredients_FromMyBowl-6.jpg' },
    { id: 'a3', name: 'Curry special with cucumber', price: '$5.6', orders: '89x', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcSnNkXYTHD_aw-NX10NbBMB9qz1xG_FThlw&s' },
    { id: 'a4', name: 'Italiano Pizza With Garlic', price: '$5.6', orders: '89x', imageUri: 'https://www.justataste.com/wp-content/uploads/2022/01/best-garlic-bread-pizza.jpg' },
    { id: 'a5', name: 'Tuna soup spinach with himalaya salt', price: '$5.6', orders: '89x', imageUri: 'https://i.pinimg.com/originals/6f/fb/3b/6ffb3b09ee6b40e7489915bafedca1c8.jpg' },
    { id: 'a6', name: 'Medium Spicy Pizza with Kemangi Leaf', price: '$5.6', orders: '89x', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAprzvc_2P_ZWDG60YqKxthoHEAu5ci5cQUw&s' },
];

const TrendingCard: React.FC<{ item: TrendingMenu }> = ({ item }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <TouchableOpacity style={styles.card}>
            <Image
                source={{ uri: imageError ? fallbackImage : item.imageUri }}
                style={styles.image}
                resizeMode="cover"
                onError={() => setImageError(true)}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={2}>
                    {item.name}
                </Text>
                <Text style={styles.orderText}>Orders {item.orders}</Text>
            </View>
            <Text style={styles.price}>{item.price}</Text>
        </TouchableOpacity>
    );
};

const CanteenTrendingEats: React.FC = () => {
    return (
        <ScrollView
            style={styles.scrollContainer}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Daily Trending Menus</Text>

                <FlatList
                    data={TrendingMenus}
                    renderItem={({ item }) => <TrendingCard item={item} />}
                    keyExtractor={(item) => item.id}
                    nestedScrollEnabled={true}
                    scrollEnabled={false} // ✅ FlatList scroll disabled to rely on parent ScrollView
                />

                <TouchableOpacity style={styles.viewMoreButton}>
                    <Text style={styles.viewMoreText}>View More</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: '#eee',
    },
    infoContainer: {
        flex: 1,
        marginRight: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        lineHeight: 18,
    },
    orderText: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    viewMoreButton: {
        marginTop: 15,
        alignItems: 'center',
        paddingBottom: 10,
    },
    viewMoreText: {
        fontSize: 14,
        color: '#e74c3c',
        fontWeight: '600',
    },
});

export default CanteenTrendingEats;
