import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Container,
    Row
} from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons';
import styles from './style.module.scss';
import axios from 'axios';
 
export default function Feed(){
    const [movies, setMovies] = useState([]);
 
    async function getAll() {
        try {
            const res = await axios.get('http://localhost:8080/movie');
            setMovies(res.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }
 
    useEffect(() => {
        getAll();
    }, [])

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
    
 
    const RenderPosts = () => {
        if (movies.length === 0) {
            return <p>Nenhum filme encontrado.</p>;
        }
    
        const rows = [];
        for (let i = 0; i < movies.length; i += 2) {
            const movie1 = movies[i];
            const movie2 = i + 1 < movies.length ? movies[i + 1] : null;
        
            const media1 = MediaRating(movie1);
            const media2 = movie2 ? MediaRating(movie2) : 0;
            rows.push(
                <Row key={movie1.id}>
                    <Col md={6}>
                        <Card className={styles.card}>
                            <Card.Title className={styles.card__title}>
                                {movie1.name}
                            </Card.Title>
                            <Card.Body className={styles.card__body}>
                                <Card.Text className={styles.card__body__article}>Genre: {movie1.genre}</Card.Text>
                                {/* Verificar essa gambiarra pra exibir o ano sem diminuir um ano */}
                                <Card.Text className={styles.card__body__article}>Launch Year: {movie1.launchDate}</Card.Text>
                                <Card.Text className={styles.card__body__article}>Description: {movie1.description}</Card.Text>
                                <Card.Text className={styles.card__body__article}>Rating: {media1}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    {movie2 && (
                        <Col md={6}>
                            <Card className={styles.card}>
                                <Card.Title className={styles.card__title}>
                                    {movie2.name}
                                </Card.Title>
                                <Card.Body className={styles.card__body}>
                                    <Card.Text className={styles.card__body__article}>Genre: {movie2.genre}</Card.Text>
                                    <Card.Text className={styles.card__body__article}>Launch Year: {movie2.launchDate}</Card.Text>
                                    <Card.Text className={styles.card__body__article}>Description: {movie2.description}</Card.Text>
                                    <Card.Text className={styles.card__body__article}>Rating: {media2}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>,
            );
        }
    
        return rows;
    };
    
 
    return(
        <Container>
            <RenderPosts />
        </Container>
    )
}
