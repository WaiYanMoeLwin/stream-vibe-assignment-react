import BackgroundMashup from "../common/BackgroundMashup";


export default function ContactForm() {
    return (
        <section id="contact-us">
            <article className="contact-us-content">
                <div className="contact-us-text">
                    <h1 className="title">Welcome to our support page!</h1>
                    <p className="description">
                        We're here to help you with any problems you may be having with our product.
                    </p>
                </div>
                <div className="banner-image">
                    <BackgroundMashup numberOfMashupImages={20}/>
                </div>
            </article>
            <form id="contact-form" className="contact-form">
                <div className="form-field first-name">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" placeholder="Enter First Name" required/>
                </div>

                <div className="form-field last-name">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" placeholder="Enter Last Name" required/>
                </div>
                <div className="form-field email">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your Email" required/>
                </div>

                <div className="form-field phone">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="Enter your Phone Number" required/>
                </div>

                <div className="form-field message">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="Enter your Message" rows="5" required></textarea>
                </div>

                <div className="form-field form-footer">
                    <div className="form-field privacy-policy">
                        <label htmlFor="privacy-policy">I agree with Terms of Use and Privacy Policy</label>
                        <input type="checkbox" id="privacy-policy" name="privacy-policy" required/>
                    </div>

                    <button type="submit" id="submit-button">Send Message</button>

                </div>
            </form>
        </section>
    )
}