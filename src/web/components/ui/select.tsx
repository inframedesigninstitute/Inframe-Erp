import { FC, ReactNode } from "react"

type SelectProps = {
  value: string
  onValueChange: (value: string) => void
  children: ReactNode
}

export const Select: FC<SelectProps> = ({ value, onValueChange, children }) => (
  <select value={value} onChange={(e) => onValueChange(e.target.value)} style={{ padding: 48, borderRadius: 4 }}>
    {children}
  </select>
)

type SelectItemProps = {
  value: string
  children: ReactNode
}

export const SelectItem: FC<SelectItemProps> = ({ value, children }) => (
  <option value={value}>{children}</option>
)

export const SelectTrigger: FC<{ className?: string; children: ReactNode }> = ({ children }) => (
  <div>{children}</div>
)

export const SelectValue: FC<{ placeholder?: string }> = ({ placeholder }) => (
  <span>{placeholder}</span>
)

export const SelectContent: FC<{ children: ReactNode }> = ({ children }) => <>{children}</>
