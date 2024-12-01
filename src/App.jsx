import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Usuario from "./pages/Usuario";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/usuario" element={<Usuario />} />

          <Route path="*" element={<Usuario />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
