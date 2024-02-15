import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../../logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { changeLanguage } from '../../languages/i18n';

function NavBar() {
  const [language, setLanguage] = useState("en");

  const navigate = useNavigate();
  const location = useLocation();

  function isAdmAndFeed() {
    const isAdmin = sessionStorage.getItem("isAdm");
    return isAdmin === 'true' && location.pathname === "/feed";
  }
  
  function handleNavbarClick(event) {
    const target = event.target;
    if (target.tagName === 'BUTTON' && target.parentElement === event.currentTarget) {
      navigate("/movie-register");
    } else {
      const token = sessionStorage.getItem("token");
      token ? navigate("/feed") : navigate("/");
    }
  }

  function handleLanguage() {
    changeLanguage();
    setLanguage(language === "pt" ? "en" : "pt");
  }
  
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as="div" onClick={handleNavbarClick} style={{ cursor: 'pointer' }}>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Talking Movie
            {isAdmAndFeed() ? <Button variant="warning" size="sm" style={{marginLeft: 10}}>+</Button> : <></>}
          </Navbar.Brand>
          <button onClick={handleLanguage}>{language.toUpperCase()}</button>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
