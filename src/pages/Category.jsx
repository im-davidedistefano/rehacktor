import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Cardgame from "../components/Cardgame.jsx";
import Filtergame from "../components/Filtergame.jsx";
import Error from "../components/Error.jsx";
import Loader from "../components/Loader.jsx";
import Searchbar from "../components/Searchbar.jsx";
import '../assets/scss/pages/AllGames.scss';

export default function SingleCategory() {
    const [allGamesByCategory, setAllGamesByCategory] = useState([]);
    const [description, setDescription] = useState('');
    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const location = useLocation();
    const category = location.state?.name;
    const sanitizeCategory = category.toLowerCase().replace(' ', '-');
    const prevCategory = useRef(category);

    const getAllGamesByCategory = async () => {
        setLoadMore(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_APIBASEURL}/games`, {
                params: {
                    page_size: 12,
                    genres: sanitizeCategory,
                    page: pageNumber,
                    ordering: '-metacritic',
                    search,
                    key: import.meta.env.VITE_APIKEY
                }
            });
            const { results } = response.data;
            setAllGamesByCategory(prevGames => (
                pageNumber === 1 ? results : [...prevGames, ...results]
            ));
            setLoadMore(false);
        } catch (error) {
            setError(true);
            setLoadMore(false);
            console.error(error);
        }
    };

    const getCategoryDescription = async () => {
        setDescription('');
        try {
            const responseDescr = await axios.get(`${import.meta.env.VITE_APIBASEURL}/genres/${location.state?.id}`, {
                params: {
                    key: import.meta.env.VITE_APIKEY,
                }
            });
            let sanitizeDescr = responseDescr.data.description
            setDescription(sanitizeDescr.replace(/<\/?p>/g, '').replace(/[^a-zA-Z0-9\s]/g, ''));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (prevCategory.current !== category) {
            setAllGamesByCategory([]);
            setDescription('');
            setSearch('');
            setPageNumber(1);
            setError(false);
            prevCategory.current = category;
        }

        getAllGamesByCategory();
        getCategoryDescription();
    }, [search, pageNumber, category]);

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
                    <div className="col-md-12">
                        <h1>{category}</h1>
                        <p className="mb-0">
                            {description + '.'}
                        </p>
                    </div>
                </div>
                <div className="row py-5">
                    <Filtergame />
                    <div className="offset-md-1 col-md-9 mt-5 mt-md-0">
                        <Searchbar onSearch={handleSearch} />
                        <div className="game-list row">
                            {error && <Error />}
                            {allGamesByCategory.map((singleGame, index) => (
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
                                        {allGamesByCategory.length >= 12 &&
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