"use strict"

let questions = [
    {
        question: "Wer kann vielleicht schwimmen, aber nicht fliegen?",
        answer_1: "Stockenten",
        answer_2: "Pfeifenten",
        answer_3: "Krickenten",
        answer_4: "Studenten",
        right_answer: 4,
    },
    {
        question: "Wobei handelt es sich um ein beliebtes Getränk an kalten Tagen?",
        answer_1: "call me strawberry",
        answer_2: "heiße Zitrone",
        answer_3: "nennt mich Kirsche",
        answer_4: "bin die Banane",
        right_answer: 2,
    },
    {
        question: "Was bedeuten die Zahlen 0 und 1 in der Programmiersprache?",
        answer_1: "rechts/links",
        answer_2: "oben/unten",
        answer_3: "wahr/falsch",
        answer_4: "vorne/hinten",
        right_answer: 3,
    },
    {
        question: "Wofür steht die Abkürzung HTML?",
        answer_1: "Hypertext Message Language",
        answer_2: "Hypertext Markup Language",
        answer_3: "Hypertext Meta Language",
        answer_4: "Hypertext Model Language",
        right_answer: 2,
    },
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_FAIL = new Audio('./audio/fail.mp3')
let AUDIO_SUCCESS = new Audio('./audio/success.mp3')


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if(gameIsOver()) {
        showEndScreen();
    } else {
      showProgressBar();
      updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question.question;
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function showEndScreen() {
    document.getElementById('endscreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/trophy.jpg';
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if(rightAnswerSelected(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } 
    else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
    let question = questions[currentQuestion];
    return selectedQuestionNumber == question.right_answer;
}

function nextQuestion() {
    currentQuestion++; // Zum Beispiel von 0 auf 1
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = 'img/pencil-bg.jpg';
    document.getElementById('endscreen').style = 'display: none';
    document.getElementById('questionBody').style = '';
    rightQuestions = 0; // Diese Variable wird auf überschrieben und auf null gesetzt, wenn das Spiel neu gestartet wird
    currentQuestion = 0; // Diese Variable wird auf überschrieben und auf null gesetzt, wenn das Spiel neu gestartet wird
    init();
}