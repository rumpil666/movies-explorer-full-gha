import { Link } from "react-router-dom";
import logo from "../../images/headerLogo.svg";
import useFormValidation from "../../hooks/UseFormValidation";
import "./Login.css";

const Login = ({ onLogin, onLoading }) => {
  const { enteredValues, errors, handleChange, isFormValid } =
    useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(enteredValues);
  }

  return (
    <main className="login">
      <div className="login__header">
        <Link className="login__link-logo" to="/">
          <img src={logo} alt="Логотип сайта" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
      </div>
      <form
        id="login"
        className="login__form"
        name="login"
        onSubmit={handleSubmit}
      >
        <div className="login__container">
          <label className="login__label">
            <span className="login__span">E-mail</span>
            <input
              onChange={handleChange}
              className={`login__input ${
                isFormValid ? "" : "login__input_error"
              }`}
              name="email"
              type="email"
              value={enteredValues.email || ""}
              required
            />
            {errors.email && (
              <span className="login__error">{errors.email}</span>
            )}
          </label>
          <label className="login__label">
            <span className="login__span">Пароль</span>
            <input
              onChange={handleChange}
              className={`login__input ${
                isFormValid ? "" : "login__input_error"
              }`}
              name="password"
              type="password"
              value={enteredValues.password || ""}
              required
            />
            {errors.password && (
              <span className="login__error">{errors.password}</span>
            )}
          </label>
        </div>
      </form>
      <div className="login__footer">
        <button
          form="login"
          type="submit"
          className={`login__button-edit ${
            !isFormValid ? "login__button-edit--disabled" : ""
          }`}
          disabled={!isFormValid}
        >
          {onLoading ? "Вход..." : "Войти"}
        </button>
        <span className="login__assist">
          Ещё не зарегистрированны?
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </span>
      </div>
    </main>
  );
};

export default Login;
