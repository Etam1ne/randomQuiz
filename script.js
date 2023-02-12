const body = document.getElementsByTagName("body");
const question = document.getElementById("question");
const button = document.getElementById("getQustionButton");
const answersElements = document.getElementsByClassName("answer");

const categories = [
    "arts_and_literature",
    "film_and_tv",
    "food_and_drink",
    "general_knowledge",
    "geography","history",
    "music",
    "science",
    "society_and_culture",
    "sport_and_leisure"
]

const difficulties = [
    "easy",
    "medium",
    "hard"
]

let url = `https://the-trivia-api.com/api/questions?categories=${categories[0]}&limit=1&difficulty=${difficulties[0]}`;

button.onclick = getQuestion;

async function sendRequest() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function getQuestion() {
    clearAnswers()
    const data = await sendRequest();
    const answers = getAnswers(data);

    question.innerText = data[0].question;
    for (let i = 0; i < 4; i++) {
        answersElements[i].addEventListener("click", (event) => checkAnswer(event, data))
        answersElements[i].innerHTML = answers[i];
    }
}

function getAnswers(data) {
    const answersArray = [];
    data[0].incorrectAnswers.map(answer => {
        answersArray.push(answer);
    })
    answersArray.push(data[0].correctAnswer);
    answersArray.sort(() => Math.random() - 0.5);
    return answersArray;
}

function checkAnswer(event, data) {
    if (data[0].correctAnswer === event.target.innerText) {
        event.target.setAttribute("data-state", "true")
    }
    else {
        event.target.setAttribute("data-state", "false")
    }
}

function clearAnswers() {
    for (let i = 0; i < 4; i++) {
        answersElements[i].setAttribute("data-state", "notAnswered")
    }
}