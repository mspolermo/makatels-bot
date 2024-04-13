import { useEffect } from "react";
import "./styles/index.css";
import Header from "../widgets/Header/Header";
import { useTelegram } from "@/shared/lib/hooks/useTelegram";
import { AppRouter } from "./providers/router";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  console.log(tg);
  return (
    <div>
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
