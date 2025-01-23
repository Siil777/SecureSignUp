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
    if (onLogin) {
      console.log('btn clicked!')
      if (onLogin) {
        console.log('Calling email and password', email, password)
        onLogin(email, password);
      }
    }
  }
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column">
      <div style={{ color: 'white' }}>
        <h6>Email address</h6>
        <MDBInput wrapperClass='mb-4' id='form1' type='email' value={email} onChange={(e
        ) => setEmail(e.target.value)} />
      </div>
      <div style={{ color: 'white' }}>
      <h6>Password</h6>
        <MDBInput wrapperClass='mb-4' id='form2' type='password' value={password} onChange={(e
        ) => setPassword(e.target.value)} />
      </div>

      <div className="d-flex justify-content-between mx-3 mb-4" style={{ color: 'white' }}>
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <div className='ms-5'>
          <div className='d-flex flex-column' >
            <a href="!#" style={{ color: 'white' }}>Forgot password?</a>
            <Reg registration={registration}></Reg>
          </div>
        </div>
      </div>

      <MDBBtn className="mb-4" onClick={handleSignIn}>Sign in</MDBBtn>

      <div style={{ color: 'white' }} className="text-center">
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