import * as React from "react";
import { useContext, useCallback } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../contexts";
import { IconButton } from "../components/icon";
import ChatLayout from "../components/chat-layout";
import { openChat, closeChat, sendChat } from "../effects/chat";
import { SubtitleLayout } from "../components/subtitle-layout";

export const Subtitle: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const onClickCloseChat = useCallback(closeChat(store), [store]);
  const onClickSendChat = useCallback(sendChat(store), [store]);

  const { ui, room } = store;
  return (
    <Observer>
      {() => {
        return <SubtitleLayout subtitles={[...room.subtitles]} />;
      }}
    </Observer>
  );
};
