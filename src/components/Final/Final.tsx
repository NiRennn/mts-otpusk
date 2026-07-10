import "./Final.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/routes";

const CHANNEL_URL = "https://t.me/mtsofficial";

function Final() {
  const navigate = useNavigate();

  const handleGoToInfo = () => {
    navigate(appRoutes.INFO);
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
    <div className="final">
      <div className="final__top">
        <span className="final__top_f">Жанр вашего отпуска</span>
        <span className="final__top_name">КОМЕДИЯ</span>
        <span className="final__top_desc">
          Lorem ipsum dolor sit amet consectetur. Diam facilisi nunc quam
          adipiscing egestas lacinia purus scelerisque. Enim eu feugiat.
        </span>
      </div>
      <div className="final__bot">
        <div className="final__bot_hor">
          <Button variant="secondary2">Повторить</Button>

          <Button variant="secondary">В&nbsp;комментарии</Button>
        </div>
        <Button variant="secondary" onClick={handleGoToInfo}>
          О&nbsp;розыгрыше
        </Button>
        <Button variant="primary" onClick={handleOpenRoaming}>
          Роуминг с&nbsp;МТС
        </Button>
      </div>
    </div>
  );
}

export default Final;
