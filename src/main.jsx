import ReactDOM from 'react-dom/client'
import {Root} from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import './assets/scss/main.scss';

// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>
)
