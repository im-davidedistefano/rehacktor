import {Routes, Route} from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout.jsx";
import Homepage from '../pages/Homepage.jsx';
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import AllGames from "../pages/AllGames.jsx";
import Category from "../pages/Category.jsx";
import SingleGame from "../pages/SingleGame.jsx";
import Profile from '../pages/Profile.jsx';
import Settings from '../pages/Settings.jsx';
import MiddlewareRoutes from "../components/Middleware.jsx";
import ScrollToTop from "../hooks/ScrollToTop.jsx";
export default function Routing() {
    return (
        <>
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/games" element={<AllGames />} />
                    <Route path="/category/:id/:slug" element={<Category />} />
                    <Route element={<MiddlewareRoutes />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/games/:id/:game" element={<SingleGame />} />
                    </Route>
                </Route>
            </Routes>
        </>

    )
}

