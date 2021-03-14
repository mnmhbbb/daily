import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(Number(0));
  const [Favorited, setFavorited] = useState(false);

  let variable = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  useEffect(() => {
    // 좋아요 갯수 정보 가져오기
    axios.post("/api/favorite/favoriteNumber", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setFavoriteNumber(res.data.FavoriteNumber);
      } else {
        alert("숫자 정보를 가져오는데 실패했습니다.");
      }
    });

    // 내가 좋아요 눌렀는지 체크
    axios.post("/api/favorite/favorited", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setFavorited(res.data.Favorited);
      } else {
        alert("정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  // 좋아요 버튼 클릭 시 추가/삭제
  const onClickFavorite = () => {
    console.log(FavoriteNumber);

    if (Favorited) {
      axios.post("/api/favorite/removeFromFavorite", variable).then((res) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 리스트에서 지우는 걸 실패했습니다..");
        }
      });
    } else {
      axios.post("/api/favorite/addToFavorite", variable).then((res) => {
        if (res.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 리스트에 추가하는 걸 실패했습니다..");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
