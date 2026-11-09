import { useEffect, useRef } from 'react';

export default function MessageBox({ message, onClose, onOkay }) {
    const okayButtonRef = useRef(null);

    useEffect(() => {
        if (okayButtonRef.current) {
            okayButtonRef.current.focus();
        }
    }, []);

    const handleOkay = () => {
        onOkay && onOkay();
        onClose();
    }

    return (
        <div className="message-screen">
            <div className="message-box">
                <button className="message-close-button" onClick={onClose}>
                    <img src="/images/icons/close.svg" alt="Close Message"/>
                </button>
                <p className="message-text">{message}</p>

                <button className="message-ok-button" ref={okayButtonRef} onClick={handleOkay}>
                    OK
                </button>
            </div>
        </div>
    )
}