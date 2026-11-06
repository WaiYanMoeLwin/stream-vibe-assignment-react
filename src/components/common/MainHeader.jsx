import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, isLoggedIn, logout } from "../../utils/user";

export default function MainHeader({currentPage}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery({ maxWidth: 1023 });
    const [profileMenuOpen, setProfileMenuOpen] = useState(isSmallScreen ? true : false);
    

    const isUserLoggedIn = isLoggedIn();
    const loggedInUser = isUserLoggedIn ? getLoggedInUser() : null;

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    }
    const handleProfileMenuClick = () => {
        setProfileMenuOpen(!profileMenuOpen);
    }

    const handleLogoutClick = () => {
        logout(navigate);
    }

    const profileMenu = (
        <div className={`profile-menu ${profileMenuOpen ? '' : 'hidden'}`}>
            <button className="watch-list-button" onClick={() => navigate('/watchlist')}>Watch List</button>
            <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
        </div>
    )

    const handleLoginClick = () => {
        localStorage.setItem('redirectAfterLogin', window.location.pathname + (window.location.hash || '') + (window.location.search || ''));
        navigate('/login');
    }



    return (
        <header className="main-header">
            <img src="/images/logo.png" alt="StreamVibe Logo" className="logo"/>
            <nav className={`main-nav ${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li><a href="/" aria-label="Home" className={currentPage === 'home' ? 'active' : ''}>Home</a></li>
                    <li><a href="/movies-and-shows" aria-label="Movies & Shows" className={currentPage === 'movies-and-shows' ? 'active' : ''}>Movies &amp; Shows</a></li>
                    <li><a href="/support" aria-label="Support" className={currentPage === 'support' ? 'active' : ''}>Support</a></li>
                    <li><a href="/subscriptions" aria-label="Subscriptions" className={currentPage === 'subscriptions' ? 'active' : ''}>Subscriptions</a></li>
                    
                    {isSmallScreen && isUserLoggedIn && (profileMenu)}
                </ul>
            </nav>
            <nav className={`${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li><button aria-label="Search"><img src="/images/icons/search.svg" alt="Search"/></button></li>
                    <li><button aria-label="Notifications"><img src="/images/icons/noti-bell.svg"
                                alt="Notifications"/></button></li>
                    <li>
                        <a href="/login" className={isUserLoggedIn ? 'login hidden' : 'login'} onClick={handleLoginClick}><img src="/images/icons/login.svg" alt="Login"/></a>
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