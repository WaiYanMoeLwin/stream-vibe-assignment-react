
export default function MainHeader({currentPage}) {
    return (
        <header className="main-header">
            <img src="/images/logo.png" alt="StreamVibe Logo" className="logo"/>
            <nav className="main-nav">
                <ul>
                    <li><a href="/" aria-label="Home" className={currentPage === 'home' ? 'active' : ''}>Home</a></li>
                    <li><a href="/movies-and-shows" aria-label="Movies & Shows" className={currentPage === 'movies-and-shows' ? 'active' : ''}>Movies &amp; Shows</a></li>
                    <li><a href="/support" aria-label="Support" className={currentPage === 'support' ? 'active' : ''}>Support</a></li>
                    <li><a href="/subscriptions" aria-label="Subscriptions" className={currentPage === 'subscriptions' ? 'active' : ''}>Subscriptions</a></li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li><button aria-label="Search"><img src="/images/icons/search.svg" alt="Search"/></button></li>
                    <li><button aria-label="Notifications"><img src="/images/icons/noti-bell.svg"
                                alt="Notifications"/></button></li>
                    <li><a href="/login" className="login"><img src="/images/icons/login.svg" alt="Login"/></a></li>
                </ul>
            </nav>
            <button className="menu" aria-label="Menu">
                <img src="/images/icons/menu.svg" alt="Menu"/>
            </button>
        </header>
    );
}