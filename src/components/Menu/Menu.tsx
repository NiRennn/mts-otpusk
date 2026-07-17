import "./Menu.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import top from "../../assets/icons/load-top.svg";
import mtsLogo from "../../assets/icons/mts-logo.svg";

import Button from "../Button/Button";
import appRoutes from "../../routes/routes";
import { getQuestions } from "../../api/questions";
import { useAppStore } from "../../store/appStore";

function Menu() {
  const navigate = useNavigate();
  const setIsRoamingPopupOpen = useAppStore((state) => state.setIsRoamingPopupOpen);

  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);

  const handleGoToInfo = () => {
    navigate(appRoutes.INFO);
  };
  const handleGoToGame = async () => {
    setIsQuestionsLoading(true);

    try {
      const questions = await getQuestions();

      if (!questions.length) {
        console.error("Questions list is empty");
        return;
      }

      navigate(appRoutes.GAME);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsQuestionsLoading(false);
    }
  };

  const handleOpenRoaming = () => {
    setIsRoamingPopupOpen(true);
  };

  return (
    <div className="menu">
      <div className="menu__content">
        <div className="menu__content_top">
          <img src={top} alt="" className="menu__content_top_top" />
          <img src={mtsLogo} alt="" className="menu__content_top_logo" />
        </div>
        <div className="menu__content_bottom">
          <div className="menu__content_bottom_buttons">
            <Button
              variant="primary"
              onClick={handleGoToGame}
              disabled={isQuestionsLoading}
            >
              {isQuestionsLoading ? "Загрузка..." : "Начать\u00a0игру"}
            </Button>
            <Button variant="secondary" onClick={handleGoToInfo}>
              О&nbsp;розыгрыше
            </Button>
            <Button variant="secondary2" onClick={handleOpenRoaming}>
              Роуминг с&nbsp;МТС
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Menu;
