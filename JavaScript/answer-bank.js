const answerBankList = document.getElementById("answerBankList");
const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

answerBankList.innerHTML = "";

if (quizzes.length === 0) {
    answerBankList.innerHTML = "<p class='empty-message'>No answers available.</p>";
} else {
    quizzes.forEach(function (quiz, index) {

        if (!quiz.questions || !Array.isArray(quiz.questions)) {
            return; // skip bad data
        }

        const answerCard = document.createElement("div");
        answerCard.className = "quiz-card";

        let questionsHTML = "";

        quiz.questions.forEach(function (questionItem, questionIndex) {
            const correctAnswer = questionItem.options[questionItem.correctAnswer];

            questionsHTML +=
                "<p><strong>Q" + (questionIndex + 1) + ":</strong> " + questionItem.question + "</p>" +
                "<p>Answer: <span class='correct-answer'>" + correctAnswer + "</span></p>";
        });

        answerCard.innerHTML =
            "<h2>" + (index + 1) + ". " + quiz.name + "</h2>" +
            questionsHTML;

        answerBankList.appendChild(answerCard);
    });
}