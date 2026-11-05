import BackgroundMashup from './BackgroundMashup';

export default function FreeTrialCTA({ numberOfMashupImages = 36 }) {
    
    return (
        <section id="free-trial-cta">
            <article>
                <h2 className="cta-title">Start your free trial today!</h2>
                <p className="cta-description">
                    This is a clear and concise call to action that encourages users to sign up for a free trial of
                    StreamVibe.
                </p>
            </article>
            <button className="cta-button">Start a Free Trial</button>
            <BackgroundMashup numberOfMashupImages={numberOfMashupImages} />
        </section>
    )
}