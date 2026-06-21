import { useEffect, useState } from "react";
import axios from "axios";
import ProblemCard from "./ProblemCard";

function ProblemsList() {

    const [problems, setProblems] = useState([]);
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");

    useEffect(() => {
        axios
            .get("https://p01--ai-coding-mentor--ddgq69l8mqk5.code.run/api/problems")
            .then((response) => {
                setProblems(response.data);
            })
            .catch((error) => {
                console.error("Error fetching problems:", error);
            });
    }, []);

    const filteredProblems = problems.filter((problem) => {

        const matchesSearch =
            problem.title.toLowerCase().includes(search.toLowerCase());

        const matchesDifficulty =
            difficulty === "All" ||
            problem.difficulty === difficulty;

        return matchesSearch && matchesDifficulty;
    });

    return (
        <div className="container mt-5">

            <h2 className="text-center fw-bold mb-3">
                Coding Problems
            </h2>

            <p className="text-center text-muted mb-4">
                Browse coding problems and improve your problem-solving skills.
            </p>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search problems..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Difficulty Filters */}
            <div className="d-flex justify-content-center gap-2 mb-4">

                <button
                    className="btn btn-dark"
                    onClick={() => setDifficulty("All")}
                >
                    All
                </button>

                <button
                    className="btn btn-success"
                    onClick={() => setDifficulty("Easy")}
                >
                    Easy
                </button>

                <button
                    className="btn btn-warning"
                    onClick={() => setDifficulty("Medium")}
                >
                    Medium
                </button>

                <button
                    className="btn btn-danger"
                    onClick={() => setDifficulty("Hard")}
                >
                    Hard
                </button>

            </div>

            {/* Problems */}
            {filteredProblems.length === 0 ? (
                <p className="text-center">
                    No matching problems found.
                </p>
            ) : (
                filteredProblems.map((problem) => (
                    <ProblemCard
                        key={problem.id}
                        problem={problem}
                    />
                ))
            )}

        </div>
    );
}

export default ProblemsList;