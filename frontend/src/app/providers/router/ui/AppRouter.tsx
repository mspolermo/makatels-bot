import { Suspense, memo, useCallback} from 'react';
import { Route, Routes } from 'react-router-dom';
import { type RouteProps } from 'react-router-dom';
import { RouteConfig } from '@/shared/config/routerConfig/routerConfig';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: RouteProps) => {
        const element = (
            <Suspense fallback={''}>
                <div>
                    {route.element}
                </div>
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(RouteConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);