import Button from "../../shared/ui/Button/Button";
import { useTelegram } from "../../shared/lib/hooks/useTelegram";
import "./Header.css";

const Header = () => {
  const { user, onClose } = useTelegram();

  return (
    <div className={"header "}>
      <Button onClick={onClose}>Закрыть</Button>
      <span className={"username "}>{user?.username}</span>
    </div>
  );
};

export default Header;
