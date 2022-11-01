import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/auth';
import axios from "axios";

export default function SignIn() {

    const auth = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const sendData = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('https://api.arqsis-26.tk/users/login', data);
            auth.login(res.data.id)
            navigate('/', { replace: true })
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={sendData}>
                <div>
                    <label for="username">Username</label>
                    <input type="text" name="username" onChange={handleData} required />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" onChange={handleData} required />
                </div>
                <div>
                    <button type="sumbit"> Ingresar </button>
                </div>
            </form>
        </div>  
    );
}