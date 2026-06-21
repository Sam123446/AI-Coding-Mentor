import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProblemDetails() {

    const { id } = useParams();

    const [problem, setProblem] = useState(null);
    const [showAI, setShowAI] = useState(false);
    const [aiGuidance, setAiGuidance] = useState("");
    const [loadingAI, setLoadingAI] = useState(false);

    const [showVisualization, setShowVisualization] =
        useState(false);

    const [visualization, setVisualization] =
        useState("");

    useEffect(() => {

        axios
            .get(`http://https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/problems/${id}`)
            .then((response) => {
                setProblem(response.data);
            })
            .catch((error) => {
                console.error(
                    "Error loading problem:",
                    error
                );
            });

    }, [id]);

    const getAIGuidance = async () => {

        try {

            setLoadingAI(true);

            const response = await axios.post(
                "http://https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai/guidance",
                {
                    problem: `
Title: ${problem.title}

Difficulty: ${problem.difficulty}

Topic: ${problem.topic}

Description:
${problem.description}

Hint:
${problem.hint}
                    `
                }
            );

            setAiGuidance(
                response.data.guidance
            );

            setShowAI(true);

        } catch (error) {

            console.error(
                "AI Error:",
                error
            );

        } finally {

            setLoadingAI(false);

        }
    };

    const getVisualization = async () => {

        try {

            const response = await axios.post(
                "http://https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai/visualize",
                {
                    problem: `
Title: ${problem.title}

Difficulty: ${problem.difficulty}

Topic: ${problem.topic}

Description:
${problem.description}

Hint:
${problem.hint}
                    `
                }
            );

            setVisualization(
                response.data.guidance
            );

            setShowVisualization(true);

        } catch (error) {

            console.error(
                "Visualization Error:",
                error
            );
        }
    };

    if (!problem) {

        return (
            <div className="container mt-5">
                <h3>Loading...</h3>
            </div>
        );
    }

    const getDifficultyBadge = () => {

        switch (problem.difficulty) {

            case "Easy":
                return "bg-success";

            case "Medium":
                return "bg-warning text-dark";

            case "Hard":
                return "bg-danger";

            default:
                return "bg-secondary";
        }
    };

    return (

        <div className="container mt-5">

            <div className="card shadow border-0">

                <div className="card-body">

                    <h1 className="fw-bold mb-3">
                        {problem.title}
                    </h1>

                    <span
                        className={`badge ${getDifficultyBadge()} me-2`}
                    >
                        {problem.difficulty}
                    </span>

                    <span className="badge bg-secondary">
                        {problem.topic || "General"}
                    </span>

                    <hr />

                    <h4>Description</h4>

                    <p>
                        {problem.description ||
                            "No description available."}
                    </p>

                    <h4 className="mt-4">
                        Hint
                    </h4>

                    <div className="alert alert-info">
                        {problem.hint ||
                            "No hint available."}
                    </div>

                    <div className="mt-3">

                        <button
                            className="btn btn-primary me-2"
                            onClick={getAIGuidance}
                        >
                            {loadingAI
                                ? "Loading..."
                                : "🤖 AI Guidance"}
                        </button>

                        <button
                            className="btn btn-info"
                            onClick={getVisualization}
                        >
                            📊 Visualize Problem
                        </button>

                    </div>

                    {showAI && (

                        <div className="mt-4">

                            <div className="card border-primary">

                                <div className="card-body">

                                    <h4>
                                        🤖 AI Guidance
                                    </h4>

                                    <pre
                                        style={{
                                            whiteSpace: "pre-wrap",
                                            fontFamily: "inherit"
                                        }}
                                    >
                                        {aiGuidance}
                                    </pre>

                                </div>

                            </div>

                        </div>

                    )}

                    {showVisualization && (

                        <div className="mt-4">

                            <div className="card border-info">

                                <div className="card-body">

                                    <h4>
                                        📊 Problem Visualization
                                    </h4>

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

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
}

export default ProblemDetails;