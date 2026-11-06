import api from '../api/api';



export const subscribeToPlan = async (subscriptionDetails, showMessageBox, navigate) => {
    console.log('Subscription details:', subscriptionDetails);
    try {
        await api.processPayment(subscriptionDetails.paymentInfo);
        await api.subscribeToPlan(subscriptionDetails);
        console.log('Subscription successful:', subscriptionDetails);
        showMessageBox(`You have successfully subscribed to the ${subscriptionDetails.name} plan.`, () => {
            navigate('/subscriptions');
        });
    } catch (error) {
        showMessageBox(error.message);
    }
}

export const fetchActivePlan = async (showMessageBox) => {
    try {
        const activePlan = await api.fetchActivePlan();
        return activePlan;
    } catch (error) {
        showMessageBox(error.message);
        return null;
    }
}

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

export const cancelSubscription = async (showMessageBox) => {
    try {
        await api.cancelSubscription();
        showMessageBox('Your subscription has been canceled.');
    } catch (error) {
        showMessageBox(error.message);
    }
}
