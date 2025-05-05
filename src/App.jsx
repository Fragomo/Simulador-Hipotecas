import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RutaProtegida from "./components/RutaProtegida";
import Simuladorpage from "./pages/Simuladorpage";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route element={<RutaProtegida />}>
          <Route path="/simuladorpage" element={<Simuladorpage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

