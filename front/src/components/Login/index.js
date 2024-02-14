import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/alert";
import axios from "axios";
import { SECRET } from "../../env";
import CryptoJS from 'crypto-js';
import { useTranslation } from 'react-i18next';
import { useUser } from "../../context/user";

function LoginComponent() {
  const { setIdUser } = useUser();
  const { t } = useTranslation();
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

      const userId = res.data._id;
      setIdUser(userId);

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
          <Form.Label>{t('password')}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginBottom: 100 }}>
        {t('Login')}
        </Button>

        <Button variant="secondary" type="button" style={{ marginBottom: 100, marginLeft: 10 }} onClick={() => navigate("/register")}>
        {t('Register')}
        </Button>
      </Form>
    </>
  );
}

export default LoginComponent;
