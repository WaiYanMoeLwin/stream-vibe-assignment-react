import { Link } from "react-router-dom";


export default function Footer() {
    return (
        <footer>
            <section className="footer-links">
                <div className="footer-column">
                    <h3 className="footer-column-title"><Link to="/">Home</Link></h3>
                    <ul className="footer-column-list">
                        <li><Link to="/#categories">Categories</Link></li>
                        <li><Link to="/#devices">Devices</Link></li>
                        <li><Link to="/#pricing">Pricing</Link></li>
                        <li><Link to="/#faq">FAQ</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-column-title"><Link to="/movies-and-shows">Movies</Link></h3>
                    <ul className="footer-column-list">
                        <li><Link to="/movies-and-shows#movies-genres">Genres</Link></li>
                        <li><Link to="/movies-and-shows#movies-trending">Trending</Link></li>
                        <li><Link to="/movies-and-shows#movies-new-releases">New Releases</Link></li>
                        <li><Link to="/movies-and-shows#movies-popular">Popular</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-column-title"><Link to="/movies-and-shows">Shows</Link></h3>
                    <ul className="footer-column-list">
                        <li><Link to="/movies-and-shows#shows-genres">Genres</Link></li>
                        <li><Link to="/movies-and-shows#shows-trending">Trending</Link></li>
                        <li><Link to="/movies-and-shows#shows-new-releases">New Releases</Link></li>
                        <li><Link to="/movies-and-shows#shows-popular">Popular</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-column-title"><Link to="/support">Support</Link></h3>
                    <ul className="footer-column-list">
                        <li><Link to="/support">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-column-title"><Link to="/subscriptions">Subscriptions</Link></h3>
                    <ul className="footer-column-list">
                        <li><Link to="/subscriptions#plans">Plans</Link></li>
                        <li><Link to="/subscriptions#features">Features</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-column-title">Connect With Us</h3>
                    <ul className="social-media-links">
                        <li><a href="https://www.facebook.com" className="social-media-link" target="_blank"
                                rel="noopener noreferrer"><img src="/images/icons/facebook.svg" alt="Facebook"/></a>
                        </li>
                        <li><a href="https://www.x.com" className="social-media-link" target="_blank"
                                rel="noopener noreferrer"><img src="/images/icons/x.svg" alt="X"/></a></li>
                        <li><a href="https://www.instagram.com" className="social-media-link" target="_blank"
                                rel="noopener noreferrer"><img src="/images/icons/instagram.svg" alt="Instagram"/></a>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="footer-info">
                <p>&copy; 2023 StreamVibe. All rights reserved.</p>
                <div className="footer-legal-links">
                    <Link to="/terms-of-use">Terms of Use</Link> |
                    <Link to="/privacy-policy">Privacy Policy</Link> |
                    <Link to="/cookie-policy">Cookie Policy</Link>
                </div>
            </section>
        </footer>
    )
}