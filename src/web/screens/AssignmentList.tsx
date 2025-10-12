import React from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// Note: You must install this package: npm install react-native-vector-icons
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
// Decide number of columns based on screen width (Mobile: 1, Tablet: 2)
// Assignments list ke liye 1 column better hai, par image jaisa look dene ke liye 2/3 columns rakhenge.
const NUM_COLUMNS = width > 700 ? 3 : 2; 

// --- Data Structure (Updated for Assignment) ---
interface Assignment {
  id: string;
  title: string;
  course: string;
  session: string;
  semester: string;
  startDate: string;
  endDate: string;
  status: 'Submitted' | 'Pending';
  initialColor: string; // Card color for UI
}

const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Assignment of Arts ',
    course: 'EN105',
    session: 'Spring-2022',
    semester: '1st Semester 2018',
    startDate: '04-10-2022',
    endDate: '13-10-2022',
    status: 'Submitted',
    initialColor: '#7a42f4',
  },
  {
    id: '2',
    title: 'Assignment of Design',
    course: 'EN105',
    session: 'Spring-2022',
    semester: '1st Semester 2018',
    startDate: '04-10-2022',
    endDate: '08-10-2022',
    status: 'Pending',
    initialColor: '#a64dff',
  },
];



const AssignmentCard: React.FC<{ item: Assignment }> = ({ item }) => {
    const statusBgColor = item.status === 'Submitted' ? '#00c851' : '#ff6666'; 
    
    const initial = item.course.charAt(0);

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={[styles.initialCircle, { backgroundColor: item.initialColor }]}>
                    <Text style={styles.initialText}>{initial}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.cardBody}>
                <Text style={styles.assignmentTitle}>{item.title}</Text>
                <Text style={styles.assignmentDetail}>{item.course} ({item.session})</Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Feather name="calendar" size={14} color="#666" style={{marginRight: 5}}/>
                    <Text style={styles.countLabel}>Due: </Text>
                    <Text style={styles.assignmentDate}>{item.endDate}</Text>
                </View>
            </View>
        </View>
    );
};

const AssignmentCardGridScreen: React.FC = () => {

    const renderCard = ({ item }: { item: Assignment }) => <AssignmentCard item={item} />;

    return (
        <View style={styles.screenContainer}>
         
            <View style={styles.backgroundWave} />
            
          
            <View style={[styles.contentContainer, {marginTop: 40}]}> 
                
              
                <View style={styles.contentHeader}>
                    <View>
                        <Text style={styles.mainTitle}>Assignment List</Text>
                       
                    </View>
                    <View style={styles.actionButtons}>
                      
                        <TouchableOpacity style={styles.addButton}>
                            <Feather name="plus" size={20} color="#fff" />
                        </TouchableOpacity>
                   
                        <TouchableOpacity style={styles.filterButton}>
                            <Feather name="filter" size={16} color="#fff" />
                            <Text style={styles.filterButtonText}> Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>

             
                <FlatList
                    data={assignments}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.id}
                    numColumns={NUM_COLUMNS}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.cardList}
                />

           
                <View style={styles.bottomPagination}>
                    <View style={styles.paginationButtons}>
                        <Text style={styles.paginationText}>&lt; previous</Text>
                        <Text style={styles.paginationNumber}>1</Text>
                        <Text style={styles.paginationNumberActive}>2</Text>
                        <Text style={styles.paginationNumber}>3</Text>
                        <Text style={styles.paginationText}>next &gt;</Text>
                    </View>
                </View>
                <Text style={styles.footerText}>techtown</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8', 
    },
    backgroundWave: {
        backgroundColor: '#e6e0f8', 
        height: '100%',
        width: '100%',
        position: 'absolute',
        opacity: 0.8,
    },
    
    contentContainer: {
        flex: 1,
        padding: 30,
        backgroundColor: '#fff', 
        margin: 20, 
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#ff6666', // Red/Orange color (Add button)
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    filterButton: {
        backgroundColor: '#a64dff', // Purple color (Filter button)
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },

    cardList: {
        paddingVertical: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 15,
        marginHorizontal: -5,
    },
    card: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    initialCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5, 
    },
    statusText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    cardBody: {
        marginTop: 5,
    },
    assignmentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    assignmentDetail: {
        fontSize: 12,
        color: '#999',
        marginBottom: 8,
    },
    assignmentDate: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    countLabel: {
        fontSize: 14,
        color: '#666',
    },

    bottomPagination: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
        paddingRight: 10,
    },
    paginationButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paginationText: {
        fontSize: 14,
        color: '#999',
        marginHorizontal: 8,
    },
    paginationNumber: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        fontSize: 14,
        color: '#999',
    },
    paginationNumberActive: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#a64dff',
        borderWidth: 1,
        borderColor: '#a64dff',
        borderRadius: 4,
    },
    footerText: {
        fontSize: 12,
        color: '#ccc',
        textAlign: 'center',
        marginTop: 20,
    }
});

export default AssignmentCardGridScreen;