import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardBA from "./pages/DashboardBA";
import Wireframe from "./pages/Wireframe";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Saat URL biasa dibuka, tampilkan analisis ShopeeFood */}
        <Route path="/" element={<DashboardBA />} />
        
        {/* Saat URL ditambah /wireframe, tampilkan desain barumu */}
        <Route path="/wireframe" element={<Wireframe />} />
      </Routes>
    </BrowserRouter>
  );
}