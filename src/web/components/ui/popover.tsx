"use client"

import React, {
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useState,
} from "react"
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native"

type PopoverProps = {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type PopoverTriggerProps = {
  children: ReactElement<any>
  toggleOpen?: () => void
}

type PopoverContentProps = {
  children: ReactNode
  style?: ViewStyle
}

// Allow children to have toggleOpen
type PopoverChild = ReactElement & {
  type: { displayName?: string }
  props: any
}

export function Popover({ children, open, onOpenChange }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(open ?? false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    onOpenChange?.(!isOpen)
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!isValidElement(child)) return child

        const typedChild = child as PopoverChild

        if (typedChild.type.displayName === "PopoverTrigger") {
          // Tell TypeScript this is valid by explicitly typing
          return cloneElement(typedChild, { toggleOpen })
        }

        if (typedChild.type.displayName === "PopoverContent" && isOpen) {
          return typedChild
        }

        return child
      })}
    </>
  )
}

export function PopoverTrigger({
  children,
  toggleOpen,
}: PopoverTriggerProps) {
  const handlePress = (e: GestureResponderEvent) => {
    const typedChild = children as PopoverChild

    if (typedChild.props?.onPress) {
      typedChild.props.onPress(e)
    }
    toggleOpen?.()
  }

  if (isValidElement(children)) {
    return cloneElement(children as ReactElement<any>, { onPress: handlePress })
  }

  return <Pressable onPress={handlePress}>{children}</Pressable>
}
PopoverTrigger.displayName = "PopoverTrigger"

export function PopoverContent({ children, style }: PopoverContentProps) {
  return (
    <Modal transparent animationType="fade">
      <Pressable style={styles.overlay}>
        <View style={[styles.content, style]}>{children}</View>
      </Pressable>
    </Modal>
  )
}
PopoverContent.displayName = "PopoverContent"

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    minWidth: 200,
  },
})
