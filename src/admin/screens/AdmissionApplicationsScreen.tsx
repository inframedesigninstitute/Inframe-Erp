// AdmissionApplicationsScreen.tsx
import { Check, ChevronDown, Download, FileText, Forward, Search, Share2, Trash2, X } from "lucide-react-native"
import { useState } from "react"
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { Appbar, Button, Card, Chip, Divider, Menu, TextInput } from "react-native-paper"

// --- TYPES & MOCK DATA ---

interface Application {
  id: string
  registrationNo: string
  name: string
  gender: string
  program: string
  applyDate: string
  status: "Pending" | "Approved" | "Rejected"
}

const mockApplications: Application[] = [
  {
    id: "1",
    registrationNo: "#10000015",
    name: "temidayo dsdds",
    gender: "Male",
    program: "Civil Engineering",
    applyDate: "28-10-2025",
    status: "Pending",
  },
  {
    id: "2",
    registrationNo: "#10000014",
    name: "cc dzsvcdzz",
    gender: "Male",
    program: "B.pharmacy",
    applyDate: "25-10-2025",
    status: "Pending",
  },
  {
    id: "3",
    registrationNo: "#10000013",
    name: "anuj kumar",
    gender: "Male",
    program: "B.pharmacy",
    applyDate: "22-10-2025",
    status: "Pending",
  },
  {
    id: "4",
    registrationNo: "#10000012",
    name: "Nyeneime udoh",
    gender: "Male",
    program: "Computer Engineering",
    applyDate: "13-10-2025",
    status: "Rejected",
  },
  {
    id: "5",
    registrationNo: "#10000011",
    name: "Iona Craft",
    gender: "Male",
    program: "Macro Economics",
    applyDate: "11-10-2025",
    status: "Pending",
  },
  {
    id: "6",
    registrationNo: "#10000010",
    name: "May Matthews",
    gender: "Female",
    program: "Computer Engineering",
    applyDate: "11-10-2025",
    status: "Pending",
  },
  {
    id: "7",
    registrationNo: "#10000009",
    name: "John Williams",
    gender: "Male",
    program: "Civil Engineering",
    applyDate: "11-10-2025",
    status: "Approved",
  },
  {
    id: "8",
    registrationNo: "#10000008",
    name: "bhagwant singh",
    gender: "Male",
    program: "English Studies",
    applyDate: "07-10-2025",
    status: "Rejected",
  },
]

const PROGRAMS = [
  "All",
  "Accounting And Finance",
  "Auditing",
  "B.pharmacy",
  "Civil Engineering",
  "Computer Engineering",
  "Computer Science",
  "Contemporary Design",
  "English Studies",
  "Fine Arts and Design",
  "Macro Economics",
  "Marketing",
  "Maths For Finanace",
  "Mechanical Engineering",
  "Pricnciple of Accounting 1",
  "Social Sciences",
  "Test 11",
]

const STATUSES = ["All", "Pending", "Approved", "Rejected"]

// --- STYLES ---

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerIndicator: {
    width: 4,
    height: 28,
    backgroundColor: "#06b6d4",
    borderRadius: 2,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginLeft: 12,
    marginBottom: 16,
  },
  // Filter Section
  filterCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#fff",
  },
  filterRow: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 4,
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  selectText: {
    flex: 1,
    color: "#1e293b",
  },
  dateInput: {
    height: 40,
    paddingLeft: 12,
    backgroundColor: "#fff",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    borderRadius: 6,
  },
  searchButton: {
    borderRadius: 6,
    height: 40,
    backgroundColor: "#06b6d4",
  },
  // Action Buttons
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  actionButton: {
    borderColor: "#a5f3fc",
    borderWidth: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    minWidth: 40,
  },
  actionButtonContent: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  // Stats Section
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
  statCard: {
    width: "48%", // For 2 columns on smaller screens
    padding: 12,
    borderRadius: 8,
    elevation: 1,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },
  // Table
  tableCard: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#fff",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#06b6d4", // Cyan background
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    flex: 1,
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  tableRowText: {
    flex: 1,
    fontSize: 13,
    color: "#334155",
  },
  statusChip: {
    height: 24,
    alignSelf: "flex-start",
    paddingHorizontal: 0,
  },
  actionsCell: {
    flexDirection: "row",
    gap: 4,
  },
  actionButtonSmall: {
    padding: 6,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 8,
  },
  // Table Cell widths (Approximation for layout)
  colRegNo: { width: 90 },
  colName: { width: 120 },
  colGender: { width: 70 },
  colProgram: { width: 120 },
  colDate: { width: 80 },
  colStatus: { width: 80 },
  colActions: { width: 150 },
  tableRowContent: {
    flexDirection: 'row',
    width: 760, // Total width of all columns for horizontal scroll
    alignItems: 'center',
  },
  tableHeaderContent: {
    flexDirection: 'row',
    width: 760,
  }
})

