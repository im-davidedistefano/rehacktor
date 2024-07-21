import {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import useFavStore from "../store/useFavStore.jsx";
import AuthContext from '../contexts/AuthContext';
import supabase from "../supabase/client.js";
import Loader from "../components/Loader.jsx";
import Cardgame from "../components/Cardgame.jsx";
import getProfileImg from '../utils/getProfileImg';
import '../assets/scss/pages/Profile.scss'
import imageNotAvailable from './../assets/img/image-not-available.jpg'
import editButton from './../assets/img/edit-button.svg';
import guest from './../assets/img/guest.webp'
import axios from "axios";

function Profile() {
    const { sessione, profile, loading } = useContext(AuthContext);
    const setFav = useFavStore((state) => state.setFav);
    const [favToShow, setFavToShow] = useState([]);
    const [loader, setLoader] = useState(false);

    const readFavUser = async () => {
        setLoader(true);
        if (!profile?.id) return;
        const { data: favourites, error } = await supabase
            .from('favourites')
            .select('*')
            .eq('profile_id', profile.id);
        if (error) {
            alert(error.message);
        } else {
            setFav(favourites);
            fetchAllFavourites(favourites);
        }
    };

    const remove = async (id) => {
        console.log(id);
        const { error } = await supabase
            .from('favourites')
            .delete()
            .eq('game_id', id)
            .eq('profile_id', profile.id);
        if (error) {
            alert(error.message);
        } else {
            await readFavUser();
        }
    };

    const fetchAllFavourites = async (favourites) => {
        const gamesData = [];
        for (const game of favourites) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APIBASEURL}/games/${game.game_id}?key=${import.meta.env.VITE_APIKEY}`);
                gamesData.push(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        setFavToShow(gamesData);
        setLoader(false);
    };

    useEffect(() => {
        readFavUser();
    }, [profile]);

    return (

        <>
            <section className="bg-dark text-white">
                <div className="container py-5">
                    {loading && <Loader/>}
                    {profile ? (
                        <div className="row align-items-center justify-content-center">
                            <div className="offset-1 offset-md-0 col-md-2 mb-4 mb-md-0">
                                {
                                    <img className="propic"
                                        src={profile.avatar_url ? getProfileImg(profile.avatar_url) : guest }
                                        alt={profile.first_name}
                                    />
                                }
                            </div>
                            <div className="offset-1 offset-md-0 col-md-6">
                                <Link to={"/settings"} className="small text-grey d-flex align-items-center gap-2 text-decoration-none mb-2">
                                    <img src={editButton} alt="edit profile"/>
                                    <span>edit profile</span>
                                </Link>
                                <h1 className="mb-0">{`Hi, ${profile.first_name || sessione.user.user_metadata.first_name}`}</h1>
                                <p className="small text-grey fw-bold">{profile.username}</p>
                                {profile.bio ? (
                                    <p>{profile.bio}</p>
                                ) : (
                                    <p>Insert bio by clicking here</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
            </section>
            <section>
                <div className="container py-5">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="d-flex align-items-center gap-3">Wishlist
                                <svg className="fav active" width="26px" height="24px" viewBox="0 0 34 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="heart-fill" transform="translate(1.000000, 1.000000)" fill-rule="nonzero" stroke="#222222" stroke-width="2">
                                            <path d="M16,3.344 C17.744,1.296 20.416,0 23.2,0 C28.128,0 32,3.872 32,8.8 C32,14.8430222 26.5688889,19.768 18.3402667,27.2296889 L18.32,27.248 L16,29.36 L13.68,27.264 L13.6168889,27.2065778 C5.41221333,19.7507556 0,14.8325333 0,8.8 C0,3.872 3.872,0 8.8,0 C11.584,0 14.256,1.296 16,3.344 Z" id="Path"></path>
                                        </g>
                                    </g>
                                </svg>
                            </h2>
                            <p>Add your most anticipated titles to your list, get notified of updates, and be the first
                                to know when they go on sale.<br/> Start building your ultimate gaming collection!</p>
                        </div>
                    </div>
                    <div className="row">
                        {loader && <Loader/>}
                        {favToShow.length !== 0 ? (
                            favToShow.map((game) => (
                                <>
                                    <div className="col-6 col-md-3 mb-4 mb-md-0 position-relative" key={game.id}>
                                        <Cardgame
                                            title={game.name}
                                            backgroundImage={game.background_image}
                                            metacritic={game.metacritic}
                                            released={game.released}
                                            id={game.id}
                                            slug={game.slug}
                                        />
                                        <button className="deleteButton" onClick={() => remove(game.id)}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_160_3752)">
                                                    <path
                                                        d="M15.8 1.13328L14.8666 0.199951L7.99995 7.06662L1.13328 0.199951L0.199951 1.13328L7.06662 7.99995L0.199951 14.8666L1.13328 15.8L7.99995 8.93328L14.8666 15.8L15.8 14.8666L8.93328 7.99995L15.8 1.13328Z"
                                                        fill="black"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_160_3752">
                                                        <rect width="16" height="16" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </button>
                                    </div>
                                </>
                            ))
                        ) : (
                            <h5 className="text-center mb-0">No games in your wishlist</h5>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Profile;
