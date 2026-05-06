import { useState } from "react";
import type { Color, Font, BreakTimes } from "./types/types";

import { createContext } from "react";
export const ThemeContext = createContext<{
  color: Color;
  setColor: Function;
  font: Font;
  setFont: Function;
  showSetting: boolean;
  setShowSetting: Function;
  breakTimes: BreakTimes;
  setBreakTimes: Function;
} | null>(null);
export function ThemeProvider({ children }: { children: any }) {
  const [color, setColor] = useState<Color>("Cyan");
  const [font, setFont] = useState<Font>("font-m");
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const [breakTimes, setBreakTimes] = useState<BreakTimes>({
    pomodoro: 25,
    short: 5,
    long: 15,
  });

  return (
    <ThemeContext.Provider
      value={{
        color,
        setColor,
        font,
        setFont,
        showSetting,
        setShowSetting,
        breakTimes,
        setBreakTimes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
