import "./Loading.scss";
import { useEffect } from "react";
import appRoutes from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { fetchAndHydrateUserData } from "../../api/userData";
import top from "../../assets/icons/load-top.svg";
import mtsLogo from "../../assets/icons/mts-logo.svg";
import back from "../../assets/images/load-img.png";
import Loader from "../Loader/Loader";
import type { GetUserDataResponse } from "../../store/appStore";
import { preloadImageSrcs } from "../../utils/preload";
import { APP_PRELOAD_IMAGES } from "../../data/preloadImages";

import {
  getEffectiveUserId,
  getTelegramInitData,
} from "../../api/telegramAuth";

const MIN_LOADING_DELAY = 3000;

const delay = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

function Loading() {
  const navigate = useNavigate();

  type OnboardingInitialStep = 0 | 1;

  type NextRoute = {
    to: string;
    state?: {
      initialStep?: OnboardingInitialStep;
    };
  };

  const pickNextRoute = (data: GetUserDataResponse): NextRoute => {
    const user = data.user;
    const hasWinners = Array.isArray(data.winners) && data.winners.length > 0;
    const hasLastResult = Boolean(data.last_result);

    if (hasWinners) {
      return {
        to: appRoutes.END,
      };
    }

    if (user?.rule && user?.subs && hasLastResult) {
      return {
        to: appRoutes.FINAL,
      };
    }

    if (user?.rule && user?.subs) {
      return {
        to: appRoutes.MENU,
      };
    }

    if (user?.rule && !user?.subs) {
      return {
        to: appRoutes.ONBOARDING,
        state: {
          initialStep: 1,
        },
      };
    }

    return {
      to: appRoutes.ONBOARDING,
      state: {
        initialStep: 0,
      },
    };
  };
  // const tg = (window as any)?.Telegram?.WebApp;

  useEffect(() => {
    let navigated = false;
    let cancelled = false;

    const tg = (window as any)?.Telegram?.WebApp;
    tg?.ready?.();

    const go = (to: string, state?: { initialStep?: 0 | 1 }) => {
      if (navigated || cancelled) return;

      navigated = true;
      navigate(to, { replace: true, state });
    };

    const effectiveUserId = getEffectiveUserId();
    const startParam =
      tg?.initDataUnsafe?.start_param ??
      new URLSearchParams(window.location.search).get("start_param") ??
      "";

    const initData = getTelegramInitData();

    if (!effectiveUserId) {
      console.error("effectiveUserId not found");
      return;
    }
    if (!initData) {
      console.error("Telegram initData is empty");
      return;
    }

    
    console.log(initData);

    try {
      const platform: string | undefined = tg?.platform;
      if (
        platform === "android" ||
        platform === "ios" ||
        platform === "android_x" ||
        platform === "unigram"
      ) {
        tg?.requestFullscreen?.();
        tg?.lockOrientation();
      } else if (
        platform === "tdesktop" ||
        platform === "weba" ||
        platform === "webk" ||
        platform === "unknown"
      ) {
        tg?.exitFullscreen?.();
        tg?.setMinimumHeight?.(700);
      }
      tg?.expand?.();
    } catch {
      tg?.expand?.();
    }
    try {
      tg?.disableVerticalSwipes?.();
    } catch {}

    tg?.setHeaderColor?.("#f3f9ff");
    tg?.setBackgroundColor?.("#f3f9ff");
    tg?.setBottomBarColor?.("#f3f9ff");

    const preloadImages = async () => {
      const results = await preloadImageSrcs(APP_PRELOAD_IMAGES);

      const failedImages = results
        .filter((result) => !result.ok)
        .map((result) => result.src);

      if (failedImages.length) {
        console.warn("[preload] failed images:", failedImages);
      }
    };

    const init = async () => {
      const minDelay = delay(MIN_LOADING_DELAY);

      const userDataPromise = fetchAndHydrateUserData(
        effectiveUserId,
        startParam,
      );

      const [userDataResult, preloadResult] = await Promise.allSettled([
        userDataPromise,
        preloadImages(),
        minDelay,
      ]);

      if (preloadResult.status !== "fulfilled") {
        console.error("Error preloading images:", preloadResult.reason);
        return;
      }

      if (cancelled) return;

      if (userDataResult.status !== "fulfilled") {
        console.error("Error fetching user data:", userDataResult.reason);
        return;
      }

      const userData = userDataResult.value;

      if (!userData.user) {
        console.error("User data is empty");
        return;
      }

      const nextRoute = pickNextRoute(userData);

      go(nextRoute.to, nextRoute.state);
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [navigate]);
  return (
    <div className="loading">
      <div className="loading__content">
        <div className="loading__content_top">
          <img src={mtsLogo} alt="" className="loading__logo" />
          <img src={top} alt="" className="loading__top" />
        </div>
        <img src={back} alt="" className="loading__back" />

        <Loader />
      </div>
    </div>
  );
}

export default Loading;
