import React from "react";

export default function SignIn() {
    return (
        <div>
            <h2>Sign In</h2>
            <form action="<%= SubmitUsersPath %>" method="post">
                <div>
                    <label for="email">Email</label>
                    <input type="text" name="email" />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="text" name="password" />
                </div>
                <div>
                    <input class="margin-title1" type="submit" name="Crear" value="INICIAR" />
                </div>
            </form>
        </div>  
    );
}