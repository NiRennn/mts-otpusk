import "./Menu.scss";

import top from "../../assets/icons/load-top.svg";
import mtsLogo from "../../assets/icons/mts-logo.svg";
import Button from "../Button/Button";
import pres from "../../assets/icons/st-3.png";

import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/routes";

const CHANNEL_URL = "https://t.me/+X_Y-xncYDCAzZTJi";

function Menu() {
  const navigate = useNavigate();

  const handleGoToInfo = () => {
    navigate(appRoutes.INFO);
  };
  const handleGoToGame = () => {
    navigate(appRoutes.GAME);
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
            <Button variant="primary" onClick={handleGoToGame}>
              Начать&nbsp;игру
            </Button>
            <Button variant="secondary" onClick={handleGoToInfo}>
              О&nbsp;розыгрыше
            </Button>
            <Button variant="secondary2" onClick={handleOpenRoaming}>
              Роуминг с&nbsp;МТС
            </Button>
          </div>
          {/* <img src={pres} alt="" className="menu__content_bottom_img" />
          <div className="spacer"></div>
          <h1 className="menu__content_bottom_title">
            Все приключения позади теперь вы в розыгрыше!
          </h1>
          <p className="menu__content_bottom_subtitle">
            Покажем победителей __ Августа
          </p>
          <div className="menu__content_bottom_buttons">
            <Button variant="secondary" onClick={handleGoToInfo}>
              О&nbsp;розыгрыше
            </Button>
            <Button variant="secondary2" onClick={handleOpenRoaming}>
              Роуминг с&nbsp;МТС
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
