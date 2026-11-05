import { useMediaQuery } from 'react-responsive'
import MainTemplate from '../components/common/MainTemplate'
import Categories from '../components/home/Categories'
import Devices from '../components/home/Devices'
import FAQs from '../components/home/FAQs'
import Hero from '../components/home/Hero'
import PricingPlans from '../components/home/PricingPlans'
import '../scss/main.scss'

export default function HomePage() {
    const isMobileScreen = useMediaQuery({ maxWidth: 767 });
    const isTabletScreen = useMediaQuery({ maxWidth: 1023 });
    const isLaptopScreen = useMediaQuery({ maxWidth: 1439 });
    let categoriesPerPage = 5;
    let faqColumns = 2;
    if (isMobileScreen || isTabletScreen) {
        categoriesPerPage = null; // Show all categories on small screens
    } else if (isLaptopScreen) {
        categoriesPerPage = 4;
    }
    if (isMobileScreen) {
        faqColumns = 1;
    }
    return (
        <>
            <MainTemplate id="main">
                <Hero />
                <Categories perPage={categoriesPerPage} />
                <Devices />
                <FAQs columns={faqColumns} />
                <PricingPlans />
            </MainTemplate>
        </>
    )
}