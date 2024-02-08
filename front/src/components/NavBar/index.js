import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../logo.svg";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  function redirect() {
    const token = sessionStorage.getItem("token");

    token ? navigate("/feed") : navigate("/");
  }
  
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as="div" onClick={redirect} style={{ cursor: 'pointer' }}>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Talking Movie
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
