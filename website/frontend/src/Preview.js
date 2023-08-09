import { Link } from "react-router-dom";

const Preview = (props) => {
    const imgStyle = { width: '120px', height: '120px' }

    return (
        <div className="preview">
            <Link to={`/${props.routekey}`} style={{textDecoration: "none"}}>
                <img style={imgStyle} src={ props.img } alt="image" />
                <h2>{ props.label }</h2>
            </Link>
        </div>
    );
}
 
export default Preview;