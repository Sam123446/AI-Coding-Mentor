import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [solvedCount, setSolvedCount] =
        useState(0);

    const userEmail =
        localStorage.getItem("userEmail");

    useEffect(() => {

        axios
            .get(
                "https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/progress/count/1"
            )
            .then((response) => {

                setSolvedCount(
                    response.data
                );
            })
            .catch((error) => {

                console.error(error);
            });

    }, []);

    return (

        <div className="container mt-5">

            {/* Welcome Section */}

            <div className="mb-5">

                <h1 className="fw-bold">
                    👋 Welcome Back
                </h1>

                <p className="text-secondary">
                    Logged in as:
                    <strong>
                        {" "}
                        {userEmail}
                    </strong>
                </p>

            </div>

            {/* Statistics Cards */}

            <div className="row">

                <div className="col-md-4 mb-4">

                    <div className="card shadow dashboard-card">

                        <div className="card-body">

                            <h2>
                                🏆
                            </h2>

                            <h5>
                                Problems Solved
                            </h5>

                            <div className="dashboard-number">
                                {solvedCount}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow dashboard-card">

                        <div className="card-body">

                            <h2>
                                🤖
                            </h2>

                            <h5>
                                AI Reviews
                            </h5>

                            <div className="dashboard-number">
                                0
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow dashboard-card">

                        <div className="card-body">

                            <h2>
                                💻
                            </h2>

                            <h5>
                                Practice Sessions
                            </h5>

                            <div className="dashboard-number">
                                0
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Activity Section */}

            <div className="card shadow mt-4">

                <div className="card-body">

                    <h4 className="mb-3">
                        📈 Learning Progress
                    </h4>

                    <p>
                        Keep solving problems and using
                        AI reviews to improve your coding
                        skills.
                    </p>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;