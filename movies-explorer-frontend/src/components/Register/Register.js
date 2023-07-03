import { Link } from "react-router-dom";
import logo from "../../images/headerLogo.svg";
import useFormValidation from "../../hooks/UseFormValidation";
import "./Register.css";

const Register = ({ onRegister, onLoading }) => {
  const { enteredValues, errors, handleChange, isFormValid } =
    useFormValidation();
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(enteredValues);
  }

  return (
    <main className="register">
      <div className="register__header">
        <Link className="register__link-logo" to="/">
          <img src={logo} alt="Логотип сайта" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
      </div>
      <form
        id="register"
        className="register__form"
        name="register"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="register__label">
          <span className="register__span">Имя</span>
          <input
            onChange={handleChange}
            className={`register__input ${
              isFormValid ? "" : "register__input_error"
            }`}
            name="name"
            type="text"
            value={enteredValues.name || ""}
            required
            minLength="2"
            maxLength="30"
          />
          {errors.name && (
            <span className="register__error">{errors.name}</span>
          )}
        </label>
        <label className="register__label">
          <span className="register__span">E-mail</span>
          <input
            onChange={handleChange}
            className={`register__input ${
              isFormValid ? "" : "register__input_error"
            }`}
            name="email"
            type="email"
            value={enteredValues.email || ""}
            required
          />
          {errors.email && (
            <span className="register__error">{errors.email}</span>
          )}
        </label>
        <label className="register__label">
          <span className="register__span">Пароль</span>
          <input
            onChange={handleChange}
            className={`register__input ${
              isFormValid ? "" : "register__input_error"
            }`}
            name="password"
            type="password"
            required
            minLength="6"
            maxLength="30"
            value={enteredValues.password || ""}
          />
          {errors.password && (
            <span className="register__error">{errors.password}</span>
          )}
        </label>
      </form>
      <div className="register__footer">
        <button
          form="register"
          type="submit"
          className={`register__button-edit ${
            !isFormValid ? "register__button-edit--disabled" : ""
          }`}
          disabled={!isFormValid || onLoading}
        >
          {onLoading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
        <span className="register__assist">
          Уже зарегистрированны?
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </span>
      </div>
    </main>
  );
};

export default Register;
