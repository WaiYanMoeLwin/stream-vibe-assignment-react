import { useMediaQuery } from 'react-responsive';
import MainTemplate from '../components/common/MainTemplate';
import FAQs from '../components/home/FAQs';
import ContactForm from '../components/support/ContactForm';
import '../scss/support.scss';

export default function SupportPage() {
    const isMobileScreen = useMediaQuery({ maxWidth: 767 });
    const isTabletScreen = useMediaQuery({ maxWidth: 1023 });
    // const isLaptopScreen = useMediaQuery({ maxWidth: 1439 });
    let faqColumns = 2;
    if (isMobileScreen || isTabletScreen) {
        faqColumns = 1;
    }
    return (
        <MainTemplate id="support" page="support">
            <ContactForm />
            <FAQs columns={faqColumns} />
        </MainTemplate>
    )
}