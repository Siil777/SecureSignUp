import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
const SignUpForm = () => {
    return (
      <div>
        <FormControl>
            <InputLabel htmlFor='email'>Email address</InputLabel>
            <Input id="email" aria-describedby="text"></Input>
            <FormHelperText id='text'>We never share your email before it profitable for us</FormHelperText>
        </FormControl>
      </div>
    );
  };
  
  export default SignUpForm;
  