import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

const NavBar = ({ token, setToken }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  let navigate = useNavigate();

  const logOut = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <Navbar
      fixed="top"
      className="px-sm-5 py-3"
      color="light"
      expand="lg"
      light
    >
      <NavbarBrand className="fw-bold">Menu App</NavbarBrand>
      <NavbarToggler
        className="ms-auto"
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      <Collapse navbar isOpen={isCollapsed}>
        <Nav className="ms-auto align-items-center gap-3" navbar>
          <NavItem>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/add-item" className="nav-link">
              Agregar Items
            </Link>
          </NavItem>
          {token && (
            <NavItem>
              <Button className="primary-col" onClick={() => logOut()}>
                Log Out
              </Button>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
