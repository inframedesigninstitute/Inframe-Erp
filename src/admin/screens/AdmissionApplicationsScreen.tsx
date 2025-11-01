import { Picker } from "@react-native-picker/picker"; // npm install @react-native-picker/picker
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Row, Table } from "react-native-table-component"; // npm install react-native-table-component
import Icon from "react-native-vector-icons/Feather"; // npm install react-native-vector-icons

// --- Interface Definitions ---
interface Application {
  id: string
  registrationNo: string
  name: string
  gender: string
  program: string
  applyDate: string
  status: "Pending" | "Approved" | "Rejected"
}

// --- Mock Data ---
const mockApplications: Application[] = [
  { id: "1", registrationNo: "#10000015", name: "temidayo dsdds", gender: "Male", program: "Civil Engineering", applyDate: "28-10-2025", status: "Pending" },
  { id: "2", registrationNo: "#10000014", name: "cc dzsvcdzz", gender: "Male", program: "B.pharmacy", applyDate: "25-10-2025", status: "Pending" },
  { id: "3", registrationNo: "#10000013", name: "anuj kumar", gender: "Male", program: "B.pharmacy", applyDate: "22-10-2025", status: "Pending" },
  { id: "4", registrationNo: "#10000012", name: "Nyeneime udoh", gender: "Male", program: "Computer Engineering", applyDate: "13-10-2025", status: "Rejected" },
  { id: "5", registrationNo: "#10000011", name: "Iona Craft", gender: "Male", program: "Macro Economics", applyDate: "11-10-2025", status: "Pending" },
  { id: "6", registrationNo: "#10000010", name: "May Matthews", gender: "Female", program: "Computer Engineering", applyDate: "11-10-2025", status: "Pending" },
  { id: "7", registrationNo: "#10000009", name: "John Williams", gender: "Male", program: "Civil Engineering", applyDate: "11-10-2025", status: "Approved" },
  { id: "8", registrationNo: "#10000008", name: "bhagwant singh", gender: "Male", program: "English Studies", applyDate: "07-10-2025", status: "Rejected" },
]

const PROGRAMS = [
  "All", "Accounting And Finance", "Auditing", "B.pharmacy", "Civil Engineering",
  "Computer Engineering", "Computer Science", "Contemporary Design", "English Studies",
  "Fine Arts and Design", "Macro Economics", "Marketing", "Maths For Finanace",
  "Mechanical Engineering", "Pricnciple of Accounting 1", "Social Sciences", "Test 11",
]

// --- Helper Components (Mocking UI Libraries) ---

const Card: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => (
  <View style={[styles.cardBase, style]}>{children}</View>
)

const CustomButton: React.FC<{
  onPress: () => void
  children: React.ReactNode
  style?: any
  variant?: "primary" | "outline"
  size?: "sm"
}> = ({ onPress, children, style, variant = "primary" }) => {
  const buttonStyle = [
    styles.buttonBase,
    variant === "primary" ? styles.buttonPrimary : styles.buttonOutline,
    style,
  ]
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {children}
    </TouchableOpacity>
  )
}

const CustomInput: React.FC<{
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  style?: any
  icon?: string
}> = ({ placeholder, value, onChangeText, style, icon }) => (
  <View style={styles.inputContainer}>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.inputBase, style]}
      placeholderTextColor="#94a3b8"
    />
    {icon && (
      <Icon name={icon} size={16} color="#94a3b8" style={styles.inputIcon} />
    )}
  </View>
)

const getStatusColorStyles = (status: Application["status"]) => {
  switch (status) {
    case "Approved": return { view: { backgroundColor: "#d1fae5", borderColor: "#a7f3d0" }, text: { color: "#047857" } }
    case "Rejected": return { view: { backgroundColor: "#fee2e2", borderColor: "#fecaca" }, text: { color: "#b91c1c" } }
    case "Pending": return { view: { backgroundColor: "#dbeafe", borderColor: "#bfdbfe" }, text: { color: "#1d4ed8" } }
    default: return { view: { backgroundColor: "#f3f4f6" }, text: { color: "#4b5563" } }
  }
}

