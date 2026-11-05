

export default function Footer() {
    return (
        <footer>
            <section className="footer-links">
                <div className="footer-column">
                    <h3 className="footer-column-title"><a href="/">Home</a></h3>
                    <ul className="footer-column-list">
                        <li><a href="/#categories">Categories</a></li>
                        <li><a href="/#devices">Devices</a></li>
                        <li><a href="/#pricing">Pricing</a></li>
                        <li><a href="/#faq">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-column-title"><a href="/movies-and-shows">Movies</a></h3>
                    <ul className="footer-column-list">
                        <li><a href="/movies-and-shows#movies-genres">Genres</a></li>
                        <li><a href="/movies-and-shows#movies-trending">Trending</a></li>
                        <li><a href="/movies-and-shows#movies-new-releases">New Releases</a></li>
                        <li><a href="/movies-and-shows#movies-popular">Popular</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-column-title"><a href="/movies-and-shows">Shows</a></h3>
                    <ul className="footer-column-list">
                        <li><a href="/movies-and-shows#shows-genres">Genres</a></li>
                        <li><a href="/movies-and-shows#shows-trending">Trending</a></li>
                        <li><a href="/movies-and-shows#shows-new-releases">New Releases</a></li>
                        <li><a href="/movies-and-shows#shows-popular">Popular</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-column-title"><a href="/support">Support</a></h3>
                    <ul className="footer-column-list">
                        <li><a href="/support">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-column-title"><a href="/subscriptions">Subscriptions</a></h3>
                    <ul className="footer-column-list">
                        <li><a href="/subscriptions#plans">Plans</a></li>
                        <li><a href="/subscriptions#features">Features</a></li>
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
                    <a href="terms-of-use.html">Terms of Use</a> |
                    <a href="privacy-policy.html">Privacy Policy</a> |
                    <a href="cookie-policy.html">Cookie Policy</a>
                </div>
            </section>
        </footer>
    )
}