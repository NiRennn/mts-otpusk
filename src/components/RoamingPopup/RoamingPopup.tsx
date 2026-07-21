import "./RoamingPopup.scss";
import { useAppStore } from "../../store/appStore";
import Button from "../Button/Button";
import crossIcon from "../../assets/icons/cross.svg";
import telegramHanlder from "../../utils/helpers/openTelegramHandler";

const CHANNEL_URL = "https://c.mts.ru/uQ4e?af_r=https%3A%2F%2Fmts.ru%2Fpersonal%2Fmobilnaya-svyaz%2Frouming-rezhimy%3Futm_source%3Dtg%26utm_medium%3Dfix%26utm_campaign%3Dc_str_d_mrk_p_roaming_dt_q2-26_t_r_s_tg_r_rf_f_knopka-dm_a_all_kw_n_k_n_bl_b%26utm_content%3Dtg-chatbot-otpusk-kak-v-kino%26utm_term%3D__10002_&af_xp=custom&pid=tg&c=c_str_d_mrk_p_roaming_dt_q2-26_t_r_s_tg_r_rf_f_knopka-dm_a_all_kw_n_k_n_bl_b&af_dp=mymts%3A%2F%2Faction%2Fservice%3Falias%3Drouming-rezhimy&is_retargeting=true&af_reengagement_window=30d&af_adset=tg-chatbot-otpusk-kak-v-kino&af_ad=__10002_&af_sub1=fix";

export default function RoamingPopup() {
  const isRoamingPopupOpen = useAppStore((state) => state.isRoamingPopupOpen);
  const setIsRoamingPopupOpen = useAppStore((state) => state.setIsRoamingPopupOpen);

  if (!isRoamingPopupOpen) return null;

  const handleClose = () => {
    setIsRoamingPopupOpen(false);
  };

  const handleConnect = () => {
    telegramHanlder(CHANNEL_URL)
  };

  return (
    <div className="roaming-popup" onClick={handleClose}>
      <div className="roaming-popup__backdrop" />
      <div className="roaming-popup__container" onClick={(e) => e.stopPropagation()}>
        {/* Желтая подложка под попапом для двухслойного эффекта скругления */}
        <div className="roaming-popup__yellow-tab" />

        {/* Основная белая плашка */}
        <div className="roaming-popup__content">
          <button
            type="button"
            className="roaming-popup__close-btn"
            onClick={handleClose}
            aria-label="Закрыть"
          >
            <img src={crossIcon} alt="" />
          </button>

          <div className="roaming-popup__body">
            <h2 className="roaming-popup__title">
              Стойте! Это понадобится вам в&nbsp;отпуске 👇
            </h2>

            <div className="roaming-popup__text">
              <p>
                Мы&nbsp;про выгодные режимы роуминга от&nbsp;МТС! С&nbsp;бесплатным роумингом в&nbsp;режиме Лайт у&nbsp;вас будет неограниченный доступ к&nbsp;картам, банковским приложениям, безлимитные исходящие звонки на&nbsp;номера МТС и&nbsp;700&nbsp;МБ интернета.
              </p>
              <p>
                А&nbsp;если нужно больше, выбирайте режим Комфорт с&nbsp;3&nbsp;ГБ интернета и&nbsp;50&nbsp;мин или Максимум&nbsp;&mdash; с&nbsp;30&nbsp;ГБ и&nbsp;100&nbsp;мин.
              </p>
              <p>
                Подключайте и&nbsp;отправляйтесь в&nbsp;путешествие с&nbsp;лучшими условиями
              </p>
            </div>

            <div className="roaming-popup__footer">
              <Button variant="primary" onClick={handleConnect}>
                ПОДКЛЮЧИТЬСЯ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