const Badge: React.FC<{ children: React.ReactNode; status: Application["status"] }> = ({ children, status }) => {
  const badgeStyles = getStatusColorStyles(status)
  return (
    <View style={[styles.badgeBase, badgeStyles.view]}>
      <Text style={[styles.badgeText, badgeStyles.text]}>{children}</Text>
    </View>
  )
}

// --- Main Components Logic Integrated ---

// 1. StatsSection
const StatsSection: React.FC<{ applications: Application[] }> = ({ applications }) => {
  return (
    <View style={styles.statsContainer}>
      <Card style={styles.statCard}>
        <Text style={styles.statLabel}>Total Applications</Text>
        <Text style={[styles.statValue, styles.statValueTotal]}>{applications.length}</Text>
      </Card>
      <Card style={styles.statCard}>
        <Text style={styles.statLabel}>Pending</Text>
        <Text style={[styles.statValue, styles.statValuePending]}>
          {applications.filter((a) => a.status === "Pending").length}
        </Text>
      </Card>
      <Card style={styles.statCard}>
        <Text style={styles.statLabel}>Approved</Text>
        <Text style={[styles.statValue, styles.statValueApproved]}>
          {applications.filter((a) => a.status === "Approved").length}
        </Text>
      </Card>
      <Card style={styles.statCard}>
        <Text style={styles.statLabel}>Rejected</Text>
        <Text style={[styles.statValue, styles.statValueRejected]}>
          {applications.filter((a) => a.status === "Rejected").length}
        </Text>
      </Card>
    </View>
  )
}

