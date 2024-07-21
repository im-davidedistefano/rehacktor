import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cardgame from "../components/Cardgame.jsx";
import Filtergame from "../components/Filtergame.jsx";
import Error from "../components/Error.jsx";
import Loader from "../components/Loader.jsx";
import Searchbar from "../components/Searchbar.jsx";
import '../assets/scss/pages/AllGames.scss';

export default function AllGames() {
    const [allGames, setAllGames] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    const getAllGames = async () => {
        setLoadMore(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_APIBASEURL}/games`, {
                params: {
                    page_size: 12,
                    page: pageNumber,
                    ordering: '-metacritic',
                    search,
                    key: import.meta.env.VITE_APIKEY
                }
            });
            const { results } = response.data;
            setAllGames(prevGames => (
                pageNumber === 1 ? results : [...prevGames, ...results]
            ));
            setLoadMore(false);
        } catch (error) {
            setError(true);
            setLoadMore(false);
            console.error(error);
        }
    };

    useEffect(() => {
        getAllGames();
    }, [search, pageNumber]);

    const handleSearch = useCallback((searchTerm) => {
        setSearch(searchTerm);
        setPageNumber(1);
        document.querySelector('.game-list').classList.remove('searchIsActive');
    }, []);

    const nextPage = () => {
        setPageNumber(prevPage => prevPage + 1);
    };

    return (
        <section>
            <div className="container">
                <div className="row pt-5 pb-md-3">
                    <div className="col-md-9">
                        <h1>All Games</h1>
                        <p className="mb-0">
                            Discover a wide selection of exciting video games on our platform.<br/>
                            Find your favorite games among epic adventures, strategic challenges, and endless fun. Start playing now!
                        </p>
                    </div>
                </div>
                <div className="row py-5">
                    <Filtergame />
                    <div className="offset-md-1 col-md-9 mt-5 mt-md-0">
                        <Searchbar onSearch={handleSearch} />
                        <div className="game-list row">
                            {error && <Error />}
                            {allGames.map((singleGame, index) => (
                                <Cardgame
                                    key={index}
                                    title={singleGame.name}
                                    backgroundImage={singleGame.background_image}
                                    metacritic={singleGame.metacritic}
                                    released={singleGame.released}
                                    id={singleGame.id}
                                    slug={singleGame.slug}
                                />
                            ))}
                            {!loadMore && !error ?
                                <div className="row my-3 justify-content-center">
                                    <div className="col-md-6 text-center">
                                        {allGames.length >= 12 &&
                                            <button className="cta cta-outline" onClick={nextPage}>Load more games</button>
                                        }
                                    </div>
                                </div>
                                :
                                <Loader />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}