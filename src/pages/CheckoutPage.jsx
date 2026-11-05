import MainTemplate from '../components/common/MainTemplate'

export default function CheckoutPage() {
    return (
        <MainTemplate id="checkout" page="checkout" cta={false}>
            <div className="checkout">
                <h1>Checkout Page</h1>
            </div>
        </MainTemplate>
    )
}