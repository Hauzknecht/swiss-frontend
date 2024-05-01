import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, password}),
        });

        if(!response.ok) {
            setError('User with that name already exists');
            return;
        }

        try {
        await AuthService.signup(username, password).then(
            () => {
            // check for token and user already exists with 200
            //   console.log("Sign up successfully", response);
            navigate("/login");
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
            <form onSubmit={handleSignup}>
                <h1 className="h3 mb-3 fw-normal">Register</h1>

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
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirm password"
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <label htmlFor="floatingConfirmPassword">Confirm password</label>
                </div>
                { error && 
                <div className="alert alert-danger" role="alert">{error}</div>
                }
                <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Submit</button>
            </form>
        </main>
    );
}

export default Register;