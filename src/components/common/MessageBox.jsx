

export default function MessageBox({ message, onClose, onOkay }) {
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

                <button className="message-ok-button" onClick={handleOkay}>
                    OK
                </button>
            </div>
        </div>
    )
}