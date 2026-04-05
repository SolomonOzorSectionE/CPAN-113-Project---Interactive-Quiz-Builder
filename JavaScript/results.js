const totalQuizzes = document.getElementById("totalQuizzes");
const attemptedQuizzes = document.getElementById("attemptedQuizzes");
const averageScore = document.getElementById("averageScore");

const latestQuizName = document.getElementById("latestQuizName");
const latestQuizScore = document.getElementById("latestQuizScore");
const latestCorrectAnswers = document.getElementById("latestCorrectAnswers");
const latestTotalQuestions = document.getElementById("latestTotalQuestions");

let quizzes = JSON.parse(localStorage.getItem("quizzes"));
let quizResults = JSON.parse(localStorage.getItem("quizResults"));
let latestQuizResult = JSON.parse(localStorage.getItem("latestQuizResult"));

if (!Array.isArray(quizzes)) {
    quizzes = [];
}

if (!Array.isArray(quizResults)) {
    quizResults = [];
}

totalQuizzes.textContent = quizzes.length;
attemptedQuizzes.textContent = quizResults.length;

if (quizResults.length > 0) {
    let totalScore = 0;

    quizResults.forEach(function (result) {
        totalScore += result.score;
    });

    let average = totalScore / quizResults.length;
    averageScore.textContent = average.toFixed(0) + "%";
} else {
    averageScore.textContent = "0%";
}

if (latestQuizResult) {
    latestQuizName.textContent = latestQuizResult.quizName;
    latestQuizScore.textContent = latestQuizResult.score + "%";
    latestCorrectAnswers.textContent = latestQuizResult.correctAnswers;
    latestTotalQuestions.textContent = latestQuizResult.totalQuestions;
}