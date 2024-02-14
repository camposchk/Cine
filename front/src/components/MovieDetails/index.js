import { useEffect, useState, useContext } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import styles from './style.module.scss';
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';
import Modal from 'react-modal';
import { AlertContext } from "../../context/alert";


export default function MovieDetails({ idMovie }) {
    const { setMessage, setShow, setVariant } = useContext(AlertContext);

 
    var [stars, setStars] = useState("");
    const [movie, setMovie] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(null);

    sessionStorage.setItem("idMovie", idMovie);

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

        console.log(value);
        console.log(idMovie);
        console.log(idUser);
        
        try {
            await axios.post(`http://localhost:8080/movie/rating/${idMovie}/${idUser}`, {
                stars: value 
            });
           
            setVariant('success')
            setShow(true);
            setStars(value);
            setIsOpen(false);
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

    function abrirModal() {
        setIsOpen(true);
    }

    function fecharModal() {
        setIsOpen(false);
    }
      function handleClick(value) {
        setRating(value);
    }
    
   

    return (
        <Container>
            {movie && (
                <Card>
                    <Card.Title>{movie.name}</Card.Title>
                    <Card.Body>
                        <Card.Text>Genre: {movie.genre}</Card.Text>
                        <Card.Text>Launch Year: {movie.launchDate}</Card.Text>
                        <Card.Text>Description: {movie.description}</Card.Text>
                        <div>
                            {renderStars(MediaRating(movie))}
                            <p>{MediaRating(movie)}</p>
                        </div>
                        <div>
                            <button onClick={abrirModal}>Avaliar Filme</button>
                            <Modal isOpen={modalIsOpen} onRequestClose={fecharModal} contentLabel="Rating">
                                <h2>Avaliar {movie.name}</h2>
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
                                <div>                                   
                                    <button onClick={fecharModal}>Cancelar</button>
                                    <button onClick={() => handleRating(rating)}>Avaliar</button>

                                </div>
                            </Modal>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}
