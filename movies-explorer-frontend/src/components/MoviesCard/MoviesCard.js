import { useLocation } from "react-router-dom";
import { toHoursAndMinutes } from "../../utils/utilities";

import "./MoviesCard.css";

const MoviesCard = ({ movie, isLiked, onLike, onDelete }) => {
  const currentLocation = useLocation();

  const handleLikeClick = () => onLike(movie);
  const handleDeleteClick = () => onDelete(movie);

  return (
    <li key={movie.id} className="movies-card">
      {currentLocation.pathname === "/movies" && (
        <button
          className={`movies-card__button movies-card_type_${
            !isLiked ? "saved" : "save"
          }`}
          type="button"
          title={`${!isLiked ? "Убрать из сохраненного" : "Сохранить"}`}
          onClick={isLiked ? handleDeleteClick : handleLikeClick}
        />
      )}
      {currentLocation.pathname === "/saved-movies" && (
        <button
          className="movies-card__button movies-card_type_delete"
          type="button"
          title="Удалить из сохраненного"
          onClick={handleDeleteClick}
        />
      )}
      <a
        className="movies-card__link"
        href={movie.trailerLink}
        rel="noreferrer"
        target="_blank"
      >
        <img
          className="movies-card__poster"
          src={movie.image}
          alt={movie.nameRU}
        />
      </a>
      <div className="movies-card__container">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <span className="movies-card__duration">
          {toHoursAndMinutes(movie.duration)}
        </span>
      </div>
    </li>
  );
};

export default MoviesCard;
