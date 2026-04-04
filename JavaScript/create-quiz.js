const quizForm = document.getElementById("quizForm");
const clearBtn = document.getElementById("clearBtn");
const message = document.getElementById("message");

quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const quizTitle = document.getElementById("quizTitle").value.trim();
    const questionText = document.getElementById("questionText").value.trim();
    const option1 = document.getElementById("option1").value.trim();
    const option2 = document.getElementById("option2").value.trim();
    const option3 = document.getElementById("option3").value.trim();
    const option4 = document.getElementById("option4").value.trim();
    const correctAnswer = document.getElementById("correctAnswer").value;

    if (
        quizTitle === "" ||
        questionText === "" ||
        option1 === "" ||
        option2 === "" ||
        option3 === "" ||
        option4 === "" ||
        correctAnswer === ""
    ) {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    const newQuestion = {
        quizTitle: quizTitle,
        question: questionText,
        options: [option1, option2, option3, option4],
        correctAnswer: Number(correctAnswer)
    };

    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push(newQuestion);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    message.textContent = "Question saved successfully!";
    message.style.color = "green";

    quizForm.reset();
});

clearBtn.addEventListener("click", function () {
    quizForm.reset();
    message.textContent = "";
});