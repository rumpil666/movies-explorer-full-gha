import { Link, NavLink, useLocation } from "react-router-dom";

import "./Navigation.css";

const Navigation = ({ isAccordionOpen, onClickAccordion, isLoggedIn }) => {
  const navigationLocation = useLocation();
  return (
    <>
      {isLoggedIn ? (
        <nav
          className={`navigation navigation__state--${
            isAccordionOpen ? "open" : "close"
          }`}
        >
          <ul
            className={`navigation__list navigation__list_logged navigation__list_state_${
              isAccordionOpen ? "open" : "close"
            }`}
          >
            {isAccordionOpen && (
              <li className="navigation__item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "navigation__link navigation__link_active"
                      : "navigation__link"
                  }
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
            )}
            <li className="navigation__item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "navigation__link navigation__link_active"
                    : "navigation__link"
                }
                to="/movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "navigation__link navigation__link_active"
                    : "navigation__link"
                }
                to="/saved-movies"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "navigation__link navigation__link_type_account navigation__link_active"
                    : "navigation__link navigation__link_type_account"
                }
                to="/profile"
              >
                Аккаунт
              </NavLink>
            </li>
          </ul>
          <button
            type="button"
            className={`${
              isAccordionOpen
                ? "navigation__accordion-button navigation__accordion-button_close"
                : "navigation__accordion-button"
            }`}
            onClick={onClickAccordion}
          ></button>
        </nav>
      ) : (
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <Link
                className="navigation__link navigation__link_landing"
                to="/signup"
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                className="navigation__link navigation__link_landing navigation__link_signin"
                to="/signin"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
