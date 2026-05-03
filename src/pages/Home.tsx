import { useEffect } from "react";
import { run } from "../utils/script";
const Home = () => {
  useEffect(() => {
    run();
  }, []);
  return (
    <div className="timer-container">
      <svg className="timer-svg" viewBox="0 0 200 200">
        <circle className="bg" cx="100" cy="100" r="75" />
        <circle className="progress" cx="100" cy="100" r="75" />
        <circle className="progress" cx="100" cy="100" r="90" />
      </svg>
      <div className="text">17:59</div>
    </div>
  );
};

export default Home;
