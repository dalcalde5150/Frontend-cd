import React from "react";

export default function Register() {
    return (
        <div>
            <h2>Register</h2>
            <form action="<%= SubmitUsersPath %>" method="post">
                <div>
                    <label for="email">Email</label>
                    <input type="text" name="email" />
                </div>
                <div>
                    <label for="nickname">Nickname</label>
                    <input type="text" name="nickname" />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="text" name="password" />
                </div>
                <div>
                    <input class="margin-title1" type="submit" name="Crear" value="CREAR" />
                </div>
            </form>
        </div>  
    );
}