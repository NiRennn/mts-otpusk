import { BrowserRouter, Routes, Route } from "react-router-dom";
import appRoutes from "./routes/routes";
import "./App.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./components/Loading/Loading";
import Onboarding from "./components/Onboarding/Onboarding";
import Menu from "./components/Menu/Menu";
import Info from "./components/Info/Info";
import Game from "./components/Game/Game";
import End from "./components/End/End";
import Final from "./components/Final/Final";
import RoamingPopup from "./components/RoamingPopup/RoamingPopup";

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    window.Telegram.WebApp.ready();
    navigate(appRoutes.LOADDING, { replace: true });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path={appRoutes.LOADDING} element={<Loading />} />
        <Route path={appRoutes.ONBOARDING} element={<Onboarding />} />
        <Route path={appRoutes.MENU} element={<Menu />} />
        <Route path={appRoutes.INFO} element={<Info />} />
        <Route path={appRoutes.GAME} element={<Game />} />
        <Route path={appRoutes.FINAL} element={<Final />} />
        <Route path={appRoutes.END} element={<End />} />
      </Routes>
      <RoamingPopup />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
