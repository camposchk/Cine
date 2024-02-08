import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Container,
    Row
} from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons'
// import styles from './style.module.scss';
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
        return 
    };
    
 
    return(
        <Container>
            <RenderPosts />
        </Container>
    )
}
