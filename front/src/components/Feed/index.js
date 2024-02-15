import React, { useEffect, useState, forwardRef } from "react";
// import { Button, Card, Col, Container, Row, Image, Fade } from "react-bootstrap";
import { Button, Card, Col, Container, Fade, Row } from "react-bootstrap";
import styles from "./style.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Feed() {
  const [movies, setMovies] = useState([]);
  var [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function getAll() {
    try {
      const res = await axios.get(`http://localhost:8080/movie/getall/${page}`);
      setMovies(res.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    getAll();
  }, [page]);

  function handleClick(idMovie) {
    navigate(`/movie-details/${idMovie}`);
  }

  function handleUp(){
    if(movies.length===4){
        setPage(++page)
    }
}

  function handleDown(){
      if(page>1){
          setPage(--page)
      }
  }

  function MediaRating(movie) {
    if (!movie.rating || movie.rating.length === 0) {
      return 0;
    }

    const validRatings = movie.rating.filter(
      (rating) => typeof rating.stars === "number" && !isNaN(rating.stars)
    );

    if (validRatings.length === 0) {
      return 0;
    }

    const soma = validRatings.reduce((acc, rating) => acc + rating.stars, 0);
    const media = soma / validRatings.length;

    return media;
  }

  const RenderPosts = forwardRef(( props, ref) => {
    if (movies.length === 0) {
      return <p>Nenhum filme encontrado.</p>;
    }

    const rows = [];
    for (let i = 0; i < movies.length; i += 2) {
      const movie1 = movies[i];
      const movie2 = i + 1 < movies.length ? movies[i + 1] : null;
      const idMovie1 = movie1._id;
      let idMovie2;

      if (movie2 != null) {
        idMovie2 = movie2._id;
      }

      const media1 = MediaRating(movie1);
      const media2 = movie2 ? MediaRating(movie2) : 0;
      rows.push(
        <Row key={movie1._id}>
          <Col md={6}>
            <Card
              border="dark"
              onClick={() => handleClick(idMovie1)}
              className={styles.card}
            >
              <Card.Title className={styles.card__title}>
                {movie1.name}
              </Card.Title>
              <Card.Body className={styles.card__body}>
                <Card.Text className={styles.card__body__article}>
                  {t("genre")}: {movie1.genre}
                </Card.Text>
                <Card.Text className={styles.card__body__article}>
                  {t("launchyear")}: {movie1.launchDate}
                </Card.Text>
                <Card.Text className={styles.card__body__article}>
                  {t("description")}: {movie1.description}
                </Card.Text>
                <Card.Text className={styles.card__body__article}>
                  {t("rating")}: {media1}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {movie2 && (
            <Col md={6}> 
              <Card
                border="dark"
                onClick={() => handleClick(idMovie2)}
                className={styles.card}
              >
                <Card.Title className={styles.card__title}>
                  {movie2.name}
                </Card.Title>
                <Card.Body className={styles.card__body}>
                  <Card.Text className={styles.card__body__article}>
                    {t("genre")}: {movie2.genre}
                  </Card.Text>
                  <Card.Text className={styles.card__body__article}>
                    {t("launchyear")}: {movie2.launchDate}
                  </Card.Text>
                  <Card.Text className={styles.card__body__article}>
                    {t("description")}: {movie2.description}
                  </Card.Text>
                  <Card.Text className={styles.card__body__article}>
                    {t("rating")}: {media2}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      );
    }

    return <>{rows}</>;
  });

  return (
    <Container>
         <RenderPosts />
         <div className={styles.pagination}>
            <Button variant="transparent" onClick={handleDown}><IoIosArrowBack style={{ fontSize: '50px' }} fill="#FF975D"/></Button>
            {page}
            <Button variant="transparent" onClick={handleUp}><IoIosArrowForward style={{ fontSize: '50px' }} fill="#FF975D"/></Button>
         </div>
    </Container>
  );
}
