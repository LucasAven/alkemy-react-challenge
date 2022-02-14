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
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <NavbarToggler
        className="ms-auto"
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      <Collapse navbar isOpen={isCollapsed}>
        <Nav className="ms-auto align-items-center gap-3" navbar>
          <NavItem>
            <Link to="/home">Home</Link>
          </NavItem>
          {token && (
            <NavItem>
              <Button color="warning" onClick={() => logOut()}>
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
