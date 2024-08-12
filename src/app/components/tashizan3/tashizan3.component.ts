import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-tashizan3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tashizan3.component.html',
  styleUrls: ['./tashizan3.component.scss']
})
export class Tashizan3Component implements OnInit {

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
  buttons: number[] = Array.from({ length: 8 }, (_, i) => i + 11);

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
      const { num1, num2 } = this.commonService.generateNumbers(20);
      this.num1 = num1;
      this.num2 = num2;
      validProblem = this.isProblemValid(this.num1, this.num2, this.prevNum1, this.prevNum2);
    }

    this.prevNum1 = this.num1;
    this.prevNum2 = this.num2;
  }

  // 問題文が有効かどうか確認する関数
  isProblemValid(num1: number, num2: number, prevNum1: number, prevNum2: number): boolean {
    const sum = num1 + num2;

    // 前回と同じ問題でない かつ 答えが11以上 かつ 18以下なら有効
    return !(num1 === prevNum1 && num2 === prevNum2) && 11 <= sum && sum <= 18;
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

    // 問題文の表示
    this.displayProblem();
  }
}
