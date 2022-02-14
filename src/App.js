import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import NavBar from "./components/NavBar";
import useToken from "./hooks/useToken";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
