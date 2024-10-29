import { useState, useEffect } from "react";
import SignInForm from './signinforms.js';

const Entries = () => {
    const LogInUser = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/email/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })

            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message, 'fetch error')
            }
            console.log('log in successfull!', data);
        } catch (e) {
            console.error(e);

        }
    }
    return (
        <div>
            <div className="justify-content-center">
                <SignInForm onLogin={LogInUser}></SignInForm>
            </div>
        </div>
    )
}
export default Entries;