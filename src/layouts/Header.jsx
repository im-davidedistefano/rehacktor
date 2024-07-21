import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import '../assets/scss/layouts/Header.scss'
import logo from './../assets/img/logo.svg'
import guest from './../assets/img/guest.webp'
import axios from "axios";
import supabase from "../supabase/client.js";
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import getProfileImg from "../utils/getProfileImg.js";
import mobileMenu from "../utils/mobileMenu.js";

export default function Header () {
    const navigate = useNavigate();
    const { sessione, profile } = useContext(AuthContext);
    const [allCategories, setAllCategories] = useState([]);
    const [categoryActive, setCategoryActive] = useState(false);
    let location = useLocation();

    useEffect(() => {
        setCategoryActive(false);
        const getAllCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APIBASEURL}/genres`, {
                    params: {
                        key: import.meta.env.VITE_APIKEY
                    }
                });
                const { results } = response.data;
                setAllCategories(results);

                new Swiper('.categories-swiper', {
                    slidesPerView: 10.3,
                    spaceBetween: '16px',
                    grabCursor: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            } catch (error) {
                console.error(error);
            }
        }

        getAllCategories();
    }, [location]);

    const handleCategoryClick = () => {
        setCategoryActive(!categoryActive);
    };

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                alert(error);
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <header>
            <nav className="container-fluid px-0">
                <div className="row align-items-center justify-content-between p-3">
                    <div className="col-12 d-flex align-items-center gap-5">
                        <Link to={'/'} className="logo" title={'Homepage'}>
                            <img src={logo} alt={import.meta.env.VITE_PROJECTNAME}/>
                        </Link>
                        <div className="row w-100 align-items-center justify-content-between">
                            <ul className="col-4 navbar-nav flex-row gap-5 d-none d-md-flex">
                                <li className="nav-item">
                                    <Link to={'/games'} className="nav-link text-uppercase fw-bold py-0">All
                                        games</Link>
                                </li>
                                <li id="menuCategories" className="nav-item" onClick={handleCategoryClick}>
                                    <button className="nav-link text-uppercase fw-bold py-0">Categories</button>
                                </li>
                            </ul>
                            <ul className="col-md-3 justify-content-end navbar-nav flex-row gap-4 pe-3">
                                <li className="nav-item d-flex align-items-center gap-3 d-none d-md-flex">
                                    {(!sessione) ? (
                                        <Link to={'/login'}
                                              className="btn btn-primary text-white px-3 nav-item rounded-0 nav-link text-uppercase fw-bold">Login</Link>
                                    ) : (
                                        profile &&
                                        <>
                                            <Link to={'/profile'} className="text-black fw-bold text-decoration-none">
                                                <span>{profile.first_name}</span>
                                                <img
                                                    src={profile.avatar_url ? getProfileImg(profile.avatar_url) : guest}
                                                    alt={`${profile.first_name} profile image`}
                                                    className="ms-3 propic"/>
                                            </Link>
                                            <button className="bg-transparent px-0 border-0 small text-grey"
                                                    onClick={handleSignOut}>logout
                                            </button>
                                        </>
                                    )}
                                </li>
                                <li className="d-none d-md-flex">
                                    {(!sessione) && (
                                        <Link to={'/register'} className="nav-link text-uppercase fw-bold">Sign
                                            up</Link>
                                    )}
                                </li>
                                <li className="d-flex d-md-none">
                                    <button id="mobileMenu" className="nav-link text-uppercase fw-bold py-0"
                                            onClick={mobileMenu}>
                                        <svg viewBox="0 0 30 50" width="30px"
                                             height="35px">
                                            <path
                                                d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"/>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="menuListMobile" className="row" style={{display: 'none'}}>
                    <div className="col-12 text-center pb-3">
                                {(!sessione) ? (
                                    <Link to={'/login'}
                                          className="btn btn-primary text-white px-3 nav-item rounded-0 nav-link text-uppercase fw-bold">Login</Link>
                                ) : (
                                    profile &&
                                    <>
                                        <Link to={'/profile'}
                                              className="text-black fw-bold text-decoration-none">
                                            <span>{profile.first_name}</span>
                                            <img src={profile.avatar_url ? getProfileImg(profile.avatar_url) : guest}
                                                 alt={`${profile.first_name} profile image`} className="ms-3 propic"/>
                                        </Link>
                                        <button className="bg-transparent px-0 border-0 small text-grey ms-3"
                                                onClick={handleSignOut}>logout
                                        </button>
                                    </>
                                )}
                                {(!sessione) && (
                                    <Link to={'/register'} className="nav-link text-uppercase fw-bold">Sign
                                        up</Link>
                                )}
                    </div>
                </div>
                <div className="categories-swiper py-2 px-3" style={{display: categoryActive ? 'block' : 'none'}}>
                    <div className="swiper-wrapper">
                        {allCategories.map((singleCategory) => (
                            <Link
                                key={singleCategory.id}
                                className="singleCategory swiper-slide"
                                to={`/category/${singleCategory.id}/${singleCategory.slug}`}
                                state={{name: singleCategory.name, id: singleCategory.id}}
                            >
                                {singleCategory.name}
                            </Link>
                        ))}
                    </div>
                    <div className="swiper-navigation">
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div>
                </div>
            </nav>
        </header>
    )
}