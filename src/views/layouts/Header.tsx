import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="gap-4 text-blue-500">
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
        </div>
    );
};

export default Header;
