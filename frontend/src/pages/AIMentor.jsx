import { useState } from "react";
import axios from "axios";

function AIMentor() {

    const [problem, setProblem] = useState("");
    const [guidance, setGuidance] = useState("");
    const [visualization, setVisualization] = useState("");
    const [loading, setLoading] = useState(false);

    const getGuidance = async () => {

        if (!problem.trim()) {
            alert("Please enter a coding problem.");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                "https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai/guidance",
                {
                    problem: problem
                }
            );

            setGuidance(
                response.data.guidance
            );

        } catch (error) {

            console.error(error);
            alert("Failed to get AI guidance.");

        } finally {

            setLoading(false);
        }
    };

    const getVisualization = async () => {

        if (!problem.trim()) {
            alert("Please enter a coding problem.");
            return;
        }

        try {

            const response = await axios.post(
                "https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai/visualize",
                {
                    problem: problem
                }
            );

            setVisualization(
                response.data.guidance
            );

        } catch (error) {

            console.error(error);
            alert(
                "Failed to generate visualization."
            );
        }
    };

    const clearAll = () => {

        setProblem("");
        setGuidance("");
        setVisualization("");
    };

    return (

        <div className="container mt-5">

            <h1 className="text-center mb-4">
                🤖 AI Coding Mentor
            </h1>

            <div className="card shadow">

                <div className="card-body">

                    <label className="form-label fw-bold">
                        Paste Any Coding Problem
                    </label>

                    <textarea
                        className="form-control"
                        rows="8"
                        placeholder="Paste your coding problem here..."
                        value={problem}
                        onChange={(e) =>
                            setProblem(
                                e.target.value
                            )
                        }
                    />

                    <div className="mt-3">

                        <button
                            className="btn btn-primary me-2"
                            onClick={getGuidance}
                        >
                            {loading
                                ? "Generating..."
                                : "🤖 Get AI Guidance"}
                        </button>

                        <button
                            className="btn btn-info me-2"
                            onClick={getVisualization}
                        >
                            📊 Visualize Problem
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={clearAll}
                        >
                            Clear
                        </button>

                    </div>

                </div>

            </div>

            {guidance && (

                <div className="card shadow mt-4 border-primary">

                    <div className="card-body">

                        <h3>
                            🤖 AI Guidance
                        </h3>

                        <pre
                            style={{
                                whiteSpace: "pre-wrap",
                                fontFamily: "inherit"
                            }}
                        >
                            {guidance}
                        </pre>

                    </div>

                </div>

            )}

            {visualization && (

                <div className="card shadow mt-4 border-info">

                    <div className="card-body">

                        <h3>
                            📊 Problem Visualization
                        </h3>

                        <pre
                            style={{
                                whiteSpace: "pre-wrap",
                                fontFamily: "inherit"
                            }}
                        >
                            {visualization}
                        </pre>

                    </div>

                </div>

            )}

        </div>

    );
}

export default AIMentor;