import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
const SignUpForm = () => {
    return (
        <div className="col-4" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <FormControl margin="normal">
                <InputLabel htmlFor='email'>Email address</InputLabel>
                <Input id="email" aria-describedby="text"></Input>
                <FormHelperText id='text'>We never share your email before it profitable for us</FormHelperText>
            </FormControl>
            <FormControl margin="normal">
                <InputLabel htmlFor='username'>Username</InputLabel>
                <Input id="username"></Input>
            </FormControl>
            <FormControl margin="normal">
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input id="password"></Input>
            </FormControl>
        </div>
    );
};

export default SignUpForm;
