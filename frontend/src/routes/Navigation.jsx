import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';

export const Navigation = () => {

    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<route.component />}
                            exact={route.exact}
                        />
                    ))
                }
            </Routes>
        </BrowserRouter>
    )
}
