const task_text = document.getElementById('task-text');
const logs_container = document.getElementById('logs-container');
const warning_container = document.getElementById('warning');
const average_container = document.getElementById('average');
const emotion_container = document.getElementById('emotion');


const NUMBER = Math.abs(+prompt("Какую таблицу тренировать?")) || 2;
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
    currentNumber = randomIn(0, 10);
    task_text.innerText = `${currentNumber} + ${NUMBER}`;
    answer = currentNumber + NUMBER;
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
        if (!generatedNumbers[i]) {
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
    console.log(e.target.innerText);
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
    if (streak >= 10) {
        if (character != 'morgana' && HEROES_SOUNDS) {
            morganaSound.play();
            character = 'morgana';
        }
        emotion_container.src = './morgana.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 7 && HEROES_SOUNDS) {
        emotion_container.src = './luna.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 5 && HEROES_SOUNDS) {
        if (character != 'kitten') {
            kittenSound.play();
            character = 'kitten';
        }
        emotion_container.src = './kitten.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 3 && HEROES_SOUNDS) {
        if (character != 'rainbow') {
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
    } else {
        warning_container.style.color = 'red';
        warning_container.innerText = 'НЕВЕРНО'
    }

    run();
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
