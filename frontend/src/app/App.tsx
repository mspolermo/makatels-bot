import { useEffect } from "react";
import "./styles/index.css";
import Header from "../shared/ui/Header/Header";
import { useTelegram } from "../shared/lib/hooks/useTelegram";
import Button from "../shared/ui/Button/Button";

function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div>
      <Header />
      <h1>MAKATELS BOT</h1>
      <p>НИХУЯСЕБЕ ВОТ ЭТО ДА</p>
      <p>ПРИХУЯРИЛ ФРОНТЕНД епт</p>
      <Button onClick={onToggleButton}>toggle</Button>
    </div>
  );
}

export default App;
