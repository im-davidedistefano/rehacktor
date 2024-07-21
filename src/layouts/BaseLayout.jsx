import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from "react-router-dom";
export default function BaseLayout() {
    return (
        <main>
            <Header/>
            <Outlet/>
            <Footer/>
        </main>
    )
}