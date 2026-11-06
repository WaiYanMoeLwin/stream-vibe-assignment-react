import { useEffect, useState } from "react";
import api from "../../api/api";


export default function FeatureComparison() {
    const [planDetails, setPlanDetails] = useState([]);

    useEffect(() => {
        api.fetchPricingPlans().then((plans) => {
            setPlanDetails(plans);
        });
    }, []);
    

    return (
        <section id="features">
            <h2 className="feature-comparison-title">Compare our plans and find the right one for you</h2>
            <p className="feature-comparison-description">{planDetails.comparisonDescription}</p>

            <table className="feature-comparison-table">
                <thead>
                    {planDetails.plans && (
                        <tr style={{ gridTemplateColumns: `repeat(${planDetails.plans.length + 1}, 1fr)` }}>
                            <th>
                                <h3 className="feature-header-title">Features</h3>
                            </th>
                            {planDetails.plans.map((plan) => (
                                <th key={plan.id}>
                                    <h3 className="feature-header-title">{plan.shortName}</h3>
                                    {plan.popular && <span className="popular-badge">Popular</span>}
                                </th>
                            ))}
                        </tr>
                    )}
                </thead>
                <tbody>
                    {planDetails.comparisonRows && planDetails.comparisonRows.map((row, rowIndex) => (
                        <tr className={`feature-row ${row.key}`} key={rowIndex} style={{ gridTemplateColumns: `repeat(${planDetails.plans.length + 1}, 1fr)` }}>
                            <td>{row.label}</td>
                            {planDetails.plans.map((plan) => (
                                <td key={plan.id} className="plan-cell">
                                    {row.key !== "price" && (plan.features[row.key] ? plan.features[row.key] : <span className="not-available">N/A</span>)}
                                    {row.key === "price" && (
                                        <>
                                        ${plan.price[planDetails.billingCycles[0].id]}{planDetails.billingCycles[0].suffix}
                                        </>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <article className="feature-comparison-mobile hidden">
            </article>
        </section>
    )
}