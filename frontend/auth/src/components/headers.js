import Signup from './signup.js';
import SignUpForm from './entries.js';
import { Route, Routes } from 'react-router-dom';
import SignInForm from './entrysignin.js';
import Signin from './signin.js';
const Head = ({ signup, signin }) => {
    return (
        <div className='content'>
            <nav className="navbar d-flex justify-content-end" style={{backgroundColor: "#1a237e"}}>
                <div>
                <Signup signup={signup} />
                </div>
                <div>
                <Signin signin={signin} />   
                </div>
            </nav>
            <div className='d-flex justify-content-center'>
                <Routes>
                    <Route path='/form' element={<SignUpForm />} />
                    <Route path='/logform' element={<SignInForm />} />
                </Routes>
            </div>
        </div>
    )
}
export default Head;