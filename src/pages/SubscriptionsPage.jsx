import MainTemplate from '../components/common/MainTemplate'
import PricingPlans from '../components/home/PricingPlans'
import ActivePlan from '../components/subscriptions/ActivePlan'
import FeatureComparison from '../components/subscriptions/FeatureComparison'
import '../scss/subscriptions.scss'
import { isLoggedIn } from '../utils/user'

export default function SubscriptionsPage() {

    return (
        <MainTemplate id="subscriptions" page="subscriptions">
            {isLoggedIn() && <ActivePlan />}
            <PricingPlans id="plans" />
            <FeatureComparison />
        </MainTemplate>
    )
}