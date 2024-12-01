import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Usuario from "./pages/Usuario";
import Admin from "./pages/Admin.jsx";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Usuario />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
