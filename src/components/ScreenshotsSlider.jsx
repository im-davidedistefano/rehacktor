import axios from "axios";
import {useEffect, useState} from "react";
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './../assets/scss/components/ScreenshotsSlider.scss';

// eslint-disable-next-line react/prop-types
export default function ScreenshotsSlider ({id}) {
    const [screenshots, setScreenshots] = useState(null);

    useEffect(() => {
    const getScreenshots = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APIBASEURL}/games/${id}/screenshots?key=${import.meta.env.VITE_APIKEY}`);
            const { results } = response.data;
            setScreenshots(results);

            new Swiper('.swiper', {
                slidesPerView: '1.1',
                spaceBetween: '8px',
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

    getScreenshots();

}, []);

    return (
        <div className="swiper mb-3">
            <div className="swiper-wrapper">
                {screenshots &&
                    screenshots.map((el) => (
                        <div key={el.id} className="swiper-slide">
                            <img className="w-100" src={el.image} alt="" />
                        </div>
                    ))
                }
            </div>
            <div className="swiper-navigation">
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        </div>
    )
}