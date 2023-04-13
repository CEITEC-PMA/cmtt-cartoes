import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import Escolar from "../pages/cadastro/Escolar";
import MotoTaxi from "../pages/cadastro/MotoTaxi";
import Taxi from "../pages/cadastro/Taxi";
import Sidebar from "./menuRoute";
import Auxiliar from "../pages/cadastro/AuxiliarMotorista";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route element={<App />}>
          {/* <Route path="/cadastroescolar" element={<Escolar />} /> */}
          <Route path="/cadastroauxiliar" element={<Auxiliar />} />
          {/* <Route path="/cadastrotaxi" element={<Taxi />} /> */}
          {/* <Route path="/cadastromoto" element={<MotoTaxi />} /> */}
          <Route path="*" element={<Navigate to="/cadastroauxiliar" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
