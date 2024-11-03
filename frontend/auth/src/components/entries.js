import { useState, useEffect } from "react";
import FormRegister from './signupforms.js';

const Entry = () => {
     const registerUser = async (email, password, username) => {
        console.log('sending data:', { email, password, username });

        try {
            const response = await fetch('https://pavelivanovthk@bitbucket.org/backendforauth/api/email/register', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ email, password, username })
            });

            if (response.status === 409) {
                alert('User already exists!');
            } else if (response.status === 201) {
                const data = await response.json();
                console.log('Registration successful!', data);
                alert('Registration successful!');
            } else if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Request failed: ${errorData.message}`);
            }
        } catch (e) {
            console.error('Error during registration:', e.message);
            alert('Error during registration. Please try again.');
        }
    }; 
  /*   fetch('http://localhost:4000/data')
    .then((response)=>response.json())
    .then((data)=>{
        console.log('response data',data)
    })
    .catch((error)=>{
        console.error(error)
    }) */
     return(
        <div className="d-flex justify-content-center">
            <FormRegister onRegister={registerUser}></FormRegister>
        </div>
    ) 
}
export default Entry;