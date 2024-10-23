import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Group, MeshStandardMaterial } from "three";
import * as THREE from "three";

useGLTF.preload("/diels_alder_regiochemistry.glb");

interface ModelProps {
  isPlaying: boolean;
  onPartClick: (partName: string | null) => void;
}

export default function Model({ isPlaying, onPartClick }: ModelProps) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF(
    "/diels_alder_regiochemistry.glb"
  );
  const { actions } = useAnimations(animations, scene);
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);
  const originalColors = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    if (actions) {
      const action = actions["Animation"];
      if (action) {
        if (isPlaying) {
          action.reset().play();
        } else {
          action.paused = true;
        }
      }
    }
  }, [actions, isPlaying]);

  const handleClick = (event: any) => {
    const clickedPart = event.object.name;

    if (!originalColors.current[clickedPart]) {
      originalColors.current[clickedPart] =
        event.object.material.color.getHex();
    }

    if (clickedPart === highlightedPart) {
      setHighlightedPart(null);
      onPartClick(null);

      if (nodes[clickedPart] && (nodes[clickedPart] as THREE.Mesh).material) {
        (
          (nodes[clickedPart] as THREE.Mesh).material as MeshStandardMaterial
        ).color.setHex(originalColors.current[clickedPart]);
      }
    } else {
      if (highlightedPart && nodes[highlightedPart]) {
        (
          (nodes[highlightedPart] as THREE.Mesh)
            .material as MeshStandardMaterial
        ).color.setHex(originalColors.current[highlightedPart]);
      }
      setHighlightedPart(clickedPart);
      onPartClick(clickedPart);
    }
  };

  useFrame(() => {
    if (highlightedPart && nodes[highlightedPart]) {
      (
        (nodes[highlightedPart] as THREE.Mesh).material as MeshStandardMaterial
      ).color.setHex(0xff0000);
    }
  });

  return (
    <group ref={group} onClick={handleClick}>
      <primitive object={scene} />
    </group>
  );
}
