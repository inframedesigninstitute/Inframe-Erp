import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  comments: number;
  status: 'All task' | 'To do' | 'In progress' | 'Done';
}

const dummyTasks: Task[] = [
  { id: '1', title: 'Read poem & answer questions', subject: 'English Literature', dueDate: 'Apr 28, 2025', comments: 12, status: 'In progress' },
  { id: '2', title: 'Create a comic strip with a story', subject: 'Social Studies', dueDate: 'May 17, 2025', comments: 0, status: 'To do' },
  { id: '3', title: 'Prepare for the math test', subject: 'Math', dueDate: 'May 11, 2025', comments: 2, status: 'To do' },
  { id: '4', title: 'Read poem & answer questions', subject: 'English Literature', dueDate: 'Apr 28, 2025', comments: 12, status: 'To do' },
  { id: '5', title: 'Read the chapter about plant and animal', subject: 'Biology', dueDate: 'Apr 22, 2025', comments: 3, status: 'To do' },
  { id: '6', title: 'Finish history essay', subject: 'History', dueDate: 'May 20, 2025', comments: 5, status: 'Done' },
];

const MyTasksSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Task['status'] | 'All task'>('All task');

  const filteredTasks = selectedCategory === 'All task'
    ? dummyTasks
    : dummyTasks.filter(task => task.status === selectedCategory);

  const getStatusStyle = (status: Task['status']) => {
    switch (status) {
      case 'In progress': return styles.statusInProgress;
      case 'To do': return styles.statusTodo;
      case 'Done': return styles.statusDone;
      default: return {};
    }
  };

  const getStatusTextStyle = (status: Task['status']) => {
    switch (status) {
      case 'In progress': return { color: '#ffb300' }; // Amber
      case 'To do': return { color: '#7a70fa' }; // Purple
      case 'Done': return { color: '#4CAF50' }; // Green
      default: return { color: '#333' };
    }
  };


  return (
    <View style={styles.sectionContainer}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My tasks</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All task', 'To do', 'In progress', 'Done'].map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category as Task['status'] | 'All task')}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Task List */}
      <View style={styles.taskList}>
        {filteredTasks.map(task => (
          <View key={task.id} style={styles.taskItem}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <View style={[styles.taskStatus, getStatusStyle(task.status as Task['status'])]}>
                <Text style={[styles.taskStatusText, getStatusTextStyle(task.status as Task['status'])]}>
                  {task.status}
                </Text>
              </View>
            </View>
            <Text style={styles.taskSubject}>{task.subject}</Text>
            <View style={styles.taskFooter}>
              <Text style={styles.taskDate}>{task.dueDate}</Text>
              {task.comments > 0 ? (
                <Text style={styles.taskComments}>{task.comments} comments</Text>
              ) : (
                <Text style={styles.taskNoComments}>No comments</Text>
              )}
            </View>
            {task.status === 'In progress' && (
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar} />
                <View style={styles.progressBarFill} />
              </View>
            )}
          </View>
        ))}
      </View>

      {/* View All Tasks Button */}
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllButtonText}>View all tasks</Text>
      </TouchableOpacity>
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
  addButton: {
    backgroundColor: '#7a70fa',
    borderRadius: 10,
    padding: 8,
  },
  categoryTabs: {
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#f0f2f5',
  },
  categoryButtonActive: {
    backgroundColor: '#f5f7fa', // A slightly different background for active, or border
    borderWidth: 1,
    borderColor: '#ccc', // A border to show active
  },
  categoryButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#333',
    fontWeight: '600',
  },
  taskList: {
    //
  },
  taskItem: {
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1, // Allow title to take available space
    marginRight: 10,
  },
  taskStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusInProgress: {
    backgroundColor: '#fffbe6', // Light yellow background
  },
  statusTodo: {
    backgroundColor: '#ede9fe', // Light purple background
  },
  statusDone: {
    backgroundColor: '#e8f5e9', // Light green background
  },
  taskStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  taskSubject: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskDate: {
    fontSize: 12,
    color: '#666',
  },
  taskComments: {
    fontSize: 12,
    color: '#666',
  },
  taskNoComments: {
    fontSize: 12,
    color: '#aaa',
  },
  progressBarContainer: {
    marginTop: 10,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: { // This is the base grey bar
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0, // Fill the whole container
    backgroundColor: '#e0e0e0', // Base grey
  },
  progressBarFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '60%', // Example: 60% progress
    backgroundColor: '#FFD700', // Gold color for progress
    borderRadius: 3,
  },
  viewAllButton: {
    marginTop: 15,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f0f2f5',
  },
  viewAllButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default MyTasksSection;