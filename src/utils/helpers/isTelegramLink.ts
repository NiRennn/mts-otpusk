export default function isTelegramLinkRobust(urlString: string) {
    if (!urlString) return false;
  
    let urlToTest = urlString;
    // Если строка не начинается с протокола, добавляем его для корректной работы new URL()
    if (!/^https?:\/\//i.test(urlToTest)) {
      urlToTest = 'https://' + urlToTest;
    }
  
    try {
      const url = new URL(urlToTest);
      const hostname = url.hostname;
  
      return hostname === 't.me' || hostname === 'telegram.me';
      // Можно и с endsWith, но для Telegram это пока излишне
      
    } catch (error) {
      return false;
    }
  }