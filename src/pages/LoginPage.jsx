import MainTemplate from "../components/common/MainTemplate";


export default function LoginPage() {
    return (
        <MainTemplate id="login" page="login" cta={false}>
            <div className="login">
                <h1>Login Page</h1>
            </div>
        </MainTemplate>
    )
}