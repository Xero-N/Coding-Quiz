document.addEventListener('DOMContentLoaded', () => {
    const highScoresList = document.getElementById('highscores');
    const clearButton = document.getElementById('clear-highscores');

    // Load and display high scores from local storage
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoresList.innerHTML = highScores
        .map(score => `<li>${score.initials} - ${score.score}</li>`)
        .join('');

    // Event listener to clear high scores
    clearButton.addEventListener('click', () => {
        localStorage.removeItem('highScores');
        highScoresList.innerHTML = ''; // Clear the displayed high scores
    });
});
