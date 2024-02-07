import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/alert";
import axios from "axios";
import { SECRET } from "../../env";
import CryptoJS from 'crypto-js';

function LoginComponent() {
  const { setMessage, setShow, setVariant } = useContext(AlertContext);

  const navigate = useNavigate();

  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const json = {
      email,
      password,
    };

    try {
      const jsonCrypt = CryptoJS.AES.encrypt(
        JSON.stringify(json),
        SECRET
      ).toString();

      var res = await axios.post("http://localhost:8080/user/login", {
        jsonCrypt,
      });

      sessionStorage.setItem("token", res.data.token);
      navigate("/feed");
    } catch (error) {
        console.log(json);
      setMessage("Erro ao se conectar");
      setShow(true);
      setVariant("danger");
    }
  }

  return (
    <>
      <Form style={{ marginTop: 100 }} onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginBottom: 100 }}>
          Submit
        </Button>

        <Button variant="secondary" type="button" style={{ marginBottom: 100, marginLeft: 10 }} onClick={() => navigate("/register")}>
          Register
        </Button>
      </Form>
    </>
  );
}

export default LoginComponent;
