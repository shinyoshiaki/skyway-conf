/* eslint-disable no-undef */
export class RecognitionEffect {
  recognition: SpeechRecognition = new (window as any).webkitSpeechRecognition();
  running = false;

  onFinal?: (str: string) => void;
  onProgress?: (str: string) => void;
  onError?: () => void;

  constructor() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          if (this.onFinal) this.onFinal(event.results[i][0].transcript);
          this.recognition.start();
        } else {
          // eslint-disable-next-line no-lonely-if
          if (this.onProgress) this.onProgress(event.results[i][0].transcript);
        }
      }
    };

    this.recognition.onerror = (event) => {
      console.warn(event);
      if (this.onError) this.onError();
    };

    this.start();
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
