import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { initAxios, saveToken } from "../services/axiosClient";
import { api } from "../services/apiService";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function login() {
        await api.auth.login({email, password})
            .then(result => {
                authorizeUser(result.token)
                navigate("/schedule")
            })
            .catch(err => {
                console.log(err)
                setError(err.data.error);
            })
    }

    function authorizeUser(token) {
        console.log("SET token", token)
        saveToken(token)
        initAxios()
    }

    return <>
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header fs-1">
                            Login
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label fs-3 w-100">Login
                                <input type="email" className="form-control fs-3" placeholder="name@example.com"
                                    onChange={(e) => setEmail(e.target.value)} /></label>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fs-3 w-100">Password
                                <input type="password" className="form-control fs-3"
                                    onChange={(e) => setPassword(e.target.value)} /></label>
                            </div>
                            <div className="text-danger fs-4">{ error }</div>
                        </div>
                        <div className="card-footer d-flex justify-content-center">
                            <button className="btn btn-outline-success fs-3 mx-2 px-4" onClick={async () => { await login(); } }>Login</button>
                            <Link to="/register" className="btn btn-outline-primary fs-3">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}