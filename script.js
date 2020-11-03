const task_text = document.getElementById('task-text');
const logs_container = document.getElementById('logs-container');
const warning_container = document.getElementById('warning');
const average_container = document.getElementById('average');
const emotion_container = document.getElementById('emotion');


const NUMBER = +prompt("Какую таблицу тренировать?") || 2;
const ANSWERS_SOUNDS = confirm("Включить звуки ответов??");
const HEROES_SOUNDS = confirm("Включить звуки героев?");
const BUTTONS_COUNT = 5;
const PENALTY = 5;
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const buttonsArr = [btn1, btn2, btn3, btn4, btn5];
const rightSound = new Audio('./right.mp3');
const wrongSound = new Audio('./wrong.mp3');
const rainbow_dashSound = new Audio('./rainbow_dash.mp3');
const kittenSound = new Audio('./kitten.mp3');
const morganaSound = new Audio('./morgana.mp3');
const jokerSound = new Audio('./joker.mp3');
const annSound = new Audio('./ann.mp3');
const ryujiSound = new Audio('./ryuji.mp3');
const yusukeSound = new Audio('./yusuke.mp3');

let character;

let currentNumber = 0
let answer = 0;
let generatedNumbers = [];
let startTime, endTime;
let averageTime = 0;
let secondsSum = 0;
let rounds = 0;
let streak = 0;

function run() {
    generatedNumbers = [null, null, null, null, null];
    if (NUMBER > 0) {
        currentNumber = randomIn(0, 10);
        task_text.innerText = `${currentNumber} + ${NUMBER}`;
    } else {
        currentNumber = randomIn(0 + Math.abs(NUMBER), 10 + Math.abs(NUMBER));
        task_text.innerText = `${currentNumber} - ${Math.abs(NUMBER)}`;
    }
    answer = currentNumber + NUMBER;
    console.log(answer);
    generateButtons(answer);
    startTimer();
}

function randomIn(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

function generateButtons(answer) {
    const cap = answer + 5 <= 20 ? answer + 5 : 20;
    generatedNumbers[randomIn(0, BUTTONS_COUNT - 1)] = answer;
    for (let i = 0; i < BUTTONS_COUNT; i++) {
        if (generatedNumbers[i] == null) {
            let newNumber = randomIn(0, cap);
            while (newNumber == answer) {
                newNumber = randomIn(0, cap);
            }
            generatedNumbers[i] = newNumber;
        }
    }
    for (let i = 0; i < BUTTONS_COUNT; i++) {
        buttonsArr[i].innerText = generatedNumbers[i];
    }
}

function check(e) {
    let result;
    const currentRound = rounds;
    let currentSeconds = endTimer();
    secondsSum += currentSeconds;
    rounds++;
    let p = document.createElement('p');
    if (+e.target.innerText == +answer) {
        ANSWERS_SOUNDS ? rightSound.play() : null;
        result = true;
        streak++;
        p.innerHTML = `[${currentRound + 1}] - (${task_text.innerText} = ${e.target.innerText}) ${currentSeconds} секунд - Правильно!`;
        p.style.color = 'green';
    } else {
        ANSWERS_SOUNDS ? wrongSound.play() : null;
        result = false;
        streak = 0;
        secondsSum += PENALTY;
        p.innerHTML = `[${currentRound + 1}] - (${task_text.innerText} = ${e.target.innerText}) ${currentSeconds} секунд - Неверно!`;
        p.style.color = 'red';
    }
    logs_container.insertBefore(p, logs_container.firstChild);
    averageTime = secondsSum / rounds;
    average_container.innerText = `среднее время: ${averageTime.toFixed(2)}`;
    if (streak >= 30) {
        if (character != 'yusuke') {
            if (HEROES_SOUNDS)
                yusukeSound.play();
            character = 'yusuke';
        }
        emotion_container.src = './yusuke.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 25) {
        if (character != 'ryuji') {
            if (HEROES_SOUNDS)
                ryujiSound.play();
            character = 'ryuji';
        }
        emotion_container.src = './ryuji.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 20) {
        if (character != 'ann') {
            if (HEROES_SOUNDS)
                annSound.play();
            character = 'ann';
        }
        emotion_container.src = './ann.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 15) {
        if (character != 'joker') {
            if (HEROES_SOUNDS)
                jokerSound.play();
            character = 'joker';
        }
        emotion_container.src = './joker.png';
        emotion_container.style.display = 'block';
    }else if (streak >= 10) {
        if (character != 'morgana') {
            if (HEROES_SOUNDS)
                morganaSound.play();
            character = 'morgana';
        }
        emotion_container.src = './morgana.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 7) {
        emotion_container.src = './luna.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 5) {
        if (character != 'kitten') {
            if (HEROES_SOUNDS)
                kittenSound.play();
            character = 'kitten';
        }
        emotion_container.src = './kitten.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 3) {
        if (character != 'rainbow') {
            if (HEROES_SOUNDS)
                rainbow_dashSound.play();
            character = 'rainbow';
        }
        emotion_container.src = './rainbow_dash.png';
        emotion_container.style.display = 'block';
    } else {
        emotion_container.style.display = 'none';
    }
    if (result) {
        warning_container.style.color = 'green';
        warning_container.innerText = 'ПРАВИЛЬНО'
        run();

    } else {
        warning_container.style.color = 'red';
        warning_container.innerText = 'НЕВЕРНО'
    }

}

function startTimer() {
    startTime = new Date();
};

function endTimer() {
    endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff);
    return seconds;
}


function setListeners(btnArr) {
    for (let i = 0; i < btnArr.length; i++) {
        btnArr[i].onclick = check;
    }
}
setListeners(buttonsArr);
run();
