import avatar from "../../images/avatar.jpg";
import "./AboutMe.css";

const AboutMe = () => {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__bio">
          <h3 className="about-me__subtitle">Антон</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 27 лет</p>
          <p className="about-me__text-info">
            Я родился в городе Пугачеве, а сейчас живу в Саратове, закончил
            факультет нано- и биомедицинских технологий СГУ. У меня есть жена,
            которая мне подарила сыночка - Марка. В свободное время люблю
            смотреть сериалы и аниме. Еще в детстве смотрел "Шаман кинг",
            "Самурай Икс" по СТС и до сих пор смотрю бессконечный "One Piece" и
            новый, но не менее крутой "Клинок рассекающий демонов". Так же,
            люблю волейбол. Работаю в компании "Русагро".
          </p>
          <ul className="about-me__contacts">
            <li>
              <a
                className="about-me__link"
                href="https://github.com/rumpil666"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="about-me__link"
                href="https://vk.com/perwak"
                target="_blank"
                rel="noreferrer"
                title="ВКонтакте"
              >
                ВКонтакте
              </a>
            </li>
            <li>
              <a
                className="about-me__link"
                href="mailto:rumpil666@gmail.com"
                target="_blank"
                rel="noreferrer"
                title="Почта"
              >
                GMail
              </a>
            </li>
          </ul>
        </div>
        <img className="about-me__avatar" src={avatar} alt="Машков Антон" />
      </div>
    </section>
  );
};

export default AboutMe;
