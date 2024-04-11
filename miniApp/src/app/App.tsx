import { useEffect } from "react";
import "./styles/index.css";
import Header from "../widgets/Header/Header";
import { useTelegram } from "@/shared/lib/hooks/useTelegram";
import Button from "@/shared/ui/Button/Button";
import { AppRouter } from "./providers/router";

function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  console.log(tg);
  return (
    <div>
      <Header />
      {/* <Button onClick={onToggleButton}>toggle</Button> */}
      <AppRouter />
    </div>
  );
}

export default App;
