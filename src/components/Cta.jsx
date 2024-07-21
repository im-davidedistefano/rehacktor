import '../assets/scss/components/Cta.scss'

// eslint-disable-next-line react/prop-types
export default function Cta({type, url, text}) {
    return (
        <a href={url} className={`cta cta-${type} mb-3 mb-md-0`} title={`${text}`}>
            {text}
        </a>
    )
}