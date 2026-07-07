import { useEffect, useState } from "react";
import "./Info.scss";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/routes";

import Button from "../Button/Button";

import top from "../../assets/icons/load-top.svg";
import mtsLogo from "../../assets/icons/mts-logo.svg";
import bags from "../../assets/images/info-bags.png";

import p1 from "../../assets/images/p-jacket.jpg";
import p2 from "../../assets/images/p-airpods.jpg";
import p3 from "../../assets/images/p-iphone.jpg";
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
    text: "Подпишись на\u00A0Телеграмм-канал РИИЛ, найди в\u00A0игре 5\u00A0катушек плёнки и\u00A0жди результатов!",
  },
  {
    id: 2,
    title: "Кто организатор розыгрыша",
    text: "Если не\u00A0веришь в\u00A0удачу, можешь купить плёнку в\u00A0фотолаборатории\u00A0ЛУЧ. Проявка и\u00A0сканирование будет бесплатным!",
  },
  {
    id: 3,
    title: "Что можно выиграть?",
    text: "Мы\u00A0прокачали классическую катушку Lucky Color C200 на\u00A036\u00A0кадров, добавив узоры и\u00A0шанс стать частью кампании.\n\nПриходи в\u00A0фотолабораторию Луч, бесплатно сканируй плёнку и, возможно, именно твои кадры появятся в\u00A0наружной рекламе МТС\u00A0РИИЛ.",
  },
];

const prizes = [
  {
    id: 1,
    image: p1,
    name: "Фирменный жилет",
    count: "12 шт",
  },
  {
    id: 2,
    image: p3,
    name: "iPhone 17 Pro Max",
    count: "1 шт",
  },
  {
    id: 3,
    image: p2,
    name: "AirPods 4",
    count: "5 шт",
  },
];

function Info() {
  const [openedFaqId, setOpenedFaqId] = useState<number>(1);
  const navigate = useNavigate();

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
                  Подпишись на&nbsp;канал Движитл
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

            <div className="info__scroll_mid_prizes_slider">
              {prizes.map((prize) => (
                <div className="slider_item" key={prize.id}>
                  <img src={prize.image} alt="" className="slider_item_img" />

                  <span className="slider_item_name">{prize.name}</span>

                  <span className="slider_item_count">{prize.count}</span>
                </div>
              ))}
            </div>
            <div className="info__scroll_mid_prizes_main_cont">
              <div className="info__scroll_mid_prizes_main">
                <div className="info__scroll_mid_prizes_main_left">
                  <span className="info__scroll_mid_prizes_main_left_top">
                    Главный приз
                  </span>
                  <span className="info__scroll_mid_prizes_main_left_bot">
                    Сертификат на&nbsp;200&nbsp;000&nbsp;₽ в&nbsp;отпуск!
                  </span>
                </div>
                <img
                  src={pmain}
                  alt=""
                  className="info__scroll_mid_prizes_main_img"
                />
              </div>
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
                  className={`info__faq_item ${
                    isOpened ? "info__faq_item--opened" : ""
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
            <Button variant="primary">Роуминг от МТС</Button>
            <Button variant="secondary2">Канал Движитл</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
