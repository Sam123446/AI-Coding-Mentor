import { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async () => {

        try {

            const response = await axios.post(
                "http://https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/auth/login",
                {
                    email,
                    password
                }
            );

            alert(response.data);

            if (
                response.data ===
                "Login successful"
            ) {

                localStorage.setItem(
                    "userEmail",
                    email
                );

                window.location.href = "/";
            }

        } catch (error) {

            console.error(error);

            alert(
                "Login failed"
            );
        }
    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">
                        Login
                    </h2>

                    <input
                        className="form-control mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <button
                        className="btn btn-primary"
                        onClick={loginUser}
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login;