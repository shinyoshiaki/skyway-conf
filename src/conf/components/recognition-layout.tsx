import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { ClientBrowser, VideoType } from "../utils/types";
import StreamController from "./stream-controller";
import Video from "./video";
import { IconButton } from "./icon";
import StreamInfo from "./stream-info";
import VADetector from "./va-detector";

interface Props {
  stream: MediaStream;
  displayName: string;
  browser: ClientBrowser;
  isAudioTrackMuted: boolean;
  onClickToggleAudioMuted: () => void;
}
const RecognitionLayout: FunctionComponent<Props> = ({
  stream,
  browser,
  isAudioTrackMuted,
  onClickToggleAudioMuted,
}: Props) => {
  const [isMinimize, setMinimize] = useState(false);

  return (
    <div css={isMinimize ? [wrapperStyle, minimizeStyle] : wrapperStyle}>
      <div css={videoStyle}>
        <div css={actionStyle}>
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
        <div css={controllerStyle}>
          <VADetector stream={stream} />
          <StreamController
            displayName={"recognition"}
            browser={browser}
            controllers={
              <>
                <IconButton
                  name={isAudioTrackMuted ? "mic_off" : "mic"}
                  title={isAudioTrackMuted ? "Unmute audio" : "Mute audio"}
                  onClick={onClickToggleAudioMuted}
                />
              </>
            }
          />
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
