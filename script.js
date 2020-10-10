const task_text = document.getElementById('task-text');
const logs_container = document.getElementById('logs-container');
const warning_container = document.getElementById('warning');
const average_container = document.getElementById('average');
const emotion_container = document.getElementById('emotion');


const NUMBER = 2;
const BUTTONS_COUNT = 5;
const PENALTY = 5;
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const buttonsArr = [btn1, btn2, btn3, btn4, btn5];
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
    generatedNumbers[randomIn(0, BUTTONS_COUNT - 1)] = answer;
    for (let i = 0; i < BUTTONS_COUNT; i++) {
        if (!generatedNumbers[i]) {
            let newNumber = randomIn(0, 10);
            while (newNumber == answer) {
                newNumber = randomIn(0, 10);
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
        result = true;
        streak++;
        p.innerHTML = `[${currentRound + 1}] - ${currentSeconds} секунд - Правильно!`;
        p.style.color = 'green';
    } else {
        result = false;
        streak = 0;
        secondsSum += PENALTY;
        p.innerHTML = `[${currentRound + 1}] - ${currentSeconds} секунд - Неверно!`;
        p.style.color = 'red';
    }
    logs_container.appendChild(p);
    averageTime = secondsSum / rounds;
    average_container.innerText = `среднее время: ${averageTime.toFixed(2)}`;
    if (streak >= 10) {
        emotion_container.src = './morgana.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 7) {
        emotion_container.src = './luna.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 5) {
        emotion_container.src = './kitten.png';
        emotion_container.style.display = 'block';
    } else if (streak >= 3) {
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