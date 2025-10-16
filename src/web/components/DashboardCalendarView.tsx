import React, { useEffect, useMemo, useState } from 'react';

// --- I. Data Structures and Real Holiday Data ---

interface CalendarEvent {
  id: number;
  date: string; // YYYY-MM-DD
  title: string;
  color: 'green' | 'blue' | 'red' | 'highlight';
}

const realHolidays: CalendarEvent[] = [
  { id: 101, date: '2025-10-02', title: 'Gandhi Jayanti', color: 'red' },
  { id: 102, date: '2025-10-23', title: 'Dhanteras', color: 'highlight' },
  { id: 103, date: '2025-10-24', title: 'Choti Diwali', color: 'highlight' },
  { id: 104, date: '2025-10-25', title: 'Diwali', color: 'highlight' },
  { id: 105, date: '2025-10-26', title: 'Govardhan Puja', color: 'highlight' },
  { id: 106, date: '2025-10-27', title: 'Bhai Dooj', color: 'highlight' },
  { id: 201, date: '2025-10-17', title: 'Staff Meeting', color: 'blue' },
  { id: 202, date: '2025-10-22', title: 'Client Lunch', color: 'green' },
];

const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// --- II. Calendar Logic ---

interface DayData {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  fullDateString: string;
  events: CalendarEvent[];
}

