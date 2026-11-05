import Footer from './Footer';
import FreeTrialCTA from './FreeTrialCTA';
import MainHeader from './MainHeader';

export default function MainTemplate({id, page, children}) {
    return (
        <div className="main-template" id={id}>
            <MainHeader currentPage={page} />
            <main>
                {children}
                <FreeTrialCTA />
            </main>
            <Footer />
        </div>
    );
}