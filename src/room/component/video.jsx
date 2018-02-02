import React from 'react';
import { observer } from 'mobx-react';

class Video extends React.Component {
  constructor() {
    super();

    this._ref = null;
  }

  render() {
    // touch it for mobx
    this.props.peer.stream;
    return (
      <video
        className="Video"
        ref={ref => {
          this._ref = ref;
        }}
        muted={this.props.muted}
        autoPlay
      />
    );
  }

  componentWillReact() {
    this._ref.srcObject = this.props.peer.stream;
  }
}

export default observer(Video);
