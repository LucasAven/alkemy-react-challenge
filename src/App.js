import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import RequireAuth from "./components/RequireAuth";
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Home />
              ) : (
                <Login setToken={setToken} />
              )
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
