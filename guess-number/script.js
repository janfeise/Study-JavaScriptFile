'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;

// score
let score = 20;

// highscore
let highscore = 0;

// 获取message DOM
const messageElement = document.querySelector('.message');

// 获取score DOM
const scoreElement = document.querySelectorAll('.score');

// 获取number DOM
const numberElement = document.querySelector('.number');

// 获取guess DOM
const guessElement = document.querySelector('.guess');

// 获取highscore DOM
const highscoreElement = document.querySelectorAll('.highscore');

// 获取弹窗DOM
const popElement = document.querySelector('.pop');

// 获取弹窗icon DOM
const popIconElement = document.querySelector('.pop__icon');

// 获取body DOM
const bodyElement = document.querySelector('body');

// 获取gameover-text DOM
const gameoverTextElement = document.querySelector('.gameover-text');

// // 测试
// numberElement.textContent = secretNumber;

const checkElement = document
  .querySelector('.check')
  .addEventListener('click', () => {
    const guessNumber = Number(guessElement.value); // input框

    if (Boolean(guessNumber) === false) {
      // 处理当用户没有输入数字时，点击check按钮的事件
      messageElement.textContent = '❌ Input Number!';

      if (score <= 1) {
        score = 0;
        scoreElement.forEach(element => {
          element.textContent = score;
        });

        // 分数为0，游戏结束，弹窗显示
        guessElement.disabled = true;
        // 弹窗显示正确
        popDisplay({ title: 'UNLUCKY', popIcon: '💥' });
      } else {
        // score分数减一
        --score;
        scoreElement.forEach(element => {
          element.textContent = score;
        });
      }
    } else if (guessNumber === secretNumber) {
      // 设置 highscore
      if (score > highscore) {
        highscore = score;
        highscoreElement.forEach(element => {
          element.textContent = score;
        });
      }

      // 设置score
      scoreElement.forEach(element => {
        element.textContent = score;
      });

      // 弹窗显示正确
      let title = '';
      if (score === 20) {
        title = 'PERFECT';
      } else if (score >= 18) {
        title = 'BRILLIANT';
      } else if (score >= 15) {
        title = 'EXCELLENT';
      } else {
        title = 'Guess Correct';
      }
      popDisplay({ title: title });

      // 用户所猜测数字正确
      guessElement.disabled = true;
      numberElement.textContent = secretNumber;
      messageElement.textContent = '✅ Guess Right!!!';

      // 改变背景颜色
      bodyElement.style.backgroundColor = '#60b347';

      // number边框变大
      numberElement.style.width = '30rem';
    } else if (guessNumber > secretNumber) {
      if (score > 1) {
        // 猜测数字过大
        messageElement.textContent = '📈 Too Height!';

        // score分数减一
        --score;
        // 设置score
        scoreElement.forEach(element => {
          element.textContent = score;
        });
      } else {
        lostTheGame();
      }
    } else if (guessNumber < secretNumber) {
      if (score > 1) {
        // 猜测数字过大
        messageElement.textContent = '📉 Too Low!';

        // score分数减一
        --score;
        // 设置score
        scoreElement.forEach(element => {
          element.textContent = score;
        });
      } else {
        lostTheGame();
      }
    }
  });

/**
 * 当用户点击again按钮时：
 * 相同之处：
 * 1. secretNumber重置--备注：最后重置，不然上一次的secretNumber会被覆盖
 * 2. message提示信息置为：Start guessing...
 * 3. score置为20
 * 4. 输入框的数字置为空
 * 不同之处：
 *  - 如果数字猜测正确，则
 *        - 背景颜色还原为默认的颜色
 *        - 隐藏数字
 */
const againElement = document
  .querySelector('.btn.again')
  .addEventListener('click', () => {
    againGame();

    // // 测试
    // numberElement.textContent = secretNumber;
  });

const popAgainElement = document
  .querySelector('.pop__again')
  .addEventListener('click', () => {
    // 隐藏弹窗
    popDisplay({ display: false });

    againGame();

    // // 测试
    // numberElement.textContent = secretNumber;
  });

/**
 * 当用户点击：弹窗的cancel按钮时
 *
 * 1. 关闭弹窗
 */
const cancelElement = document
  .querySelector('.pop__cancel')
  .addEventListener('click', () => {
    popDisplay({ display: false });
  });

/**
 * 点击again按钮时触发的事件
 */
const againGame = () => {
  guessElement.disabled = false;
  // 不同之处：数字猜测正确
  const guessNumber = Number(guessElement.value);
  if (guessNumber === secretNumber) {
    bodyElement.style.backgroundColor = '#222';
    numberElement.textContent = '?';
  }

  // 1. secretNumber重置--备注：最后重置，不然上一次的secretNumber会被覆盖
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // 2. message提示信息置为：Start guessing...
  messageElement.textContent = 'Start guessing...';

  // 3. score置为20
  score = 20;
  // 设置score
  scoreElement.forEach(element => {
    element.textContent = score;
  });

  // 4. 输入框的数字置为空
  guessElement.value = '';
};

/**
 * 弹窗显示与隐藏
 *
 * 默认显示弹窗
 */
const popDisplay = ({ display = true, title = '', popIcon = '🎉' }) => {
  popElement.style.opacity = display === true ? '1' : '0';
  popElement.style.visibility = display === true ? 'visible' : 'hidden';
  popIconElement.textContent = popIcon;

  if (title) {
    gameoverTextElement.textContent = title;
  }
};

/**
 * 游戏失败
 */
const lostTheGame = () => {
  guessElement.disabled = true;
  messageElement.textContent = '💥 You lost the game!';

  // score置为0
  score = 0;
  scoreElement.forEach(element => {
    element.textContent = score;
  });

  // 分数为0，游戏结束，弹窗显示
  // 弹窗显示正确
  popDisplay({ title: 'UNLUCKY', popIcon: '💥' });
};
