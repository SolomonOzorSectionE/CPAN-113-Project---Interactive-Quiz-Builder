const quizSelect = document.getElementById("quizSelect");
const loadQuizBtn = document.getElementById("loadQuizBtn");
const takeQuizForm = document.getElementById("takeQuizForm");
const quizQuestions = document.getElementById("quizQuestions");
const takeQuizMessage = document.getElementById("takeQuizMessage");

const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
let selectedQuiz = null;

quizzes.forEach(function (quiz) {
    const option = document.createElement("option");
    option.value = quiz.id;
    option.textContent = quiz.name;
    quizSelect.appendChild(option);
});

loadQuizBtn.addEventListener("click", function () {
    const selectedId = Number(quizSelect.value);

    selectedQuiz = quizzes.find(function (quiz) {
        return quiz.id === selectedId;
    });

    quizQuestions.innerHTML = "";
    takeQuizMessage.textContent = "";

    if (!selectedQuiz) {
        takeQuizMessage.textContent = "Please select a quiz.";
        takeQuizMessage.style.color = "red";
        return;
    }

    selectedQuiz.questions.forEach(function (questionItem, questionIndex) {
        const questionBlock = document.createElement("div");
        questionBlock.className = "quiz-card";

        let optionsHTML = "";

        questionItem.options.forEach(function (option, optionIndex) {
            optionsHTML +=
                "<label class='option-label'>" +
                "<input type='radio' name='question" + questionIndex + "' value='" + optionIndex + "'> " +
                option +
                "</label>";
        });

        questionBlock.innerHTML =
            "<h3>Question " + (questionIndex + 1) + "</h3>" +
            "<p>" + questionItem.question + "</p>" +
            optionsHTML;

        quizQuestions.appendChild(questionBlock);
    });
});

takeQuizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!selectedQuiz) {
        takeQuizMessage.textContent = "Please load a quiz first.";
        takeQuizMessage.style.color = "red";
        return;
    }

    let score = 0;

    selectedQuiz.questions.forEach(function (questionItem, questionIndex) {
        const selectedOption = document.querySelector(
            "input[name='question" + questionIndex + "']:checked"
        );

        if (selectedOption !== null && Number(selectedOption.value) === questionItem.correctAnswer) {
            score++;
        }
    });

    const percent = Math.round((score / selectedQuiz.questions.length) * 100);

    let quizResults = JSON.parse(localStorage.getItem("quizResults"));

    if (!Array.isArray(quizResults)) {
        quizResults = [];
    }

    const resultObject = {
        quizName: selectedQuiz.name,
        score: percent,
        correctAnswers: score,
        totalQuestions: selectedQuiz.questions.length
    };

    quizResults.push(resultObject);
    localStorage.setItem("quizResults", JSON.stringify(quizResults));
    localStorage.setItem("latestQuizResult", JSON.stringify(resultObject));

    window.location.href = "results.html";
});