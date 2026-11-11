import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useUserStore from '../../stores/user-store.js';
import MessageBox from '../common/MessageBox.jsx';

export default function ActivePlan() {
    const [activePlan, setActivePlan] = useState(null);
    const [messageBox, setMessageBox] = useState(null);
    const showMessageBox = (message, callback) => {
        setMessageBox({ message, onClose: () => setMessageBox(null), onOkay: callback });
    };
    const { cancelActivePlan, getActivePlan } = useUserStore();

    useEffect(() => {
        const fetchPlan = async () => {
            const plan = await getActivePlan();
            setActivePlan(plan);
        };
        fetchPlan().catch((error) => {
            showMessageBox(error.message);
        });
    }, [getActivePlan]);

    const handleCancelSubscription = () => {
        showMessageBox('Are you sure you want to cancel your subscription?', async () => {
            await cancelActivePlan();
            setActivePlan(null);
            showMessageBox('Your subscription has been canceled.');
        });
    };


    return (
        <section className="active-plan">
            {messageBox && createPortal(<MessageBox {...messageBox} />, document.body)}
            <h2 className="section-title">Current Plan</h2>
            <div className="active-plan-details">
                {activePlan ? (
                        <>
                        <span className="plan-name-label">Plan: </span>
                        <span className="plan-name">{activePlan.shortName}</span>
                        <span className="billing-cycle-label">Billing Cycle: </span>
                        <span className="billing-cycle">{activePlan.billingCycle}</span>
                        <span className="renew-at-label">Next Billing Date: </span>
                        <span className="renew-at">{activePlan.renewAt}</span>
                        <button className="cancel-subscription-button" onClick={handleCancelSubscription}>Cancel Subscription</button>
                        </>
                ): (
                    <p className="no-active-plan-message">You currently have no active subscription plan.</p>
                )}
            </div>
        </section>
    )
}