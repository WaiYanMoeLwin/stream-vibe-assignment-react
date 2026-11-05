
export default function MainHeader() {
    return (
        <header className="main-header">
            <img src="/images/logo.png" alt="StreamVibe Logo" className="logo"/>
            <nav className="main-nav">
                <ul>
                    <li><a href="/" aria-label="Home" className="active">Home</a></li>
                    <li><a href="/movies-and-shows" aria-label="Movies & Shows">Movies &amp; Shows</a></li>
                    <li><a href="/support" aria-label="Support">Support</a></li>
                    <li><a href="/subscriptions" aria-label="Subscriptions">Subscriptions</a></li>
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