import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../assets/scss/components/Filtergame.scss'
import axios from "axios";

export default function Filtergame() {
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APIBASEURL}/genres`, {
                    params: {
                        key: import.meta.env.VITE_APIKEY
                    }
                });
                const { results } = response.data;
                setAllCategories(results);
            } catch (error) {
                console.error(error);
            }
        }

        getAllCategories();
    }, []);

    return (
        <aside className="categoryFilters col-md-2">
            <div className="innerCategories px-1 pb-3">
                <div className="categoriesTitle">
                    <h6 className="text-uppercase fw-bold text-primary">Browse by category</h6>
                </div>
                <nav className="navbar-nav">
                    <ul className="px-0 mb-0">
                        {allCategories.map((singleCategory) => (
                            <li key={singleCategory.id}>
                                <Link
                                    to={`/category/${singleCategory.id}/${singleCategory.slug}`}
                                    state={{ name: singleCategory.name, id: singleCategory.id }}
                                >
                                    {singleCategory.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}