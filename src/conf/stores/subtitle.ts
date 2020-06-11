import { decorate, observable } from "mobx";

class SubtitleStore {
  isAudioTrackMuted: boolean;

  constructor() {
    this.isAudioTrackMuted = false;
  }

  toggleMuted() {
    this.isAudioTrackMuted = !this.isAudioTrackMuted;
  }
}

// @ts-ignore: to use private accessor
decorate(SubtitleStore, {
  isAudioTrackMuted: observable,
});

export default SubtitleStore;
