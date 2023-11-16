import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="">
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
        </div>
    );
};

export default Header;
