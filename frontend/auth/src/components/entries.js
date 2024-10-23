import { useState,useEffect } from "react";

const Entry = () => {
    const [users, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        fetch('http://localhost:5000/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            setRows(data);
            setLoading(false);
        })
        .catch((error)=>
        console.log('fetch errpr', error));
        setLoading(false);
    }, []);
    return(
        <div>
            {loading ? (
                <p>Loading...</p>
            ):
            <ul>
                {users.map(user=>(
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
            }
        </div>
    )
}
export default Entry;