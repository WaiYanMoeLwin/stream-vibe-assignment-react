import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import api from '../../api/api';
import DialogBox from '../common/DialogBox.jsx';
import MessageBox from '../common/MessageBox.jsx';

export default function FAQs({ columns }) {
    const [faqLists, setFaqLists] = useState([]);
    const isMobileScreen = useMediaQuery({ maxWidth: 767 });
    const [dialogBox, setDialogBox] = useState(null);
    const [messageBox, setMessageBox] = useState(null);

    const showDialogBox = (fields, onOkay) => {
        setDialogBox({fields, onClose: () => setDialogBox(null), onOkay});
    }

    const showMessageBox = (message, onOkay) => {
        setMessageBox({ message, onClose: () => setMessageBox(null), onOkay });
    };

    const handleOpenFAQ = (id) => {
        const faqContainer = document.querySelector(`.faq-container[data-key="${id}"]`);
        if (faqContainer) {
            const answer = faqContainer.querySelector('.faq-answer');
            const openButton = faqContainer.querySelector('.faq-open-button');
            const closeButton = faqContainer.querySelector('.faq-close-button');
            if (answer && openButton && closeButton) {
                answer.classList.remove('hidden');
                openButton.classList.add('hidden');
                closeButton.classList.remove('hidden');
                faqContainer.classList.add('expanded');
            }
        }
    }

    const handleCloseFAQ = (id) => {
        const faqContainer = document.querySelector(`.faq-container[data-key="${id}"]`);
        if (faqContainer) {
            const answer = faqContainer.querySelector('.faq-answer');
            const openButton = faqContainer.querySelector('.faq-open-button');
            const closeButton = faqContainer.querySelector('.faq-close-button');
            if (answer && openButton && closeButton) {
                answer.classList.add('hidden');
                openButton.classList.remove('hidden');
                closeButton.classList.add('hidden');
                faqContainer.classList.remove('expanded');
            }
        }
    }

    useEffect(() => {
        api.fetchFAQs().then((faqsData) => {
            const faqsPerColumn = Math.ceil(faqsData.length / columns);
            const faqColumns = [];
            for (let i = 0; i < columns; i++) {
                faqColumns.push(faqsData.slice(i * faqsPerColumn, (i + 1) * faqsPerColumn));
            }
            setFaqLists(faqColumns);
        })
    }, [columns]);

    const handleAskQuestion = () => {
        const fields = [
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Email', name: 'email', type: 'email', required: true },
            { label: 'Question', name: 'question', type: 'textarea', required: true }
        ];
        showDialogBox(fields, (formData) => {
            api.askQuestion(formData).then((newFAQ) => {
                setFaqLists((prevFaqLists) => {
                    const updatedFaqLists = [...prevFaqLists];
                    if (updatedFaqLists.some((list) => list.some((faq) => faq.id === newFAQ.id))) {
                        return updatedFaqLists;
                    }
                    if (updatedFaqLists.length === 0) {
                        updatedFaqLists.push([newFAQ]);
                    } else {
                        const flattenedFaqs = updatedFaqLists.flat();
                        flattenedFaqs.push(newFAQ);
                        const faqsPerColumn = Math.ceil(flattenedFaqs.length / columns);
                        const newFaqLists = [];
                        for (let i = 0; i < columns; i++) {
                            newFaqLists.push(flattenedFaqs.slice(i * faqsPerColumn, (i + 1) * faqsPerColumn));
                        }
                        return newFaqLists;
                    }
                    return updatedFaqLists;
                });
                setDialogBox(null);
            });
        });
    }

    return (
    <section id="faq">
        {dialogBox && createPortal(
            <DialogBox fields={dialogBox.fields} onClose={dialogBox.onClose} onOkay={dialogBox.onOkay} showMessageBox={showMessageBox} />,
            document.body
        )}
        {messageBox && createPortal(
            <MessageBox {...messageBox} />,
            document.body
        )}
        <header className="section-header">
            <article>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-description">
                    Got questions? We've got answers! Check out our FAQ section to find
                    answers to the most common questions about StreamVibe.
                </p>
            </article>
            <button className="ask-question-button" onClick={handleAskQuestion}>
                Ask a Question
            </button>
        </header>
        <article className="faq-items-container">
            {faqLists.map((faqList, index) => (
                <div className="faq-list" key={index}>
                    {faqList.map((faq) => {
                        const faqInner = (
                            <>
                            <div className="faq-sub-container">
                                <div className="faq-number">{faq.id}</div>
                                <div className="faq-content">
                                    <h4 className="faq-question">{faq.question}</h4>
                                    {(columns > 1 || !isMobileScreen) && <p className="faq-answer hidden">{faq.answer}</p>}
                                </div>
                            </div>
                            <button className="faq-toggle-button faq-open-button" aria-label="Open FAQ"
                                onClick={() => handleOpenFAQ(faq.id)}>
                                <img src="/images/icons/plus.svg" alt="Open FAQ" />
                            </button>
                            <button className="faq-toggle-button faq-close-button hidden" aria-label="Close FAQ"
                                onClick={() => handleCloseFAQ(faq.id)}>
                                <img src="/images/icons/minus.svg" alt="Close FAQ" />
                            </button>
                            </>
                        );
                        const faqInnerSingleColumn = (
                            <>
                            <div className="faq-main-container">
                                {faqInner}
                            </div>
                            {columns === 1 && <p className="faq-answer hidden">{faq.answer}</p>}
                            </>
                        );

                        return (<div className="faq-container" key={faq.id} data-key={faq.id}>
                            {columns === 1 && isMobileScreen ? faqInnerSingleColumn : faqInner}
                        </div>)
                    })}
                </div>
            ))}
        </article>
    </section>
    );
}