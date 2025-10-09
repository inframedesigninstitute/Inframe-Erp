import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MarqueeText from "../components/MarqueeText";

export default function Topbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = ["English", "Hindi", "French", "Spanish"];

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const selectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.topbar}>
      {/* Left actions */}
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.menuIcon}>
          <Icon name="menu" size={24} color={"#000"} />
        </TouchableOpacity>
        <Text style={styles.brand}>
          inframe School of Art, Design and Business
        </Text>
      </View>

      {/* Center notice */}
      <View style={styles.centerSection}>
        <MarqueeText
          text="⚠ Welcome to Inframe School"
          speed={150}
          textStyle={styles.marqueeText}
          containerStyle={styles.marqueeContainer}
        />
      </View>

      {/* Right actions */}
      <View style={styles.rightSection}>
        {/* Language Dropdown */}
        <View style={styles.languageContainer}>
          <TouchableOpacity onPress={toggleDropdown} style={styles.languageBadge}>
            <Text style={styles.languageText}>{selectedLanguage}</Text>
            <Icon
              name={dropdownVisible ? "arrow-drop-up" : "arrow-drop-down"}
              size={20}
              color={"#000"}
            />
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              <FlatList
                data={languages}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => selectLanguage(item)}
                  >
                    <Text style={styles.dropdownText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        {/* Notification icon */}
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="notifications" size={22} color={"#000"} />
        </TouchableOpacity>

        {/* Profile icon */}
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="person" size={22} color={"#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: "#ffffffff",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    position: "relative",
    zIndex: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
    borderRadius:20
  },
  menuIcon: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  brand: {
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
    color: "#000",
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  marqueeContainer: {
    height: 25,
    width: 400,
    overflow: "hidden",
  },
  marqueeText: {
    fontSize: 18,
    color: "#080808ff",
    fontWeight: "500",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageContainer: {
    position: "relative",
  },
  languageBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(247, 247, 247, 1)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 12,
  },
  languageText: {
    fontSize: 12,
    color: '#000',
    marginRight: 4,
  },
  dropdownMenu: {
    position: "absolute",
    top: 36,
    right: 0,
    backgroundColor: "#ffffffff",
    borderRadius: 6,
    elevation: 4,
    paddingVertical: 4,
    width: 120,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: "#000000ff",
  },
  iconButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    color:'#000'
  },
});
