import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/alert";
import axios from "axios";
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';


function MovieRegister() {
  const { setMessage, setShow, setVariant } = useContext(AlertContext);
  const { t } = useTranslation();

  const navigate = useNavigate();

  var [name, setName] = useState("");
  var [description, setDescription] = useState("");
  var [genre, setGenre] = useState("");
  var [launchDate, setLaunchDate] = useState("");
  var [imgPath, setImgPath] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    if(!formValid())
    {
        return 
    } 
    try {
        const res = await axios.post('http://localhost:8080/movie/register', {
            name,
            description,
            genre,
            launchDate,
            imgPath
          });
        setMessage(res.data.message);
        setVariant('success')
        setShow(true);
        setName('');
        setDescription('');
        setGenre('');
        setLaunchDate('');
        setImgPath('');

        navigate("/feed");
    } 
    catch (error) {
        console.error('Erro ao cadastrar filme:', error);
    }
}

function formValid(){
    const currentYear = new Date().getFullYear();


    if(name.length<3){
        console.log("0");
        setMessage('Insira um nome válido!')
        setShow(true);
        setVariant('danger')
        return false;
    }
    if(description.length < 5){
        console.log("1");
        setMessage('Insira uma descrição válida!')
        setShow(true);
        setVariant('danger')
        return false;
    }
    if(genre.length < 3){
        console.log("2");
        setMessage('Insira um genêro válido!')
        setShow(true);
        setVariant('danger')
        return false;
    }
    if(launchDate > currentYear) {
        console.log("3");
        setMessage('Insira um ano válido!')
        setShow(true);
        setVariant('danger')
        return false;
    }
    if(launchDate.length != 4) {
        console.log("4");
        console.log(launchDate.length);
        setMessage('Informe os 4 caracteres do ano')
        setShow(true);
        setVariant('danger')
        return false
    };

    return true
}

  return (
    <>
      <Form className={styles.form_container} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>{t('name')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>{t('description')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGenre">
          <Form.Label>{t('genre')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('genre')}
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formBasicLaunchDate">
          <Form.Label>{t('launchyear')}</Form.Label>
          <Form.Control
            type="number"
            placeholder={t('launchyear')}
            value={launchDate}
            onChange={(e) => setLaunchDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImgPath">
          <Form.Label>{t('imgPath')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('imgPath')}
            value={imgPath}
            onChange={(e) => setImgPath(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className={styles.btn_save} style={{ backgroundColor: '#1A1D5F', border: 'none'}}>
        {t('Register')}
        </Button>
      </Form>
    </>
  );
}

export default MovieRegister;
