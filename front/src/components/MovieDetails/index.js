import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Container,
} from 'react-bootstrap';
import axios from 'axios';
import styles from './style.module.scss';
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs'; 
import Modal from 'react-modal';

 
export default function MovieDetails({ idMovie }) {
    const [movie, setMovie] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);

    async function getMovieDetails() {
        try {
            const res = await axios.get(`http://localhost:8080/movie/${idMovie}`);
            setMovie(res.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
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
                stars.push(<BsStarFill key={i} className={styles.stars}/>);
            }else if (i === Math.ceil(media) && media % 1 !== 0) {
                stars.push(<BsStarHalf key={i} className={styles.stars}/>); 
            }else {
                stars.push(<BsStar key={i}  className={styles.stars}/>);
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
                            <button onClick={abrirModal}>Abrir modal</button>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={fecharModal}
                                contentLabel="Rating"
                            >
                                <h2>Olá</h2>
                                <button onClick={fecharModal}>Fechar</button>
                                <ul id="rating" className={styles.rating}>
                                    <li> <input type="radio" name="opcao-star" onclick="" id="1-star" checked /><label for="1-star"><BsStar/></label></li>
                                    <li><input type="radio" name="opcao-star" onclick="" id="2-star"/><label for="2-star"><BsStar/></label></li>
                                    <li><input type="radio" name="opcao-star" onclick="" id="3-star"/><label for="3-star"><BsStar/></label></li>
                                    <li><input type="radio" name="opcao-star" onclick="" id="4-star"/><label for="4-star"><BsStar/></label></li>
                                    <li><input type="radio" name="opcao-star" onclick="" id="5-star"/><label for="5-star"><BsStar/></label></li>
                                </ul>
                            </Modal>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}