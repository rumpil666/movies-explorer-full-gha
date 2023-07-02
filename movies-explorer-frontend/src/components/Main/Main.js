import Promo from "../Promo/Promo";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Portfolio from "../Portfolio/Portfolio";
import Techs from "../Techs/Techs";

import "./Main.css";

const Main = ({ isAccordionOpen, handleAccordionBtnClick }) => {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
};

export default Main;
