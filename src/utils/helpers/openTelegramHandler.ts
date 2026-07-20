import isTelegramLinkRobust from "./isTelegramLink"

export default function telegramHanlder(link: string) {
  if (isTelegramLinkRobust(link)) {
      window.Telegram.WebApp.openTelegramLink(link)
    }
    else {
      window.Telegram.WebApp.openLink(link)
    }
}