import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
const Reg = () => {
    const navigate = useNavigate();
    function handleHistory(){
        navigate('/form');
    }
    return(
        <Button style={{ color: 'white'}} onClick={handleHistory} sx={{color: 'primary'}}>
            Register
        </Button>
    )
}
export default Reg;