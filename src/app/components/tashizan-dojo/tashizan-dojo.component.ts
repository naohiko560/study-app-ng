import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-tashizan-dojo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tashizan-dojo.component.html',
  styleUrl: './tashizan-dojo.component.scss'
})

export class TashizanDojoComponent implements OnInit {


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

  // 「もういちどちょうせん」ボタンを表示するかどうか
  showNewButton: boolean = false;

  // 解いた問題数
  count: number = 1;

  // 正解した数
  correctCount: number = 0;

  // 問題数を設定
  total: number = 5;

  // 問題数の表示
  totalText: string | number = `もんだいすう ${this.count} / ${this.total}`;

  // 選択されたボタンの色変更用
  selectedButtonIndex: number | null = null;

  // ボタンの有効無効を制御（押したかどうか）
  isClicked = false;

  // 最終結果表示
  finalText: string | null = '';

  // ボタンに表示する数字
  buttons: number[] = Array.from({ length: 11 }, (_, i) => i);

  // 時間測定用
  startTime: any = null;
  clickCount = 0;
  finalTime: string = '';
  showFinalTime: boolean = false;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.displayProblem();
  }

  // 問題文を表示する関数
  displayProblem(): void {
    this.commonService.playSound(this.commonService.startAudio);
    this.selectedButtonIndex = null;
    this.isClicked = false;
    this.totalText = `もんだいすう ${this.count} / ${this.total}`;

    // 問題生成
    let validProblem = false;
    while (!validProblem) {
      const { num1, num2 } = this.commonService.generateNumbers(10);
      this.num1 = num1;
      this.num2 = num2;
      validProblem = this.commonService.isProblemValid(this.num1, this.num2, this.prevNum1, this.prevNum2, true, 10);
    }

    this.prevNum1 = this.num1;
    this.prevNum2 = this.num2;
  }

  // ボタンクリック時の処理
  onButtonClick(button: number, index: number): void {
    this.selectedButtonIndex = index;
    this.isClicked = true;
    this.buttonText = button;

    // 時間測定を開始する
    if (this.startTime === null) {
      // 最初のクリックの場合、開始時間を設定
      this.startTime = new Date();
    }
    this.clickCount++;

    if (this.clickCount <= 5) {
      // クリック回数が36回以下の場合、秒数を測定
      const currentTime: any = new Date();
      const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;

      if (this.clickCount === 5) {
        if (minutes > 0) {
          this.finalTime = `かかったじかん: ${minutes}ふん${seconds}びょう`
        } else {
          this.finalTime = `かかったじかん: ${seconds}びょう`
        }
        this.showFinalTime = true;
      }
    }

    this.checkAnswer();
  }

  // 答えをチェックする関数
  checkAnswer(): void {
    const { isCorrect, correctAnswer, resultMessage, finalText, updatedCorrectCount } =
      this.commonService.checkAnswer(this.num1, this.num2, this.buttonText!, true, this.correctCount, this.total, this.count);

    this.resultMessage = resultMessage;
    this.correctText = !isCorrect ? 'せいかいは、' : '';
    this.correctNum = !isCorrect ? correctAnswer : null;
    this.correctCount = updatedCorrectCount;

    if (this.count < this.total) {
      this.showNextButton = true;
    } else {
      this.finalText = finalText;
      this.showNewButton = true;
    }
  }

  // 次の問題を表示する関数
  nextProblem(): void {
    this.resultMessage = '';
    this.correctText = '';
    this.correctNum = null;
    this.showNextButton = false;

    // 出題数のカウント
    this.count++;

    // 問題文の表示
    this.displayProblem();
  }

  // 新しい問題を表示する関数
  newProblem(): void {
    this.resultMessage = '';
    this.correctText = '';
    this.correctNum = null;
    this.showNewButton = false;

    // 問題数のリセット
    this.finalText = '';
    this.count = 1;
    this.correctCount = 0;

    // 測定時間のリセット
    this.startTime = null;
    this.clickCount = 0;
    this.finalTime = '';
    this.showFinalTime = false;

    // 問題文の表示
    this.displayProblem();
  }
}
