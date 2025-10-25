import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
// सुनिश्चित करें कि आपने यह लाइब्रेरी इंस्टॉल की है: npm install react-native-vector-icons
import Feather from 'react-native-vector-icons/Feather';

// स्क्रीन की चौड़ाई (Width) ताकि कार्ड रिस्पॉन्सिव (responsive) रहें
const windowWidth = Dimensions.get('window').width;

// --- 1. डेटा स्ट्रक्चर और डमी डेटा (Data Structure and Dummy Data) ---

export interface Invoice {
  id: number;
  billFrom: string;
  billTo: string;
  totalCost: number;
  status: 'Shipped' | 'Delivered' | 'Pending';
}

export const INVOICE_DATA: Invoice[] = [
  { id: 101, billFrom: 'PineappleInc.', billTo: 'Redq Inc.', totalCost: 90, status: 'Shipped' },
  { id: 102, billFrom: 'Pineapple.', billTo: 'ME Inc.', totalCost: 90, status: 'Delivered' },
  { id: 103, billFrom: 'Incorporation.', billTo: 'Redirwed.', totalCost: 90, status: 'Pending' },
  { id: 104, billFrom: 'PineappleTimes.', billTo: 'RFC.', totalCost: 90, status: 'Shipped' },
  { id: 105, billFrom: 'FortuneCreation', billTo: 'Soft solution.', totalCost: 90, status: 'Delivered' },
  { id: 106, billFrom: 'PineappleTimes.', billTo: 'RFC.', totalCost: 90, status: 'Shipped' },
  { id: 107, billFrom: 'FortuneCreation', billTo: 'Soft solution.', totalCost: 90, status: 'Delivered' },
];

// स्टेटस के अनुसार रंग (Status Colors)
const STATUS_COLORS = {
  Shipped: '#709dff', 
  Delivered: '#3cce98', 
  Pending: '#ffc107', 
};


// --- 2. कस्टम कंपोनेंट्स (Custom Components) ---

// डैशबोर्ड हेडर कार्ड (Dashboard Header Card)
interface CardProps {
  title: string;
  count: number;
  iconName: string;
  color: string;
}

const DashboardCard: React.FC<CardProps> = ({ title, count, iconName, color }) => {
  // dynamic styles
  const cardStyle = { ...styles.card, backgroundColor: `${color}10`, borderColor: color };

  return (
    <View style={cardStyle}>
      <View style={[styles.cardIconContainer, { backgroundColor: color }]}>
        <Feather name={iconName as any} size={windowWidth * 0.05} color="#fff" />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={[styles.cardCount, { color }]}>{count}</Text>
        <Text style={styles.cardTitle}>{title} Invoices</Text>
      </View>
    </View>
  );
};

// इनवॉइस स्टेटस बैज (Invoice Status Badge)
interface StatusBadgeProps {
  status: Invoice['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[status] }]}>
    <Text style={styles.statusText}>{status}</Text>
  </View>
);

// इनवॉइस टेबल रो (Invoice Table Row)
interface RowProps {
  item: Invoice | null;
  isHeader?: boolean;
}

const InvoiceRow: React.FC<RowProps> = ({ item, isHeader = false }) => {
  const commonProps = { style: isHeader ? styles.headerText : styles.cellText };

  return (
    <View style={[styles.row, isHeader ? styles.headerRow : styles.dataRow]}>
      {/* Checkbox / ID */}
      <View style={[styles.cell, { width: '8%' }]}>
        {isHeader ? (
          <Text {...commonProps}>Id</Text>
        ) : (
          <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
        )}
      </View>
      {/* Bill From */}
      <View style={[styles.cell, { width: '23%' }]}>
        <Text {...commonProps}>{isHeader ? 'Bill From' : item?.billFrom}</Text>
      </View>
      {/* Bill To */}
      <View style={[styles.cell, { width: '23%' }]}>
        <Text {...commonProps}>{isHeader ? 'Bill To' : item?.billTo}</Text>
      </View>
      {/* Total Cost */}
      <View style={[styles.cell, { width: '15%' }]}>
        <Text {...commonProps}>{isHeader ? 'Total Cost' : item?.totalCost}</Text>
      </View>
      {/* Status */}
      <View style={[styles.cell, { width: '18%' }]}>
        {isHeader ? <Text {...commonProps}>Status</Text> : <StatusBadge status={item!.status} />}
      </View>
      {/* Action */}
      <View style={[styles.cell, { width: '13%' }]}>
        {isHeader ? (
          <Text {...commonProps}>Action</Text>
        ) : (
          <View style={styles.actionContainer}>
            <Feather name="eye" size={18} color="#4a4a4a" style={styles.actionIcon} />
            <Feather name="edit-3" size={18} color="#4a4a4a" style={styles.actionIcon} />
            <Feather name="trash-2" size={18} color="#ff6b6b" />
          </View>
        )}
      </View>
    </View>
  );
};


// --- 3. मुख्य कंपोनेंट (Main Component) ---

export const InvoiceDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // कार्ड डेटा की गणना (Calculate Card Data)
  const totalInvoices = INVOICE_DATA.length;
  const shippedCount = INVOICE_DATA.filter(i => i.status === 'Shipped').length;
  const deliveredCount = INVOICE_DATA.filter(i => i.status === 'Delivered').length;
  const pendingCount = INVOICE_DATA.filter(i => i.status === 'Pending').length;

