import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// --- 1. Define the TypeScript Interface for Book Data (UPDATED) ---
interface Book {
    category: string;
    bookId: string;
    title: string;
    author: string;
    dateOfPurchase: string;
    price: number;
    purchasedFrom: string;
    bookNumber: string;
    remarks: string;
    issuanceDate?: string;
    actualReturnDate?: string;
}

// --- 2. Sample Data (Kept the same) ---
const bookData: Book[] = [
    {
        category: 'Fiction',
        bookId: 'BK-0001',
        title: 'The Magic Tree',
        author: 'Emma Johnson',
        dateOfPurchase: '15-Mar-2024',
        price: 250.00,
        purchasedFrom: 'Book World',
        bookNumber: 'R1',
        remarks: 'Good condition',
        issuanceDate: '20-Oct-2024', 
        actualReturnDate: '20-Oct-2024', 
    },
    {
        category: 'Non-Fiction',
        bookId: 'BK-0002',
        title: 'Cosmos Guide',
        author: 'Alan Dale',
        dateOfPurchase: '22-Apr-2024',
        price: 350.00,
        purchasedFrom: 'Knowledge Hub',
        bookNumber: 'R2',
        remarks: 'Slightly damaged',
        issuanceDate: '01-Sep-2024',
        actualReturnDate: '18-Sep-2024', 
    },
    {
        category: 'Geography',
        bookId: 'BK-0003',
        title: 'Lives of Great Minds',
        author: 'Noah Lee',
        dateOfPurchase: '05-May-2024',
        price: 400.00,
        purchasedFrom: 'Campus Store',
        bookNumber: 'R3',
        remarks: 'New copy',
    },
    {
        category: 'History',
        bookId: 'BK-0004',
        title: 'Ancient Civilizations',
        author: 'John Doe',
        dateOfPurchase: '1-Jun-2024',
        price: 380.00,
        purchasedFrom: "Scholar's Den",
        bookNumber: 'R4',
        remarks: 'Pages worn',
        issuanceDate: '10-Oct-2025',
    },
    {
        category: 'Literature',
        bookId: 'BK-0005',
        title: 'Poems of the Heart',
        author: 'Lily Brown',
        dateOfPurchase: '19-Jul-2024',
        price: 200.00,
        purchasedFrom: 'Library Lane',
        bookNumber: 'R5',
        remarks: 'Excellent condition',
    },
    {
        category: 'Technology',
        bookId: 'BK-0011',
        title: 'Future Tech Innovations',
        author: 'Laura Green',
        dateOfPurchase: '1-Nov-2024',
        price: 550.00,
        purchasedFrom: 'Tech Central',
        bookNumber: 'R11',
        remarks: 'Excellent condition',
        issuanceDate: '05-Oct-2025', 
    },
    {
        category: 'Geography',
        bookId: 'BK-0012',
        title: 'World Maps and More',
        author: 'David Martin',
        dateOfPurchase: '10-Nov-2024',
        price: 330.00,
        purchasedFrom: 'Map Store',
        bookNumber: 'R12',
        remarks: 'Slightly worn',
    },
];

// --- Utility Function to calculate Status and Late Days (Unchanged) ---
const getBookStatus = (issueDateStr?: string, returnDateStr?: string) => {
    // If issued but not returned
    if (issueDateStr && !returnDateStr) {
        return { status: 'Currently Issued', details: 'Awaiting Return', color: '#ffc107' }; // Yellow/Orange
    }
    // If never issued
    if (!issueDateStr && !returnDateStr) {
        return { status: 'Available', details: 'Ready for Issue', color: '#4caf50' }; // Green
    }
    // If returned (issueDateStr and returnDateStr are present)

    const parseDate = (dateStr: string): Date | null => {
        const parts = dateStr.split('-');
        if (parts.length !== 3) return null;
        const dateString = `${parts[2]}-${parts[1]}-${parts[0]}`;
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
    };

    const issueDate = parseDate(issueDateStr!);
    const returnDate = parseDate(returnDateStr!);

    if (!issueDate || !returnDate) {
        return { status: 'Error', details: 'Date Format Issue', color: '#777' };
    }

    const latestReturnDate = new Date(issueDate);
    latestReturnDate.setDate(issueDate.getDate() + 15);
    returnDate.setHours(0, 0, 0, 0);
    latestReturnDate.setHours(0, 0, 0, 0);

    if (returnDate <= latestReturnDate) {
        return { status: 'Returned On Time', details: 'No Penalty', color: '#28a745' }; // Dark Green
    }

    const timeDifference = returnDate.getTime() - latestReturnDate.getTime();
    const lateDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const penaltyAmount = lateDays * 2; 

    return { 
        status: 'Late Return!', 
        details: `${lateDays} Days Late (₹${penaltyAmount})`,
        color: '#dc3545' // Red
    };
};


