import { Route, Routes } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import NotFound from "./pages/notFound";
import Layout from "./Layout";
import { ThemeProvider } from "./ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* The Layout wraps all child routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
