import { useEffect, useState } from "react";
import "./Info.scss";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/routes";

import Button from "../Button/Button";
import { useAppStore } from "../../store/appStore";

import top from "../../assets/icons/load-top.svg";
import mtsLogo from "../../assets/icons/mts-logo.svg";
import bags from "../../assets/images/info-bags.png";

import p1 from "../../assets/images/cardholder.png";
import p3 from "../../assets/images/chemodan.png";
import pmain from "../../assets/images/p-main.jpg";

import st1 from "../../assets/icons/st-1.png";
import st2 from "../../assets/images/ob.png";
import st3 from "../../assets/icons/st-3.png";

type FaqItem = {
  id: number;
  title: string;
  text: string;
};

const faqItems: FaqItem[] = [
  {
    id: 1,
    title: "Как\u00A0принять участие в\u00A0розыгрыше?",
    text: "Подпишись на\u00A0Телеграмм-канал Движитал, пройди тест и\u00A0поделись скриншотом в\u00A0комментариях конкурсной публикации и\u00A0жди результатов!",
  },
  {
    id: 2,
    title: "Как получить приз?",
    text: "После объявления результатов победителю необходимо самостоятельно написать нам в\u00A0официальное сообщество МТС ВКонтакте.\n\nВ\u00A0сообщении указать свой никнейм и\u00A0выигранный приз, а\u00A0также предоставить необходимые данные в\u00A0соответствии с\u00A0правилами кампании",
  },
  {
    id: 3,
    title: "Что можно выиграть?",
    text: "Среди тех, кто поделится своим результатом в\u00A0комментариях, разыграем:\n\n\u2014\u00A0Сертификат на\u00A0поездку от\u00A0OneTwoTrip номиналом 100\u00A0000\u00A0рублей;\n\u2014\u00A0Стильные чемоданы;\n\u2014\u00A0Картхолдеры из\u00A0натуральной кожи.",
  },
];

const prizes = [
  {
    id: 1,
    image: p1,
    name: "Фирменный кардхолдер МТС",
    count: "25 шт",
    className: "cardholder",
  },
  {
    id: 2,
    image: p3,
    name: "Чемодан American Tourister",
    count: "3 шт",
    className: "chemodan",
  },
];

function Info() {
  const [openedFaqId, setOpenedFaqId] = useState<number>(1);
  const navigate = useNavigate();
  const setIsRoamingPopupOpen = useAppStore((state) => state.setIsRoamingPopupOpen);

  const handleOpenRoaming = () => {
    setIsRoamingPopupOpen(true);
  };

  const handleOpenChannel = () => {
    const channelUrl = "https://t.me/dvizhitall";
    const tg = (window as any)?.Telegram?.WebApp;

    if (tg?.openTelegramLink) {
      tg.openTelegramLink(channelUrl);
    } else {
      window.open(channelUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleGoToMenu = () => {
    navigate(appRoutes.MENU);
  };

  useEffect(() => {
    const tg = (window as any)?.Telegram?.WebApp;
    const backButton = tg?.BackButton;

    if (!backButton) return;

    const handleTelegramBack = () => {
      navigate(appRoutes.MENU, { replace: true });
    };

    backButton.show();
    backButton.onClick(handleTelegramBack);

    return () => {
      backButton.offClick(handleTelegramBack);
      backButton.hide();
    };
  }, [navigate]);

  const handleToggleFaq = (id: number) => {
    setOpenedFaqId((prev) => (prev === id ? 0 : id));
  };

  return (
    <div className="info">
      <div className="info__scroll">
        <div className="info__scroll_top">
          <img src={top} alt="" className="info__scroll_top_top" />
          <img src={mtsLogo} alt="" className="info__scroll_top_logo" />
        </div>
        <img src={bags} alt="" className="info__scroll_bags" />

        <div className="info__scroll_mid">
          <h1 className="info__scroll_mid_header">
            Разыгрываем путешествие за&nbsp;победу в&nbsp;игре!
          </h1>

          <div className="info__scroll_mid_steps_y">
            <div className="info__scroll_mid_steps">
              <div className="info__scroll_mid_step wh">
                <div className="img-wrap">
                  <img src={st1} alt="" className="wh-img" />
                </div>
                <span className="info__scroll_mid_step_text">
                  Подпишись на&nbsp;канал Движитал
                </span>
              </div>
              <div className="info__scroll_mid_step bl">
                <div className="img-wrap">
                  <img src={st2} alt="" className="bl-img" />
                </div>
                <span className="info__scroll_mid_step_text">
                  Пройди игру и&nbsp;узнай свой отпускной жанр фильма
                </span>
              </div>
              <div className="info__scroll_mid_step ye">
                <div className="img-wrap">
                  <img src={st3} alt="" className="ye-img" />
                </div>
                <span className="info__scroll_mid_step_text">
                  Выиграй один из&nbsp;нескольких призов
                </span>
              </div>

              <div className="info__scroll_mid_steps_btn">
                <Button variant="primary" onClick={handleGoToMenu}>
                  Начать игру
                </Button>
              </div>
            </div>
          </div>
          <div className="info__scroll_mid_prizes">
            <h2 className="info__scroll_mid_prizes_header">
              Что можно выиграть
            </h2>
            <div className="info__scroll_mid_prizes_main_cont">
              <div className="info__scroll_mid_prizes_main">
                <div className="info__scroll_mid_prizes_main_left">
                  <span className="info__scroll_mid_prizes_main_left_top">
                    Главный приз
                  </span>
                  <span className="info__scroll_mid_prizes_main_left_bot">
                    Сертификат на&nbsp;100&nbsp;000&nbsp;₽ в&nbsp;отпуск!
                  </span>
                </div>
                <img
                  src={pmain}
                  alt=""
                  className="info__scroll_mid_prizes_main_img"
                />
              </div>
            </div>
            <div className="info__scroll_mid_prizes_slider">
              {prizes.map((prize) => (
                <div
                  className={`slider_item ${
                    prize.className ? `slider_item--${prize.className}` : ""
                  }`}
                  key={prize.id}
                >
                  <img
                    src={prize.image}
                    alt=""
                    className={`slider_item_img ${
                      prize.className ? `slider_item_img--${prize.className}` : ""
                    }`}
                  />

                  <span className="slider_item_name">{prize.name}</span>

                  <span className="slider_item_count">{prize.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="info__faq">
          <h2 className="info__faq_title">Ответы на&nbsp;частые вопросы</h2>

          <div className="info__faq_list">
            {faqItems.map((item) => {
              const isOpened = openedFaqId === item.id;

              return (
                <div
                  key={item.id}
                  className={`info__faq_item ${isOpened ? "info__faq_item--opened" : ""
                    }`}
                >
                  <button
                    type="button"
                    className="info__faq_head"
                    onClick={() => handleToggleFaq(item.id)}
                    aria-expanded={isOpened}
                  >
                    <span>{item.title}</span>
                    <span className="info__faq_icon">
                      {isOpened ? "−" : "+"}
                    </span>
                  </button>

                  <div className="info__faq_body">
                    <p className="info__faq_text">
                      {item.text.split("\n").map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="info__buttons">
            <Button variant="primary" onClick={handleOpenRoaming}>
              Роуминг от МТС
            </Button>
            <Button variant="secondary2" onClick={handleOpenChannel}>
              Канал Движитал
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
