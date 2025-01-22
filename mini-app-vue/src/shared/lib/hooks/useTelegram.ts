import { useWebApp } from "vue-tg";
import { useWebAppMainButton } from "vue-tg";

export function useTelegram() {
  const webApp = useWebApp(); // Получаем объект WebApp
  const {
    isMainButtonVisible,
    setMainButtonParams,
    showMainButton,
    hideMainButton,
  } = useWebAppMainButton();

  const onClose = () => {
    webApp.close(); // Закрываем WebApp
  };

  const onToggleButton = () => {
    if (isMainButtonVisible.value) {
      hideMainButton(); // Прячем кнопку
    } else {
      showMainButton(); // Показываем кнопку
    }
  };

  const updateButtonText = (text: string) => {
    setMainButtonParams({
      text, // Устанавливаем текст кнопки
    });
  };

  return {
    tg: webApp,
    user: webApp.initDataUnsafe?.user,
    onClose,
    onToggleButton,
    updateButtonText,
  };
}
