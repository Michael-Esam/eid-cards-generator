import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link to={'/'}>
                <div className="left">
                    <img className="logo" src="/logo.png" alt="logo" />
                    <img className="eid-elfeter" src="/eid-elfeter.png" alt="" />
                </div>
                <div className="right">
                    <img src="/google.png" alt="" />
                </div>
            </Link>
        </header>
    );
};

export default Header;