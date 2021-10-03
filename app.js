const express = require('express');
const app = express();
const port = 3000;
const myUrl = '127.0.0.1';

app.listen(port, myUrl, () => {
    console.log(`Serwer dziala na http://${myUrl}:${port}`);
});


let goodAnswers = 0;
let callToAFriendUsed = false;
let questionToTheCrowdUsed = false;
let halfOnHalfUsed = false;

const questions = [
    {
        question: 'Czy ten kurs jest fajny? ? ',
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