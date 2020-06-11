import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { SubtitleLayout } from "../components/subtitle-layout";

export const Subtitle: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const { room } = store;
  return (
    <Observer>
      {() => {
        return <SubtitleLayout subtitles={[...room.subtitles]} />;
      }}
    </Observer>
  );
};
