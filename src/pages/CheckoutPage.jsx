import { Fragment, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import MainTemplate from '../components/common/MainTemplate';
import MessageBox from '../components/common/MessageBox';
import '../scss/checkout.scss';
import useUserStore from '../stores/user-store';
import { prepareSubscriptionDetails } from '../utils/subscription-info';

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { plans, billingCycles } = location.state || {};
    const [messageBox, setMessageBox] = useState(null);
    const showMessageBox = (message, onOkay) => {
        setMessageBox({ message, onClose: () => setMessageBox(null), onOkay });
    };
    const { setActivePlan, processPayment } = useUserStore();

    const [searchParams] = useSearchParams();
    const [selectedPlanId, setSelectedPlanId] = useState(searchParams.get('plan'));
    const [selectedBillingCycleId, setSelectedBillingCycleId] = useState(searchParams.get('billingCycle'));
    const [trial, setTrial] = useState(searchParams.get('trial') === 'true');

    const paymentMethods = [
        { id: 'credit-card', label: 'Credit Card' },
        { id: 'paypal', label: 'PayPal' },
        { id: 'apple-pay', label: 'Apple Pay' },
    ];

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id);
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 16); // Remove non-digit characters and limit to 16 digits
        // Format the card number in groups of 4 digits
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardNumber(formattedValue);
    };

    const handleExpirationDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 4); // Remove non-digit characters and limit to 4 digits
        // Format the expiration date as MM/YY
        const formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1/');
        setExpirationDate(formattedValue);
    }

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 3); // Remove non-digit characters and limit to 3 digits
        setCvv(value);
    };

    const calculateSubtotal = () => {
        const selectedPlan = plans.find(plan => plan.id === selectedPlanId);
        if (!selectedPlan) return 0;
        const price = selectedPlan.price[selectedBillingCycleId];
        return price || 0;
    };

    const validatePaymentDetails = (cardNumber, expirationDate, cvv) => {
        const cardNumberPattern = /^\d{16}$/;
        const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvPattern = /^\d{3}$/;

        if (!cardNumberPattern.test(cardNumber)) {
            showMessageBox('Invalid card number. Please enter a 16-digit card number.');
            return false;
        }

        if (!expirationDatePattern.test(expirationDate)) {
            showMessageBox('Invalid expiration date. Please enter in MM/YY format.');
            return false;
        }

        if (!cvvPattern.test(cvv)) {
            showMessageBox('Invalid CVV. Please enter a 3-digit CVV.');
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cardNumberValue = cardNumber.replace(/\s/g, ''); // Remove spaces from card number
        if (!validatePaymentDetails(cardNumberValue, expirationDate, cvv)) {
            return;
        }
        
        const paymentInfo = {
            cardNumber: cardNumberValue,
            expirationDate,
            cvv
        };
        const selectedPlan = plans.find(plan => plan.id === selectedPlanId);
        const billingCycle = selectedBillingCycleId;

        const subscriptionDetails = prepareSubscriptionDetails(selectedPlan, billingCycle, paymentInfo, trial, showMessageBox);
        processPayment(paymentInfo).then(async (paymentResult) => {
            if (paymentResult.success) {
                await setActivePlan(subscriptionDetails);
                showMessageBox(`You have successfully subscribed to the ${subscriptionDetails.name} plan.`, () => {
                    navigate('/subscriptions');
                });
            }
        }).catch((error) => {
            showMessageBox(`Payment failed: ${error.message}`);
        }).finally(() => {
            // Clear sensitive payment information from state
            setCardNumber('');
            setExpirationDate('');
            setCvv('');
        });
    }

    return (
        <MainTemplate id="checkout" page="checkout" cta={false}>
            {messageBox && createPortal(<MessageBox {...messageBox} />, document.body)}
            <section className="checkout-section">
                <h1 className="checkout-title">Checkout</h1>
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="label">Select Plan:</div>
                    <div className="form-field plan">
                        {plans && plans.map((plan) => (
                            <Fragment key={plan.id}>
                            <input id={`plan-${plan.id}`} type="radio" name="plan" value={plan.id} checked={selectedPlanId === plan.id} onChange={() => setSelectedPlanId(plan.id)} required/>
                            <label htmlFor={`plan-${plan.id}`}>
                                {plan.shortName}
                            </label>
                            </Fragment>
                        ))}
                    </div>
                    <div className="label">Select Billing Cycle:</div>
                    <div className="form-field billing-cycle">
                        {billingCycles && billingCycles.map((cycle) => (
                            <Fragment key={cycle.id}>
                            <input id={`billing-cycle-${cycle.id}`} type="radio" name="billing-cycle" value={cycle.id} checked={selectedBillingCycleId === cycle.id} onChange={() => setSelectedBillingCycleId(cycle.id)} required/>
                            <label htmlFor={`billing-cycle-${cycle.id}`}>
                                {cycle.label}
                            </label>
                            </Fragment>
                        ))}
                    </div>
                    <div className="form-field free-trial">
                        <label htmlFor="free-trial">Free Trial:</label>
                        <input type="checkbox" id="free-trial" name="free-trial" checked={trial} onChange={() => setTrial(!trial)}/>
                    </div>
                    <div className="label">Select Payment Method:</div>
                    <div className="form-field payment-method">
                        {paymentMethods && paymentMethods.map((method) => (
                            <Fragment key={method.id}>
                            <input id={`payment-method-${method.id}`} type="radio" name="payment-method" value={method.id} checked={selectedPaymentMethod === method.id} onChange={() => setSelectedPaymentMethod(method.id)} required/>
                            <label htmlFor={`payment-method-${method.id}`}>
                                {method.label}
                            </label>
                            </Fragment>
                        ))}
                    </div>
                    <div className="form-field card-number">
                        <label htmlFor="card-number">Card Number: </label>
                        <input type="text" id="card-number" name="card-number" placeholder="Enter Card Number" value={cardNumber} onChange={handleCardNumberChange} required/>
                    </div>
                    <div className="form-field expiration-date">
                        <label htmlFor="expiration-date">Expiration Date: </label>
                        <input type="text" id="expiration-date" name="expiration-date" placeholder="MM/YY" value={expirationDate} onChange={handleExpirationDateChange} required/>
                    </div>
                    <div className="form-field cvv">
                        <label htmlFor="cvv">CVV: </label>
                        <input type="text" id="cvv" name="cvv" placeholder="Enter CVV" value={cvv} onChange={handleCvvChange} required/>
                    </div>
                    <span className="subtotal">
                        Subtotal: <span className="subtotal-amount">${calculateSubtotal()}</span>
                    </span>
                    <button type="submit" className="submit-button" onClick={handleSubmit}>Complete Purchase</button>
                </form>
            </section>
        </MainTemplate>
    )
}