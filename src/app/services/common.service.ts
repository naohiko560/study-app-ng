import { Inject, PLATFORM_ID, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // 音声ファイルの設定
  correctAudio = 'sounds/correct.mp3';
  incorrectAudio = 'sounds/incorrect.mp3';
  startAudio = 'sounds/start.mp3';

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  // 音を再生する関数
  playSound(src: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const audio = new Audio(src);
      audio.play();
    }
  }
}