// 2. FilterSection
const FilterSection: React.FC<{
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
}> = (props) => {
  const ProgramItems = PROGRAMS.map((program) => ({ label: program, value: program }))
  const StatusItems = [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
  ]

  return (
    <Card style={styles.filterCard}>
      <View style={styles.filterContent}>
        <View style={styles.filterGrid}>
          {/* Program Filter */}
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>Program</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={props.programFilter}
                onValueChange={props.onProgramChange}
                style={styles.pickerStyle}
              >
                {ProgramItems.map((item) => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Status Filter */}
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>Status</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={props.statusFilter}
                onValueChange={props.onStatusChange}
                style={styles.pickerStyle}
              >
                {StatusItems.map((item) => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              </Picker>
            </View>
          </View>

          {/* From Date */}
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>From Date</Text>
            <CustomInput
              value={props.fromDate}
              onChangeText={props.onFromDateChange}
              icon="file-text"
            />
          </View>

          {/* To Date */}
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>To Date</Text>
            <CustomInput
              value={props.toDate}
              onChangeText={props.onToDateChange}
              icon="file-text"
            />
          </View>

          {/* Registration No */}
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>Registration No</Text>
            <CustomInput
              placeholder="Search..."
              value={props.searchTerm}
              onChangeText={props.onSearchChange}
            />
          </View>

          {/* Search Button */}
          <View style={styles.searchButtonWrapper}>
            <CustomButton onPress={props.onSearch} style={styles.searchButton}>
              <Icon name="search" size={16} color="#fff" />
              <Text style={styles.searchButtonText}>Search</Text>
            </CustomButton>
          </View>
        </View>
      </View>
    </Card>
  )
}

// 3. ApplicationsTable
const ApplicationsTable: React.FC<{
  applications: Application[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onDelete: (id: string) => void
}> = ({ applications, onApprove, onReject, onDelete }) => {
  const tableHead = [
    "#",
    "Registration No",
    "Name",
    "Gender",
    "Program",
    "Apply Date",
    "Status",
    "Action",
  ]
  const columnWidths = [40, 120, 150, 80, 150, 100, 80, 200]

  const tableData = applications.map((app, index) => {
    // Action Cell Component
    const actionElement = (
      <View style={styles.actionCellContainer}>
        {/* Approve Button */}
        <TouchableOpacity
          onPress={() => onApprove(app.id)}
          disabled={app.status === "Approved"}
          style={[styles.actionButton, styles.actionApprove, app.status === "Approved" && styles.actionDisabled]}
        >
          <Icon name="check" size={16} color="#059669" />
        </TouchableOpacity>

        {/* Forward Button */}
        <TouchableOpacity style={[styles.actionButton, styles.actionForward]}>
          <Icon name="arrow-right" size={16} color="#2563eb" />
        </TouchableOpacity>

        {/* Reject Button */}
        <TouchableOpacity
          onPress={() => onReject(app.id)}
          disabled={app.status === "Rejected"}
          style={[styles.actionButton, styles.actionReject, app.status === "Rejected" && styles.actionDisabled]}
        >
          <Icon name="x" size={16} color="#dc2626" />
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity onPress={() => onDelete(app.id)} style={[styles.actionButton, styles.actionDelete]}>
          <Icon name="trash-2" size={16} color="#dc2626" />
        </TouchableOpacity>
      </View>
    )

    return [
      (index + 1).toString(),
      app.registrationNo,
      app.name,
      app.gender,
      app.program,
      app.applyDate,
      <Badge key={`badge-${app.id}`} status={app.status}>
        {app.status}
      </Badge>,
      actionElement,
    ]
  })

  return (
    <Card style={styles.tableCard}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={styles.tableBorder}>
            {/* Table Header */}
            <Row
              data={tableHead}
              widthArr={columnWidths}
              style={styles.tableHeaderRow}
              textStyle={styles.tableHeaderText}
            />
          </Table>
          <ScrollView style={styles.tableDataWrapper}>
            <Table borderStyle={styles.tableBorder}>
              {/* Table Body */}
              {applications.length > 0 ? (
                tableData.map((rowData, rowIndex) => (
                  <Row
                    key={rowIndex}
                    data={rowData}
                    widthArr={columnWidths}
                    style={[styles.tableDataRow, rowIndex % 2 ? { backgroundColor: "#f8fafc" } : {}]}
                    textStyle={styles.tableRowText}
                  />
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Icon name="file-text" size={48} color="#cbd5e1" style={styles.emptyIcon} />
                  <Text style={styles.emptyTextPrimary}>No applications found</Text>
                  <Text style={styles.emptyTextSecondary}>Try adjusting your filters</Text>
                </View>
              )}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </Card>
  )
}

// --- Main Screen Component ---
export function AdmissionApplicationsScreen() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [programFilter, setProgramFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [fromDate, setFromDate] = useState("10/30/2024")
  const [toDate, setToDate] = useState("10/30/2025")

  // --- Filtering Logic ---
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.registrationNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProgram = programFilter === "All" || app.program === programFilter
    const matchesStatus = statusFilter === "All" || app.status === statusFilter
    return matchesSearch && matchesProgram && matchesStatus
  })

  // --- Action Handlers ---
  const handleApprove = (id: string) => {
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, status: "Approved" } : app))
    )
  }

  const handleReject = (id: string) => {
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, status: "Rejected" } : app))
    )
  }

  const handleDelete = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id))
  }

  const handleSearch = () => {
    console.log("Applying filters and searching...")
  }

  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.mainContentArea}>
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <View style={styles.titleDivider}></View>
            <Text style={styles.titleText}>Application List</Text>
          </View>
          <Text style={styles.subtitleText}>Manage and review student applications</Text>
        </View>

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

        <View style={styles.actionButtonsRow}>
          <CustomButton onPress={() => console.log("Download")} variant="outline" style={styles.downloadButton}>
            <Icon name="download" size={16} color="#0891b2" style={{ marginRight: 4 }} />
          </CustomButton>
          <CustomButton onPress={() => console.log("Share")} variant="outline" style={styles.downloadButton}>
            <Icon name="share-2" size={16} color="#0891b2" style={{ marginRight: 4 }} />
          </CustomButton>
        </View>

        <ApplicationsTable
          applications={filteredApplications}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />

        <StatsSection applications={applications} />
      </View>
    </ScrollView>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: "#f8fafc" },
  contentContainer: { padding: 16 },
  mainContentArea: { width: '100%', maxWidth: 900, alignSelf: 'center' },
  cardBase: {
    backgroundColor: "#fff", borderRadius: 8, shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3,
    elevation: 2, borderWidth: 0,
  },
  buttonBase: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 6, height: 40, paddingHorizontal: 16 },
  buttonPrimary: { backgroundColor: "#06b6d4" },
  buttonOutline: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#e0f7fa" },
  inputContainer: { position: "relative", justifyContent: "center", height: 40 },
  inputBase: {
    borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 6, backgroundColor: "#fff", height: 40,
    paddingHorizontal: 12, paddingRight: 36, fontSize: 14, color: "#0f172a",
  },
  inputIcon: { position: "absolute", right: 12 },

  header: { marginBottom: 24 },
  headerTitleContainer: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  titleDivider: { width: 4, height: 32, backgroundColor: "#06b6d4", borderRadius: 9999, marginRight: 12 },
  titleText: { fontSize: 26, fontWeight: "700", color: "#0f172a" },
  subtitleText: { color: "#475569", marginLeft: 16, fontSize: 14 },

  filterCard: { marginBottom: 24 },
  filterContent: { padding: 16 },
  filterGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 16 },
  filterItem: { width: width > 600 ? "30%" : "48%", minWidth: 150 },
  filterLabel: { fontSize: 14, fontWeight: "500", color: "#334155", marginBottom: 4 },
  pickerWrapper: {
    borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 6, backgroundColor: "#fff", height: 40,
    overflow: "hidden", justifyContent: "center",
  },
  pickerStyle: { height: 40, width: "100%" },
  searchButtonWrapper: { width: width > 600 ? "15%" : "48%", minWidth: 100, justifyContent: "flex-end" },
  searchButton: { backgroundColor: "#06b6d4", height: 40 },
  searchButtonText: { color: "#fff", fontWeight: "600", fontSize: 14, marginLeft: 8 },

  actionButtonsRow: { flexDirection: "row", gap: 8, marginBottom: 24 },
  downloadButton: {
    backgroundColor: "transparent", borderColor: "#a7f3d0", borderWidth: 1, paddingVertical: 8,
    paddingHorizontal: 12, height: 38,
  },

  tableCard: { overflow: "hidden" },
  tableBorder: { borderWidth: 1, borderColor: "#f1f5f9" },
  tableHeaderRow: { height: 50, backgroundColor: "#06b6d4" },
  tableHeaderText: { marginHorizontal: 12, color: "#fff", fontSize: 13, fontWeight: "600", textAlign: "left" },
  tableDataWrapper: { minHeight: 150 },
  tableDataRow: { height: 60, backgroundColor: "#fff" },
  tableRowText: { marginHorizontal: 12, fontSize: 13, color: "#475569", textAlign: "left" },

  badgeBase: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16, alignSelf: "flex-start", borderWidth: 1 },
  badgeText: { fontSize: 12, fontWeight: "600" },

  actionCellContainer: { flexDirection: "row", gap: 4, alignItems: "center" },
  actionButton: { padding: 8, borderRadius: 8 },
  actionApprove: { backgroundColor: "#d1fae5" },
  actionForward: { backgroundColor: "#dbeafe" },
  actionReject: { backgroundColor: "#fee2e2" },
  actionDelete: { backgroundColor: "#fee2e2" },
  actionDisabled: { opacity: 0.4 },

  emptyState: {
    width: width > 900 ? 900 : width - 32, alignItems: "center", justifyContent: "center", paddingVertical: 48,
  },
  emptyIcon: { marginBottom: 16 },
  emptyTextPrimary: { color: "#64748b", fontWeight: "500" },
  emptyTextSecondary: { color: "#94a3b8", fontSize: 12 },

  statsContainer: { marginTop: 24, flexDirection: "row", flexWrap: "wrap", gap: 16, justifyContent: "space-between" },
  statCard: { padding: 16, width: width > 600 ? "23%" : "48%", minWidth: 140, marginBottom: 8 },
  statLabel: { color: "#475569", fontSize: 14, fontWeight: "500" },
  statValue: { fontSize: 24, fontWeight: "700", marginTop: 8 },
  statValueTotal: { color: "#0f172a" },
  statValuePending: { color: "#2563eb" },
  statValueApproved: { color: "#059669" },
  statValueRejected: { color: "#dc2626" },
})

export default AdmissionApplicationsScreen