const getMonthDays = (activeDate: Date, allEvents: CalendarEvent[]): DayData[] => {
  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();
  const today = new Date();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDayIndex = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  const days: DayData[] = [];

  const daysInPrevMonth = new Date(year, month, 0).getDate();
  for (let i = startDayIndex - 1; i >= 0; i--) {
    days.push({ date: daysInPrevMonth - i, isCurrentMonth: false, isToday: false, fullDateString: '', events: [] });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const fullDateString = `${year}-${String(month + 1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
    const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const events = allEvents.filter(event => event.date === fullDateString);
    days.push({ date: i, isCurrentMonth: true, isToday, fullDateString, events });
  }

  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ date: i, isCurrentMonth: false, isToday: false, fullDateString: '', events: [] });
  }

  return days;
};

// --- III. CalendarGrid Component ---

interface CalendarGridProps {
  days: DayData[];
  isFullView: boolean;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ days, isFullView }) => {
  const styles: { [key: string]: React.CSSProperties } = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '5px',
      backgroundColor: isFullView ? '#ddd' : 'transparent',
    },
    dayName: {
      textAlign: 'center',
      padding: '5px 0',
      backgroundColor: isFullView ? '#f0f0f0' : '#fff',
      fontWeight: 'bold',
      fontSize: isFullView ? '0.9em' : '0.55em',
      color: isFullView ? '#555' : '#777',
    },
    dayCell: {
      backgroundColor: isFullView ? '#fff' : '#f9f9f9',
      padding: isFullView ? '5px' : '2px',
      textAlign: 'right',
      position: 'relative',
      border: isFullView ? '1px solid #eee' : 'none',
      fontSize: isFullView ? '0.9em' : '0.55em',
      overflow: 'hidden',
    },
    dayNumber: { fontSize: isFullView ? '1.1em' : '0.6em', fontWeight: 'bold', display: 'block' },
    todayHighlight: { backgroundColor: isFullView ? '#fff3cd' : '#FFD70050', border: '2px solid #ffc107', borderRadius: 4 },
    prevNextMonth: { color: isFullView ? '#aaa' : '#ccc' },
    eventList: { display: isFullView ? 'block' : 'none' },
    eventBase: { fontSize: '0.75em', padding: '2px 5px', margin: '1px 0', borderRadius: 3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', lineHeight: 1.4 },
    eventGreen: { backgroundColor: '#e6ffed', color: '#38a169', borderLeft: '3px solid #38a169' },
    eventBlue: { backgroundColor: '#ebf8ff', color: '#4299e1', borderLeft: '3px solid #4299e1' },
    eventRed: { backgroundColor: '#fdeeed', color: '#e53e3e', borderLeft: '3px solid #e53e3e' },
    eventHighlight: { backgroundColor: '#fffbe5', color: '#dd6b20', borderLeft: '3px solid #dd6b20' },
  };

  return (
    <>
      <div style={styles.grid}>
        {dayNames.map(day => <div key={day} style={styles.dayName}>{day}</div>)}
      </div>
      <div style={styles.grid}>
        {days.map((day: DayData, index: number) => (
          <div key={index} style={{ ...styles.dayCell, ...(!day.isCurrentMonth ? styles.prevNextMonth : {}), ...(day.isToday ? styles.todayHighlight : {}) }}>
            <span style={styles.dayNumber}>{day.date}</span>
            <div style={styles.eventList}>
              {day.events.map((event: CalendarEvent) => {
                let eventStyle: React.CSSProperties = styles.eventBase;
                if (event.color === 'green') eventStyle = { ...styles.eventBase, ...styles.eventGreen };
                if (event.color === 'blue') eventStyle = { ...styles.eventBase, ...styles.eventBlue };
                if (event.color === 'red') eventStyle = { ...styles.eventBase, ...styles.eventRed };
                if (event.color === 'highlight') eventStyle = { ...styles.eventBase, ...styles.eventHighlight };
                return <div key={event.id} style={eventStyle}>{event.title}</div>;
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// --- IV. DashboardCalendarView Component ---

const DashboardCalendarView: React.FC = () => {
  const initialDate = new Date(2025, 9, 15);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDate, setActiveDate] = useState(initialDate);

  const handleMonthChange = (dir: number) => {
    setActiveDate(prev => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveDate(prev => new Date(parseInt(e.target.value), prev.getMonth(), 1));
  };

  const days = useMemo(() => getMonthDays(activeDate, realHolidays), [activeDate]);
  const currentMonthName = monthNames[activeDate.getMonth()];
  const currentYear = activeDate.getFullYear();

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);

  return (
    <>
      {/* Small 3D Calendar Card */}
      <div className="smallContainer" onClick={() => setIsModalOpen(true)} title="Click to see full calendar">
        <div style={{ textAlign: 'center', padding: 10, fontWeight: 900, borderBottom: '1px solid #eee', background: 'linear-gradient(180deg, #e0eafc 0%, #cfdef3 100%)' }}>
          {currentMonthName.toUpperCase()} {currentYear}
        </div>
        <CalendarGrid days={days} isFullView={false} />
      </div>

      {/* Modal Full Calendar */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: -50,
            left: -50,
            width: '80vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '10px', // Add small padding for mobile
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              width: '80%',
              height: '50%',
              borderRadius: 8,
              padding: 30,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',marginTop:-250
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                fontSize: 24,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>

            {/* Header with Month/Year Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <button onClick={() => handleMonthChange(-1)} style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: 4 }}>Prev Month</button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{currentMonthName} {currentYear}</span>
                <select value={currentYear} onChange={handleYearChange} style={{ padding: 5, borderRadius: 4 }}>
                  {[...Array(11)].map((_, i) => {
                    const year = 2020 + i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>

              <button onClick={() => handleMonthChange(1)} style={{ padding: '8px 15px', border: '1px solid #ccc', borderRadius: 4 }}>Next Month</button>
            </div>

            {/* Calendar Grid */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <CalendarGrid days={days} isFullView={true} />
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          smallContainer {
            width: 290px;
            height: 290px;
            overflow: hidden;
            border-radius: 16px;
            cursor: pointer;
            background-color: #f9f9f9;
            font-family: Roboto, sans-serif;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease-in-out;
          }
          smallContainer:hover {
            box-shadow: 0 15px 40px rgba(0,0,0,0.2), 0 7px 20px rgba(0,0,0,0.15);
            transform: translateY(-3px);
          }
        `}
      </style>
    </>
  );
};

export default DashboardCalendarView;
