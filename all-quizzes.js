const quizList = document.getElementById("quizList");
const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

quizList.innerHTML = "";

if (quizzes.length === 0) {
    quizList.innerHTML = "<p class='empty-message'>No quizzes available.</p>";
} else {
    quizzes.forEach(function (quiz, index) {

        if (!quiz.questions || !Array.isArray(quiz.questions)) {
            return; // skip bad data safely
        }

        const quizCard = document.createElement("div");
        quizCard.className = "quiz-card";

        quizCard.innerHTML =
            "<h2>" + (index + 1) + ". " + quiz.name + "</h2>" +
            "<p><strong>Total Questions:</strong> " + quiz.questions.length + "</p>";

        quizList.appendChild(quizCard);
    });
}