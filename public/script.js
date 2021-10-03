const question = document.querySelector('#question');
// const answer1 = document.querySelector('#answer1');
// const answer2 = document.querySelector('#answer2');
// const answer3 = document.querySelector('#answer3');
// const answer4 = document.querySelector('#answer4');

function fillQuestionElements(data) {
    question.innerText = data.question;
    for (const i in data.answers) {
        const answerElement = document.querySelector(`#answer${Number(i) + 1}`);
        answerElement.innerText = data.answers[i];
    }
// answer1.innerText = data.answers[0];
// answer2.innerText = data.answers[1];
// answer3.innerText = data.answers[2];
// answer4.innerText = data.answers[3];
}

function showNextQuestion() {
    fetch('/question', {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => {
            fillQuestionElements(data);
        });
}


function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
}

// ktory przycisk zostal wcisniety?
const buttons = document.querySelectorAll('button');
for (const button of buttons) {
// do kazdego przycisku dodawany jest event 'click'
    button.addEventListener('click', event => {
// po nacisnieciu jakiegos przycisku, pobieramy sobie index odpowiedzi
        const answerIndex = event.target.dataset.answer;
        sendAnswer(answerIndex);
    });
}

showNextQuestion();
