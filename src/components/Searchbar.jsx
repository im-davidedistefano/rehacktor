import {useState, useEffect} from "react";
export default function Searchbar({ onSearch }) {
    const [search, setSearch] = useState('');

    const handleSearch = (event) => {
        setSearch(event.currentTarget.value);
    };

    const blurResults = (isFocusing) => {
        if(isFocusing) {
            document.querySelector('.game-list').classList.add('searchIsActive');
        } else {
            document.querySelector('.game-list').classList.remove('searchIsActive');
            setSearch('');
        }
    };

    useEffect(() => {
        if (search.trim() === '') {
            return;
        }

        const timeoutAPI = setTimeout(() => {
            onSearch(search);
        }, 1200);

        return () => {
            clearTimeout(timeoutAPI);
        };
    }, [search, onSearch]);

    return (
        <div className="row">
            <div className="col-12">
                <div className="input-group mb-5">
                    <div className="input-group-prepend">
                        <span className="input-group-text rounded-0" id="inputGroup-sizing-default">Search</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Type something..." aria-label="Search..."
                           aria-describedby="inputGroup-sizing-default" onChange={handleSearch} onFocus={() => blurResults(true)}
                           onBlur={() => blurResults(false)} value={search}/>
                </div>
            </div>
        </div>
    )
}