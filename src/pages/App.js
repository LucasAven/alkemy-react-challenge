import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import NavBar from "../components/NavBar";
import useToken from "../hooks/useToken";
import NotFound from "./NotFound";
import { lazy, Suspense } from "react";
import { Spinner } from "reactstrap";

// TODO: EMBELLECER UI

const Home = lazy(() => import("./Home"));
const AddItem = lazy(() => import("./AddItem"));
const Login = lazy(() => import("./Login"));

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    document.getElementById("root").classList.remove("nav-space");
    return (
      <Suspense
        fallback={
          <div className="text-center">
            <Spinner color="info" size="sm" /> Cargando...
          </div>
        }
      >
        <Login token={token} setToken={setToken} />
      </Suspense>
    );
  }

  document.getElementById("root").classList.add("nav-space");

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
