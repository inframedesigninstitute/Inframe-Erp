import { FC, ReactNode } from "react"

type CardProps = {
  children: ReactNode
  className?: string
}

export const Card: FC<CardProps> = ({ children, className }) => (
  <div className={className} style={{ background: "#fff", borderRadius: 8, boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", padding: 16 }}>
    {children}
  </div>
)

export const CardHeader: FC<CardProps> = ({ children, className }) => (
  <div className={className} style={{ borderBottom: "1px solid #000000ff", paddingBottom: 8, marginBottom: 16 }}>
    {children}
  </div>
)

export const CardTitle: FC<CardProps> = ({ children, className }) => (
  <h2 className={className} style={{ fontSize: 18, fontWeight: 600 }}>
    {children}
  </h2>
)

export const CardDescription: FC<CardProps> = ({ children, className }) => (
  <p className={className} style={{ fontSize: 14, color: "#000000ff" }}>
    {children}
  </p>
)

export const CardContent: FC<CardProps> = ({ children, className }) => (
  <div className={className} style={{ paddingTop: 8 }}>
    {children}
  </div>
)
