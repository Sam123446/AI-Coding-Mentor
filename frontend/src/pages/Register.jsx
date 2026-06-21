import { useState } from "react";
import axios from "axios";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async () => {

        try {

            const response = await axios.post(
                "http://https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(response.data);

        } catch (error) {

            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">
                        Register
                    </h2>

                    <input
                        className="form-control mb-3"
                        placeholder="Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

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
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="btn btn-success"
                        onClick={registerUser}
                    >
                        Register
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Register;