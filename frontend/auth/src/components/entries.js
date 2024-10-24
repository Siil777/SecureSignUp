import { useState,useEffect } from "react";
import FormRegister from './signupforms.js';

const Entry = () => {
        const registerUser = async(email,username,password)=>{
            try{
                const response = await fetch('http://localhost:5000/email/register',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email,username,password})
    
                })
                const data = await response.json();
                if(!response.ok){
                    throw new Error(data.message, 'fetch error')
                }
                console.log('Registration successfull!', data);
            }catch(e){
                console.error(e);
            }
    }
    return(
        <div className="d-flex justify-content-center">
            <FormRegister onRegister={registerUser}></FormRegister>
        </div>
    )
}
export default Entry;