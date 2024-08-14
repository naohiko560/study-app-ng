/* ランダムに表示
------------------------------------------------------------*/
// 配列をシャッフルする関数
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i
    ], array[j
    ]
    ] = [array[j
    ], array[i
    ]
      ];
  }
  return array;
}

const firstNum = Array.from({
  length: 6
}, (_, i) => i);
const secondNum = Array.from({
  length: 6
}, (_, i) => i);

const combo = firstNum.reduce((acc, valA) => {
  return acc.concat(secondNum.map((valB) => [valA, valB
  ]));
},
  []);

// ランダムにシャッフルする
let comboShuffle = shuffle(combo);

let index = 0; // インデックスを保持する変数

function printCombinations() {
  if (index < comboShuffle.length) {
    const firstNum = comboShuffle[index][0];
    const secondNum = comboShuffle[index][1];
    console.log(firstNum + secondNum);
    index++;
  }
}
// 時間測定用
let startTime = null;
let clickCount = 0;

// ボタンのクリックイベントに対応する関数を定義する
calButtonClick = () => {
  printCombinations();

  // 時間測定を開始する
  if (startTime === null) {
    // 最初のクリックの場合、開始時間を設定
    startTime = new Date();
  }

  clickCount++;

  if (clickCount <= comboShuffle.length) {
    // クリック回数が36回以下の場合、秒数を測定
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);

    if (clickCount === comboShuffle.length) {
      console.log(`クリック回数: ${clickCount
        }, 経過時間: ${elapsedTime
        }秒`);
    }
  }
};

// リセットボタンを作る
resetButton = () => {
  index = 0; // インデックスをリセット
  startTime = null; // 開始時間をリセット
  clickCount = 0; // クリック回数をリセット
  comboShuffle = shuffle(combo);
  console.log("リセットしました");
};