  // खोज के आधार पर डेटा को फ़िल्टर करना (Filter data based on search)
  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return INVOICE_DATA;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return INVOICE_DATA.filter(invoice =>
      String(invoice.id).includes(lowerCaseQuery) ||
      invoice.billFrom.toLowerCase().includes(lowerCaseQuery) ||
      invoice.billTo.toLowerCase().includes(lowerCaseQuery) ||
      invoice.status.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* हेडर कार्ड्स (Header Cards) */}
        <View style={styles.cardRow}>
          <DashboardCard title="Total" count={totalInvoices} iconName="grid" color="#6c5ce7" />
          <DashboardCard title="Shipped" count={shippedCount} iconName="shopping-bag" color={STATUS_COLORS.Shipped} />
          <DashboardCard title="Delivered" count={deliveredCount} iconName="truck" color={STATUS_COLORS.Delivered} />
          <DashboardCard title="Pending" count={pendingCount} iconName="loader" color={STATUS_COLORS.Pending} />
        </View>

        {/* सर्च बार और न्यू इनवॉइस बटन (Search Bar and New Invoice Button) */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#777" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#777"
            />
          </View>
          <TouchableOpacity style={styles.newInvoiceButton}>
            <Text style={styles.newInvoiceText}>New Invoice</Text>
          </TouchableOpacity>
        </View>

        {/* इनवॉइस टेबल (Invoice Table) */}
        <View style={styles.tableContainer}>
          {/* हेडर रो */}
          <InvoiceRow item={null} isHeader /> 
          
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <InvoiceRow item={item} />}
            keyExtractor={(item) => String(item.id)}
            scrollEnabled={false} 
            ListEmptyComponent={() => (
                <Text style={styles.noResultsText}>No invoices found.</Text>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};


// --- 4. स्टाइल्स (Styles) ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 15,
  },

  // --- Card Styles ---
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'wrap', 
  },
  card: {
    // 4 कार्ड के लिए चौड़ाई: (स्क्रीन चौड़ाई - 30px padding - 9px gap) / 4
    width: (windowWidth - 39) / 4, 
    padding: 12,
    borderRadius: 8,
    flexDirection: 'column',
    borderWidth: 1,
    minHeight: 90,
    marginBottom: 8,
    marginHorizontal: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  cardIconContainer: {
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  cardTextContainer: {
    marginTop: 5,
  },
  cardCount: {
    fontSize: windowWidth * 0.045,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: windowWidth * 0.03,
    color: '#495057',
    fontWeight: '500',
  },

  // --- Search Bar and Button Styles ---
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#343a40',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0, 
  },
  newInvoiceButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
  },
  newInvoiceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // --- Table Styles ---
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  headerRow: {
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 2,
  },
  dataRow: {
    backgroundColor: '#fff',
  },
  cell: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  headerText: {
    fontWeight: '700',
    color: '#495057',
    fontSize: 12,
  },
  cellText: {
    color: '#495057',
    fontSize: 12,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
  },
  
  // --- Status Badge Styles ---
  statusBadge: {
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 10,
  },

  // --- Action Icon Styles ---
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  actionIcon: {
    marginRight: 5,
  },
  noResultsText: {
    textAlign: 'center',
    padding: 20,
    color: '#6c757d',
    fontSize: 14,
  }
});