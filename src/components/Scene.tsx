"use client";
import { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import Model from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";
import Panel from "./Panel";

export default function Scene() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [modelInfo, setModelInfo] = useState(
    "Phản ứng giữa diene giàu electron và dienophile nghèo electron diễn ra thông qua cơ chế cộng hợp Diels-Alder. Diene giàu electron có xu hướng cho electron dễ dàng, trong khi dienophile nghèo electron có nhóm hút electron làm giảm mật độ electron, tạo điều kiện thuận lợi cho phản ứng cộng hợp này."
  );
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null); // Quản lý phần được chọn

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePartClick = (partName: string | null) => {
    if (partName) {
      setHighlightedPart(partName);
      setModelInfo(`Thông tin chi tiết của ${partName}`); // Hiển thị thông tin cụ thể của phần
      console.log(`Đã chọn phần: ${partName}`);
    } else {
      setHighlightedPart(null);
      setModelInfo(
        "Phản ứng giữa diene giàu electron và dienophile nghèo electron diễn ra thông qua cơ chế cộng hợp Diels-Alder. Diene giàu electron có xu hướng cho electron dễ dàng, trong khi dienophile nghèo electron có nhóm hút electron làm giảm mật độ electron, tạo điều kiện thuận lợi cho phản ứng cộng hợp này."
      ); // Reset thông tin khi không có phần nào được chọn
    }
  };

  return (
    <>
      <Canvas style={{ height: "calc(100vh - 50px)" }}>
        <Suspense fallback={null}>
          <Model isPlaying={isPlaying} onPartClick={handlePartClick} />
          <Environment preset="sunset" background />
        </Suspense>
        <OrbitControls />
      </Canvas>

      {/* Panel luôn hiển thị */}
      <Panel
        onPlay={handlePlay}
        onPause={handlePause}
        isPlaying={isPlaying}
        info={modelInfo} // Thông tin thay đổi dựa trên phần model được chọn
      />
    </>
  );
}
