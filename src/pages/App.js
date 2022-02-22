import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Login from "./Login";
import Home from "./Home";
import NavBar from "../components/NavBar";
import AddItem from "./AddItem";
import useToken from "../hooks/useToken";
import NotFound from "./NotFound";

// TODO: HACER PAGINA 404
// TODO: EMBELLECER UI
// TODO: LEER SOBRE LAZY LOADING (LA SECCION DE USO EN RUTAS: https://es.reactjs.org/docs/code-splitting.html#route-based-code-splitting)
// TODO: AGREGAR TESTS UNITARIOS

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <>
        <h1>Alkemy React Challenge</h1>
        <Login token={token} setToken={setToken} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
