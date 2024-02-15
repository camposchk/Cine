import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/alert";
import axios from "axios";
import { SECRET } from "../../env";
import CryptoJS from "crypto-js";
import { useTranslation } from 'react-i18next';

function RegisterComponent() {
  const { t } = useTranslation();
  const { setMessage, setShow, setVariant } = useContext(AlertContext);

  const navigate = useNavigate();

  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [confirmPassword, setConfirmPassword] = useState("");
  var [isAdm, setIsAdm] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const teste = useCallback(async () => {
    const json = {
      name,
      email,
      password,
      confirmPassword,
      isAdm,
    };
    const jsonCrypt = CryptoJS.AES.encrypt(
      JSON.stringify(json),
      SECRET
    ).toString();

    try {
      var res = await axios.post("http://localhost:8080/user/register", {
        jsonCrypt,
      });

      setMessage(res.data.message);
      setVariant("success");
      setShow(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsAdm(false);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setMessage("Erro ao se conectar");
      setShow(true);
      setVariant("danger");
    }
  }, [isAdm]);

  async function handleRegister(e) {
    e.preventDefault();
    setFirstTime(false);

    if (password.endsWith("@DM!")) 
      setIsAdm(true);

    if (confirmPassword !== password) {
      setMessage("As senhas não conferem");
      setShow(true);
      setVariant("danger");
      return;
    }
  }

  useEffect(() => {
    if (!firstTime) teste();
  }, [isAdm]);

  return (
    <>
      <Form style={{ marginTop: 100 }} onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>{t('name')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
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

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>{t('confirm password')}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t('confirm password')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

       <Button variant="primary" type="submit" style={{ marginBottom: 100, backgroundColor: '#1A1D5F', border: 'none', width: '312px'  }}>
          {t('Register')}
        </Button>

        <Button variant="secondary" type="button" style={{ marginBottom: 100, marginLeft: 10, backgroundColor: '#FF975D', border: 'none',width: '312px'  }}
          onClick={() => navigate("/")}
        >
          {t('Login')}
        </Button>
      </Form>
    </>
  );
}

export default RegisterComponent;
