import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

function Practice() {

    const [language, setLanguage] = useState("Java");
    const [code, setCode] = useState("");

    const [review, setReview] = useState("");
    const [correctedCode, setCorrectedCode] = useState("");
    const [output, setOutput] = useState("");

    const [loadingReview, setLoadingReview] = useState(false);
    const [loadingCorrect, setLoadingCorrect] = useState(false);

    const getAIReview = async () => {

        if (!code.trim()) {
            alert("Please write some code first.");
            return;
        }

        try {

            setLoadingReview(true);

            const response = await axios.post(
                "http://https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai/review",
                {
                    language,
                    code
                }
            );

            setReview(response.data.guidance);

        } catch (error) {

            console.error(error);
            setReview("Unable to review code.");

        } finally {

            setLoadingReview(false);
        }
    };

    const getCorrectCode = async () => {

        if (!code.trim()) {
            alert("Please write some code first.");
            return;
        }

        try {

            setLoadingCorrect(true);

            const response = await axios.post(
                "http://https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai/correct",
                {
                    language,
                    code
                }
            );

            setCorrectedCode(
                response.data.guidance
            );

        } catch (error) {

            console.error(error);

            setCorrectedCode(
                "Unable to generate corrected code."
            );

        } finally {

            setLoadingCorrect(false);
        }
    };
const runCode = async () => {

    if (!code.trim()) {

        alert("Please write some code first.");
        return;
    }

    try {

        const response =
            await axios.post(
                "http://https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/ai/run",
                {
                    language,
                    code
                }
            );

        setOutput(
            response.data.guidance
        );

    } catch (error) {

        console.error(error);

        setOutput(
            "Failed to execute code."
        );
    }
};





    const clearAll = () => {

        setCode("");
        setReview("");
        setCorrectedCode("");
        setOutput("");
    };

    const copyCode = () => {

        navigator.clipboard.writeText(
            correctedCode
        );

        alert("Code copied successfully!");
    };

    return (

        <div className="container mt-5">

            <h1 className="mb-4">
                💻 Practice Coding
            </h1>

            <div className="card shadow">

                <div className="card-body">

                    <label className="form-label fw-bold">
                        Programming Language
                    </label>

                    <select
                        className="form-select mb-3"
                        value={language}
                        onChange={(e) =>
                            setLanguage(
                                e.target.value
                            )
                        }
                    >
                        <option>Java</option>
                        <option>C++</option>
                        <option>Python</option>
                    </select>

                    <label className="form-label fw-bold">
                        Write Your Code
                    </label>

                    <Editor
                        height="500px"
                        theme="vs-dark"
                        language={language.toLowerCase()}
                        value={code}
                        onChange={(value) =>
                            setCode(value || "")
                        }
                    />

                    <div className="mt-3">

                        <button
                            className="btn btn-primary me-2"
                            onClick={getAIReview}
                        >
                            {
                                loadingReview
                                    ? "Reviewing..."
                                    : "AI Review"
                            }
                        </button>

                        <button
                            className="btn btn-success me-2"
                            onClick={getCorrectCode}
                        >
                            {
                                loadingCorrect
                                    ? "Generating..."
                                    : "Correct Code"
                            }
                        </button>

                        <button
                            className="btn btn-warning me-2"
                            onClick={runCode}
                        >
                            ▶ Run Code
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

            {output && (

                <div className="card shadow mt-4">

                    <div className="card-body">

                        <h3>
                            ▶ Output
                        </h3>

                        <pre
                            className="bg-dark text-light p-3 rounded"
                            style={{
                                whiteSpace: "pre-wrap"
                            }}
                        >
                            {output}
                        </pre>

                    </div>

                </div>

            )}

            {review && (

                <div className="card shadow mt-4">

                    <div className="card-body">

                        <h3>
                            🤖 AI Review
                        </h3>

                        <div className="alert alert-light border">

                            <pre
                                style={{
                                    whiteSpace: "pre-wrap",
                                    margin: 0,
                                    fontFamily: "inherit"
                                }}
                            >
                                {review}
                            </pre>

                        </div>

                    </div>

                </div>

            )}

            {correctedCode && (

                <div className="card shadow mt-4">

                    <div className="card-body">

                        <h3>
                            🚀 Corrected Code
                        </h3>

                        <button
                            className="btn btn-outline-primary mb-3"
                            onClick={copyCode}
                        >
                            Copy Code
                        </button>

                        <pre
                            className="bg-dark text-light p-3 rounded"
                            style={{
                                whiteSpace: "pre-wrap"
                            }}
                        >
                            {correctedCode}
                        </pre>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Practice;