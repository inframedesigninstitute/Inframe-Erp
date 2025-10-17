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
      case 'In progress': return { color: '#ffb300' };
      case 'To do': return { color: '#7a70fa' };
      case 'Done': return { color: '#4CAF50' };
      default: return { color: '#333' };
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My tasks</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

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

      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllButtonText}>View all tasks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#f3f6fb',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#b0bec5',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },taskList: {
  // optional: you can add spacing if needed
  marginBottom: 10,
},

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d1b2a',
    textShadowColor: '#e0e0e0',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  addButton: {
    backgroundColor: '#7a70fa',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#4a40d1',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  categoryTabs: {
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#e8ecf3',
    shadowColor: '#ffffff',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryButtonActive: {
    backgroundColor: '#dfe6fd',
    borderWidth: 1,
    borderColor: '#b6c3ff',
    shadowColor: '#cfd8dc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  categoryButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#2a2a72',
    fontWeight: '700',
  },
  taskItem: {
    backgroundColor: '#f4f7fc',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#cfd8dc',
    shadowOffset: { width: -3, height: -3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
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
    color: '#1b263b',
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    flex: 1,
    marginRight: 10,
  },
  taskStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusInProgress: {
    backgroundColor: '#fff8e1',
    shadowColor: '#ffecb3',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  statusTodo: {
    backgroundColor: '#ede9fe',
  },
  statusDone: {
    backgroundColor: '#e8f5e9',
  },
  taskStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  taskSubject: {
    fontSize: 13,
    color: '#607d8b',
    marginBottom: 10,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskDate: {
    fontSize: 12,
    color: '#555',
  },
  taskComments: {
    fontSize: 12,
    color: '#333',
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
  },
  progressBar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e0e0e0',
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#ffb300',
    borderRadius: 3,
    shadowColor: '#ffc107',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  viewAllButton: {
    marginTop: 15,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#e9edf7',
    shadowColor: '#fff',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 4,
  },
  viewAllButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a237e',
  },
});

export default MyTasksSection;
