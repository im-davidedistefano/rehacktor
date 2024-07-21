import axios from "axios";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import {Link} from "react-router-dom";
import Cta from "../components/Cta.jsx";
import Cardgame from "../components/Cardgame.jsx";
import Loader from "../components/Loader.jsx";
import Error from "../components/Error.jsx";
import './../assets/scss/pages/Homepage.scss';
import logo from './../assets/img/logo.svg'

export default function Homepage() {
    const { sessione, profile } = useContext(AuthContext);
    const [bestReviewed, setBestReviewed] = useState([]);
    const [heroGame, setHeroGame] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setBestReviewed([]);
        setHeroGame([]);

        const getHeroGame = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APIBASEURL}/games/3498?key=${import.meta.env.VITE_APIKEY}`);
                setHeroGame(response.data);
            } catch (error) {
                setError(true);
                console.error(error);
            }
        }
        const getBestRatedGames = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APIBASEURL}/games?metacritic=80,90&page_size=32&ordering=-metacritic&key=${import.meta.env.VITE_APIKEY}`);
                const { results } = response.data;
                setBestReviewed(results);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error(error);
            }
        }

        getHeroGame();
        getBestRatedGames();

    }, [])

    return (
        <>
            <section id="hero">
                <div className="container-fluid px-0 h-100">
                    <div className="row justify-content-between h-100 d-flex align-items-center">
                        <div className="offset-md-1 col-md-4">
                            <div className="p-4 p-md-0">
                                <img className="rotatingLogo mb-3" src={logo} alt={import.meta.env.VITE_PROJECTNAME}/>
                                <h1>Welcome to <span className="text-primary">Rehacktor</span></h1>
                                <p className="mb-4 mb-md-5">Discover a wide selection of exciting video games on our
                                    platform.<br/>
                                    Find your favorite games among epic adventures, strategic challenges, and endless
                                    fun.<br/> <br/>
                                    <strong>Start playing now!</strong></p>
                                <div className="cta-group d-md-flex gap-md-4">
                                    <Cta type="primary" url="/games" text="Discover all games"/>
                                    <Cta type="outline" url="#bestreviewed" text="Best reviewed games"/>
                                </div>
                            </div>
                        </div>
                        <Link to={`/games/${heroGame.id}/${heroGame.slug}`}
                              className="col-md-6 text-black text-decoration-none h-100 d-flex flex-column justify-content-center">
                            <img src={heroGame.background_image} className="w-100" alt="Rehacktor"/>
                            <div className="text-white bg-dark p-4">
                                <h5 className="text-grey">Game of the month</h5>
                                <h2>{heroGame.name}</h2>
                                <p><strong>Released:</strong>
                                    {heroGame.released ? ` ${heroGame.released}` : ' not defined'}</p>
                                <p className="metacritic">{`Metacritic: `}
                                    {heroGame.metacritic ? heroGame.metacritic : ' not ranked'}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            <section id="bestreviewed" className="position-relative">
                {(!sessione) &&
                    <div className="privatecontent">
                        <div className="row w-100">
                            <div className="col-12 text-center">
                                <h3 className="mb-3">To view all the best reviewed games,<br/> please log in.</h3>
                                <Cta type="outline" url="/login" text="Log in"/>
                                <p className="small text-grey text-center mt-3 mb-0">
                                    Don&apos;t you have an account?
                                    <Link className="text-decoration-underline text-grey ms-1" to={`/register`}>
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                }
                <div className="container">
                    <div className="row py-5">
                        <div className="col-12">
                            <h2 className="mb-0">Best reviewed</h2>
                        </div>
                    </div>
                    <div className="row">
                        {error &&
                            <Error/>
                        }
                        {loading &&
                            <Loader/>
                        }
                        {bestReviewed &&
                            bestReviewed.map((singleGame) => (
                                <Cardgame
                                    key={singleGame.id}
                                    title={singleGame.name}
                                    backgroundImage={singleGame.background_image}
                                    metacritic={singleGame.metacritic}
                                    released={singleGame.released}
                                    id={singleGame.id}
                                    slug={singleGame.slug}
                                />
                            ))
                        }
                    </div>
                    <div className="row py-5">
                        <div className="col-12 text-center">
                            <Cta type="outline" url="/games" text="Discover all games"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}