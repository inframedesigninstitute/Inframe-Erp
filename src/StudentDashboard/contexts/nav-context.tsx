import React, { createContext, useContext, useMemo, useState } from "react";

type NavState = {
  selected: string;
  setSelected: (key: string) => void;
};

const NavContext = createContext<NavState | undefined>(undefined);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string>("Dashboard");

  const value = useMemo(() => ({ selected, setSelected }), [selected]);

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav(): NavState {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
