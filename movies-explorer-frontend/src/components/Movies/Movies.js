import { useContext, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import {
  filterMoviesSearch,
  filterShortMovies,
  transformMoviesData,
} from "../../utils/utilities";

import moviesApi from "../../utils/MoviesApi";

import "./Movies.css";

const Movies = ({ onLike, onDelete, userMovies }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLocalMovieList, setIsLocalMovieList] = useState([]);
  const [isFiltredMovies, setIsFiltredMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isErrorMessage, setIsErrorMessage] = useState({
    isShown: false,
    message: "",
  });
  const currentUser = useContext(CurrentUserContext);

  const handleFilterMovies = (moviesData, searchQuery, moviesCheckbox) => {
    const moviesRender = filterMoviesSearch(
      moviesData,
      searchQuery,
      moviesCheckbox
    );

    if (moviesRender.length === 0) {
      setIsErrorMessage({ isShown: true, message: "Ничего не найдено" });
    } else {
      setIsLocalMovieList(moviesRender);
      setIsFiltredMovies(
        moviesCheckbox ? filterShortMovies(moviesRender) : moviesRender
      );
      localStorage.setItem(
        `${currentUser.email} - movies`,
        JSON.stringify(moviesRender)
      );
    }
  };

  const handleSearchBtn = (inputValue) => {
    setIsErrorMessage({ isShown: false, ErrorMessage: "" });
    localStorage.setItem(`${currentUser.email} - isShortMovies`, isShortMovies);
    localStorage.setItem(`${currentUser.email} - inputValue`, inputValue);

    if (movies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setMovies(movies);
          handleFilterMovies(
            transformMoviesData(movies),
            inputValue,
            isShortMovies
          );
          localStorage.setItem(
            `${currentUser.email} - serverMovies`,
            JSON.stringify(movies)
          );
        })
        .catch((err) => {
          setIsErrorMessage({
            isShown: true,
            ErrorMessage:
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
          });
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      handleFilterMovies(movies, inputValue, isShortMovies);
    }
  };

  const handleCheckboxBtnClick = () => {
    setIsShortMovies(!isShortMovies);
    !isShortMovies
      ? setIsFiltredMovies(filterShortMovies(isLocalMovieList))
      : setIsFiltredMovies(isLocalMovieList);
    localStorage.setItem(
      `${currentUser.email} - isShortMovies`,
      !isShortMovies
    );
  };

  useEffect(() => {
    const serverMovies = JSON.parse(
      localStorage.getItem(`${currentUser.email} - serverMovies`)
    );
    if (serverMovies) setMovies(serverMovies);
  }, []);

  useEffect(() => {
    localStorage.getItem(`${currentUser.email} - isShortMovies`) === "true"
      ? setIsShortMovies(true)
      : setIsShortMovies(false);
  }, [currentUser, userMovies]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setIsLocalMovieList(movies);
      localStorage.getItem(`${currentUser.email} - isShortMovies`) === "true"
        ? setIsFiltredMovies(filterShortMovies(movies))
        : setIsFiltredMovies(movies);
    }
  }, [currentUser, userMovies]);

  return (
    <main className="movies">
      <SearchForm
        onSearch={handleSearchBtn}
        setIsErrorMessage={setIsErrorMessage}
        isShortMovies={isShortMovies}
        onFilterCheckbox={handleCheckboxBtnClick}
      />
      {isLoading ? (
        <Preloader />
      ) : !isErrorMessage.isShown ? (
        <MoviesCardList
          filtredMovieList={isFiltredMovies}
          userMovies={userMovies}
          onLike={onLike}
          onDelete={onDelete}
        />
      ) : (
        <ErrorMessage message={isErrorMessage.message} />
      )}
    </main>
  );
};

export default Movies;
