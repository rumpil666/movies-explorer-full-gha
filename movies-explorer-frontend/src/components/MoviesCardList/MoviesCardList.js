import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import { DEVICE } from "../../utils/constants";
import { findLikeMovies } from "../../utils/utilities";
import {useWindowWidth} from '../../hooks/useWindowWidth';

import "./MoviesCardList.css";

const MoviesCardList = ({ filtredMovieList, userMovies, onLike, onDelete }) => {
  const { desktop, tablet, phone } = DEVICE;
  const [isDefaultMovies, setIsDefaultMovies] = useState({total: Number.MAX_VALUE});
  const [movies, setMovies] = useState([]);
  const currentLocation = useLocation();
  const width = useWindowWidth();

  const handleMoreBtnClick = () => {
    const start = movies.length;
    const end = start + isDefaultMovies.add;
    const add = filtredMovieList.length - start;
    const newMovies = filtredMovieList?.slice(start, end);

    if (add > 0) {
      setMovies([...movies, ...newMovies]);
      setIsDefaultMovies({ ...isDefaultMovies, total: end });
    }
  };

  useEffect(() => {
    setMovies(filtredMovieList?.filter((m, i) => i < isDefaultMovies.total));
  }, [filtredMovieList]);

  useEffect(() => {
    if (currentLocation.pathname === "/movies") {
    if (width <= tablet.minWidth) {
      setIsDefaultMovies(phone.cards);
    } else if (
      tablet.minWidth <= width &&
      width <= desktop.minWidth
    ) {
      setIsDefaultMovies(tablet.cards);
    } else {
      setIsDefaultMovies(desktop.cards);
    }
  }
  }, [width]);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies?.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              isLiked={findLikeMovies(userMovies, movie)}
              onLike={onLike}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
      {currentLocation.pathname === "/movies" &&
        movies.length < filtredMovieList.length && (
          <button
            className="movies-card-list__more"
            onClick={handleMoreBtnClick}
          >
            Ещё
          </button>
        )}
    </section>
  );
};

export default MoviesCardList;
