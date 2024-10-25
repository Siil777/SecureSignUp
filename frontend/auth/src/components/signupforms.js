import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';

const SignUpForm = ({ onRegister }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password, username);
    }
    return (
        <div className="col-4 centered" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
            <form onSubmit={handleSubmit}>
                <FormControl margin="normal">
                    <InputLabel htmlFor='email'>Email address</InputLabel>
                    <Input id="email" type="email" aria-describedby="text" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                    <FormHelperText id='text'>We never share your email before it profitable for us</FormHelperText>
                </FormControl>
                <FormControl margin="normal">
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                </FormControl>
                <FormControl margin="normal">
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                </FormControl>
                <Button type="submit" color="secondary">Register</Button>
            </form>
        </div>
    );
};
export default SignUpForm;
