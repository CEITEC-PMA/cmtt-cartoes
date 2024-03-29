import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import Escolar from "../pages/cadastro/Escolar";
import MotoTaxi from "../pages/cadastro/MotoTaxi";
import Taxi from "../pages/cadastro/Taxi";
import Sidebar from "./menuRoute";
import Auxiliar from "../pages/cadastro/AuxiliarMotorista";
import Van from "../pages/cadastro/AuxiliarVan";
import AuxiliarTaxi from "../pages/cadastro/AuxiliarTaxi";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route element={<App />}>
          <Route path="/cadastroescolar" element={<Escolar />} />
          <Route path="/cadastroauxiliar" element={<Auxiliar />} />
          <Route path="/auxiliartaxi" element={<AuxiliarTaxi />} />
          <Route path="/cadastrotaxi" element={<Taxi />} />
          <Route path="/cadastromoto" element={<MotoTaxi />} />
          <Route path="/cadastrovan" element={<Van />} />
          <Route path="*" element={<Navigate to="/cadastroescolar" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
