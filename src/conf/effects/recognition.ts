/* eslint-disable no-undef */
export class RecognitionEffect {
  recognition: SpeechRecognition = new (window as any).webkitSpeechRecognition();
  running = false;

  onFinal?: (str: string) => void;

  constructor() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          console.log("final", event.results[i][0].transcript);
          if (this.onFinal) this.onFinal(event.results[i][0].transcript);
        } else {
          console.log(event.results[i][0].transcript);
        }
      }
    };
  }

  start() {
    this.running = true;
    this.recognition.start();
  }

  stop() {
    this.running = false;
    this.recognition.stop();
  }

  toggle() {
    if (this.running) {
      this.stop();
    } else {
      this.start();
    }
  }
}