// --- 3. Table Header Component (UPDATED Text Color) ---
const TableHeader = () => (
    <View style={modernStyles.headerRow}>
        {/* Text color is now BLACK, background is light grey */}
        <Text style={[modernStyles.headerCell, { width: 100 }]}>Category</Text>
        <Text style={[modernStyles.headerCell, { width: 70 }]}>Book ID</Text>
        <Text style={[modernStyles.headerCell, { flex: 2 }]}>Title of the Book</Text>
        <Text style={[modernStyles.headerCell, { flex: 1.5 }]}>Author</Text>
        <Text style={[modernStyles.headerCell, { width: 100 }]}>Date of Purchase</Text>
        <Text style={[modernStyles.headerCell, { width: 60 }]}>Price (₹)</Text>
        <Text style={[modernStyles.headerCell, { flex: 1.5 }]}>Purchased From</Text>
        <Text style={[modernStyles.headerCell, { width: 70 }]}>Book Number</Text>
        <Text style={[modernStyles.headerCell, { flex: 2 }]}>Remarks</Text>
        
        <Text style={[modernStyles.headerCell, modernStyles.newColumnHeader, { width: 100 }]}>Issuance Date</Text>
        <Text style={[modernStyles.headerCell, modernStyles.newColumnHeader, { width: 100 }]}>Actual Return Date</Text>
        <Text style={[modernStyles.headerCell, modernStyles.newColumnHeader, { flex: 2 }]}>Availability / Status</Text>
    </View>
);

// --- 4. Table Row Component (UPDATED Status Text Color) ---
const TableRow: React.FC<{ item: Book }> = ({ item }) => {
    const { status, details, color } = getBookStatus(item.issuanceDate, item.actualReturnDate);
    
    // Status text color is now explicitly set to BLACK for better contrast against light status background
    return (
        <View style={modernStyles.row}>
            <Text style={[modernStyles.dataCell, { width: 100 }]}>{item.category}</Text>
            <Text style={[modernStyles.dataCell, { width: 70 }]}>{item.bookId}</Text>
            <Text style={[modernStyles.dataCell, { flex: 2, textAlign: 'left', fontWeight: '500' }]} numberOfLines={2}>{item.title}</Text>
            <Text style={[modernStyles.dataCell, { flex: 1.5 }]}>{item.author}</Text>
            <Text style={[modernStyles.dataCell, { width: 100 }]}>{item.dateOfPurchase}</Text>
            <Text style={[modernStyles.dataCell, { width: 60 }]}>{item.price.toFixed(2)}</Text>
            <Text style={[modernStyles.dataCell, { flex: 1.5 }]}>{item.purchasedFrom}</Text>
            <Text style={[modernStyles.dataCell, { width: 70 }]}>{item.bookNumber}</Text>
            <Text style={[modernStyles.dataCell, { flex: 2 }]}>{item.remarks}</Text>

            <Text style={[modernStyles.dataCell, { width: 100 }]}>{item.issuanceDate || '-'}</Text>
            <Text style={[modernStyles.dataCell, { width: 100 }]}>{item.actualReturnDate || '-'}</Text>
            <View style={[modernStyles.dataCell, modernStyles.statusCell, { flex: 2, borderColor: color + '30', backgroundColor: color + '10' }]}>
                {/* Status text set to BLACK, color variable only used for background/border */}
                <Text style={{ fontWeight: 'bold', fontSize: 11, color: '#000' }}> 
                    {status}
                </Text>
                <Text style={{ fontSize: 10, color: '#000', textAlign: 'center' }}>
                    {details}
                </Text>
            </View>
        </View>
    );
};

