import { useEffect, useState, useContext } from "react";
import { Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import styles from "./style.module.scss";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import { AlertContext } from "../../context/alert";
import { func } from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function MovieDetails({ idMovie }) {
  const { setMessage, setShow, setVariant } = useContext(AlertContext);

  var [stars, setStars] = useState("");
  const [movie, setMovie] = useState(null);
  const [modalShow, setModalShow] = useState(false);
    const [rating, setRating] = useState(null);

    sessionStorage.setItem("idMovie", idMovie);

  const navigate = useNavigate();
  const { t } = useTranslation();

  function isAdm() {
    const isAdmin = sessionStorage.getItem("isAdm");
    return isAdmin === 'true';
  }

    async function getMovieDetails() {
        try {
            const res = await axios.get(`http://localhost:8080/movie/${idMovie}`);
            setMovie(res.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    async function handleRating(value, res) {
        const idMovie = sessionStorage.getItem("idMovie");
        const idUser = sessionStorage.getItem("id");
        
        try {
            await axios.post(`http://localhost:8080/movie/rating/${idMovie}/${idUser}`, {
                stars: value 
            });
           
            setVariant('success')
            setShow(true);
            setStars(value);
            setModalShow(false)
            getMovieDetails();
        } catch (error) {
            console.error('Erro ao avaliar filme:', error);
        }
    }
    

    useEffect(() => {
        getMovieDetails();
    }, [idMovie]);

    function MediaRating(movie) {
        if (!movie.rating || movie.rating.length === 0) {
            return 0;
        }

        const validRatings = movie.rating.filter(rating => typeof rating.stars === 'number' && !isNaN(rating.stars));

        if (validRatings.length === 0) {
            return 0;
        }

        const soma = validRatings.reduce((acc, rating) => acc + rating.stars, 0);
        const media = soma / validRatings.length;

        return media;
    }

    function renderStars(media) {
        const roundedMedia = Math.round(media);
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(media)) {
                stars.push(<BsStarFill key={i} className={styles.stars} />);
            } else if (i === Math.ceil(media) && media % 1 !== 0) {
                stars.push(<BsStarHalf key={i} className={styles.stars} />);
            } else {
                stars.push(<BsStar key={i} className={styles.stars} />);
            }
        }

        return stars;
    }

      function handleClick(value) {
        setRating(value);
    }
    
    async function handleDelete() {
      try {
        await axios.delete(`http://localhost:8080/movie/delete/${idMovie}`);
        navigate("/feed");
        console.log("deletado");
      } catch (error) {
        console.error("Erro ao deletar filme: ", error);
      }
    }

    return (
        <Container>
            {movie && (
                <Card style={{marginTop: 20}}>
                    <Card.Title style={{marginTop: 10, marginLeft: 15}}>{movie.name}</Card.Title>
                    <Card.Body>
                      <Card.Text>{t('genre')}: {movie.genre}</Card.Text>
                      <Card.Text>{t('launchyear')}: {movie.launchDate}</Card.Text>
                      <Card.Text>{t('description')}: {movie.description}</Card.Text>
                      <div>
                            {renderStars(MediaRating(movie))}
                            <p>{MediaRating(movie)}</p>
                        </div>
                        <div>
                          <Button variant="light" onClick={() => setModalShow(true)}>{t('rating a movie')}</Button>
                          {isAdm() ? <Button variant="danger" onClick={handleDelete} style={{marginLeft: 10}}>{t('Delete')}</Button> : <></>}
                          <Modal
                            size="sm"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title id="contained-modal-title-vcenter">
                                {t('rate')} {movie.name}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={styles.modal}>
                              <ul id="rating" className={styles.rating}>
                                      {[1, 2, 3, 4, 5].map((value) => (
                                          <li key={value}>
                                              <input
                                                  type="radio"
                                                  name="opcao-star"
                                                  id={`${value}-star`}
                                                  checked={rating === value}
                                                  onChange={() => handleClick(value)}
                                              />
                                              <label htmlFor={`${value}-star`}>
                                                  {rating >= value ? <BsStarFill className={styles.stars} /> : <BsStar className={styles.stars} />}
                                              </label>
                                          </li>
                                      ))}
                                  </ul>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="danger" onClick={() => setModalShow(false)}>{t('cancel')}</Button>
                              <Button onClick={() => handleRating(rating)} style={{marginLeft: 10}}>{t('rate')}</Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}
