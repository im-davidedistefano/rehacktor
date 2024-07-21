import {Link} from "react-router-dom";
import '../assets/scss/layouts/Footer.scss'
import logo from './../assets/img/logo.svg'
import facebook from './../assets/img/facebook.svg'
import instagram from './../assets/img/instagram.svg'
import tiktok from './../assets/img/tiktok.svg'
import reddit from './../assets/img/reddit.svg'
export default function Footer() {
    return (
        <footer className="py-4">
            <div className="container-fluid">
                <div className="row p-3 align-items-end">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <Link to={'/'} className="logo" title={'Homepage'}>
                            <img className="mb-2" src={logo} alt={import.meta.env.VITE_PROJECTNAME}/>
                        </Link>
                        <h6 className={"mb-0"}>Rehacktor</h6>
                        <p className="small text-grey">
                            Start playing now!
                        </p>
                        <ul className="col-4 navbar-nav flex-row gap-4">
                            <li className="nav-item">
                                <a href="#" title="Facebook">
                                    <img src={facebook} alt="Facebook"/>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" title="Instagram">
                                    <img src={instagram} alt="Instagram"/>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" title="TikTok">
                                    <img src={tiktok} alt="TikTok"/>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" title="Reddit">
                                    <img src={reddit} alt="Reddit"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <p className="small text-md-end text-grey">Davide Di Stefano © 2024</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}