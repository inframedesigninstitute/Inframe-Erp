import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const MyNotesSection: React.FC = () => {
  return (
    <View style={styles.sectionContainer}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My notes</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View all</Text>
        </TouchableOpacity>
      </View>

      {/* Note Cards Container */}
      <View style={styles.notesRow}>
        {/* Note Card 1 (Yellow/Orange) */}
        <View style={[styles.noteCard, { backgroundColor: '#fffbe6' }]}>
          <Text style={styles.noteTitle}>Important</Text>
          <Text style={styles.noteContent}>
            Remember to take my biology book with me tomorrow for the lab class.
          </Text>
          <Icon name="bookmark" size={18} color="#FFC107" style={styles.noteIcon} />
        </View>

        {/* Note Card 2 (Blue) */}
        <View style={[styles.noteCard, { backgroundColor: '#e3f2fd' }]}>
          <Text style={styles.noteTitle}>English</Text>
          <Text style={styles.noteContent}>
            Check the grammar rules for passive voice before the test.
          </Text>
          <Icon name="file-text" size={18} color="#2196F3" style={styles.noteIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    padding: 5,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: '#7a70fa',
    fontWeight: '600',
  },
  notesRow: {
    flexDirection: width > 768 ? 'row' : 'column', // Side-by-side on wide screens
    justifyContent: 'space-between',
  },
  noteCard: {
    flex: width > 768 ? 0.48 : 1, // Takes half the space or full space
    borderRadius: 10,
    padding: 15,
    marginBottom: width > 768 ? 0 : 10, // Add bottom margin only on stacked (small) view
    position: 'relative',
    minHeight: 120,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 13,
    color: '#666',
    paddingRight: 30, // Make room for the icon
  },
  noteIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    opacity: 0.5, // Make the icon slightly transparent
  },
});

export default MyNotesSection;