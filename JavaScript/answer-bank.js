const answerBankList = document.getElementById("answerBankList");

let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

if (quizzes.length === 0) {
    answerBankList.innerHTML = "<p class='empty-message'>No answers are available yet.</p>";
} else {
    quizzes.forEach(function (quiz, index) {
        const answerCard = document.createElement("div");
        answerCard.classList.add("quiz-card");

        const correctAnswerText = quiz.options[quiz.correctAnswer];

        answerCard.innerHTML = `
            <h2>${index + 1}. ${quiz.quizTitle}</h2>
            <p><strong>Question:</strong> ${quiz.question}</p>
            <p><strong>Correct Answer:</strong> <span class="correct-answer">${correctAnswerText}</span></p>
        `;

        answerBankList.appendChild(answerCard);
    });
}