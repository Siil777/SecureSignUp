import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
const Reg = () => {
    const navigate = useNavigate();
    function handleHistory(){
        navigate('/form');
    }
    return(
        <Button onClick={handleHistory} sx={{color: 'white'}}>
            Register
        </Button>
    )
}
export default Reg;