import {Link} from "react-router-dom";
import '../assets/scss/components/Cardgame.scss'
import imageNotAvailable from './../assets/img/image-not-available.jpg'

// eslint-disable-next-line react/prop-types
export default function Cardgame({ title, backgroundImage, metacritic, released, id, slug }) {

    return (
        <Link className="cardGame col-md-3 mb-5" to={`/games/${id}/${slug}`}>
            <article>
                <img className="w-100 mb-3" src={backgroundImage ? backgroundImage : imageNotAvailable} alt={title}/>
                <p className="metacritic">
                    {`Metacritic: `}
                    {metacritic ? metacritic : ' not ranked'}
                </p>
                <div className="p-3">
                    <h4 className="mb-0">{title}</h4>
                    <p className="small mb-0">
                        released on
                        {released ? ` ${released}`: ' not defined'}
                    </p>
                </div>
            </article>
        </Link>
    )
}