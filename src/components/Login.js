import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, password}),
        });

        if(!response.ok) {
            setError('invalid credentials');
            return;
        }

        try {
        await AuthService.login(username, password).then(
            () => {
            navigate("/home");
            window.location.reload();
            },
            (error) => {
            console.log(error);
            }
        );
        } catch (err) {
        console.log(err);
        }
    };

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={handleLogin}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                { error && 
                <div className="alert alert-danger" role="alert">{error}</div>
                }
                <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Login</button>
            </form>
        </main>
    );
}

export default Login;