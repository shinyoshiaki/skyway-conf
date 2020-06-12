import React, {
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import RecognitionLayout from "../components/recognition-layout";
import { RecognitionEffect } from "../effects/recognition";

const Recognition: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);
  const recognitionRef = useRef<RecognitionEffect>();
  const [progress, setProgress] = useState("");

  useEffect(() => {
    const recognition = (recognitionRef.current = new RecognitionEffect());
    recognition.onFinal = (str) => {
      store.room.addLocalSubtitle({
        from: store.client.displayName,
        text: str,
      });
    };
    recognition.onError = () => {
      console.log("error");
      store.subtitle.toggleMuted();
    };
    recognition.onProgress = setProgress;
  }, [store]);

  const onClickToggleAudioMuted = useCallback(() => {
    const recognition = recognitionRef.current!;
    recognition.toggle();
    store.subtitle.toggleMuted();
  }, [store]);

  const onClickDownload = useCallback(() => {
    const content = [...store.room.subtitles].reduce((acc, cur) => {
      acc += `${cur.from}:${cur.text}\n`;
      return acc;
    }, "");
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.download = name;
    anchor.href = url;
    anchor.click();
  }, [store]);

  const { media, client, ui, subtitle } = store;
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
            isAudioTrackMuted={subtitle.isAudioTrackMuted}
            onClickToggleAudioMuted={onClickToggleAudioMuted}
            onClickDownload={onClickDownload}
            progress={progress}
          />
        );
      }}
    </Observer>
  );
};

export default Recognition;
