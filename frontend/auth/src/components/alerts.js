import { Alert } from "@mui/material";
const Alerts = ({ servity, message }) => {
    return (
        <div >
            <Alert servity={servity}>
                {message}
            </Alert>
        </div>
    )
}
export default Alerts;