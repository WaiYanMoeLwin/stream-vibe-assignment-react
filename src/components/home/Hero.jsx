import BackgroundMashup from '../common/BackgroundMashup';

export default function Hero({numberOfMashupImages = 36}) {
    return (
        <section id="hero">
            <img src="/images/abstract-logo.svg" alt="Abstract Logo of StreamVibe" className="hero-logo"/>
            <article className="hero-content">
                <h1 className="hero-title">The Best Streaming Experience</h1>
                <p className="hero-description">
                    StreamVibe is the best streaming experience for watching your favorite movies and shows on demand,
                    anytime, anywhere.
                    <span className="hero-description-extended">
                        With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters,
                        classic movies, popular TV shows, and more.
                        You can also create your own watchlists, so you can easily find the content you
                        want to watch.
                    </span>
                </p>
                <button className="hero-button"><img src="/images/icons/play.svg" alt="Play"/> Start Watching
                Now</button>
            </article>
            <BackgroundMashup numberOfMashupImages={numberOfMashupImages}>
                <div className="fade-out-top"></div>
                <div className="fade-out-bottom"></div>
            </BackgroundMashup>
        </section>
    )
}