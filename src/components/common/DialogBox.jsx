import { useEffect, useRef, useState } from 'react';

export default function DialogBox({ fields, onClose, onOkay, showMessageBox }) {
    const [formData, setFormData] = useState({});
    const firstInputRef = useRef(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    const handleOkay = (formData) => {
        for (const field of fields) {
            if (field.required && !formData[field.name]) {
                showMessageBox(`Please fill in the required field: ${field.label}`);
                return;
            }
        }
        onOkay(formData);
    }

    return (
        <div className="dialog-screen">
            <div className="dialog-box">
                <form className="ask-question-form">
                    {fields.map((field, index) => (
                        <>
                            <label key={`label-${index}`} htmlFor={field.name}>{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea ref={field===fields[0] ? firstInputRef : null} key={`textarea-${index}`} id={field.name} name={field.name} required={field.required} onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}></textarea>
                            ) : (
                                <input ref={field===fields[0] ? firstInputRef : null} type={field.type} key={`input-${index}`} id={field.name} required={field.required} name={field.name} onChange={(e) => setFormData({...formData, [field.name]: e.target.value})} />
                            )}
                        </>
                    ))}
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="button" onClick={() => handleOkay(formData)}>Okay</button>
                </form>
            </div>
        </div>
    )
}