import React from 'react';

class Video extends React.Component {
  constructor() {
    super();
    this._ref = null;
  }

  render() {
    return (
      <div className="Video">
        <video
          className="Video_Content"
          ref={ref => {
            this._ref = ref;
          }}
          muted={this.props.muted}
          autoPlay
        />
      </div>
    );
  }

  // for adding stream(e.g. someone joins room)
  componentDidMount() {
    if (this._ref && this.props.stream instanceof MediaStream) {
      this._ref.srcObject = this.props.stream;
    }
  }

  // for updating stream(e.g. gUM() 1st time, change devices)
  componentDidUpdate() {
    if (this._ref && this.props.stream instanceof MediaStream) {
      this._ref.srcObject = this.props.stream;
    }
  }
}

export default Video;