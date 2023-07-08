import promoLogo from "../../images/promo.svg";

import "./Promo.css";

const Promo = () => {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проет студента факультета Веб&#8209;разработки.
      </h1>
      <img src={promoLogo} alt="OCOCOC" className="promo__logo" />
    </section>
  );
};

export default Promo;
