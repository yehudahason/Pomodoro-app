import { ThemeContext } from "../ThemeProvider";
import { useContext, useEffect } from "react";
import { run } from "../utils/script";
import Timer from "../components/Timer";
import SettingsModal from "../components/SettingModal";

const Home = ({}) => {
  const context = useContext(ThemeContext);
  const color = context?.color || "Cyan";
  const showSetting = context?.showSetting || false;
  console.log(showSetting);
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
