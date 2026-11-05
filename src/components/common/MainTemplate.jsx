import Footer from './Footer';
import FreeTrialCTA from './FreeTrialCTA';
import MainHeader from './MainHeader';

export default function MainTemplate({id, page, children, cta=true}) {
    return (
        <div className="main-template" id={id}>
            <MainHeader currentPage={page} />
            <main>
                {children}
                {cta && <FreeTrialCTA />}
            </main>
            <Footer />
        </div>
    );
}