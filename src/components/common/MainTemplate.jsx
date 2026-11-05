import Footer from './Footer';
import FreeTrialCTA from './FreeTrialCTA';
import MainHeader from './MainHeader';

export default function MainTemplate({id, children}) {
    return (
        <div className="main-template" id={id}>
            <MainHeader />
            <main>
                {children}
                <FreeTrialCTA />
            </main>
            <Footer />
        </div>
    );
}