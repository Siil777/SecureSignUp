import Signup from './signup.js';
import SignUpForm from './entries.js';
import { Route, Routes } from 'react-router-dom';
const Head = ({ signup }) => {
    return (
        <div className='content'>
            <nav className="navbar" style={{backgroundColor: "#1a237e"}}>
                <div></div>
                <Signup signup={signup} />
            </nav>
            <div className='d-flex justify-content-center'>
                <Routes>
                    <Route path='/form' element={<SignUpForm />} />
                </Routes>
            </div>
        </div>
    )
}
export default Head;