// --- 5. Main Component (Unchanged Logic) ---
const LibraryInventoryTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBookData = useMemo(() => {
        if (!searchTerm) {
            return bookData;
        }
        const searchLower = searchTerm.toLowerCase();
        
        return bookData.filter(book => (
            book.title.toLowerCase().includes(searchLower) ||
            book.author.toLowerCase().includes(searchLower) ||
            book.bookId.toLowerCase().includes(searchLower) ||
            book.category.toLowerCase().includes(searchLower)
        ));
    }, [searchTerm]);

    const totalBooks = bookData.length;
    const availableBooks = bookData.filter(book => getBookStatus(book.issuanceDate, book.actualReturnDate).status === 'Available').length;
    
    const handleRequest = (bookTitle: string) => {
        alert(`Request placed for: ${bookTitle}. Library will notify you soon!`);
    }

    return (
        <View style={modernStyles.container}>
            <Text style={modernStyles.mainTitle}>📚 Library Inventory & Request</Text>
            
            {/* --- Info/Stat Card --- */}
            <View style={modernStyles.infoCardContainer}>
                {/* Stat Box 1 - Primary Blue, Black Text */}
                <View style={[modernStyles.statBox, { backgroundColor: '#f0f8ff', borderLeftColor: '#007bff' }]}>
                    <Text style={[modernStyles.statText, { color: '#007bff' }]}>Total Books</Text>
                    <Text style={[modernStyles.statCount, { color: '#007bff' }]}>{totalBooks}</Text>
                </View>
                {/* Stat Box 2 - Success Green, Black Text */}
                <View style={[modernStyles.statBox, { backgroundColor: '#e9f7ef', borderLeftColor: '#28a745', marginRight: 0 }]}>
                    <Text style={[modernStyles.statText, { color: '#28a745' }]}>Available for Issue</Text>
                    <Text style={[modernStyles.statCount, { color: '#28a745' }]}>{availableBooks}</Text>
                </View>
            </View>

            {/* --- Search Input & Request Button --- */}
            <View style={modernStyles.searchContainer}>
                <View style={modernStyles.searchInputWrapper}>
                    <Feather name="search" size={18} color="#999" style={{ marginRight: 8 }} />
                    <TextInput
                        style={modernStyles.searchInput}
                        placeholder="Search by Title, Author, ID, or Category"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        placeholderTextColor="#999"
                    />
                </View>
                {/* Request Button - Light Blue Background, Black Text */}
                <TouchableOpacity 
                    style={[modernStyles.requestButton, { backgroundColor: '#e0f7fa' }]} 
                    onPress={() => handleRequest(searchTerm || 'an unavailable book')}
                >
                    <Feather name="send" size={16} color="#000" />
                    <Text style={[modernStyles.requestButtonText, { color: '#000' }]}>Request Book</Text>
                </TouchableOpacity>
            </View>

            {/* --- Filtered Count Display --- */}
            <View style={modernStyles.resultBar}>
                <Text style={modernStyles.resultText}>
                    Showing <Text style={{ fontWeight: 'bold', color: '#000' }}>{filteredBookData.length}</Text> result{filteredBookData.length !== 1 ? 's' : ''} out of {totalBooks} total books.
                </Text>
            </View>


            {/* The ScrollView is essential for wide tables */}
            <ScrollView horizontal style={modernStyles.tableScrollWrapper}>
                <View>
                    {/* Header */}
                    <TableHeader />
                    
                    {/* Data Rows */}
                    <ScrollView style={modernStyles.dataScrollView}>
                        {filteredBookData.length > 0 ? (
                            filteredBookData.map((book, index) => (
                                <TableRow key={book.bookId} item={book} />
                            ))
                        ) : (
                            <View style={modernStyles.noDataRow}>
                                <Text style={modernStyles.noDataText}>
                                    No books found matching "{searchTerm}".
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

// --- 6. Styling (Updated for Black Text Contrast) ---
const modernStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f9fa', 
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: '800', 
        marginBottom: 15,
        color: '#000', // Black Text
    },

    // --- Info/Stat Cards ---
    infoCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statBox: {
        flex: 1,
        // Background color handled inline in component (lighter shades)
        padding: 15,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWidth: 4,
        // borderLeftColor handled inline
    },
    statText: {
        // Color handled inline in component (theme color)
        fontWeight: '600',
        fontSize: 13,
    },
    statCount: {
        // Color handled inline in component (theme color)
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 5,
    },

    // --- Search & Request Bar ---
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchInputWrapper: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc', // Lighter border
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000', // Black Text
    },
    requestButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // Background color handled inline (very light blue)
        borderRadius: 8,
        height: 45,
        paddingHorizontal: 10,
    },
    requestButtonText: {
        // Color handled inline (Black Text)
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 5,
    },

    // --- Result Bar ---
    resultBar: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#ffc107',
    },
    resultText: {
        fontSize: 13,
        color: '#000', // Black Text
    },

    // --- Table Styles ---
    tableScrollWrapper: {
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e9ecef',
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#e9ecef', // Very Light Header
        paddingVertical: 12,
        minWidth: 1300, 
    },
    headerCell: {
        fontWeight: 'bold',
        color: '#000', // Black Text
        fontSize: 11,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        paddingVertical: 8,
        minWidth: 1300,
        backgroundColor: '#fff',
    },
    dataCell: {
        fontSize: 12,
        color: '#000', // Black Text
        textAlign: 'center',
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataScrollView: {
        maxHeight: 400, 
    },
    // Naye Column ke liye halka sa alag style
    newColumnHeader: {
        backgroundColor: '#dee2e6', // Slightly darker light grey
    },
    statusCell: {
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
        // Background/Border color handled inline based on status logic
    },
    noDataRow: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        minWidth: 1200,
    },
    noDataText: {
        color: '#000', // Black Text
        fontSize: 14,
        fontWeight: '500',
    },
});

export default LibraryInventoryTable;