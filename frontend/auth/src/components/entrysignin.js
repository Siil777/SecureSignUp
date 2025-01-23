import { useState, useEffect } from "react";
import SignInForm from './signinforms.js';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  }
  from 'mdb-react-ui-kit';

const Entries = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userData, setUserdata] = useState(null);
    const LogInUser = async (email, password) => {
        try {
            const response = await fetch('https://auth-production-38c5.up.railway.app/email/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })

            })
            const data = await response.json();
            if (!response.ok) {
                console.error('Login error', data.message)
                throw new Error(data.message, 'fetch error')
            }
            console.log('log in successfull!', data);
            setLoggedIn(true);
            setUserdata(data.user);
        } catch (e) {
            console.error(e.message);

        }
    }
    const handleLogout = () => {
        setLoggedIn(false);
        setUserdata(null);
    }
    return (
        <div>
            <div className="justify-content-center">
                {isLoggedIn ? (
                    <div>
                        <h2>Welome, {userData ? userData.email : 'User'}</h2>
                        <MDBBtn className="mb-4" onClick={handleLogout}>Log out</MDBBtn>
                    </div>
                ) : (
                    <div>
                         <SignInForm onLogin={LogInUser} />
                    </div>
                )}
            </div>
        </div>
    )
}
export default Entries;