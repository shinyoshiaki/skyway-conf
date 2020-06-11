import * as React from "react";
import Bootstrap from "./observers/bootstrap";
import Settings from "./observers/settings";
import Notification from "./observers/notification";
import { ReactionOpener } from "./observers/reaction";
import { ChatOpener, Chat } from "./observers/chat";
import { StatsOpener, Stats } from "./observers/stats";
import { ExitOpener } from "./observers/exit";
import PinnedStream from "./observers/pinned-stream";
import LocalStream from "./observers/local-stream";
import RecognitionEffect from "./observers/recognition";
import RemoteStreams from "./observers/remote-streams";
import Layout from "./components/layout";
import ErrorDetail from "./components/error-detail";
import Main from "./components/main";
import LeftBottom from "./components/left-bottom";
import RightMenu from "./components/right-menu";
import LeftTop from "./components/left-top";
import Bottom from "./components/bottom";
import { Subtitle } from "./observers/subtitle";

interface State {
  err: Error | null;
}
class App extends React.Component<{}, State> {
  constructor(props: {}, state: State) {
    super(props, state);
    this.state = { err: null };
  }

  render() {
    if (this.state.err !== null) {
      return (
        <Layout>
          <ErrorDetail error={this.state.err} />
        </Layout>
      );
    }

    return (
      <Layout>
        <Bootstrap>
          {/* Base Layer */}
          <Main>
            <PinnedStream />
          </Main>
          <LeftTop>
            <RecognitionEffect />
          </LeftTop>
          <LeftBottom>
            <LocalStream />
          </LeftBottom>
          <Bottom>
            <Subtitle />
          </Bottom>
          <RightMenu
            openers={[
              <ChatOpener key="chat" />,
              <ReactionOpener key="reaction" />,
              <StatsOpener key="stats" />,
              <ExitOpener key="exit" />,
            ]}
          >
            <RemoteStreams />
          </RightMenu>

          {/* Modal Layer */}
          <Settings />
          <Chat />
          <Stats />
          <Notification />
        </Bootstrap>
      </Layout>
    );
  }

  componentDidCatch(err: Error) {
    this.setState({ err });
  }
}

export default App;
