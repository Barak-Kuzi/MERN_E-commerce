import React from 'react';

export default function ForgotPassword(): React.JSX.Element {
    return (
        <section id="forgot_password">
            <div className="forgot_password_container">
                <div className="forgot_password_form_container">
                    <form className="form_container">
                        <div className="form_group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter Your Email"/>
                        </div>
                        <button type="submit" className="form_button">Send</button>
                    </form>
                </div>
            </div>
        </section>
    );
}