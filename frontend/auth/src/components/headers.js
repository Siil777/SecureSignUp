import Signup from './signup.js';
import SignUpForm from './signupforms.js';
import { Route, Routes } from 'react-router-dom';

const Head = ({ signup }) => {

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div></div>
                <Signup signup={signup} />
            </nav>
            <div>
                <Routes>
                    <Route path='/form' element={<SignUpForm />} />
                </Routes>
            </div>
        </div>
    )
}
export default Head;