import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <nav>
            <NavLink className="mr-5" end to="/">Home</NavLink>
            <NavLink end to="/about">About</NavLink>
        </nav>
    )
}

export { Header };