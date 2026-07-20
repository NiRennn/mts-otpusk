import "./Onboarding.scss";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import top from "../../assets/icons/load-top.svg";
import mtsLogo from "../../assets/icons/mts-logo.svg";
import ob from "../../assets/images/ob.png";
import sub from "../../assets/images/sub.png";
import cross from "../../assets/icons/cross.svg";

import Button from "../Button/Button";
import { useAppStore } from "../../store/appStore";
import { checkUserSubscription } from "../../api/subscription";
import { acceptRules } from "../../api/rules";
import appRoutes from "../../routes/routes";

type OnboardingStep = 0 | 1;
type CheckStatus = "idle" | "checking" | "not-found";

type OnboardingLocationState = {
  initialStep?: OnboardingStep;
};

const CHANNEL_URL = "https://t.me/+dp-S4hjQ6gZkM2Ni";

const onboardingSteps = [
  {
    image: ob,
    title: (
      <>
        Вы{"\u00A0"}когда‑нибудь задумывались, на{"\u00A0"}какой фильм похож ваш
        идеальный отпуск: на{"\u00A0"}романтическую историю с{"\u00A0"}случайными
        неслучайностями, драйвовый экшен с{"\u00A0"}незабываемыми приключениями
        или остроумное расследование, где подозрительно буквально всё? 🎥
        <br />
        <br />
        ✈️ Пройдите наш тест и{"\u00A0"}узнайте, какой жанр лучше всего отражает
        ваш стиль путешествий, и{"\u00A0"}выиграйте призы!
      </>
    ),
  },
  {
    image: sub,
    title: "Для\u00A0участия нужна подписка!",
    subtitle:
      "Выиграй крутые призы и\u00A0главный приз: Сертификат на\u00A0путешествие от\u00A0OneTwoTrip. Но\u00A0сначала, подпишись на\u00A0канал!",
  },
];

function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppStore((state) => state.user);

  const [isAcceptingRules, setIsAcceptingRules] = useState(false);

  const locationState = location.state as OnboardingLocationState | null;

  const getInitialStep = (): OnboardingStep => {
    if (locationState?.initialStep === 1) {
      return 1;
    }

    if (user?.rule && !user?.subs) {
      return 1;
    }

    return 0;
  };

  const [step, setStep] = useState<OnboardingStep>(() => getInitialStep());
  const [checkStatus, setCheckStatus] = useState<CheckStatus>("idle");

  const currentStep = onboardingSteps[step];

  const handleContinue = async () => {
    if (!user?.user_id) {
      console.error("user_id not found");
      return;
    }

    setIsAcceptingRules(true);

    try {
      const result = await acceptRules(user.user_id);

      if (!result.success || !result.rule) {
        console.error("Rules were not accepted:", result);
        return;
      }

      setStep(1);
    } catch (error) {
      console.error("Error accepting rules:", error);
    }
  };

  const handleOpenChannel = () => {
    const tg = (window as any)?.Telegram?.WebApp;

    if (tg?.openTelegramLink) {
      tg.openTelegramLink(CHANNEL_URL);
      return;
    }

    window.open(CHANNEL_URL, "_blank", "noopener,noreferrer");
  };

  const handleCheckSubscription = async () => {
    if (!user?.user_id) {
      console.error("user_id not found");
      setCheckStatus("not-found");
      return;
    }

    setCheckStatus("checking");

    try {
      const result = await checkUserSubscription(user.user_id);

      if (!result.success || !result.subs) {
        setCheckStatus("not-found");
        return;
      }

      setCheckStatus("idle");
      navigate(appRoutes.MENU);
    } catch (error) {
      console.error("Error checking subscription:", error);
      setCheckStatus("not-found");
    }
  };

  const handleCloseNotFound = () => {
    setCheckStatus("idle");
  };

  return (
    <div className="onboarding">
      <div className="onboarding__content">
        <div className="onboarding__content_top">
          <img src={top} alt="" className="onboarding__content_top_top" />
          <img src={mtsLogo} alt="" className="onboarding__content_top_logo" />
        </div>

        <img
          src={currentStep.image}
          alt=""
          className={`onboarding__content_bot_img ${
            step === 1 ? "onboarding__content_bot_img--sub" : ""
          }`}
        />

        <div className="onboarding__content_bot">
          <div className="onboarding__content_bot_panel">
            <h1
              className={`bot_panel_title ${
                step === 0 ? "bot_panel_title--intro" : ""
              }`}
            >
              {currentStep.title}
            </h1>

            {currentStep.subtitle && (
              <p className="bot_panel_subtitle">{currentStep.subtitle}</p>
            )}

            {step === 0 && (
              <Button
                variant="primary"
                onClick={handleContinue}
                disabled={isAcceptingRules}
              >
                {isAcceptingRules ? "Загрузка..." : "Продолжить!"}
              </Button>
            )}

            {step === 1 && (
              <div className="bot_panel_buttons">
                <Button variant="primary" onClick={handleOpenChannel}>
                  Подписаться на&nbsp;канал
                </Button>

                <Button
                  variant="secondary2"
                  onClick={handleCheckSubscription}
                  disabled={checkStatus === "checking"}
                >
                  Проверить подписку
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {checkStatus !== "idle" && (
        <div
          className={`onboarding__checking ${
            checkStatus === "not-found" ? "onboarding__checking--not-found" : ""
          }`}
        >
          {checkStatus === "checking" && (
            <>
              <div className="onboarding__checking_spinner"></div>

              <p className="onboarding__checking_text">
                Проверяем <br />
                подписку
              </p>
            </>
          )}

          {checkStatus === "not-found" && (
            <div className="onboarding__notfound">
              <img src={cross} alt="" className="onboarding__notfound_cross" />

              <div className="onboarding__notfound_card">
                <p className="onboarding__notfound_title">
                  Подписка
                  <br />
                  не найдена!
                </p>

                <p className="onboarding__notfound_text">
                  Мы не смогли найти вашу подписку на канал Движитал. Повторите
                  попытку еще раз!
                </p>
              </div>

              <Button variant="primary" onClick={handleCloseNotFound}>
                Повторить
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Onboarding;
