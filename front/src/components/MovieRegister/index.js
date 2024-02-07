import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/alert";
import axios from "axios";
import styles from './style.module.scss';


function MovieRegister() {
  const { setMessage, setShow, setVariant } = useContext(AlertContext);

  const navigate = useNavigate();

  var [name, setName] = useState("");
  var [description, setDescription] = useState("");
  var [genre, setGenre] = useState("");
  var [launchDate, setLaunchDate] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    console.log("aaaa");
    if(!formValid())
    {
        console.log("falos");
        return 
    } 
    try {
        const res = await axios.post('http://localhost:8080/movie/register', {
            name,
            description,
            genre,
            launchDate
          });
        setMessage(res.data.message);
        setVariant('success')
        setShow(true);
        setName('');
        setDescription('');
        setGenre('');
        setLaunchDate('');

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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the movie name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the movie description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the movie genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formBasicLaunchDate">
          <Form.Label>Year of Launch</Form.Label>
          <Form.Control
            type="number"
            placeholder="enter the movie's year of release"
            value={launchDate}
            onChange={(e) => setLaunchDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className={styles.btn_save}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default MovieRegister;
