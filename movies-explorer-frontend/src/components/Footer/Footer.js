import "./Footer.css";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум x BeatFilm
      </h2>
      <div className="footer__navigation">
        <p className="footer__copyright">&copy;&nbsp; {year}</p>
        <ul className="footer__links">
          <li>
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              title="Яндекс Практикум"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://github.com/rumpil666"
              target="_blank"
              title="Яндекс Практикум"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
