import { useParams } from 'react-router-dom';
import MovieDetails from "../../components/MovieDetails";

export default function MoviePage(){
    const { idMovie } = useParams();

    return (
        <>
            <MovieDetails idMovie={idMovie} />
        </>
    )
}
