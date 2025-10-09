import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

type ClassItem = {
  code: string
  times: string[] // e.g., ["05:37 AM", "06:37 AM"]
  room: string
  instructor: string
}

type Day = {
  name: string
  classes: ClassItem[]
}

const DAYS: Day[] = [
  {
    name: 'Saturday',
    classes: [
      {
        code: 'EN105',
        times: ['05:37 AM', '06:37 AM'],
        room: 'Room: 205B',
        instructor: 'Emmanuel Harmon',
      },
      {
        code: 'MAT211',
        times: ['07:37 AM', '08:37 AM'],
        room: 'Room: 306A',
        instructor: 'Meredith Hancock',
      },
    ],
  },
  { name: 'Sunday', classes: [] },
  {
    name: 'Monday',
    classes: [
      {
        code: 'CSE607',
        times: ['05:38 AM', '06:38 AM'],
        room: 'Room: 202B',
        instructor: 'Daphne Padilla',
      },
      {
        code: 'PH308',
        times: ['06:38 AM', '07:38 AM'],
        room: 'Room: 305A',
        instructor: 'Zorita Rivas',
      },
    ],
  },
  { name: 'Tuesday', classes: [] },
  {
    name: 'Wednesday',
    classes: [
      {
        code: 'EN105',
        times: ['05:39 AM', '06:39 AM'],
        room: 'Room: 305A',
        instructor: 'Emmanuel Harmon',
      },
      {
        code: 'MAT211',
        times: ['06:39 AM', '07:39 AM'],
        room: 'Room: 205B',
        instructor: 'Daphne Padilla',
      },
    ],
  },
  { name: 'Thursday', classes: [] },
  { name: 'Friday', classes: [] },
]

const COLUMN_WIDTH = 160
const COLORS = {
  bg: '#e9f2ff',
  cardBg: '#ffffff',
  headerBlue: '#3ba0e6',
  tileBlue: '#2d8dd8',
  textDark: '#0f172a',
  textLight: '#ffffff',
  border: '#e6eef7',
}

function DayColumn({ day }: { day: Day }) {
  return (
    <View style={[styles.dayColumn, { width: COLUMN_WIDTH }]}>
      <View style={styles.dayHeader}>
        <Text numberOfLines={1} style={styles.dayHeaderText}>
          {day.name}
        </Text>
      </View>

      <View style={styles.dayBody}>
        {day.classes.length === 0 ? (
          <View style={styles.emptySlot} />
        ) : (
          day.classes.map((c, idx) => (
            <View key={c.code + idx} style={styles.classCard}>
              <Text style={styles.classCode}>{c.code}</Text>
              {c.times.map((t, i) => (
                <Text key={t + i} style={styles.classLine}>
                  {t}
                </Text>
              ))}
              <Text style={styles.classLine}>{c.room}</Text>
              <Text style={styles.classLine}>{c.instructor}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  )
}

export default function TimeTableScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.titleRow}>
          <View style={styles.titleAccent} />
          <Text style={styles.title}>Class Schedule</Text>
        </View>

        {/* Columns scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.columns}
        >
          {/* Continuous blue header bar effect */}
          <View style={[styles.headerRail, { width: COLUMN_WIDTH * DAYS.length }]}>
            {DAYS.map((d) => (
              <View
                key={d.name}
                style={[styles.headerRailCell, { width: COLUMN_WIDTH }]}
              />
            ))}
          </View>

          {/* Actual columns */}
          {DAYS.map((d) => (
            <DayColumn key={d.name} day={d} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff', // pure white background
    padding: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // white background
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#151618ff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        // shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
    }),
  },
  titleRow: {
    
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 12,
    backgroundColor: '#ffffffff', // white header
    borderRadius: 4, color:"#000", borderColor:"#000",
    borderBottomColor:"#000"
  },
  titleAccent: {
    width: 25,
    height: 24,
    backgroundColor: '#0a0a0aff', // white accent
    borderRadius: 2,
    marginRight: 8, 
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000', borderColor:"#000", 
  },
  columns: {
    paddingBottom: 30, borderRightWidth: 1,
    
  },
  headerRail: {
    position: 'absolute',
    top: 6,
    left: 8,
    right: 8,
    height: 36,
    backgroundColor: '#f1efefff', 
    borderRadius: 4,borderColor:"#000",  borderRightWidth: 1,
  },
  headerRailCell: {
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.1)',   
  },
  dayColumn: {
    marginTop: 2,
    marginHorizontal: 8, marginLeft:20

  },
  dayHeader: {
    backgroundColor: 'transparent',
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dayHeaderText: {
    color: '#000000', // black text
    fontWeight: '700',
    fontSize: 14,
  },
  dayBody: {
    paddingTop: 8,
    paddingBottom: 4,
    minHeight: 240,
    justifyContent: 'flex-start',
    gap: 10 as any,
  },
  emptySlot: {
    height: 120,
    borderWidth: 1,
    borderColor: '#000000ff',
    borderStyle: 'dashed',
    borderRadius: 6,
  },
  classCard: {
    backgroundColor: '#ffffff', // white card
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    minWidth: COLUMN_WIDTH + 16,
    borderWidth: 1,
    borderColor: '#000000ff',
  },
  classCode: {
    color: '#000000', // black text
    fontWeight: '700',
    marginBottom: 6,
    fontSize: 15,
  },
  classLine: {
    color: '#000000ff', // black text
    marginTop: 2,
    fontSize: 13,
  },
});
