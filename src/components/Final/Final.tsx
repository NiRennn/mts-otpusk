import { useState } from "react";
import "./Final.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/routes";
import { useAppStore } from "../../store/appStore";
import { getQuestions } from "../../api/questions";

const CHANNEL_URL = "https://t.me/mtsofficial";

function Final() {
  const navigate = useNavigate();
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);

  const resetTestProgress = useAppStore((state) => state.resetTestProgress);

  const handleRestart = async () => {
    setIsQuestionsLoading(true);
    resetTestProgress();

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

  const result = useAppStore((state) => state.finalResponse || state.lastResult);

  const genreDisplay = result?.genre_display || "Комедия";
  const title = result?.title || "Отпуск: Комедия";
  const text = result?.text || "Ты любишь веселье и отдых...";

  return (
    <div className="final">
      <div className="final__image_spacer" />

      <div className="final__card">
        <div className="final__card_content">
          <span className="final__card_label">Ваш жанр отпуска</span>
          <h1 className="final__card_genre">{genreDisplay}</h1>
          <h2 className="final__card_title">«{title}»</h2>

          <div className="final__card_desc">
            {text.split("\r\n").map((paragraph, index) => {
              const lines = paragraph.split("\n");
              return lines.map((line, subIndex) => (
                <p key={`${index}-${subIndex}`}>{line}</p>
              ));
            })}
          </div>
        </div>

        <div className="final__card_buttons">
          <Button variant="primary" onClick={handleOpenRoaming}>
            Роуминг с&nbsp;МТС
          </Button>

          <div className="final__card_buttons_row">
            <Button
              variant="secondary2"
              onClick={handleRestart}
              disabled={isQuestionsLoading}
            >
              {isQuestionsLoading ? "Загрузка..." : "Повторить"}
            </Button>

            <Button variant="secondary" onClick={handleGoToInfo}>
              О&nbsp;розыгрыше
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Final;
