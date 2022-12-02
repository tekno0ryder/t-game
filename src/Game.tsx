import { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { animated, useSpring } from "@react-spring/web";
import Segment from "./Segment";

const baseHeight = 650;
const initialDuration = 2000;

function Game() {
  const [duration, setDuration] = useState(initialDuration);
  const [score, setScore] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  const segments = useRef<HTMLDivElement[]>([]);
  const net = useRef<HTMLDivElement | null>(null);

  const [styles, api] = useSpring(
    () => ({
      delay: 450,
      from: { y: 1500 },
      to: { y: -1750 },
      reset: true,
      loop: true,
      cancel: hasLost,
      config: { duration },
      onRest: () => {
        setDuration((duration) => duration - 20);
      },
      onStart: () => setIsBlocked(false),
    }),
    [duration, hasLost]
  );

  const handlePress = () => {
    setIsBlocked(true);
    api.stop();

    const netRect = net.current!.getBoundingClientRect();

    for (let i = 0; i < segments.current.length; i++) {
      const segmentRect = segments.current[i].getBoundingClientRect();

      if (
        netRect.top <= segmentRect.top + segmentRect.height &&
        netRect.top + netRect.height > segmentRect.top
      ) {
        return setScore(score + (i + 1));
      }
    }

    setHasLost(true);
  };

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (event) => !isBlocked && event.key === "  " && handlePress()
    );
  }, []);

  return (
    <div
      onMouseDown={() => (isBlocked ? null : handlePress())}
      onKeyDown={(e) => (isBlocked ? null : e.key === "Enter" && handlePress())}
      style={{ position: "fixed" }}
    >
      <h2 style={{ padding: 16 }}>Score: {score}</h2>
      <div
        ref={net}
        style={{
          marginTop: 64,
          width: "100vw",
          height: 8,
          background: "#64748b",
        }}
      />
      <div
        style={{
          left: "50%",
          bottom: "0",
          zIndex: 2,
        }}
      >
        <animated.div style={styles}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Segment
              ref={(ref) => (segments.current[0] = ref!)}
              type={1}
              baseHeight={baseHeight}
            />
            <Segment
              ref={(ref) => (segments.current[1] = ref!)}
              type={2}
              baseHeight={baseHeight}
            />
            <Segment
              ref={(ref) => (segments.current[2] = ref!)}
              type={3}
              baseHeight={baseHeight}
            />
          </div>
        </animated.div>
      </div>
      <Popup
        open={hasLost}
        contentStyle={{ background: "black", textAlign: "center", padding: 32 }}
        modal
        closeOnEscape={false}
        closeOnDocumentClick={false}
      >
        <div className="modal">Your score is {score}</div>
        <button
          onClick={() => {
            setHasLost(false);
            setScore(0);
            setDuration(initialDuration);
          }}
          style={{ marginTop: 16 }}
        >
          Restart
        </button>
      </Popup>
    </div>
  );
}

export default Game;
