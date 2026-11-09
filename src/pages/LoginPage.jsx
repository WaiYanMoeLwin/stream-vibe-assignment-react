import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import MainTemplate from "../components/common/MainTemplate";
import MessageBox from "../components/common/MessageBox";
import "../scss/login.scss";
import { login, register } from "../utils/user";

export default function LoginPage() {
    const [currentTab, setCurrentTab] = useState("login");
    const [loginData, setLoginData] = useState({email: "", password: ""});
    const [registerData, setRegisterData] = useState({firstname: "", lastname: "", email: "", password: ""});
    const [messageBox, setMessageBox] = useState(null);
    const navigate = useNavigate();

    const loginEmailRef = useRef(null);
    const registerFirstNameRef = useRef(null);

    useEffect(() => {
        if (currentTab === "login") {
            loginEmailRef.current?.focus();
        } else {
            registerFirstNameRef.current?.focus();
        }
    }, [currentTab]);

    const showMessageBox = (message, onOkay) => {
        setMessageBox({ message, onClose: () => setMessageBox(null), onOkay });
    };

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
        setLoginData({email: "", password: ""});
        setRegisterData({firstname: "", lastname: "", email: "", password: ""});
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (currentTab === "login") {
            setLoginData({ ...loginData, [name]: value });
        } else {
            setRegisterData({ ...registerData, [name]: value });
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            showMessageBox('Please fill in all fields.');
            return;
        } else if (!loginData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showMessageBox('Please enter a valid email address.');
            return;
        }

        await login(loginData.email, loginData.password, showMessageBox, navigate);
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!registerData.firstname || !registerData.lastname || !registerData.email || !registerData.password) {
            showMessageBox('Please fill in all fields.');
            return;
        } else if (!registerData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showMessageBox('Please enter a valid email address.');
            return;
        } else if (registerData.password.length < 6) {
            showMessageBox('Password must be at least 6 characters long.');
            return;
        }

        const onSuccess = () => {
            setCurrentTab("login");
            setRegisterData({firstname: "", lastname: "", email: "", password: ""});
        }

        await register(registerData.firstname, registerData.lastname, registerData.email, registerData.password, onSuccess, showMessageBox);
    }
    return (
        <MainTemplate id="login" page="login" cta={false}>
            {messageBox && createPortal(
                <MessageBox message={messageBox.message} onClose={messageBox.onClose} onOkay={messageBox.onOkay} />,
                document.body
            )}
            <article className="tab">
                <button className={currentTab === "login" ? "tab-button active" : "tab-button"} aria-label="Login" onClick={() => handleTabChange("login")}>Login</button>
                <button className={currentTab === "register" ? "tab-button active" : "tab-button"} aria-label="Register" onClick={() => handleTabChange("register")}>Register</button>
            </article>
            <section id="login-section" className={currentTab === "login" ? "" : "hidden"}>
                <form className="login-form">
                    <div className="form-field email">
                        <label htmlFor="email">Email</label>
                        <input type="email" ref={loginEmailRef} id="email" name="email" placeholder="Enter Email" value={loginData.email} required onChange={handleInputChange}/>
                    </div>

                    <div className="form-field password">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter Password" value={loginData.password} required onChange={handleInputChange}/>
                    </div>
                    <button type="submit" className="submit-button" onClick={handleLogin}>Login</button>
                </form>
            </section>
            <section id="register-section" className={currentTab === "register" ? "" : "hidden"}>
                <form className="register-form">
                    <div className="form-field first-name">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" ref={registerFirstNameRef} id="first-name" name="firstname" placeholder="Enter First Name" value={registerData.firstname} required onChange={handleInputChange}/>
                    </div>

                    <div className="form-field last-name">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" name="lastname" placeholder="Enter Last Name" value={registerData.lastname} required onChange={handleInputChange}/>
                    </div>

                    <div className="form-field email">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter Email" value={registerData.email} required onChange={handleInputChange}/>
                    </div>

                    <div className="form-field password">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter Password" value={registerData.password} required onChange={handleInputChange}/>
                    </div>
                    <button type="submit" className="submit-button" onClick={handleRegister}>Register</button>
                </form>
            </section>
        </MainTemplate>
    )
}