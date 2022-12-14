import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/auth';
import axios from "axios";
import Cookies from "js-cookie";

export default function Register() {

    const auth = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
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
            const res = await axios.post('https://api.arqsis-26.tk/users/register', data);
            Cookies.set('user_id', res.data.id);
            Cookies.set('token', res.data.token);
            auth.login();
            navigate('/', { replace: true })
        } catch (error) {
            console.log(error.response);
        }
    }
    
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={sendData} >
                <div>
                    <label for="email">Email</label>
                    <input type="text" name="email" onChange={handleData} required  />
                </div>
                <div>
                    <label for="username">Username</label>
                    <input type="text" name="username" onChange={handleData} required  />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" onChange={handleData} required  />
                </div>
                <div>
                    <label for="password">Confirm password</label>
                    <input type="password" name="password2" onChange={handleData} required  />
                </div>
                <div>
                <button type="sumbit"> Registrarse </button>
                </div>
            </form>
        </div>  
    );
}