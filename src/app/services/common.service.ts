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

  // 数字を生成する共通関数
  generateNumbers(maxValue: number): { num1: number, num2: number } {
    const num1 = Math.floor(Math.random() * (maxValue - 1));
    const num2 = Math.floor(Math.random() * (maxValue - 1));
    return { num1, num2 };
  }

  // 答えをチェックする共通関数
  checkAnswer(
    num1: number, num2: number, userAnswer: number, isAddition: boolean,
    correctCount: number, total: number, count: number
  ): { isCorrect: boolean, correctAnswer: number, resultMessage: string, finalText: string | null, updatedCorrectCount: number } {
    const correctAnswer = isAddition ? num1 + num2 : num1 - num2;
    let resultMessage = '';
    let finalText: string | null = null;
    let updatedCorrectCount = correctCount;

    if (userAnswer === correctAnswer) {
      this.playSound(this.correctAudio);
      resultMessage = 'せいかい！よくできました 🎉';
      updatedCorrectCount++;
    } else {
      this.playSound(this.incorrectAudio);
      resultMessage = `ざんねん 😢`;
    }

    // 最終問題の場合、点数表示
    if (count === total) {
      const totalPoint = (updatedCorrectCount / total) * 100;
      finalText = `あなたのてんすうは、${totalPoint}てん 🎉`;
    }

    return { isCorrect: userAnswer === correctAnswer, correctAnswer, resultMessage, finalText, updatedCorrectCount };
  }

  // 問題文が有効かどうか確認する共通関数
  isProblemValid(num1: number, num2: number, prevNum1: number, prevNum2: number, isAddition: boolean, maxSum: number): boolean {

    // 足し算か引き算か判定
    const sum = isAddition ? num1 + num2 : num1 - num2;

    // 前回と同じ問題でない、かつ 答えがプラス かつ 答えが最大値以下なら有効
    return !(num1 === prevNum1 && num2 === prevNum2) && sum >= 0 && sum <= maxSum;
  }

  /*=====================================================================
  # 道場用
  ==================================================================== */
  // 配列をシャッフルする関数
  shuffle(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
