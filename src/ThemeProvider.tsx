import { useState } from "react";
import type { Color } from "./types/types";

import { createContext } from "react";
export const ThemeContext = createContext<{
  color: Color;
  setColor: Function;
} | null>(null);
export function ThemeProvider({ children }: { children: any }) {
  const [color, setColor] = useState<Color>("Red");

  return (
    <ThemeContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
