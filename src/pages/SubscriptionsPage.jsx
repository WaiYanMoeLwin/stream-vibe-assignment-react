import MainTemplate from '../components/common/MainTemplate'
import PricingPlans from '../components/home/PricingPlans'
import '../scss/subscriptions.scss'

export default function SubscriptionsPage() {
    return (
        <MainTemplate id="subscriptions" page="subscriptions">
            <PricingPlans id="plans" />
        </MainTemplate>
    )
}