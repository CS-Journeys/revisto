import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/userHook";
import ConfirmationModal from "../components/ConfirmationModal";

/**
 * React component for displaying the register page.
 * @returns {JSX.Element} The register page.
 */
const Register = () => {
    useEffect(() => {
        document.title = "Revisto";
    }, []);

    const { register, error } = useRegister();
    const nav = useNavigate();
    const [show, setShow] = useState(false);

    const confirmRegister = (e) => {
        return;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        register(
            {
                email: form.get("email"),
                password: form.get("password"),
                confirm: form.get("confirm"),
            },
            {
                onSuccess: () => {
                    nav("/");
                },
            }
        );
    };

    return (
        <main className="form custom-form text-center">
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error.message}
                    </div>
                )}
                <div className="form-floating">
                    <input
                        className="form-control cf-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="form-floating">
                    <input
                        className="form-control cf-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                    />
                </div>
                <div className="form-floating">
                    <input
                        className="form-control cf-control"
                        type="password"
                        placeholder="Confirm Password"
                        name="confirm"
                        id="confirmPassword"
                    />
                </div>
                <div>
                    <span>
                        By signing up, you are in agreement with our <br />
                        <a href="#" className="nav-link" onClick={() => setShow(true)}>Terms of Service</a>

                        <ConfirmationModal
                            confirmText="I Agree"
                            body="By registering a Revisto account, you agree that you are at least 13 years of age and above the required minimum age in your country to register, 
                            and have legal guardian permission if you are considered a minor in your country. By registering, you understand that Revisto does not endorse any 
                            particular content found on the site. By registering, you agree not to post any hateful, illegal, or malicious language. By signing up, you acknowledge 
                            that Revisto only stores your data which is given directly by you. Furthermore, you understand that your account may be terminated at any time 
                            and for any reason."
                            title="Revisto Terms of Service"
                            onConfirm={confirmRegister}
                            show={show}
                            onHide={() => setShow(false)}
                            buttonType="btn-primary"
                            showFooter={false}>
                        </ConfirmationModal>
                    </span>
                </div>
                <button className="w-100 btn btn-primary" type="submit">
                    Register
                </button>
            </form>
        </main>
    );
};

export default Register;
