import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/alert";
import axios from "axios";
import { SECRET } from "../../env";
import CryptoJS from "crypto-js";

function RegisterComponent() {
  const { setMessage, setShow, setVariant } = useContext(AlertContext);

  const navigate = useNavigate();

  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const json = {
        name,
        email,
        password,
        confirmPassword,
    };
    
    if(confirmPassword !== password) {
        setMessage('As senhas não conferem')
        setShow(true);
        setVariant('danger')
        return;
    }

    const jsonCrypt = CryptoJS.AES.encrypt(
      JSON.stringify(json),
      SECRET
    ).toString();

    try {
      var res = await axios.post("http://localhost:8080/user/register", {
        jsonCrypt,
      });

      setMessage(res.data.message);
      setVariant('success')
      setShow(true);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setMessage("Erro ao se conectar");
      setShow(true);
      setVariant("danger");
    }
  }

  return (
    <>
      <Form style={{ marginTop: 100 }} onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginBottom: 100 }}>
          Submit
        </Button>

        <Button variant="secondary" type="button" style={{ marginBottom: 100, marginLeft: 10 }} onClick={() => navigate("/")}>
          Login
        </Button>
      </Form>
    </>
  );
}

export default RegisterComponent;
