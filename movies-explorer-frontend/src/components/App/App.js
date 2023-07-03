import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Error404 from "../Error404/Error404";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserSavedMovies, setIsUserSavedMovies] = useState([]);
  const [updatedUserMovieList, setUpdatedUserMovieList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    isSuccess: false,
    message: "",
  });

  const headerRoutesArr = ["/", "/movies", "/saved-movies", "/profile"];
  const footerRoutesArr = ["/", "/movies", "/saved-movies"];

  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleAccordionBtnClick = () => setIsAccordionOpen(!isAccordionOpen);
  const handleBackBtnClick = () => (navigate("/"));

  const checkElementRoute = (routesArr) =>
    routesArr.some((route) => route === currentLocation.pathname);

  const closeInfoTooltip = () => {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  };

  const handleRegisration = async (data) => {
    setIsLoading(true);
    await mainApi
      .register(data)
      .then(() => {
        setIsInfoTooltip({
          isOpen: true,
          isSuccess: true,
          message: "Регистрация успешна",
        });
        handleAuthorization(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message: `${
            err === "Ошибка: 409"
              ? "Пользователь с таким email уже существует"
              : "Упс, что-то пошло не так, попробуйте снова"
          }`,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAuthorization = async (data) => {
    setIsLoading(true);
    await mainApi
      .authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message: "Что-то пошло не так, попробуйте снова",
        })
        .finally(() => {
          setIsLoading(false);
        });
      });
  };

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
          navigate(currentLocation.pathname);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  };

  const handleEditProfile = async (newData) => {
    setIsLoading(true);
    await mainApi
      .setUserInfo(newData)
      .then((data) => {
        setCurrentUser(data);
        setIsInfoTooltip({
          isOpen: true,
          isSuccess: true,
          message: "Данные профиля успешно изменены",
        });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message: `${
            err === "Ошибка: 409"
              ? "Пользователь с таким email уже существует"
              : "Упс, что-то пошло не так, попробуйте снова"
          }`,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleMovieLike = (movie) => {
    const isLiked = isUserSavedMovies.some((i) => i.movieId === movie.movieId);

    isLiked
      ? handleMovieDelete(movie)
      : mainApi
          .addNewMovie(movie)
          .then((newMovie) =>
            setIsUserSavedMovies([...isUserSavedMovies, newMovie])
          )
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
  };

  const handleMovieDelete = (movies) => {
    const savedMovies = isUserSavedMovies.find(
      (userMovie) =>
        userMovie.movieId === movies.id || userMovie.movieId === movies.movieId
    );
    mainApi
      .deleteMovie(savedMovies._id)
      .then(() => {
        setIsUserSavedMovies((movies) =>
          movies.filter((movie) => movie.movieId !== movies.movieId)
        );
        setUpdatedUserMovieList(isUserSavedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) setIsLoading(true);
    mainApi
      .getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && currentUser) setIsLoading(true);
    mainApi
      .getInitialMovies()
      .then((movies) => {
        setIsUserSavedMovies(movies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoggedIn, currentUser, updatedUserMovieList]);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        {checkElementRoute(headerRoutesArr) && (
          <Header
            isLoggedIn={isLoggedIn}
            isAccordionOpen={isAccordionOpen}
            onClickAccordion={handleAccordionBtnClick}
          />
        )}
        <Routes>
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleAuthorization} onLoading={isLoading} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register
                  onRegister={handleRegisration}
                  onLoading={isLoading}
                />
              )
            }
          />
          <Route path="/" element={<Main />} />
          <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
            <Route
              path="/movies"
              element={
                <Movies
                  onLike={handleMovieLike}
                  onDelete={handleMovieDelete}
                  userMovies={isUserSavedMovies}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  onDelete={handleMovieDelete}
                  userMovies={isUserSavedMovies}
                  updateMoviesAfterDel={updatedUserMovieList}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onSignOut={handleSignOut}
                  onSubmit={handleEditProfile}
                  onLoading={isLoading}
                />
              }
            />
          </Route>
          <Route path="*" element={<Error404 onClick={handleBackBtnClick} />} />
        </Routes>
        {checkElementRoute(footerRoutesArr) && <Footer />}
        <InfoTooltip
          onClose={closeInfoTooltip}
          isConfigTooltip={isInfoTooltip}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
