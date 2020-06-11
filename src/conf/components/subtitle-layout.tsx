import React, { FC, useState } from "react";
import { RoomSubtitle } from "../utils/types";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { IconButton } from "./icon";
import facepaint from "facepaint";

const mq = facepaint(
  [0, 1200, 1800].map((bp) => `@media (min-width: ${bp}px)`),
  { literal: true }
);

export const SubtitleLayout: FC<{ subtitles: RoomSubtitle[] }> = ({
  subtitles,
}) => {
  const [isMinimize, setMinimize] = useState(false);

  return (
    <div
      css={mq({
        width: [300, 450, 600],
      })}
    >
      <div css={isMinimize ? [wrapperStyle, minimizeStyle] : wrapperStyle}>
        <div style={{ color: "white" }}>subtitle</div>
        <div css={actionStyle}>
          {isMinimize ? (
            <IconButton
              name="keyboard_arrow_up"
              showEdge={true}
              title="Maximize"
              onClick={() => setMinimize(false)}
            />
          ) : (
            <IconButton
              name="keyboard_arrow_down"
              showEdge={true}
              title="Minimize"
              onClick={() => setMinimize(true)}
            />
          )}
        </div>
        {[...subtitles].slice(-10).map((subtitle, i) => (
          <div
            key={i}
            style={{ color: "white", fontWeight: 500 }}
          >{`(${subtitle.from}) ${subtitle.text}`}</div>
        ))}
      </div>
    </div>
  );
};

const wrapperStyle = css({
  outline: `1px solid ${globalColors.gray}`,
  transition: "all .2s ease",
  willChange: "transform",
  minHeight: 50,
  background: "black",
  padding: 5,
});

const minimizeStyle = css({
  transform: "translateY(85%)",
});

const actionStyle = css({
  position: "absolute",
  top: 4,
  right: 4,
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  color: globalColors.white,
});
