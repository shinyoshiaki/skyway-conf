import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { IconButton } from "./icon";
import VADetector from "./va-detector";

interface Props {
  stream: MediaStream;
  displayName: string;
  isAudioTrackMuted: boolean;
  onClickToggleAudioMuted: () => void;
  onClickDownload: () => void;
  progress: string;
}
const RecognitionLayout: FunctionComponent<Props> = ({
  stream,
  isAudioTrackMuted,
  onClickToggleAudioMuted,
  onClickDownload,
  progress,
}: Props) => {
  const [isMinimize, setMinimize] = useState(false);

  return (
    <div css={isMinimize ? [wrapperStyle, minimizeStyle] : wrapperStyle}>
      <div css={videoStyle}>
        <div style={{ color: "white", padding: 5, position: "absolute" }}>
          speech recognition
        </div>
        <div css={actionStyle}>
          <IconButton
            name="cloud_download"
            showEdge={true}
            title="download"
            onClick={onClickDownload}
          />
          {isMinimize ? (
            <IconButton
              name="keyboard_arrow_right"
              showEdge={true}
              title="Maximize"
              onClick={() => setMinimize(false)}
            />
          ) : (
            <IconButton
              name="keyboard_arrow_left"
              showEdge={true}
              title="Minimize"
              onClick={() => setMinimize(true)}
            />
          )}
        </div>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <button
            onClick={onClickToggleAudioMuted}
            title={isAudioTrackMuted ? "Start" : "Stop"}
            css={buttonStyle}
          >
            <i className="material-icons" css={{ fontsize: "xxx-large" }}>
              {isAudioTrackMuted ? "mic_off" : "mic"}
            </i>
          </button>
        </div>
        <div css={controllerStyle}>
          {!isAudioTrackMuted && <VADetector stream={stream} />}
          <div style={{ color: "white" }}>{progress}</div>
        </div>
      </div>
    </div>
  );
};

export default RecognitionLayout;

const wrapperStyle = css({
  outline: `1px solid ${globalColors.gray}`,
  transition: "all .2s ease",
  willChange: "transform",
});

const minimizeStyle = css({
  transform: "translateX(-85%)",
});

const localStreamWidth = 240;
const videoStyle = css({
  position: "relative",
  width: localStreamWidth,
  height: (localStreamWidth / 4) * 3,
  backgroundColor: globalColors.black,
});

const controllerStyle = css({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  padding: 5,
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

const buttonStyle = css({
  padding: "0 1px",
  appearance: "none",
  border: "none",
  background: "none",
  color: "white",
  cursor: "pointer",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: "auto",
  width: 70,
  height: 70,
});
