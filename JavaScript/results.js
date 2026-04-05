const totalQuizzes = document.getElementById("totalQuizzes");
const attemptedQuizzes = document.getElementById("attemptedQuizzes");
const averageScore = document.getElementById("averageScore");

let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
let quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];

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
    averageScore.textContent = "N/A";
}