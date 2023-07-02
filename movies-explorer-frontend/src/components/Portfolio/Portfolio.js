import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/rumpil666/russian-travel"
            title="Проект - Russian travel"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/rumpil666/how-to-learn"
            title="Проект - How to Learn"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/rumpil666/react-mesto-api-full"
            title="Проект - Mesto"
            target="_blank"
            rel="noreferrer"
          >
            Одностроничный сайт
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
