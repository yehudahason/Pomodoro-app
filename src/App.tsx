import { Route, Routes } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import NotFound from "./pages/notFound";
import Layout from "./Layout"; // Import your new layout

function App() {
  return (
    <Routes>
      {/* The Layout wraps all child routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
