import React, { useState } from "react";
import "./memorygame.css";

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

    const getRows = () => {
        const size = levels[level];
        const numRows = size / 2;
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(numbers.slice(i * 4, i * 4 + 4)); // Adjust based on 4 columns per row
        }
        return rows;
    };

    return (
        <>
            {!gameStarted ? (
                <div className="main_container">
                    <h3 className="mgTitle">Welcome!</h3>
                    <div className="levels_container">
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="easy"
                                checked={level === "easy"}
                                id="easy"
                                onChange={() => setLevel("easy")}
                            />
                            Easy
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="normal"
                                id="normal"
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
                                id="hard"
                                checked={level === "hard"}
                                onChange={() => setLevel("hard")}
                            />
                            Hard
                        </label>
                    </div>
                    <button onClick={startGame}>Start Game</button>
                </div>
            ) : (
                <div className="cells_container">
                    <h4>game yo</h4>
                    <h4>Tries: {tries}</h4>
                    {matched.length === numbers.length && <p>ALL SOLVED!</p>}
                    <button onClick={() => setGameStarted(false)}>New Game</button>
                    {getRows().map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((num, cellIndex) => {
                                const index = rowIndex * 4 + cellIndex;
                                return (
                                    <div
                                        key={index}
                                        className={`cell ${selected.includes(index) || matched.includes(index) ? "flipped" : ""}`}
                                        onClick={() => handleClick(index)}
                                    >
                                        {selected.includes(index) || matched.includes(index) ? num : ""}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default MemoryGame;
