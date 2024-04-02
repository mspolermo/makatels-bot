import { RoutePath } from "@/shared/config/routerConfig/routerConfig";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate(RoutePath.main);
        }, 2000);
    
        return () => clearTimeout(redirectTimer);
    }, [navigate]);

    return (
        <div>
            Страница не найдена
        </div>
    );
};

export default NotFoundPage;