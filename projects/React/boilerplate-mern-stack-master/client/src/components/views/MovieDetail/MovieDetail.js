import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import GridCards from "../commons/GridCards";
import MainImage from "../LandingPage/Sections/MainImage";
import Favorite from "./Sections/Favorite";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [toggleActor, setToggleActor] = useState(false);

  useEffect(() => {
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    //movie fetch
    fetch(endpointInfo)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
      });

    //cast fetch
    fetch(endpointCrew)
      .then((res) => res.json())
      .then((res) => {
        setCasts(res.cast);
      });
  }, []);

  const toggleActorBtn = () => {
    setToggleActor(!toggleActor);
  };
  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem("userId")}
          />
        </div>
        {/* Movie Info */}
        <MovieInfo movie={Movie} />
        <br />
        {/* Actors Grid */}
        {toggleActor && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    characterName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button onClick={toggleActorBtn}>Toggle Actor View</Button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
