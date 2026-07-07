import "./End.scss";
import top from "../../assets/icons/load-top.svg";
import mtsLogo from "../../assets/icons/mts-logo.svg";
import pres from "../../assets/icons/st-3.png";
import win from "../../assets/icons/win.svg";
import Button from "../Button/Button";

function End() {
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
            <Button variant="primary">Я победитель!</Button>
          </div>
        </div>
        <div className="end__content_bot_y">
          <div className="end__content_bot">
            <div className="end__content_bot_list">
              <div className="list_item">
                <div className="list_item_place">1</div>
                <div className="list_item_content">
                  <p className="list_item_username">@username</p>

                  <div className="list_item_wrap">
                    <img src={win} alt="" className="list_item_prize" />
                    <p className="list_item_label">Название приза</p>
                  </div>
                </div>
              </div>
              <div className="list_item">
                <div className="list_item_place">1</div>
                <div className="list_item_content">
                  <p className="list_item_username">@username</p>

                  <div className="list_item_wrap">
                    <img src={win} alt="" className="list_item_prize" />
                    <p className="list_item_label">Название приза</p>
                  </div>
                </div>
              </div>
              <div className="list_item">
                <div className="list_item_place">1</div>
                <div className="list_item_content">
                  <p className="list_item_username">@username</p>

                  <div className="list_item_wrap">
                    <img src={win} alt="" className="list_item_prize" />
                    <p className="list_item_label">Название приза</p>
                  </div>
                </div>
              </div>
              <div className="list_item">
                <div className="list_item_place">1</div>
                <div className="list_item_content">
                  <p className="list_item_username">@username</p>

                  <div className="list_item_wrap">
                    <img src={win} alt="" className="list_item_prize" />
                    <p className="list_item_label">Название приза</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default End;