// Custom Hook for Menu state
const useMenu = (initialValue = false) => {
  const [visible, setVisible] = useState(initialValue)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)
  return { visible, openMenu, closeMenu }
}

// --- COMPONENTS ---

const getStatusColor = (status: Application["status"]) => {
  switch (status) {
    case "Approved":
      return { background: "#ecfdf5", text: "#059669", border: "#a7f3d0" }
    case "Rejected":
      return { background: "#fee2e2", text: "#ef4444", border: "#fecaca" }
    case "Pending":
      return { background: "#eff6ff", text: "#3b82f6", border: "#bfdbfe" }
    default:
      return { background: "#f3f4f6", text: "#6b7280", border: "#e5e7eb" }
  }
}

const StatsSection = ({ applications }: { applications: Application[] }) => {
  const total = applications.length
  const pending = applications.filter((a) => a.status === "Pending").length
  const approved = applications.filter((a) => a.status === "Approved").length
  const rejected = applications.filter((a) => a.status === "Rejected").length

  const stats = [
    { title: "Total Applications", value: total, color: "#1e293b" },
    { title: "Pending", value: pending, color: "#3b82f6" },
    { title: "Approved", value: approved, color: "#059669" },
    { title: "Rejected", value: rejected, color: "#ef4444" },
  ]

  // Adjust card width for tablet/web view
  const { width } = Dimensions.get('window');
  // Fix: Assign number or valid string to width
  const cardWidth = width > 768 ? '23%' : '48%';

  return (
    <View style={styles.statsContainer}>
      {stats.map((stat, index) => (
        // Fix: Use a valid dimension value
        <Card key={index} style={[styles.statCard, { width: cardWidth }]}>
          <Text style={styles.statTitle}>{stat.title}</Text>
          <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
        </Card>
      ))}
    </View>
  )
}

