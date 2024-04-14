import Button from "../../shared/ui/Button/Button";
import { useTelegram } from "../../shared/lib/hooks/useTelegram";
import cls from './Header.module.css';

const Header = () => {
  const { user, onClose } = useTelegram();

  return (
    <div className={cls.header}>
      <span className={cls.username}>{user?.username}</span>
      <Button onClick={onClose} className={cls.btn}>Закрыть</Button>
    </div>
  );
};

export default Header;
