import React from 'react';
import Reg from './registers.js';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
function Login({ registration, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = () => {
    if(onLogin){
      console.log('btn clicked!')
      if(onLogin){
        console.log('Calling email and password', email, password)
              onLogin(email, password);
      }
    }
  }
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column">
      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e
      )=>setEmail(e.target.value)} />
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'  value={password} onChange={(e

      )=>setPassword(e.target.value)}/>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <div className='custom-flex'>
          <a href="!#">Forgot password?</a>
          <Reg registration={registration}></Reg>
        </div>
      </div>

      <MDBBtn className="mb-4" onClick={handleSignIn}>Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member?</p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}
export default Login;