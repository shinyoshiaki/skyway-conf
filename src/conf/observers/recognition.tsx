import React, { useContext, useCallback, useEffect, useRef } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import {
  openSettings,
  castVideo,
  toggleAudioMuted,
  toggleVideoMuted,
} from "../effects/local-stream";
import RecognitionLayout from "../components/recognition-layout";
import { RecognitionEffect } from "../effects/recognition";

const Recognition: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);
  const recognitionRef = useRef<RecognitionEffect>();

  const onClickCastVideo = useCallback(castVideo(store), [store]);
  const onClickOpenSettings = useCallback(openSettings(store), [store]);
  const onClickToggleAudioMuted = useCallback(() => {
    const recognition = recognitionRef.current!;
    recognition.toggle();
  }, []);
  const onClickToggleVideoMuted = useCallback(toggleVideoMuted(store), [store]);

  useEffect(() => {
    const recognition = (recognitionRef.current = new RecognitionEffect());
    recognition.onFinal = (str) => {
      store.room.addSubtitle({ from: store.client.displayName, text: str });
    };
  }, [store]);

  const { media, client, ui } = store;
  return (
    <Observer>
      {() => {
        if (ui.isSettingsOpen) {
          return <></>;
        }

        return (
          <RecognitionLayout
            stream={media.stream}
            displayName={client.displayName}
            browser={client.browser}
            isAudioTrackMuted={media.isAudioTrackMuted}
            onClickToggleAudioMuted={onClickToggleAudioMuted}
          />
        );
      }}
    </Observer>
  );
};

export default Recognition;
