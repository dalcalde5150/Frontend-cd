import { React, useState } from "react";
import axios from "axios";

export default function Register() {

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
            const res = await axios.post('http://localhost:3000/users/register', data);
            console.log(res.data);
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
                    <input type="text" name="password" onChange={handleData} required  />
                </div>
                <div>
                    <label for="password">Confirm password</label>
                    <input type="text" name="password2" onChange={handleData} required  />
                </div>
                <div>
                    <input class="margin-title1" type="submit" name="Crear" value="Registrarse" />
                </div>
            </form>
        </div>  
    );
}