const ApplicationsTable = ({
  applications,
  onApprove,
  onReject,
  onDelete,
}: {
  applications: Application[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
}) => {

  const TableHeader = () => (
    <View style={styles.tableHeaderRow}>
      <ScrollView horizontal>
        <View style={styles.tableHeaderContent}>
          <Text style={[styles.tableHeaderCell, { width: 30 }]}>#</Text>
          <Text style={[styles.tableHeaderCell, styles.colRegNo]}>Reg. No</Text>
          <Text style={[styles.tableHeaderCell, styles.colName]}>Name</Text>
          <Text style={[styles.tableHeaderCell, styles.colGender]}>Gender</Text>
          <Text style={[styles.tableHeaderCell, styles.colProgram]}>Program</Text>
          <Text style={[styles.tableHeaderCell, styles.colDate]}>Apply Date</Text>
          <Text style={[styles.tableHeaderCell, styles.colStatus]}>Status</Text>
          <Text style={[styles.tableHeaderCell, styles.colActions]}>Action</Text>
        </View>
      </ScrollView>
    </View>
  )

  const renderItem = ({ item, index }: { item: Application; index: number }) => {
    const statusStyle = getStatusColor(item.status)

    return (
      <View style={styles.tableRow}>
        <ScrollView horizontal>
          <View style={styles.tableRowContent}>
            <Text style={[styles.tableRowText, { width: 30 }]}>{index + 1}</Text>
            <Text style={[styles.tableRowText, styles.colRegNo, { fontWeight: "600" }]}>{item.registrationNo}</Text>
            <Text style={[styles.tableRowText, styles.colName]}>{item.name}</Text>
            <Text style={[styles.tableRowText, styles.colGender]}>{item.gender}</Text>
            <Text style={[styles.tableRowText, styles.colProgram]}>{item.program}</Text>
            <Text style={[styles.tableRowText, styles.colDate]}>{item.applyDate}</Text>
            <View style={[styles.colStatus, { justifyContent: 'center' }]}>
              <Chip
                style={[
                  styles.statusChip,
                  { backgroundColor: statusStyle.background, borderColor: statusStyle.border, borderWidth: 1 },
                ]}
                textStyle={{ color: statusStyle.text, fontSize: 11, fontWeight: "600" }}
              >
                {item.status}
              </Chip>
            </View>
            <View style={[styles.actionsCell, styles.colActions]}>
              {item.status !== "Approved" && (
                <TouchableOpacity
                  onPress={() => onApprove(item.id)}
                  style={[styles.actionButtonSmall, { backgroundColor: "#ecfdf5" }]}
                >
                  <Check size={16} color="#059669" />
                </TouchableOpacity>
              )}
              {item.status === "Approved" && (
                <View style={[styles.actionButtonSmall, { backgroundColor: "#ecfdf5" }]}>
                  <Check size={16} color="#059669" />
                </View>
              )}

              <TouchableOpacity
                style={[styles.actionButtonSmall, { backgroundColor: "#eff6ff" }]}
                onPress={() => { /* Handle Forward */ }}
              >
                <Forward size={16} color="#3b82f6" />
              </TouchableOpacity>

              {item.status !== "Rejected" && (
                <TouchableOpacity
                  onPress={() => onReject(item.id)}
                  style={[styles.actionButtonSmall, { backgroundColor: "#fee2e2" }]}
                >
                  <X size={16} color="#ef4444" />
                </TouchableOpacity>
              )}
              {item.status === "Rejected" && (
                <View style={[styles.actionButtonSmall, { backgroundColor: "#fee2e2" }]}>
                  <X size={16} color="#ef4444" />
                </View>
              )}

              <TouchableOpacity
                onPress={() => onDelete(item.id)}
                style={[styles.actionButtonSmall, { backgroundColor: "#fef2f2" }]}
              >
                <Trash2 size={16} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

  return (
    <Card style={styles.tableCard}>
      <TableHeader />
      {applications.length > 0 ? (
        <FlatList
          data={applications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListFooterComponent={<Divider />}
        />
      ) : (
        <View style={styles.emptyState}>
          <FileText size={48} color="#cbd5e1" />
          <Text style={styles.emptyText}>No applications found</Text>
          <Text style={{ color: "#94a3b8", fontSize: 13 }}>Try adjusting your filters</Text>
        </View>
      )}
    </Card>
  )
}

const FilterSection = ({
  programFilter,
  statusFilter,
  fromDate,
  toDate,
  searchTerm,
  onProgramChange,
  onStatusChange,
  onFromDateChange,
  onToDateChange,
  onSearchChange,
  onSearch,
}: {
  programFilter: string
  statusFilter: string
  fromDate: string
  toDate: string
  searchTerm: string
  onProgramChange: (value: string) => void
  onStatusChange: (value: string) => void
  onFromDateChange: (value: string) => void
  onToDateChange: (value: string) => void
  onSearchChange: (value: string) => void
  onSearch: () => void
}) => {
  // Menu state for Program Select
  const programMenu = useMenu()
  const statusMenu = useMenu()

  // Grid layout for filters
  const { width } = Dimensions.get('window');
  const isLargeScreen = width > 768;
  
  // FIX 1: Ensure styles are valid ViewStyle objects for dynamic assignment.
  const filterStyle: ViewStyle = isLargeScreen ? { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    gap: 12 as any // Casting 'gap' to any to avoid TS issues with RN style compatibility
  } : {};
  
  const itemStyle: ViewStyle = isLargeScreen ? { width: '30%', minWidth: 150 } : {};
  
  // FIX 1: Ensure Search button style is correct for dynamic assignment
  const searchButtonStyle: ViewStyle = isLargeScreen ? { alignSelf: 'flex-end', width: '20%', minWidth: 100 } : {};

  return (
    <Card style={styles.filterCard}>
      <View style={[filterStyle]}>
        {/* Program Filter */}
        <View style={[styles.filterRow, itemStyle]}>
          <Text style={styles.filterLabel}>Program</Text>
          <Menu
            visible={programMenu.visible}
            onDismiss={programMenu.closeMenu}
            anchor={
              <TouchableOpacity onPress={programMenu.openMenu} style={styles.selectContainer}>
                <Text style={styles.selectText}>{programFilter}</Text>
                <ChevronDown size={16} color="#475569" />
              </TouchableOpacity>
            }
          >
            {PROGRAMS.map((program) => (
              <Menu.Item
                key={program}
                onPress={() => {
                  onProgramChange(program)
                  programMenu.closeMenu()
                }}
                title={program}
              />
            ))}
          </Menu>
        </View>

        {/* Status Filter */}
        <View style={[styles.filterRow, itemStyle]}>
          <Text style={styles.filterLabel}>Status</Text>
          <Menu
            visible={statusMenu.visible}
            onDismiss={statusMenu.closeMenu}
            anchor={
              <TouchableOpacity onPress={statusMenu.openMenu} style={styles.selectContainer}>
                <Text style={styles.selectText}>{statusFilter}</Text>
                <ChevronDown size={16} color="#475569" />
              </TouchableOpacity>
            }
          >
            {STATUSES.map((status) => (
              <Menu.Item
                key={status}
                onPress={() => {
                  onStatusChange(status)
                  statusMenu.closeMenu()
                }}
                title={status}
              />
            ))}
          </Menu>
        </View>

        {/* From Date */}
        <View style={[styles.filterRow, itemStyle]}>
          <Text style={styles.filterLabel}>From Date</Text>
          <TextInput
            mode="outlined"
            value={fromDate}
            onChangeText={onFromDateChange}
            style={styles.dateInput}
            outlineStyle={{ borderColor: "#e2e8f0", borderWidth: 1 }}
            right={<TextInput.Icon icon={() => <FileText size={16} color="#94a3b8" />} />}
          />
        </View>

        {/* To Date */}
        <View style={[styles.filterRow, itemStyle]}>
          <Text style={styles.filterLabel}>To Date</Text>
          <TextInput
            mode="outlined"
            value={toDate}
            onChangeText={onToDateChange}
            style={styles.dateInput}
            outlineStyle={{ borderColor: "#e2e8f0", borderWidth: 1 }}
            right={<TextInput.Icon icon={() => <FileText size={16} color="#94a3b8" />} />}
          />
        </View>

        {/* Registration No/Search Term */}
        <View style={[styles.filterRow, itemStyle]}>
          <Text style={styles.filterLabel}>Registration No</Text>
          <TextInput
            mode="outlined"
            placeholder="Search Name or Reg. No..."
            value={searchTerm}
            onChangeText={onSearchChange}
            style={styles.dateInput}
            outlineStyle={{ borderColor: "#e2e8f0", borderWidth: 1 }}
          />
        </View>

        {/* Search Button */}
        <Button
          mode="contained"
          onPress={onSearch}
          // FIX 1: Apply fixed style object for dynamic assignment
          style={[styles.searchButton, searchButtonStyle]}
          labelStyle={{ color: "#fff", marginVertical: 8 }}
          icon={() => <Search size={18} color="#fff" />}
        >
          {/* FIX 2: Add children prop to react-native-paper Button */}
          Search
        </Button>
      </View>
    </Card>
  )
}

// --- MAIN SCREEN COMPONENT ---

export function AdmissionApplicationsScreen() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [programFilter, setProgramFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [fromDate, setFromDate] = useState("10/30/2024")
  const [toDate, setToDate] = useState("10/30/2025")

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.registrationNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProgram = programFilter === "All" || app.program === programFilter
    const matchesStatus = statusFilter === "All" || app.status === statusFilter
    // Note: Date filtering is omitted as it requires a date library in React Native
    return matchesSearch && matchesProgram && matchesStatus
  })

  // --- Handlers ---
  const handleApprove = (id: string) => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, status: "Approved" } : app)))
  }

  const handleReject = (id: string) => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, status: "Rejected" } : app)))
  }

  const handleDelete = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id))
  }

  // A simple mock for the Search button action
  const handleSearch = () => {
    // Re-trigger filtering logic (already done via state update, but this is where an API call would go)
    console.log("Searching with filters:", { programFilter, statusFilter, fromDate, toDate, searchTerm })
  }

  return (
    <View style={styles.screen}>
      <Appbar.Header style={{ backgroundColor: "#06b6d4" }}>
        <Appbar.Content title="Admission Panel" titleStyle={{ color: "#fff" }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIndicator} />
          <Text style={styles.headerTitle}>Application List</Text>
        </View>
        <Text style={styles.headerSubtitle}>Manage and review student applications</Text>

        {/* Filter Section */}
        <FilterSection
          programFilter={programFilter}
          statusFilter={statusFilter}
          fromDate={fromDate}
          toDate={toDate}
          searchTerm={searchTerm}
          onProgramChange={setProgramFilter}
          onStatusChange={setStatusFilter}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <Button
            mode="outlined"
            onPress={() => console.log("Download")}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
            icon={() => <Download size={18} color="#06b6d4" />}
          >
            {/* FIX 2: Add children prop */}
            <Text style={{ color: "transparent" }}>{" "}</Text>
          </Button>
          <Button
            mode="outlined"
            onPress={() => console.log("Share")}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
            icon={() => <Share2 size={18} color="#06b6d4" />}
          >
            {/* FIX 2: Add children prop */}
            <Text style={{ color: "transparent" }}>{" "}</Text>
          </Button>
        </View>

        {/* Stats Section */}
        <StatsSection applications={applications} />

        {/* Applications Table */}
        <View style={{ marginTop: 16 }}>
          <ApplicationsTable
            applications={filteredApplications}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
          />
        </View>
      </ScrollView>
    </View>
  )
}