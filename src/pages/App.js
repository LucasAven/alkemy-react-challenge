import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import NavBar from "../components/NavBar";
import useToken from "../hooks/useToken";
import NotFound from "./NotFound";
import { lazy, Suspense } from "react";
import { Spinner } from "reactstrap";

// TODO: EMBELLECER UI
// TODO: LEER SOBRE LAZY LOADING (LA SECCION DE USO EN RUTAS: https://es.reactjs.org/docs/code-splitting.html#route-based-code-splitting)

const Home = lazy(() => import("./Home"));
const AddItem = lazy(() => import("./AddItem"));
const Login = lazy(() => import("./Login"));

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Suspense
        fallback={
          <div className="text-center">
            <Spinner color="info" size="sm" /> Cargando...
          </div>
        }
      >
        <h1 className="text-center">Alkemy React Challenge</h1>
        <Login token={token} setToken={setToken} />
      </Suspense>
    );
  }

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
      <Suspense
        fallback={
          <div className="text-center">
            <Spinner color="info" size="sm" /> Cargando...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
