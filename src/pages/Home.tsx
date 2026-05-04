import { useEffect } from "react";
import { run } from "../utils/script";
import Timer from "../components/Timer";
// import SettingsModal from "../components/SettingModal";
const Home = () => {
  useEffect(() => {
    run(25);
  }, []);
  return (
    <>
      {/* <SettingsModal /> */}
      <Timer />
    </>
  );
};

export default Home;
