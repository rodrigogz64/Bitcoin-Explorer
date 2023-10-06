import { Routes, Route } from "react-router-dom";
import SplashScreen from "../components/Splash/SplashScreen";
import Mainnet from "../views/Mainnet";
import Testnet from "../views/Testnet";
import Signet from "../views/Signet";
import NotFound from "../components/NotFound/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<h1>Hola mundo</h1>} />
      <Route path="/" element={<SplashScreen />} />
      <Route path="/Mainnet" element={<Mainnet />} />
      <Route path="/Testnet" element={<Testnet />} />
      <Route path="/Signet" element={<Signet />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

