import {useContext, useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import Error from "../components/Error.jsx";
import Loader from "../components/Loader.jsx";
import ScreenshotsSlider from "../components/ScreenshotsSlider.jsx";
import supabase from "../supabase/client.js";
import AuthContext from "../contexts/AuthContext.jsx";
import Chat from "../components/Chat.jsx";
import './../assets/scss/pages/SingleGame.scss';

export default function SingleGame() {
    const { id } = useParams();
    const [fav, setFav] = useState([]);
    const { profile } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [game, setGame] = useState(null);

    const handleChat = async (event) => {
        event.preventDefault();
        const messageInput = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(messageInput));
        if (typeof message === 'string' && message.trim().length !== 0) {
            try {
                const { error } = await supabase
                    .from('messages')
                    .insert([
                        { profile_id: profile.id, game_id: game.id, content: message },
                    ])
                    .select();
                if (error) {
                    console.log(error.message);
                } else {
                    messageInput.reset();
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    const readFav = async () => {
        const { data, error } = await supabase
            .from('favourites')
            .select('*')
            .eq('game_id', id)
            .eq('profile_id', profile.id);
        if (error) {
            console.log(error.message);
        } else {
            setFav(() => [...data]);
        }
    };

    const addToFavourites = async () => {
        try {
            const { error } = await supabase
                .from('favourites')
                .insert([
                    {
                        profile_id: profile.id,
                        game_id: game.id,
                        game_name: game.name,
                    },
                ])
                .select();
            if (error) {
                console.log(error.message);
            } else {
                readFav();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (profile) {
            readFav();
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        const getGame = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APIBASEURL}/games/${id}?key=${import.meta.env.VITE_APIKEY}`);

                setLoading(false);
                setGame(response.data);
            } catch (error) {
                setLoading(false);
                setError(true);
                console.error(error);
            }
        }

        getGame();

    }, []);

    return(
        <>
            {error &&
                <Error/>
            }
            {loading &&
                <div className="row my-5">
                    <Loader/>
                </div>
            }
            {game &&
                <>
                    <section>
                        <div className="cover-image position-relative container-fluid px-0">
                            <div className="row">
                                <div className="col-12">
                                    <img className="w-100" src={game.background_image} alt={`${game.name} main image`}/>
                                    <div className="overlay"></div>
                                    <div className="inner-text">
                                        <p className="metacritic mb-3">
                                            {'Metacritic: '}
                                            {game.metacritic ? game.metacritic : ' not ranked'}
                                        </p>
                                        <h1 className="display-2 fw-bold mb-3">{game.name}</h1>
                                        <Link className="small d-block text-white text-decoration-none" to={`/games/`}>
                                            <span className="me-2">⃪⃪</span> back to all games
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid ps-4 ps-md-5 ps-md-0">
                            <div className="row justify-content-between pt-5">
                                {profile && (
                                    <button
                                        className="bg-transparent border-0 px-0 text-start mb-4 d-flex gap-3 small"
                                        type="button"
                                        onClick={fav.length === 0 ? addToFavourites : undefined}
                                    >
                                        <b>{fav.length === 0 ? 'Add to wishlist' : 'Added to wishlist'}</b>
                                        <svg
                                            className={`fav ${fav.length !== 0 ? 'active' : ''}`}
                                            width="22px"
                                            height="20px"
                                            viewBox="0 0 34 32"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                        >
                                            <g
                                                id="Page-1"
                                                stroke="none"
                                                strokeWidth="1"
                                                fill="none"
                                                fillRule="evenodd"
                                            >
                                                <g
                                                    id="heart-fill"
                                                    transform="translate(1.000000, 1.000000)"
                                                    fillRule="nonzero"
                                                    stroke="#222222"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        d="M16,3.344 C17.744,1.296 20.416,0 23.2,0 C28.128,0 32,3.872 32,8.8 C32,14.8430222 26.5688889,19.768 18.3402667,27.2296889 L18.32,27.248 L16,29.36 L13.68,27.264 L13.6168889,27.2065778 C5.41221333,19.7507556 0,14.8325333 0,8.8 C0,3.872 3.872,0 8.8,0 C11.584,0 14.256,1.296 16,3.344 Z"
                                                        id="Path"
                                                    ></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </button>

                                )}
                                {game.description_raw &&
                                    <div className="col-11 col-md-5 px-0 position-relative">
                                        <h2 className="mb-1">About</h2>
                                        <div className="mb-3">
                                            {game.genres && game.genres.map((genre) => (
                                                <Link
                                                    key={genre.id}
                                                    to={`/category/${genre.id}/${genre.slug}`}
                                                    state={{ name: genre.name, id: genre.id }}
                                                    className="me-2 text-black fw-semibold">
                                                    {' ' + genre.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <p className="mb-md-5">{game.description_raw}</p>
                                    </div>
                                }
                                <div className={`${game.description_raw ? 'col-md-6' : 'col-12'} position-relative px-0 pt-3 mt-md-5`}>
                                    <div className="sticky-column pb-5">
                                        <ScreenshotsSlider id={id}/>
                                        <div className="additional-info col-11 col-md-6 p-3">
                                            <h5>Additional infos</h5>
                                            {game.released &&
                                                <p className="mb-1">Released on: {game.released}</p>
                                            }
                                            {game.developers &&
                                                <p className="mb-1">Developed by:
                                                        {game.developers.map((dev) => (
                                                            <span key={dev.id}>
                                                            {' ' + dev.name}
                                                        </span>
                                                    ))
                                                    }
                                                </p>
                                            }
                                            <p className="mb-0">
                                                Platforms:
                                                {game.platforms && game.platforms.map((platform, index) => (
                                                    <span key={index}>{' ' + platform.platform.name}</span>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>

                <section id="chat">
                        <div className="container-fluid">
                            <div className="row p-4 p-md-5">
                                <h4 className="mb-4">Real-time comments</h4>
                                {profile && (
                                    <div>
                                        <Chat game={game} />
                                        <form onSubmit={handleChat} className="mt-5">
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    name="message"
                                                    className="form-control font-main rounded-0"
                                                    placeholder="Type your message..."
                                                    aria-label="Recipient's username"
                                                    aria-describedby="button-addon2"
                                                />
                                                <button
                                                    className="btn btn-primary rounded-0 border-0"
                                                    type="submit"
                                                    id="button-addon2"
                                                >
                                                    Send message
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    )
}