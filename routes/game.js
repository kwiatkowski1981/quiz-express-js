function gameRoutes(app) {

    let goodAnswers = 0;
    let isGameOver = false;
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
        } else if (isGameOver) {
            res.json({
                loser: true,
            });
        } else {
            // tablica questions od goodAnswers zmieni punktacje i iteruje do następnego pytania
            const nextQuestion = questions[goodAnswers];
            // Destrukturyzuję obiekt nextQuestion żeby móc prościej użyć pól w obiekcie odpowiedzi.JSON
            // Robie tak bo chce wysłać ręcznie tylko te pola do fronEndu, do których powinien mieć dostęp.
            // Tworze w ten sposób obiekt  z wybranymi polami.
            // bez destrukturyzacji musiał bym użyć na dole nextQuestion.question, nextQuestion.answers,
            // klient (przeglądarka) uzyskała by jednak wtedy dostęp do pola correctAnswer obiektu nextQuestion
            // a tego nie chcę.
            const {question, answers} = nextQuestion;
            res.json({
                question,
                answers,
            })
        }
    });

    app.post('/answer/:index', (req, res) => {
            // zapobiegam możliwości wybrania ponownie odpowiedzi po wybraniu złej ustawiając loser:true i blokuje grę.
            if (isGameOver) {
                res.json({
                    loser: true,
                });
            }
            // pobiedam index przeslany w adresie '/:index' za pomocą req.params
            const {index} = req.params;
            // Muszę sprawdzić czy odpowiedź jest prawidłowa ale najpierw muszę pobrać  AKTUALNE pytanie!
            // nie będzie to jednak  const nextQuestion = questions[goodAnswers - 1];
            // bo jeśli jestem przy pytaniu z index'em zero to właśnie następne pytanie jest moim pytaniem aktualnym!
            // Zmieniam nazwę z pytania następnego na sugerujące mi aktualne pytanie czyli po prostu 'question'
            const question = questions[goodAnswers];
            const {correctAnswer} = question;
            // wyciągam warunek do zmiennej co poprawia mi czytelność kodu.
            const isCorrectAnswer = correctAnswer === Number(index);
            // Przydzielam punkty za poprawną odpowiedź.
            if (isCorrectAnswer) {
                goodAnswers++;
            } else {
                isGameOver = true;
            }
            // Wysyłam odpowiedź, jeśli kliknięto przycisk poprawnej odpowiedzi wysyłam true w innym wypadku false
            res.json({
                correct: isCorrectAnswer, // Najkrótsza wersja zapisów pod spodem
                goodAnswers, // Ilość poprawnych odpowiedzi
            });
            // res.json({
            //     correct: correctAnswer === Number(index)? true : false, <- jedyna możliwość z if'a to boolean.
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
        }
    );
}

module.exports = gameRoutes;
