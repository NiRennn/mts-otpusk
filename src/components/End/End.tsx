import "./End.scss";

import top from "../../assets/icons/load-top.svg";
import mtsLogo from "../../assets/icons/mts-logo.svg";
import pres from "../../assets/icons/st-3.png";
import win from "../../assets/icons/win.svg";
import wingray from "../../assets/icons/win-gray.svg";

import Button from "../Button/Button";
import { useAppStore } from "../../store/appStore";

function End() {
  const user = useAppStore((state) => state.user);
  const winners = useAppStore((state) => state.winners);

  const sortedWinners = [...winners].sort((a, b) => a.place - b.place);

  const handleWinnerClick = () => {
    const tg = (window as any)?.Telegram?.WebApp;
    const vkUrl = "https://vk.com/mts";

    if (tg?.openLink) {
      tg.openLink(vkUrl);
      return;
    }

    window.open(vkUrl, "_blank", "noopener,noreferrer");
  };

  const getWinnerUsername = (winner: (typeof winners)[number]) => {
    if (winner.username) {
      return `@${winner.username}`;
    }

    if (winner.first_name) {
      return winner.first_name;
    }

    return `ID ${winner.user_id}`;
  };


  return (
    <div className="end">
      <div className="end__content">
        <div className="end__content_top">
          <img src={top} alt="" className="end__content_top_top" />
          <img src={mtsLogo} alt="" className="end__content_top_logo" />
        </div>
        <div className="end__content_mid">
          <img src={pres} alt="" className="end__content_mid_img" />
          <h1 className="end__content_mid_title">
            Игра завершена, поздравляем&nbsp;победителей!
          </h1>
          <p className="end__content_mid_subtitle">
            Если ты&nbsp;нашёл себя в&nbsp;списке призёров&nbsp;— напиши
            нам&nbsp;в&nbsp;личные сообщения сообщества МТС&nbsp;в&nbsp;ВК.
            Укажи своё ФИО&nbsp;и&nbsp;название приза&nbsp;— мы&nbsp;свяжемся
            с&nbsp;тобой и&nbsp;расскажем, как&nbsp;его&nbsp;получить. Спасибо
            за&nbsp;участие!
          </p>
          <div className="end__content_mid_btn">
            <Button variant="primary" onClick={handleWinnerClick}>Я победитель!</Button>
          </div>
        </div>
         <div className="end__content_bot_y">
          <div className="end__content_bot">
            <div className="end__content_bot_list">
              {sortedWinners.map((winnerItem) => {
                const isCurrentUserWinner =
                  user?.user_id === winnerItem.user_id;

                return (
                  <div
                    key={`${winnerItem.place}-${winnerItem.user_id}`}
                    className={`list_item ${
                      isCurrentUserWinner ? "list_item--current-user" : ""
                    }`}
                  >
                    <div
                      className={`list_item_place ${
                        isCurrentUserWinner
                          ? "list_item_place--current-user"
                          : ""
                      }`}
                    >
                      {winnerItem.place}
                    </div>

                    <div className="list_item_content">
                      <p className="list_item_username">
                        {getWinnerUsername(winnerItem)}
                      </p>

                      <div className="list_item_wrap">
                        <img
                          src={isCurrentUserWinner ? win : wingray}
                          alt=""
                          className="list_item_prize"
                        />

                        <p className="list_item_label">{winnerItem.prize}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {!sortedWinners.length && (
                <p className="end__content_bot_empty">
                  Победители пока не найдены
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default End;
