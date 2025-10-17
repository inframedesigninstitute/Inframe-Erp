import React from 'react';
import {
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// --- Interfaces ---
interface CanteenMenuModalProps {
    visible: boolean; // Controls whether the modal is open or closed
    onClose: () => void; // Function to call when the modal needs to be closed
}

interface MenuItemProps {
    name: string;
    price: string;
    boldPrice?: boolean;
}

interface SizePriceItemProps {
    size: string;
    price: string;
}

// --- Components ---
const MenuItem: React.FC<MenuItemProps> = ({ name, price, boldPrice = false }) => (
    <View style={styles.menuItemRow}>
        <Text style={styles.menuItemText}>{name}</Text>
        <Text style={[styles.menuItemPrice, boldPrice && styles.boldPrice]}>{price}</Text>
    </View>
);

const SizePriceItem: React.FC<SizePriceItemProps> = ({ size, price }) => (
    <View style={styles.sizePriceRow}>
        <Text style={styles.sizePriceText}>{size}</Text>
        <Text style={styles.sizePriceText}>{price}</Text>
    </View>
);

// --- Canteen Menu Modal (Controlled Component) ---
const CanteenMenuModal: React.FC<CanteenMenuModalProps> = ({ visible, onClose }) => {
    
    // We are no longer using local state (useState(false)) here

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible} // Controlled by parent
            onRequestClose={onClose} // Controlled by parent
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    
                    {/* Close Button calls the onClose prop */}
                    <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>✖ Close</Text>
                    </TouchableOpacity>

                    {/* --- Existing Menu Scroll --- */}
                    <ScrollView style={styles.container}>
                        <View style={styles.menuContent}>
                            {/* ... (Columns 1, 2, 3 content remains the same) ... */}
                            
                            <View style={styles.columnOne}>
                                <View style={styles.section}>
                                    <Text style={styles.sectionHeaderValue}>Value Burgers</Text>
                                    <MenuItem name="Nikku Singh Veg" price="'39" />
                                    <MenuItem name="Veg Snacker 🌶️" price="'69" />
                                    <MenuItem name="Churmur Pandey Veg" price="'85" />
                                    <MenuItem name="Veg United States of Punjab" price="'139" />
                                    <MenuItem name="Junior Uditia Punjab" price="'149" />
                                </View>

                                <View style={styles.highlightedSection}>
                                    <Text style={styles.highlightedTitle}>Kurkure Momo Burger</Text>
                                    <MenuItem name="🍔 Veg Burger" price="'99" boldPrice={true} />
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionHeaderBig}>Big Punjabi Burgers</Text>
                                    <MenuItem name="Potato Crunch" price="'109" />
                                    <MenuItem name="Bunty Pappeih Da Aloo" price="'119" />
                                    <MenuItem name="Paneer Pind-er" price="'179" />
                                    <MenuItem name="Chunky Paneer Pandey" price="'199" />
                                    <MenuItem name="Uditia Punjab 2.0" price="'199" />
                                </View>

                                <View style={styles.pureVegContainer}>
                                    <Text style={styles.pureVegText}>PURE</Text>
                                    <Text style={styles.pureVegText}>VEG</Text>
                                </View>
                            </View>

                            <View style={styles.columnTwo}>
                                <View style={styles.friesSection}>
                                    <Text style={styles.sectionHeaderBlack}>Fries</Text>
                                    <Text style={styles.friesDescription}>
                                        Dill-&/Hot Shock {'\n'}
                                        Moroccan/Classic Salted {'\n'}
                                        Chatpata Tamatar {'\n'}
                                        Smoky Barbeque
                                    </Text>
                                    <View style={styles.sizePriceContainer}>
                                        <SizePriceItem size="Small" price="'79" />
                                        <SizePriceItem size="Large" price="'99" />
                                    </View>
                                </View>

                                <View style={styles.cheesyFriesSection}>
                                    <Text style={styles.sectionHeaderBlack}>Cheesy Fries</Text>
                                    <Text style={styles.friesDescription}>
                                        Dill-&/Hot Shock {'\n'}
                                        Moroccan/Classic Salted {'\n'}
                                        Chatpata Tamatar {'\n'}
                                        Smoky Barbeque
                                    </Text>
                                    <Text style={styles.cheesyFriesPrice}>{'429'}</Text>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionHeaderRed}>Momos & Dips</Text>
                                    <MenuItem name="Steamed Veg Momo (6 Pcs)" price="'129" />
                                    <MenuItem name="Steamed Paneer Momo (6 Pcs)" price="'169" />
                                    <MenuItem name="Fried Veg Momo (6 Pcs)" price="'139" />
                                    <MenuItem name="Fried Paneer Momo (6 Pcs)" price="'179" />
                                    <MenuItem name="Kurkure Veg Momo (5 Pcs)" price="'169" />
                                    <MenuItem name="Kurkure Paneer Momo (5 Pcs)" price="'189" />
                                    <MenuItem name="Cheese Dip / Tandoori Dip / Hot Bihari Dip" price="'23" />
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionHeaderBlack}>Sides</Text>
                                    <MenuItem name="Mini Batata Vada (6 Pcs)" price="'69" />
                                    <MenuItem name="Cheesy Coins (3/6 Pcs)" price="'79/'129" />
                                    <MenuItem name="Onion Rings (6 Pcs)" price="'109" />
                                </View>
                            </View>

                            <View style={styles.columnThree}>
                                <Text style={styles.sectionHeaderBlue}>Beverages & Desserts</Text>
                                <View style={styles.beveragesList}>
                                    <MenuItem name="Water Bottle" price="ON MRP" />
                                    <MenuItem name="Gulabo (Pink Lemonade)" price="'49" />
                                    <MenuItem name="Pepsi Can" price="'60" />
                                    <MenuItem name="Pepsi Black Can" price="'60" />
                                    <MenuItem name="Coolberg Cranberry" price="'99" />
                                    <MenuItem name="Mango Shake" price="'149" />
                                    <MenuItem name="Strawberry Shake" price="'149" />
                                    <MenuItem name="Chocolava Cake" price="'99" />
                                </View>

                                <View style={styles.comboBlock}>
                                    <Text style={styles.comboTitle}>Make It A</Text>
                                    <Text style={styles.comboTitleLarge}>Combo @99</Text>
                                    <View style={styles.comboItem}>
                                        <Text style={styles.comboText}>Small Fries + Drink</Text>
                                        <Text style={styles.comboTextAdd}>Add '99</Text>
                                    </View>
                                    <View style={styles.comboItem}>
                                        <Text style={styles.comboText}>Large Fries + Drink</Text>
                                        <Text style={styles.comboTextAdd}>Add '119</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

