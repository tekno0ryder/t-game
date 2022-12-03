import React, { useState } from "react";
import Game from "./Game";
import { SEGMENTS_CONFIG } from "./config";

const App = () => {
  const [isPlay, setIsPlay] = useState(false);

  if (!isPlay) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          placeItems: "center",
          justifyContent: "center",
          marginTop: 128,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>T Game</h1>
        </div>
        <h2>How to play: </h2>
        <ul>
          <li> Touch the screen when a segment touch the target</li>
          <li>Smaller segment grants you higher score</li>
          <ul>
            {SEGMENTS_CONFIG.map((segment) => (
              <li style={{ color: segment.color }}>
                {segment.label}: {segment.score}
              </li>
            ))}
          </ul>
        </ul>
        <div style={{ textAlign: "center", margin: 32 }}>
          <button onClick={() => setIsPlay(true)} style={{ width: 220 }}>
            Play!
          </button>
        </div>
      </div>
    );
  }

  return <Game />;
};
export default App;
