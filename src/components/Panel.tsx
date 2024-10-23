// Panel.tsx
import React from "react";

interface PanelProps {
  onPlay: () => void;
  onPause: () => void;
  isPlaying: boolean;
  info: string;
}

const Panel: React.FC<PanelProps> = ({ onPlay, onPause, isPlaying, info }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        background: "rgba(0, 0, 0, 1)",
        padding: "10px",
        zIndex: 10, // Đảm bảo panel nằm trên các thành phần khác
      }}
    >
      <h2>Model Information</h2>
      <p>{info}</p>
      <button onClick={isPlaying ? onPause : onPlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default Panel;
