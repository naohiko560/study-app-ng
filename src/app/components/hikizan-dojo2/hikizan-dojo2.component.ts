import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-hikizan-dojo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hikizan-dojo2.component.html',
  styleUrl: './hikizan-dojo2.component.scss'
})

export class HikizanDojo2Component implements OnInit {

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
  showNextButton: boolean = true;

  // 「もういちどちょうせん」ボタンを表示するかどうか
  showNewButton: boolean = false;

  // 解いた問題数
  count: number = 1;

  // 正解した数
  correctCount: number = 0;

  // 全問題数の表示
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

  // 時間測定用
  startTime: any = null;
  clickCount = 0;
  finalTime: string = '';
  showFinalTime: boolean = false;

  // 問題リスト
  problemList: { num1: number, num2: number }[] = [];

  // 現在の問題のインデックス
  currentProblemIndex: number = 0;

  // 左辺・右辺の数を設定
  LRNum: number = 10;
  // LRNum: number = 2;

  // 答えの表示
  showCorrect: boolean = false;

  showAnswerButton: boolean = false;

  showProblem: boolean = true;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.generateProblemList();  // 全ての可能な問題を生成
    this.shuffleProblemList();   // リストをシャッフル
    this.total = this.problemList.length;  // 問題数を設定
    this.displayProblem();  // 最初の問題を表示
  }

  // すべての可能な問題の組み合わせを生成
  generateProblemList(): void {
    for (let i = 0; i <= this.LRNum; i++) {
      for (let j = 0; j <= this.LRNum; j++) {
        // 問題文や答えの条件を追加
        if (i - j <= 10 && i !== 0 && j !== 0 && 0 <= i - j && j !== 10) {
          this.problemList.push({ num1: i, num2: j });
        }
      }
    }
  }

  // 問題リストをシャッフル
  shuffleProblemList(): void {
    for (let i = this.problemList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.problemList[i], this.problemList[j]] = [this.problemList[j], this.problemList[i]];
    }
  }

  // 問題文を表示
  displayProblem(): void {
    if (this.clickCount !== this.problemList.length) {
      this.commonService.playSound(this.commonService.startAudio);
    }
    this.selectedButtonIndex = null;
    this.isClicked = false;
    this.totalText = `もんだいすう ${this.count} / ${this.total}`;

    if (this.currentProblemIndex < this.problemList.length) {
      const currentProblem = this.problemList[this.currentProblemIndex];
      this.num1 = currentProblem.num1;
      this.num2 = currentProblem.num2;
      this.prevNum1 = this.num1;
      this.prevNum2 = this.num2;
    }
  }

  // ボタンクリック時の処理
  onButtonClick(): void {
    this.isClicked = true;

    // 時間測定を開始する
    if (this.startTime === null) {
      // 最初のクリックの場合、開始時間を設定
      this.startTime = new Date();
    }

    this.clickCount++;

    if (this.clickCount <= this.problemList.length) {
      // クリック回数が規定数以下の場合、秒数を測定
      const currentTime: any = new Date();
      const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;

      if (this.clickCount === this.problemList.length) {
        if (minutes > 0) {
          this.finalTime = `${minutes}ふん${seconds}びょう`
        } else {
          this.finalTime = `${seconds}びょう`
        }
        this.showFinalTime = true;
        this.showAnswerButton = false;
        this.showNewButton = true;
        this.commonService.playSound(this.commonService.finalAudio);
      }
    }

    if (this.count <= this.total) {
      this.showNextButton = true;
    } else {
      // this.finalText = finalText;
      this.showNewButton = true;
      this.showNextButton = false;
    }

    this.correctNum = this.num1 - this.num2;
    this.showCorrect = true;
    if ((this.clickCount < this.problemList.length)) {
      this.showAnswerButton = true;
    }
    this.showNextButton = false;
    this.showProblem = false;
    // this.checkAnswer();
  }

  answerProblem() {
    this.showAnswerButton = false;
    this.showNextButton = true;
    this.showCorrect = false;
    this.showProblem = true;
  }

  // 答えをチェックする関数
  // checkAnswer(): void {
  //   const { isCorrect, correctAnswer, resultMessage, finalText, updatedCorrectCount } =
  //     this.commonService.checkAnswer(this.num1, this.num2, this.buttonText!, true, this.correctCount, this.total, this.count);

  //   this.resultMessage = resultMessage;
  //   this.correctText = !isCorrect ? 'せいかいは、' : '';
  //   this.correctNum = !isCorrect ? correctAnswer : null;
  //   this.correctCount = updatedCorrectCount;

  //   if (this.count < this.total) {
  //     this.showNextButton = true;
  //   } else {
  //     this.finalText = finalText;
  //     this.showNewButton = true;
  //   }
  // }

  // 次の問題を表示する関数
  nextProblem(): void {
    this.resultMessage = '';
    this.correctText = '';
    this.correctNum = null;
    this.showNextButton = true;

    if (this.count < this.problemList.length) {
      this.count++;
    }
    this.currentProblemIndex++;

    this.onButtonClick()
    this.displayProblem();
  }

  // 新しい問題を表示する関数
  newProblem(): void {
    this.resultMessage = '';
    this.correctText = '';
    this.correctNum = null;
    this.showNewButton = false;
    this.showNextButton = true;

    // 問題数のリセット
    this.finalText = '';
    this.count = 1;
    this.correctCount = 0;

    // 測定時間のリセット
    this.startTime = null;
    this.clickCount = 0;
    this.finalTime = '';
    this.showFinalTime = false;

    // 問題文のリセット
    this.currentProblemIndex = 0;
    this.shuffleProblemList();

    // 問題文の表示
    this.showProblem = true;
    this.showCorrect = false;
    this.displayProblem();
  }
}
