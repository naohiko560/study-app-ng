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

  // 答えが10以下の組み合わせをシャッフルした配列
  comboShuffle: any;

  // 現在の問題のインデックス
  index: number = 0;

  // ゲーム開始時間
  startTime: Date | null = null;

  // 経過時間
  elapsedTime: number = 0;

  // 生成する問題文の数字
  num1: number = 0;
  num2: number = 0;

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

  // 問題数を設定（答えが10以下になる組み合わせ）
  total: number = 0;

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

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.resetGame();
  }

  // ゲームをリセットする関数
  resetGame(): void {
    this.index = 0;
    this.startTime = null;
    this.elapsedTime = 0;
    this.count = 1;
    this.correctCount = 0;
    this.finalText = null;
    this.comboShuffle = this.generateAllCombinations();
    this.comboShuffle = this.commonService.shuffle(this.comboShuffle);
    this.total = 31;
    this.displayProblem();
  }

  // 答えが10以下になる全ての組み合わせを生成する関数
  generateAllCombinations(): number[][] {
    const firstNum = Array.from({ length: 11 }, (_, i) => i);
    const secondNum = Array.from({ length: 11 }, (_, i) => i);

    const combo: number[][] = [];

    for (const valA of firstNum) {
      for (const valB of secondNum) {
        if (valA + valB <= 10) {
          combo.push([valA, valB]);
        }
      }
    }

    return combo;
  }

  // 問題文を表示する関数
  displayProblem(): void {
    this.selectedButtonIndex = null;
    this.isClicked = false;
    this.totalText = `もんだいすう ${this.count} / ${this.total}`;

    if (this.index === 0 && !this.startTime) {
      this.startTime = new Date(); // スタート時間を記録
    }

    if (this.index < this.comboShuffle.length) {
      [this.num1, this.num2] = this.comboShuffle[this.index];
    }
  }

  // ボタンクリック時の処理
  onButtonClick(button: number, index: number): void {
    this.selectedButtonIndex = index;
    this.isClicked = true;
    this.buttonText = button;
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
      this.calculateElapsedTime(); // 時間計測
      this.finalText = finalText;
      this.finalText += ` 経過時間: ${this.elapsedTime}秒`;
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
    this.index++;

    // 問題文の表示
    this.displayProblem();
  }

  // 新しい問題を表示する関数
  newProblem(): void {
    this.resetGame();
  }

  // 経過時間を計算する関数
  calculateElapsedTime(): void {
    if (this.startTime) {
      const currentTime = new Date();
      this.elapsedTime = Math.floor((currentTime.getTime() - this.startTime.getTime()) / 1000);
    }
  }
}

