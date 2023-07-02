import { useState, useContext, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { filterMoviesSearch, filterShortMovies } from "../../utils/utilities";

import "./SavedMovies.css";

const SavedMovies = ({ userMovies, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLocalMovieList, setIsLocalMovieList] = useState(userMovies);
  const [isFiltredMovies, setIsFiltredMovies] = useState(isLocalMovieList);
  const [isErrorMessage, setIsErrorMessage] = useState({
    isShown: false,
    message: "",
  });

  const currentUser = useContext(CurrentUserContext);

  const handleSearchBtn = (inputValue) => {
    setIsErrorMessage({ isShown: false, message: "" });
    setIsLoading(true);

    const moviesRender = filterMoviesSearch(
      userMovies,
      inputValue,
      isShortMovies
    );

    if (moviesRender.length === 0) {
      setIsErrorMessage({ isShown: true, message: "Ничего не найдено" });
    } else {
      setIsLocalMovieList(moviesRender);
      setIsFiltredMovies(moviesRender);
    }
    setIsLoading(false);
  };

  const handleCheckboxBtnClick = () => {
    setIsShortMovies(!isShortMovies);
    console.log(isLocalMovieList);
    !isShortMovies
      ? setIsFiltredMovies(filterShortMovies(isLocalMovieList))
      : setIsFiltredMovies(isLocalMovieList);
    localStorage.setItem(
      `${currentUser.email} - isShortSaveMovies`,
      !isShortMovies
    );
  };

  useEffect(() => {
    localStorage.getItem(`${currentUser.email} - isShortSaveMovies`) === "true"
      ? setIsShortMovies(true)
      : setIsShortMovies(false);
  }, [currentUser, userMovies]);

  useEffect(() => {
    setIsLocalMovieList(userMovies);
    setIsFiltredMovies(userMovies);
    localStorage.getItem(`${currentUser.email} - isShortSaveMovies`) === "true"
      ? setIsFiltredMovies(filterShortMovies(userMovies))
      : setIsFiltredMovies(userMovies);
    userMovies.length === 0
      ? setIsErrorMessage({
          isShown: true,
          message: "Ничего не найдено",
        })
      : setIsErrorMessage({
          isShown: false,
          message: "",
        });
  }, [userMovies, currentUser]);

  return (
    <main className="saved-movies">
      <SearchForm
        onSearch={handleSearchBtn}
        isShortMovies={isShortMovies}
        onFilterCheckbox={handleCheckboxBtnClick}
        setIsFiltredMovies={setIsFiltredMovies}
        userMovies={userMovies}
        setIsLocalMovieList={setIsLocalMovieList}
      />
      {isLoading ? (
        <Preloader />
      ) : !isErrorMessage.isShown ? (
        <MoviesCardList
          filtredMovieList={isFiltredMovies}
          userMovies={userMovies}
          onDelete={onDelete}
        />
      ) : (
        <ErrorMessage message={isErrorMessage.message} />
      )}
    </main>
  );
};

export default SavedMovies;
