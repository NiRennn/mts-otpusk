import "./Menu.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import top from "../../assets/icons/load-top.svg";
import mtsLogo from "../../assets/icons/mts-logo.svg";

import Button from "../Button/Button";
import appRoutes from "../../routes/routes";
import { getQuestions } from "../../api/questions";

const CHANNEL_URL = "https://t.me/+X_Y-xncYDCAzZTJi";
const QUESTIONS_LIMIT = 3;

function Menu() {
  const navigate = useNavigate();

  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);

  const handleGoToInfo = () => {
    navigate(appRoutes.INFO);
  };
  const handleGoToGame = async () => {
    setIsQuestionsLoading(true);

    try {
      const questions = await getQuestions(QUESTIONS_LIMIT);

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
    const tg = (window as any)?.Telegram?.WebApp;

    if (tg?.openTelegramLink) {
      tg.openTelegramLink(CHANNEL_URL);
      return;
    }

    window.open(CHANNEL_URL, "_blank", "noopener,noreferrer");
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
