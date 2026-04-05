const quizTitleInput = document.getElementById("quizTitle");
const questionTextInput = document.getElementById("questionText");
const option1Input = document.getElementById("option1");
const option2Input = document.getElementById("option2");
const option3Input = document.getElementById("option3");
const option4Input = document.getElementById("option4");
const correctAnswerInput = document.getElementById("correctAnswer");

const addQuestionBtn = document.getElementById("addQuestionBtn");
const saveQuizBtn = document.getElementById("saveQuizBtn");
const message = document.getElementById("message");
const questionPreview = document.getElementById("questionPreview");

let currentQuestions = [];

function clearQuestionFields() {
    questionTextInput.value = "";
    option1Input.value = "";
    option2Input.value = "";
    option3Input.value = "";
    option4Input.value = "";
    correctAnswerInput.value = "";
}

function renderPreview() {
    questionPreview.innerHTML = "";

    if (currentQuestions.length === 0) {
        questionPreview.innerHTML = "<p>No questions added yet.</p>";
        return;
    }

    currentQuestions.forEach(function (questionItem, index) {
        const questionCard = document.createElement("div");
        questionCard.className = "quiz-card";

        let optionsHTML = "";

        for (let i = 0; i < questionItem.options.length; i++) {
            if (i === questionItem.correctAnswer) {
                optionsHTML += "<li><strong>" + questionItem.options[i] + "</strong> (Correct Answer)</li>";
            } else {
                optionsHTML += "<li>" + questionItem.options[i] + "</li>";
            }
        }

        questionCard.innerHTML =
            "<h3>Question " + (index + 1) + "</h3>" +
            "<p><strong>Question:</strong> " + questionItem.question + "</p>" +
            "<ul>" + optionsHTML + "</ul>";

        questionPreview.appendChild(questionCard);
    });
}

addQuestionBtn.addEventListener("click", function () {
    const questionText = questionTextInput.value.trim();
    const option1 = option1Input.value.trim();
    const option2 = option2Input.value.trim();
    const option3 = option3Input.value.trim();
    const option4 = option4Input.value.trim();
    const correctAnswer = correctAnswerInput.value;

    if (
        questionText === "" ||
        option1 === "" ||
        option2 === "" ||
        option3 === "" ||
        option4 === "" ||
        correctAnswer === ""
    ) {
        message.textContent = "Please complete all question fields before adding.";
        message.style.color = "red";
        return;
    }

    const questionObject = {
        question: questionText,
        options: [option1, option2, option3, option4],
        correctAnswer: Number(correctAnswer)
    };

    currentQuestions.push(questionObject);
    clearQuestionFields();
    renderPreview();

    message.textContent = "Question added to quiz.";
    message.style.color = "green";
});

saveQuizBtn.addEventListener("click", function () {
    const quizTitle = quizTitleInput.value.trim();

    if (quizTitle === "") {
        message.textContent = "Please enter a quiz title.";
        message.style.color = "red";
        return;
    }

    if (currentQuestions.length === 0) {
        message.textContent = "Please add at least one question.";
        message.style.color = "red";
        return;
    }

    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

    const newQuiz = {
        id: Date.now(),
        name: quizTitle,
        questions: currentQuestions
    };

    quizzes.push(newQuiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    message.textContent = "Quiz saved successfully.";
    message.style.color = "green";

    quizTitleInput.value = "";
    currentQuestions = [];
    clearQuestionFields();
    renderPreview();
});

renderPreview();