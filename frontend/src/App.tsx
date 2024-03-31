import { useEffect } from "react";
import "./App.css";

const tg = Telegram.WebApp;

function App() {
    useEffect(() => {
        tg.ready();
    }, [])
  
    const onClose = () => {
        tg.close()
    }

  return (
    <div>
      <h1>MAKATELS BOT</h1>
      <p>НИХУЯСЕБЕ ВОТ ЭТО ДА</p>
      <p>ПРИХУЯРИЛ ФРОНТЕНД</p>
      <button onClick={onClose}>ЗАКРЫТЬ</button>
    </div>
  );
}

export default App;
