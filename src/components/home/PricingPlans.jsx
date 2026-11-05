import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function PricingPlans({id}) {
    const [plans, setPlans] = useState([]);
    const [billingCycles, setBillingCycles] = useState();
    const [selectedBillingCycle, setSelectedBillingCycle] = useState('monthly');

    useEffect(() => {
        api.fetchPricingPlans().then((data) => {
            setPlans(data.plans);
            setBillingCycles(data.billingCycles);
            console.log('Fetched pricing plans:', data);
        });
    }, []);

    return (
        <section id={id}>
            <header className="section-header">
                <article>
                    <h2 className="section-title">Choose the plan that's right for you</h2>
                    <p className="section-description">
                        Join StreamVibe and select from our flexible subscription options tailored to suit your viewing
                        preferences. Get ready for non-stop entertainment!
                    </p>
                </article>
                <div className="billing-cycles-selector">
                    {billingCycles && billingCycles.map((cycle) => (
                        <button key={cycle.label} className={`billing-cycle-button ${selectedBillingCycle === cycle.id ? 'active' : ''}`} onClick={() => setSelectedBillingCycle(cycle.id)}>
                            {cycle.label}
                        </button>
                    ))}
                </div>
            </header>
            <div className="pricing-cards">
                {plans.map((plan) => (
                    <div className="pricing-card" key={plan.id}>
                        <h3 className="plan-title">{plan.name}</h3>
                        <p className="plan-description">{plan.description}</p>
                        <p className="plan-price">
                            <span className="plan-price-numeric">${plan.price[selectedBillingCycle]}</span>
                            <span className="plan-price-suffix">{billingCycles.find((cycle) => cycle.id === selectedBillingCycle)?.suffix}</span>
                        </p>
                        <div className="pricing-card-buttons-container">
                            <button className="start-free-trial-button"
                                onClick={() => window.location.href=`/checkout?plan=${plan.id}&billingCycle=${selectedBillingCycle}&trial=true`}
                            >
                                Start Free Trial
                            </button>
                            <button className="choose-plan-button"
                                onClick={() => window.location.href=`/checkout?plan=${plan.id}&billingCycle=${selectedBillingCycle}`}
                            >
                                Choose Plan
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}