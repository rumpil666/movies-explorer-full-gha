import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/UseFormValidation";

import "./SearchForm.css";

const SearchForm = ({
  onSearch,
  setIsErrorMessage,
  isShortMovies,
  onFilterCheckbox,
  setIsFiltredMovies,
  userMovies,
  setIsLocalMovieList,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const currentLocation = useLocation();
  const { enteredValues, handleChange, errors, isFormValid } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(enteredValues.search);
  };

  useEffect(() => {
    if (
      currentLocation.pathname === "/movies" &&
      localStorage.getItem(`${currentUser.email} - inputValue`)
    ) {
      enteredValues.search = localStorage.getItem(
        `${currentUser.email} - inputValue`
      );
    }
  }, []);

  useEffect(() => {
    if (currentLocation.pathname === "/movies" && !enteredValues.search)
      setIsErrorMessage({
        isShown: true,
        message: "Нужно ввести ключевое слово",
      });
  }, [enteredValues]);

  useEffect(() => {
    if (currentLocation.pathname === "/saved-movies" && !enteredValues.search) {
      setIsFiltredMovies(userMovies);
      setIsLocalMovieList(userMovies);
    }
  }, [enteredValues]);

  return (
    <section className="search">
      <div className="search__container">
        <form
          noValidate
          className="search__form"
          name="search"
          onSubmit={handleSubmit}
        >
          <input
            className="search__input"
            name="search"
            type="text"
            placeholder="Фильм"
            autoComplete="off"
            value={enteredValues.search || ""}
            onChange={handleChange}
            required
          />
          <button
            className="search__button"
            type="submit"
            disabled={!isFormValid}
          ></button>
        </form>
        <FilterCheckbox
          isShortMovies={isShortMovies}
          onFilterCheckbox={onFilterCheckbox}
        />
      </div>
    </section>
  );
};

export default SearchForm;
