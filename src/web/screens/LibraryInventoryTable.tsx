import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

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
  // --- Naye Optional Fields (Optional: ? lagaya gaya hai) ---
  issuanceDate?: string;
  actualReturnDate?: string;
}

// --- 2. Sample Data from the Image (UPDATED with new columns) ---
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
    issuanceDate: '20-Oct-2024', // Example: Kab issue hui
    actualReturnDate: '20-Oct-2024', // Example: Kab wapas aayi (On time)
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
    actualReturnDate: '18-Sep-2024', // Example: Late return (Assuming 15 days limit)
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
  },
  // ... Baaki data jaisa tha waisa hi hai ...
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

// --- Utility Function to calculate Status and Late Days ---
const getBookStatus = (issueDateStr?: string, returnDateStr?: string) => {
  if (!issueDateStr || !returnDateStr) {
    return { status: 'Available', details: '' };
  }

  // Convert dates to a comparable format (YYYY-MM-DD for consistency)
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  };

  const issueDate = parseDate(issueDateStr);
  const returnDate = parseDate(returnDateStr);

  if (!issueDate || !returnDate) {
    return { status: 'Error', details: 'Date Format Issue' };
  }

  // Assuming a 15-day maximum loan period (from previous context)
  const latestReturnDate = new Date(issueDate);
  latestReturnDate.setDate(issueDate.getDate() + 15);

  if (returnDate <= latestReturnDate) {
    return { status: 'Returned On Time', details: 'No Penalty' };
  }

  const timeDifference = returnDate.getTime() - latestReturnDate.getTime();
  const lateDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
  // Assuming a penalty of 2 Rs/Day (from previous context)
  const penaltyAmount = lateDays * 2; 

  return { 
    status: 'Late Return!', 
    details: `${lateDays} Days Late (₹${penaltyAmount})` 
  };
};


// --- 3. Table Header Component (UPDATED) ---
const TableHeader = () => (
  <View style={styles.headerRow}>
    <Text style={[styles.headerCell, { width: 100 }]}>Category</Text>
    <Text style={[styles.headerCell, { width: 70 }]}>Book ID</Text>
    <Text style={[styles.headerCell, { flex: 2 }]}>Title of the Book</Text>
    <Text style={[styles.headerCell, { flex: 1.5 }]}>Author</Text>
    <Text style={[styles.headerCell, { width: 100 }]}>Date of Purchase/Receipt</Text>
    <Text style={[styles.headerCell, { width: 60 }]}>Price (Rs)</Text>
    <Text style={[styles.headerCell, { flex: 1.5 }]}>Purchased From</Text>
    <Text style={[styles.headerCell, { width: 70 }]}>Book Number</Text>
    <Text style={[styles.headerCell, { flex: 2 }]}>Remarks</Text>
    
    {/* --- Naye Column Header --- */}
    <Text style={[styles.headerCell, styles.newColumnHeader, { width: 100 }]}>Issuance Date</Text>
    <Text style={[styles.headerCell, styles.newColumnHeader, { width: 100 }]}>Actual Return Date</Text>
    <Text style={[styles.headerCell, styles.newColumnHeader, { flex: 2 }]}>Late Return / Status</Text>
  </View>
);

// --- 4. Table Row Component (UPDATED) ---
const TableRow: React.FC<{ item: Book }> = ({ item }) => {
  const status = getBookStatus(item.issuanceDate, item.actualReturnDate);
  
  const statusColor = 
    status.status === 'Late Return!' 
      ? '#f44336' // Red
      : status.status === 'Returned On Time'
      ? '#4caf50' // Green
      : '#607d8b'; // Grey/Blue for Available

  return (
    <View style={styles.row}>
      <Text style={[styles.dataCell, { width: 100 }]}>{item.category}</Text>
      <Text style={[styles.dataCell, { width: 70 }]}>{item.bookId}</Text>
      <Text style={[styles.dataCell, { flex: 2 }]}>{item.title}</Text>
      <Text style={[styles.dataCell, { flex: 1.5 }]}>{item.author}</Text>
      <Text style={[styles.dataCell, { width: 100 }]}>{item.dateOfPurchase}</Text>
      <Text style={[styles.dataCell, { width: 60 }]}>{item.price.toFixed(2)}</Text>
      <Text style={[styles.dataCell, { flex: 1.5 }]}>{item.purchasedFrom}</Text>
      <Text style={[styles.dataCell, { width: 70 }]}>{item.bookNumber}</Text>
      <Text style={[styles.dataCell, { flex: 2 }]}>{item.remarks}</Text>

      {/* --- Naye Column ka Data --- */}
      <Text style={[styles.dataCell, { width: 100 }]}>{item.issuanceDate || '-'}</Text>
      <Text style={[styles.dataCell, { width: 100 }]}>{item.actualReturnDate || '-'}</Text>
      <View style={[styles.dataCell, { flex: 2, paddingVertical: 5 }]}>
          <Text style={{ fontWeight: 'bold', fontSize: 11, color: statusColor }}>
              {status.status}
          </Text>
          <Text style={{ fontSize: 10, color: statusColor }}>
              {status.details}
          </Text>
      </View>
    </View>
  );
};

// --- 5. Main Component (Unchanged) ---
const LibraryInventoryTable: React.FC = () => {
  const totalBooks = bookData.length;

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>📚 Books Inventory</Text>
      
      {/* Total Books Header Box */}
      <View style={styles.totalBooksBox}>
        <Text style={styles.totalBooksText}>Total Number of Books</Text>
        <Text style={styles.totalBooksCount}>{totalBooks}</Text>
      </View>

      {/* The ScrollView is essential for wide tables */}
      <ScrollView horizontal>
        <View>
          {/* Header */}
          <TableHeader />
          
          {/* Data Rows */}
          <ScrollView style={styles.dataScrollView}>
            {bookData.map((book, index) => (
              <TableRow key={book.bookId} item={book} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

// --- 6. Styling (Updated with new column styles) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  totalBooksBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#003366', 
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 300,
    alignSelf: 'flex-end',
  },
  totalBooksText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  totalBooksCount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  // Table Styles
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0', 
    borderBottomWidth: 2,
    borderColor: '#ccc',
    paddingVertical: 8,
    minWidth: 1200, // Ensure enough width for all columns
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    minWidth: 1200,
  },
  dataCell: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  dataScrollView: {
    maxHeight: 500, 
  },
  // Naye Column ke liye halka sa alag style
  newColumnHeader: {
    backgroundColor: '#e0e0e0', // Thoda halka grey
  }
});

export default LibraryInventoryTable;