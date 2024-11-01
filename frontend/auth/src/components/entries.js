import { useState,useEffect } from "react";
import FormRegister from './signupforms.js';

const Entry = () => {

    const registerUser = async (email, password, username) => {
        const api = '1982fd52-8da0-4012-ad0c-3c21cfe1d8b7'; 
        console.log('sending data:', { email, password, username });
    
        try {
            const response = await fetch('http://localhost:5000/email/register', {
                method: 'POST',
                headers: {
                    'x-apikey': api,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Request failed: ${errorData.message}`);
            }
    
            const data = await response.json();
            console.log('Registration successful!', data);
        } catch (e) {
            console.error('Error during registration:', e.message);
        }
    };
    
    
    return(
        <div className="d-flex justify-content-center">
            <FormRegister onRegister={registerUser}></FormRegister>
        </div>
    )
}
export default Entry;