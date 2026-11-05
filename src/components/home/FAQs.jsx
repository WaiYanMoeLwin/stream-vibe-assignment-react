import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function FAQs({ columns }) {
    const [faqLists, setFaqLists] = useState([]);

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

    return (
    <section id="faq">
        <header className="section-header">
            <article>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-description">
                    Got questions? We've got answers! Check out our FAQ section to find
                    answers to the most common questions about StreamVibe.
                </p>
            </article>
            <button className="ask-question-button">Ask a Question</button>
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
                                    {columns > 1 && <p className="faq-answer hidden">{faq.answer}</p>}
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
                            {columns === 1 ? faqInnerSingleColumn : faqInner}
                        </div>)
                    })}
                </div>
            ))}
        </article>
    </section>
    );
}