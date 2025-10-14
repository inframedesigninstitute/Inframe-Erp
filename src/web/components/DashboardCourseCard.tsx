import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface DashboardCourseCardProps {
  category: string;
  title: string;
  progress: number; 
  lessons: string;
  participants: number;
  backgroundColor: string;
  participantAvatars: any[]; 
  style?: ViewStyle; 
}

const DashboardCourseCard: React.FC<DashboardCourseCardProps> = ({
  category,
  title,
  progress,
  lessons,
  participants,
  backgroundColor,
  participantAvatars,
  style,
}) => {
  const isDarkCard = backgroundColor === '#1E1E1E';
  const progressPercent = progress * 100;

  const BookmarkIcon = () => (
    <Text style={[styles.bookmarkIcon, { color: isDarkCard ? '#FFF' : '#FFF' }]}>
      🔖
    </Text>
  );

  return (
    <View style={[styles.card, { backgroundColor }, style]}>
      {/* Header */}
      <View>
        <View style={styles.header}>
          <Text style={styles.tag}>{category}</Text>
          <BookmarkIcon />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Progress */}
      <View>
        <Text style={styles.progressLabel}>Progress</Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBar,
              { width: `${progressPercent}%`, backgroundColor: isDarkCard ? '#FFF' : '#FFF' },
            ]}
          />
        </View>
        <Text style={styles.lessonsInfo}>{lessons}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.profileIcons}>
          <View style={styles.avatarGroup}>
            {participantAvatars.slice(0, 3).map((source, index) => (
              <Image
                key={index}
                source={source}
                style={[styles.avatar, { marginLeft: index > 0 ? -10 : 0 }]}
              />
            ))}
          </View>
          <View style={styles.plusCountBadge}>
            <Text style={styles.plusCountText}>+{participants}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  card: {
    width: 250, // fixed width for multiple cards
    padding: 20,
    borderRadius: 20,
    minHeight: 250,
    justifyContent: 'space-between',
    marginRight: 15, // spacing between cards
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  bookmarkIcon: {
    fontSize: 20,
    marginTop: -5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 26,
    marginBottom: 15,
  },
  progressLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 5,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  lessonsInfo: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'right',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  profileIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#CCC',
  },
  plusCountBadge: {
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },
  plusCountText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
  },
  continueButton: {
    backgroundColor: '#A3FF3C',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default DashboardCourseCard;
