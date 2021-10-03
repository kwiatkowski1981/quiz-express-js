function gameRoutes(app) {

let goodAnswers = 0;
let callToAFriendUsed = false;
let questionToTheCrowdUsed = false;
let halfOnHalfUsed = false;

const questions = [
    {
        question: 'Czy ten kurs jest fajny? ',
        answers: ['Nie wiem', 'Oczywiście, że tak', 'Nie', 'Jest najlepszy!'],
        correctAnswer: 3,
    },
    {
        question: 'jaki jest najlepszy jezyk programowania wg. mnie? ',
        answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
        correctAnswer: 2,
    },
    {
        question: 'Czy chcesz zjeść pizze? ',
        answers: ['Nawet dwie!', 'Jestem na diecie.', 'Nie, dziękuję', 'Wolę brokuły'],
        correctAnswer: 0,
    },
];

app.get('/question', (req, res) => {
    // if all answers from all questions are correct?
    if (goodAnswers === questions.length) {
        res.json({
            winner: true,
        });
    } else {
        // tablica questions od goodAnswers zmieni punktacje i iteruje do następnego pytania
        const nextQuestion = questions[goodAnswers];
        // Destrukturyzuję obiekt nextQuestion żeby móc prościej użyć pól w obiekcie odpowiedzi.JSON
        // Robie tak bo chce wyslac recznie tylko te pola do fronEndu, do ktorych powinien miec dostep.
        // Tworze w ten sposob obiekt  z wybranymi polami.
        // bez destrukturyzacji musial bym użyć na dole nextQuestion.question, nextQuestion.answers,
        // klient (przegladarka) uzyskala by jednak wtedy dostep do pola correctAnswer obiektu nextQuestion
        // a tego nie chcemy
        const {question, answers} = nextQuestion;
        res.json({
            question,
            answers,
        })
    }
});

}

module.exports = gameRoutes;