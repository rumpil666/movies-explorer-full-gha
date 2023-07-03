import { DURATION } from "./constants";

export const toHoursAndMinutes = (min) => {
  let hours = Math.floor(min / 60);
  const minutes = min % 60;
  return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
};

export const findLikeMovies = (userMoviesData, movie) =>
  userMoviesData.find((i) => i.movieId === movie.id);

export const filterShortMovies = (moviesData) =>
  moviesData.filter((movie) => movie.duration <= DURATION);

export const filterMoviesSearch = (moviesData, searchQuery) => {
  const filterMovies = moviesData.filter((movie) => {
    return (
      String(movie.nameRU)
        .toLowerCase()
        .trim()
        .indexOf(searchQuery.toLowerCase().trim()) !== -1 ||
      String(movie.nameEN)
        .toLowerCase()
        .trim()
        .indexOf(searchQuery.toLowerCase().trim()) !== -1
    );
  });
  return filterMovies;
};

export const transformMoviesData = (moviesData) => {
  moviesData.forEach((movie) => {
    if (!movie.nameEN) movie.nameEN = movie.nameRU;
    if (!movie.country) movie.country = "Russia";
    if (
      !movie.trailerLink ||
      !movie.trailerLink.includes("https://www.youtube.com/")
    )
      movie.trailerLink = "https://www.youtube.com/watch?v=HwVh8pmOot4";
    if (!movie.image) {
      movie.image =
        "https://hostingkartinok.com/show-image.php?id=3e134d33341bc8ada6a9aac38911fead";
      movie.thumbnail =
        "https://hostingkartinok.com/show-image.php?id=3e134d33341bc8ada6a9aac38911fead";
    } else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;
    }
  });
  return moviesData;
};
