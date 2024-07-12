import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-tashizan1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tashizan1.component.html',
  styleUrls: ['./tashizan1.component.scss']
})
export class Tashizan1Component implements OnInit {

  // 生成する問題文の数字
  num1: number = 0;
  num2: number = 0;

  // 前回の問題文の数字
  prevNum1: number = 0;
  prevNum2: number = 0;

  // ボタンを押したときの数字
  buttonText: number | null = null;

  // 結果メッセージ
  resultMessage: string = '';

  // 正解メッセージ
  correctText: string = '';

  // 正解した数字
  correctNum: number | null = null;

  // 「つぎのもんだい」ボタンを表示するかどうか
  showNextButton: boolean = false;

  // ボタンに表示する数字
  buttons: number[] = [0, 1, 2, 3, 4, 5];

  // 音声ファイルの設定
  correctAudio = 'sounds/correct.mp3';
  incorrectAudio = 'sounds/incorrect.mp3';
  startAudio = 'sounds/start.mp3';

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {
    this.displayProblem();
  }

  // 音を再生する関数
  playSound(src: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const audio = new Audio(src);
      audio.play();
    }
  }

  // 数字を生成する関数
  generateNumbers(): void {
    this.num1 = Math.floor(Math.random() * 6);
    this.num2 = Math.floor(Math.random() * 6);
  }

  // 問題文を表示する関数
  displayProblem(): void {
    // スタート音を再生
    this.playSound(this.startAudio);

    // 問題文を生成
    this.generateNumbers();

    // 同じ問題文や、合計が5を超える場合は再生成
    while ((this.num1 === this.prevNum1 && this.num2 === this.prevNum2) || this.num1 + this.num2 > 5) {
      this.generateNumbers();
    }

    // 前回の問題文を更新
    this.prevNum1 = this.num1;
    this.prevNum2 = this.num2;
  }

  // ボタンクリック時の処理
  onButtonClick(button: number): void {
    this.buttonText = button;
    this.checkAnswer();
  }

  // 答えをチェックする関数
  checkAnswer(): void {
    const correctAnswer = this.num1 + this.num2;

    // 正解の場合
    if (this.buttonText === correctAnswer) {
      this.resultMessage = 'せいかい！よくできました 🎉';
      this.playSound(this.correctAudio);
      this.showNextButton = true;
    } else {
      // 不正解の場合
      this.resultMessage = 'ざんねん 😢';
      this.correctText = 'せいかいは、';
      this.correctNum = correctAnswer;
      this.playSound(this.incorrectAudio);
      this.showNextButton = true;
    }
  }

  // 次の問題を表示する関数
  nextProblem(): void {
    this.resultMessage = '';
    this.correctText = '';
    this.correctNum = null;
    this.showNextButton = false;
    this.displayProblem();
  }
}
