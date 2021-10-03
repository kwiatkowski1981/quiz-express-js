function gameRoutes(app) {

let goodAnswers = 0;
let callToAFriendUsed = false;
let questionToTheCrowdUsed = false;
let halfOnHalfUsed = false;

const questions = [
    {
        question: 'jaki jest najlepszy jezyk programowania wg. mnie? ',
        answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
        correctAnswer: 2,
    },
    {
        question: 'Czy ten kurs jest fajny? ',
        answers: ['Nie wiem', 'Oczywiście, że tak', 'Nie', 'Jest najlepszy!'],
        correctAnswer: 3,
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


app.post('/answer/:index', (req, res) => {

// pobiedam index przeslany w adresie '/:index' za pomocą req.params
    const {index} = req.params;
// Muszę sprawdzić czy odpowiedź jest prawidłowa ale najpierw muszę pobrać  AKTUALNE pytanie!
// nie będzie to jednak  const nextQuestion = questions[goodAnswers - 1]; bo jesli jestem przy pytaniu z index'em zero
// to właśnie następne pytanie jest moim pytaniem aktualnym! Zmieniam nazwę z pytania nastepnego na sugerujące
// mi aktualne pytanie czyli 'question'
    const question = questions[goodAnswers];
    const {correctAnswer} = question;
// wyciągam warunek do zmiennej co poprawia mi czytelność kodu.
    const isCorrectAnswer = correctAnswer === Number(index);
// Przydzielam punkty za poprawną odpowiedź.
    if (isCorrectAnswer) {

    } else {

    }

    // Wysyłam odpowiedź, jeśli kliknięto przycisk poprawnej odpowiedzi wysyłam true w innym wypadku false
    res.json({
        correct: isCorrectAnswer, // Najkrótsza wersja zapisów pod spodem
    });

    // res.json({
    //     correct: correctAnswer === Number(index)? true : false,
    // });

    // if (correctAnswer === Number(index)) {
    //     res.json({
    //         correct: true,
    //     });
    // } else {
    //     res.json({
    //         correct: false,
    //     });
    // }

});



}

module.exports = gameRoutes;