import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "./Sections/MainImage";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovie] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  // fetch movie api
  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMovies([...Movies, ...res.results]);
        setMainMovie(res.results[0]);
        setCurrentPage(res.page);
      });
  };

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const loadMoreItems = () => {
    // console.log("click");
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <>
      <div style={{ width: "100%", margin: "0" }}>
        {MainMovieImage && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            text={MainMovieImage.overview}
          />
        )}
        <div style={{ width: "90%", margin: "1rem auto" }}>
          <h2>Movie by latest</h2>
          <hr />
        </div>
        {/* Grid Card */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieName={movie.original_title}
                  movieId={movie.id}
                />
              </React.Fragment>
            ))}
        </Row>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Button onClick={loadMoreItems} type="button">
            Load More
          </Button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
