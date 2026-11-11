import { useState } from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSessionStore from "../../stores/session-store";
import useUserStore from "../../stores/user-store";
import SearchScreen from "./SearchScreen";

export default function MainHeader({currentPage}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isSmallScreen = useMediaQuery({ maxWidth: 1023 });
    const [profileMenuOpen, setProfileMenuOpen] = useState(isSmallScreen ? true : false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { loggedInUser, isLoggedIn, logout } = useUserStore();
    const setRedirectAfterLogin = useSessionStore(state => state.setRedirectAfterLogin);

    const isUserLoggedIn = isLoggedIn();

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    }
    const handleProfileMenuClick = () => {
        setProfileMenuOpen(!profileMenuOpen);
    }

    const handleLogoutClick = () => {
        logout();
    }

    const profileMenu = (
        <div className={`profile-menu ${profileMenuOpen ? '' : 'hidden'}`}>
            <button className="watch-list-button" onClick={() => navigate('/watchlist')}>Watch List</button>
            <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
        </div>
    )

    const handleLoginClick = () => {
        setRedirectAfterLogin(location.pathname + (location.hash || '') + (location.search || ''));
        navigate('/login');
    }

    const handleSearchClick = () => {
        setSearchOpen(true);
    }

    return (
        <header className="main-header">
            {searchOpen && createPortal(<SearchScreen onClose={() => setSearchOpen(false)} />, document.body)}
            <img src="/images/logo.png" alt="StreamVibe Logo" className="logo"/>
            <nav className={`main-nav ${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li><Link to="/" aria-label="Home" className={currentPage === 'home' ? 'active' : ''}>Home</Link></li>
                    <li><Link to="/movies-and-shows" aria-label="Movies & Shows" className={currentPage === 'movies-and-shows' ? 'active' : ''}>Movies &amp; Shows</Link></li>
                    <li><Link to="/support" aria-label="Support" className={currentPage === 'support' ? 'active' : ''}>Support</Link></li>
                    <li><Link to="/subscriptions" aria-label="Subscriptions" className={currentPage === 'subscriptions' ? 'active' : ''}>Subscriptions</Link></li>
                    
                    {isSmallScreen && isUserLoggedIn && (profileMenu)}
                </ul>
            </nav>
            <nav className={`${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li><button aria-label="Search" onClick={handleSearchClick}><img src="/images/icons/search.svg" alt="Search"/></button></li>
                    <li><button aria-label="Notifications"><img src="/images/icons/noti-bell.svg"
                                alt="Notifications"/></button></li>
                    <li>
                        <Link to="/login" className={isUserLoggedIn ? 'login hidden' : 'login'} onClick={handleLoginClick}><img src="/images/icons/login.svg" alt="Login"/></Link>
                        {isUserLoggedIn && (
                            <div className="profile-container" style={{ position: 'relative' }}>
                                <button className="user-profile" aria-label="User Profile" onClick={isSmallScreen ? null : handleProfileMenuClick}>
                                    {loggedInUser.firstName.charAt(0).toUpperCase()}{loggedInUser.lastName.charAt(0).toUpperCase()}
                                </button>
                                {!isSmallScreen && (profileMenu)}
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
            <button className="menu" aria-label="Menu" onClick={handleMenuClick}>
                <img src="/images/icons/menu.svg" alt="Menu"/>
            </button>
        </header>
    );
}