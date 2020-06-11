import React, { FC } from "react";
import { RoomSubtitle } from "../utils/types";

export const SubtitleLayout: FC<{ subtitles: RoomSubtitle[] }> = ({
  subtitles,
}) => {
  return (
    <div style={{ width: 500 }}>
      {subtitles.slice(-5).map((subtitle, i) => (
        <div key={i}>{`(${subtitle.from}) ${subtitle.text}`}</div>
      ))}
    </div>
  );
};
