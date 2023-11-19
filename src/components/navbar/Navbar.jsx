import "./Navbar.css"
import logo from "../../assests/logo.png"
const Navbar = ()=>{

    return(

        <div className="navbar-container">
            <div className="image-container"><img src={logo}/></div>
            
            {/* <li className="menu"></li> */}
            <li className="menu" ><a className="menu" href="https://www.yugioh-card.com/en/"  target="_blank" rel="noreferrer">Official Yugioh Website</a></li>
            <li className="menu" ><a className="menu" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">About me</a></li>
            
        </div>
    );
}

export default Navbar;