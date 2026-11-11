import MainTemplate from '../components/common/MainTemplate'
import PricingPlans from '../components/home/PricingPlans'
import ActivePlan from '../components/subscriptions/ActivePlan'
import FeatureComparison from '../components/subscriptions/FeatureComparison'
import '../scss/subscriptions.scss'
import useUserStore from '../stores/user-store'

export default function SubscriptionsPage() {
    const { isLoggedIn } = useUserStore();

    return (
        <MainTemplate id="subscriptions" page="subscriptions">
            {isLoggedIn() && <ActivePlan />}
            <PricingPlans id="plans" />
            <FeatureComparison />
        </MainTemplate>
    )
}