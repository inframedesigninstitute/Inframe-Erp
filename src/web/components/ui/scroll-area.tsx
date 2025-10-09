import React from "react";
import { Platform, ScrollView, StyleSheet, ViewStyle } from "react-native";

type ScrollAreaProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, style }) => {
  return (
    <ScrollView
      style={[styles.scrollArea, style]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
    ...Platform.select({
      web: {
        overflowY: "auto", // scroll on web
        maxHeight: "100vh", // full viewport height
      },
    }),
  } as ViewStyle,
  content: {
    flexGrow: 1,
    padding: 20,
  } as ViewStyle,
});
