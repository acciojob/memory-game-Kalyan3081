import React, { useState } from "react";
import "./MemoryGame.css";

const MemoryGame = () => {
    const [level, setLevel] = useState("easy");
    const [numbers, setNumbers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [matched, setMatched] = useState([]);
    const [tries, setTries] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const levels = { easy: 4, normal: 6, hard: 8 };

    const startGame = () => {
        const size = levels[level];
        const nums = Array.from({ length: size }, (_, i) => i + 1);
        const shuffledNumbers = [...nums, ...nums].sort(() => Math.random() - 0.5);

        setNumbers(shuffledNumbers);
        setSelected([]);
        setMatched([]);
        setTries(0);
        setGameStarted(true);
    };

    const handleClick = (index) => {
        if (selected.length === 2 || matched.includes(index) || selected.includes(index)) return;

        const newSelected = [...selected, index];
        setSelected(newSelected);

        if (newSelected.length === 2) {
            setTries(tries + 1);

            if (numbers[newSelected[0]] === numbers[newSelected[1]]) {
                setMatched([...matched, ...newSelected]);
            }

            setTimeout(() => setSelected([]), 1000);
        }
    };

    return (
        <>
            {!gameStarted ? (
                <div className="main_container">
                    <h3 className="mgTitle">Memory Game</h3>
                    <div className="levels_container">
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="easy"
                                checked={level === "easy"}
                                onChange={() => setLevel("easy")}
                            />
                            Easy
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="normal"
                                checked={level === "normal"}
                                onChange={() => setLevel("normal")}
                            />
                            Normal
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="hard"
                                checked={level === "hard"}
                                onChange={() => setLevel("hard")}
                            />
                            Hard
                        </label>
                    </div>
                    <button onClick={startGame}>Start Game</button>
                </div>
            ) : (
                <div className="cells_container" style={{
                    gridTemplateColumns: "repeat(4, 60px)",
                    gridTemplateRows: `repeat(${levels[level] / 2}, 60px)`
                }}>
                    <h2>game yo</h2>
                    <p>Tries: {tries}</p>
                    {matched.length === numbers.length && <p>ALL SOLVED!</p>}
                    <button>New Game</button>
                    {numbers.map((num, index) => (
                        <div
                            key={index}
                            className={`cell ${selected.includes(index) || matched.includes(index) ? "flipped" : ""}`}
                            onClick={() => handleClick(index)}
                        >
                            {selected.includes(index) || matched.includes(index) ? num : ""}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default MemoryGame;
