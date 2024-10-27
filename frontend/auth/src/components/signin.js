import { Button } from "@mui/material";
import {useNavigate} from 'react-router-dom';
const SignIn = () => {
    const navigate = useNavigate();
    function handleRoute (){
        	navigate('/logform')
    }
    return(
        <Button onClick={handleRoute} sx={{color: 'white'}}>
            Sign in
        </Button>
    )
}
export default SignIn;