// --- Styles ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center' },
    modalContent: { 
        flex: 1, 
        marginTop: 50, 
        backgroundColor: '#000', 
        borderTopLeftRadius: 10, // Only round the top corners for a full-screen-like modal
        borderTopRightRadius: 10,
        marginHorizontal: 5,
    },
    closeButton: { 
        backgroundColor: '#FFCC00', 
        padding: 10, 
        alignSelf: 'flex-end', 
        marginTop: 10,
        marginRight: 10,
        borderRadius: 5 
    },
    closeButtonText: { color: '#000', fontWeight: 'bold' },
    menuContent: {
        flexDirection: 'row',
        padding: 10,
        minWidth: width < 768 ? 768 : '100%',
    },
    // ... (rest of the menu styles are needed here)
    columnOne: { flex: 1, paddingRight: 10, },
    columnTwo: { flex: 1, paddingHorizontal: 10, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#555', },
    columnThree: { flex: 1, paddingLeft: 10, },
    section: { marginBottom: 10, },
    beveragesList: { marginBottom: 20, },
    sectionHeaderValue: { fontSize: 24, fontWeight: '900', color: '#FFCC00', marginBottom: 10, backgroundColor: 'red', padding: 5, textAlign: 'center', },
    sectionHeaderBig: { fontSize: 24, fontWeight: '900', color: '#fff', marginBottom: 10, marginTop: 20, },
    sectionHeaderBlack: { fontSize: 24, fontWeight: '900', color: '#fff', marginBottom: 10, marginTop: 20, backgroundColor: '#111', padding: 5, },
    sectionHeaderRed: { fontSize: 24, fontWeight: '900', color: '#fff', marginBottom: 10, marginTop: 20, backgroundColor: 'red', padding: 5, textAlign: 'center', },
    sectionHeaderBlue: { fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 10, backgroundColor: '#0099ff', padding: 10, textAlign: 'center', },
    menuItemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#333', },
    menuItemText: { color: '#fff', fontSize: 16, fontWeight: '400', },
    menuItemPrice: { color: '#fff', fontSize: 16, fontWeight: '600', },
    boldPrice: { color: '#FFCC00', fontWeight: '900', },
    highlightedSection: { backgroundColor: 'red', padding: 15, marginTop: 10, borderRadius: 5, },
    highlightedTitle: { fontSize: 22, fontWeight: '900', color: '#fff', marginBottom: 5, },
    friesSection: { marginTop: 10, },
    friesDescription: { color: '#ccc', fontSize: 14, lineHeight: 18, marginBottom: 5, },
    sizePriceContainer: { flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5, },
    sizePriceRow: { flexDirection: 'column', alignItems: 'center', marginRight: 20, borderWidth: 2, borderColor: '#FFCC00', padding: 5, borderRadius: 5, },
    sizePriceText: { color: '#fff', fontWeight: 'bold', },
    cheesyFriesSection: { marginTop: 20, },
    cheesyFriesPrice: { fontSize: 30, fontWeight: '900', color: '#FFCC00', textAlign: 'right', marginTop: -10, },
    comboBlock: { backgroundColor: 'red', padding: 20, marginTop: 20, borderRadius: 20, alignItems: 'center', },
    comboTitle: { fontSize: 30, fontWeight: '900', color: '#fff', },
    comboTitleLarge: { fontSize: 40, fontWeight: '900', color: '#FFCC00', },
    comboItem: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10, },
    comboText: { color: '#fff', fontSize: 16, fontWeight: '600', },
    comboTextAdd: { color: '#fff', fontSize: 16, fontWeight: '900', },
    pureVegContainer: { alignSelf: 'center', marginTop: 20, borderColor: 'green', borderWidth: 3, padding: 10, borderRadius: 100, backgroundColor: '#fff', },
    pureVegText: { color: 'green', fontSize: 20, fontWeight: 'bold', textAlign: 'center', }
});

export default CanteenMenuModal;