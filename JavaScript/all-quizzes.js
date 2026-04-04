const quizList = document.getElementById("quizList");
const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

if (quizzes.length === 0) {
    quizList.innerHTML = "<p class='empty-message'>No quizzes have been created yet.</p>";
} else {
    for (let i = 0; i < quizzes.length; i++) {
        const quiz = quizzes[i];

        const quizCard = document.createElement("div");
        quizCard.className = "quiz-card";

        let optionsList = "";

        for (let j = 0; j < quiz.options.length; j++) {
            if (j === quiz.correctAnswer) {
                optionsList += "<li><strong>" + quiz.options[j] + "</strong> (Correct Answer)</li>";
            } else {
                optionsList += "<li>" + quiz.options[j] + "</li>";
            }
        }

        quizCard.innerHTML =
            "<h2>" + (i + 1) + ". " + quiz.quizTitle + "</h2>" +
            "<p><strong>Question:</strong> " + quiz.question + "</p>" +
            "<p><strong>Options:</strong></p>" +
            "<ul>" + optionsList + "</ul>";

        quizList.appendChild(quizCard);
    }
}