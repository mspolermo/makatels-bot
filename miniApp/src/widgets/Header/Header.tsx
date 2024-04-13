import Button from "../../shared/ui/Button/Button";
import { useTelegram } from "../../shared/lib/hooks/useTelegram";
import cls from './Header.module.css';

const Header = () => {
  const { user, onClose, onToggleButton } = useTelegram();

  return (
    <div className={cls.header}>
      <span className={cls.username}>{user?.username}</span>
      <Button onClick={onToggleButton} className={cls.btn}>Ближайшие</Button>
      <Button onClick={onClose} className={cls.btn}>Закрыть</Button>
    </div>
  );
};

export default Header;
