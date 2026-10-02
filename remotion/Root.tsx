import React from "react";
import { Composition } from "remotion";
import { HeroWatch3D } from "./HeroWatch3D";
import { CraftBezel3D } from "./CraftBezel3D";
import { HeroExploded3D } from "./HeroExploded3D";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Primary Hero 3D Watch Cinematic Film (1920x1080 @ 30 FPS, 120 frames / 4.0s) */}
      <Composition
        id="HeroWatch"
        component={HeroWatch3D}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2. Craft Section Macro Bezel Sequence (1080x1080 @ 60 FPS, 120 frames / 2.0s) */}
      <Composition
        id="CraftBezel"
        component={CraftBezel3D}
        durationInFrames={120}
        fps={60}
        width={1080}
        height={1080}
      />

      {/* 3. Hero Center 3D Exploded-View Watch Sequence (1000x1000 @ 30 FPS, 60 frames) */}
      <Composition
        id="HeroExploded"
        component={HeroExploded3D}
        durationInFrames={60}
        fps={30}
        width={1000}
        height={1000}
      />
    </>
  );
};
