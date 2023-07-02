import "./Profile.css";
import { useContext, useEffect } from "react";
import useFormValidation from "../../hooks/UseFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = ({ onSignOut, onSubmit }) => {
  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useFormValidation();

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  };

  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${
          currentUser.name ?? ""
        }!`}</h1>
        <form
          id="submit"
          className="profile__form "
          name="profile"
          onSubmit={handleSubmit}
        >
          <label className="profile__label">
            <span className="profile__span">Имя</span>
            <input
              onChange={handleChange}
              className="profile__input"
              name="name"
              type="text"
              required
              minLength="2"
              maxLength="30"
              value={enteredValues.name || ""}
            />
          </label>
          {errors.name && <span className="profile__error">{errors.name}</span>}
          <label className="profile__label">
            <span className="profile__span">E-mail</span>
            <input
              onChange={handleChange}
              className="profile__input"
              name="email"
              type="email"
              value={enteredValues.email || ""}
              required
            />
          </label>
          {errors.email && (
            <span className="profile__error">{errors.email}</span>
          )}
        </form>
        <div className="profile__buttons-container">
          <button form="submit" type="submit" className="profile__button-edit">
            Редактировать
          </button>
          <button
            type="button"
            className="profile__button-exit"
            onClick={onSignOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
