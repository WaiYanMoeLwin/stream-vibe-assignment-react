

export const prepareSubscriptionDetails = (plan, billingCycle, paymentInfo, freeTrial=false) => {
    const duration = freeTrial ? 7 : (billingCycle === 'monthly' ? 30 : 365);
    const subscriptionDetails = {
        id: plan.id,
        name: plan.name,
        shortName: plan.shortName,
        billingCycle: billingCycle,
        price: freeTrial ? 0 : plan.price[billingCycle],
        paymentInfo: paymentInfo,
        renewAt: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // Format as YYYY-MM-DD
        expiryDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) // Format as YYYY-MM-DD
    };
    return subscriptionDetails;
}