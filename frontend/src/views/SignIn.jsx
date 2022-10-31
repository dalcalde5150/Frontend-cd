import { React, useState } from "react";
import axios from "axios";

export default function SignIn() {

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
            console.log(res.data);
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
                    <input type="text" name="password" onChange={handleData} required />
                </div>
                <div>
                    <input class="margin-title1" type="submit" name="Crear" value="Ingresar" />
                </div>
            </form>
        </div>  
    );
}