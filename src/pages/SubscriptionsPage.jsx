import MainTemplate from '../components/common/MainTemplate'
import PricingPlans from '../components/home/PricingPlans'
import FeatureComparison from '../components/subscriptions/FeatureComparison'
import '../scss/subscriptions.scss'

export default function SubscriptionsPage() {
    return (
        <MainTemplate id="subscriptions" page="subscriptions">
            <PricingPlans id="plans" />
            <FeatureComparison />
        </MainTemplate>
    )
}