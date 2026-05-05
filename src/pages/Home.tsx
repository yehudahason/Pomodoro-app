import { ThemeContext } from "../ThemeProvider";
import { useContext, useEffect } from "react";
import { run } from "../utils/script";
import Timer from "../components/Timer";
import SettingsModal from "../components/SettingModal";

const showSetting = false;
const Home = ({}) => {
  const context = useContext(ThemeContext);
  const color = context?.color || "Cyan";
  const setColor = context?.setColor || (() => {});
  useEffect(() => {
    run(0.3);
  }, []);
  return (
    <>
      {showSetting ? <SettingsModal /> : null}
      <Timer color={color} />
    </>
  );
};

export default Home;
