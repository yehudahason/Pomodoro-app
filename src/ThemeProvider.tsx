import { useState } from "react";
import type { Color, Font } from "./types/types";

import { createContext } from "react";
export const ThemeContext = createContext<{
  color: Color;
  setColor: Function;
  font: Font;
  setFont: Function;
  showSetting: boolean;
  setShowSetting: Function;
} | null>(null);
export function ThemeProvider({ children }: { children: any }) {
  const [color, setColor] = useState<Color>("Red");
  const [font, setFont] = useState<Font>("font-m");
  const [showSetting, setShowSetting] = useState<boolean>(false);

  return (
    <ThemeContext.Provider
      value={{ color, setColor, font, setFont, showSetting, setShowSetting }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
