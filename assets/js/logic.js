import { questions } from './questions.js';

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 75;

document.addEventListener('DOMContentLoaded', () => {
    const questionTitleElement = document.getElementById('question-title');
    const choicesElement = document.getElementById('choices');
    const timeElement = document.getElementById('time');
    const startButton = document.getElementById('start');
    const startScreenElement = document.getElementById('start-screen');
    const questionsElement = document.getElementById('questions');
    const endScreenElement = document.getElementById('end-screen');
    const finalScoreElement = document.getElementById('final-score');
    const submitButton = document.getElementById('submit');
    const initialsInput = document.getElementById('initials');
    const feedbackElement = document.getElementById('feedback');
    const feedbackMessageElement = document.getElementById('feedback-message');

    startButton.addEventListener('click', startQuiz);
    submitButton.addEventListener('click', submitScore);

    function startQuiz() {
        startScreenElement.classList.add('hide');
        questionsElement.classList.remove('hide');
        timeRemaining = 75;
        timer = setInterval(updateTimer, 1000);
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            questionTitleElement.textContent = question.question;
            choicesElement.innerHTML = '';
            question.choices.forEach((choice, index) => {
                const button = document.createElement('button');
                button.textContent = choice;
                button.addEventListener('click', () => selectAnswer(index));
                choicesElement.appendChild(button);
            });
        } else {
            endQuiz();
        }
    }

    function selectAnswer(index) {
        if (index === questions[currentQuestionIndex].correct) {
            score++;
            showFeedback('Correct!', 'green'); // Display correct feedback
        } else {
            timeRemaining -= 10; // Penalty for wrong answer
            showFeedback('Wrong!', 'red'); // Display wrong feedback
        }
        currentQuestionIndex++;
        setTimeout(() => {
            showQuestion();
            hideFeedback();
        }, 1000); // Show the next question after 1 second
    }

    function updateTimer() {
        timeElement.textContent = timeRemaining;
        timeRemaining--;
        if (timeRemaining < 0) {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(timer);
        questionsElement.classList.add('hide');
        endScreenElement.classList.remove('hide');
        finalScoreElement.textContent = score;
    }

    function submitScore() {
        const initials = initialsInput.value.trim();
        if (initials) {
            const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
            highScores.push({ initials, score });
            highScores.sort((a, b) => b.score - a.score);
            localStorage.setItem('highScores', JSON.stringify(highScores));
            alert('Score submitted successfully!');
            window.location.href = 'highscores.html';
        } else {
            alert('Please enter initials!');
        }
    }

    function showFeedback(message, color) {
        feedbackMessageElement.textContent = message;
        feedbackElement.style.color = color;
        feedbackElement.classList.remove('hide');
    }

    function hideFeedback() {
        feedbackElement.classList.add('hide');
    }
});
