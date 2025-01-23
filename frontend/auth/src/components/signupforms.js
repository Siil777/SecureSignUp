import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';
import AlertComponent from './alerts.js';

const SignUpForm = ({ onRegister }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password, username);
        setShowAlert(true);
    }
    setTimeout(()=>{
        setShowAlert(false);
    }, 3000);
/*     const handleAlert = () => {
    } */
    return (
        <div className="col-4 centered">
            <form className="sm" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white'}}>
                <FormControl margin="normal">
                    <InputLabel htmlFor='email' style={{ color: 'white'}}>Email address</InputLabel>
                    <Input id="email" type="email" aria-describedby="text" value={email} onChange={(e) => setEmail(e.target.value)} required></Input>
                    <FormHelperText id='text' style={{ color: 'white'}}>We never share your email before it profitable for us</FormHelperText>
                </FormControl>
                <FormControl margin="normal">
                    <InputLabel htmlFor='username' style={{ color: 'white'}}>Username</InputLabel>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required></Input>
                </FormControl>
                <FormControl margin="normal">
                    <InputLabel htmlFor='password' style={{ color: 'white'}}>Password</InputLabel>
                    <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} required></Input>
                </FormControl>
                <Button type="submit" color="white">Register</Button>
                {showAlert && (
                    <AlertComponent servity='success' message='Registration successfull!' />
                )}
            </form>
        </div>
    );
};
export default SignUpForm;
