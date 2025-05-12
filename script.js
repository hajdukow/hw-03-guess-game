let minValue = parseInt(prompt('Минимальное знание числа для игры','-999'));
minValue = minValue || 0 - 999;

let maxValue = parseInt(prompt('Максимальное знание числа для игры','999'));
maxValue = maxValue || 0 + 999;

let minValueResult = minValue > 999 ? 999 : minValue && minValue < -999 ? -999 : minValue;
let maxValueResult = maxValue > 999 ? 999 : maxValue && maxValue < -999 ? -999 : maxValue;

minValue = minValueResult;
maxValue = maxValueResult;

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;


const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

 let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
 let tens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
 let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
 let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

 function numberToText() {
     let number = Math.abs(answerNumber);
     let text = '';

     if (number == 0) {
         text = '0';
         return text;
     }

     if (number <= 9) {
         return units[Math.floor(Math.abs(number) / 1)];
     }

     if (number > 9 && number < 20) {
         return tens[Math.floor(number / 10 + number % 10)];
     }

     if (number >= 20 && number <= 99) {
         return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
     }

     if (number >= 100 && number <= 999) {
         return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
     }
 }

 
 function numberToTextHundreds() {
     let digitsRemainder = Math.abs(answerNumber) % 100;

     if (digitsRemainder <= 9) {
         return units[Math.floor(digitsRemainder / 1)];
     }

     if (digitsRemainder > 9 && digitsRemainder < 20) {
         return tens[(Math.floor(digitsRemainder / 10)) + (digitsRemainder % 10)];
     }

     if (digitsRemainder >= 20 && digitsRemainder <= 99) {
         return dozens[(Math.floor(digitsRemainder / 10)) - 1] + " " + units[Math.floor(digitsRemainder % 10)];
     }
 }


 orderNumberField.innerText = orderNumber;
 answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
 

document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else if (minValue !== maxValue){
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandomOver = Math.round( Math.random());
            const answerPhraseOver = (phraseRandomOver === 1) ?
                `Это легко! Ты загадал...` :
                `Похоже это число...`;

            answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `${answerPhraseOver} ${numberToText()}?` : `${answerPhraseOver} ${answerNumber}?` : numberToText().length < 20 ? `${answerPhraseOver} минус ${numberToText()}?` : `${answerPhraseOver} ${answerNumber}?`;
        }
    }
})


document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали число неверно!\n\u{1F914}` :
                `Я сдаюсь!\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else if (minValue !== maxValue) {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandomLess = Math.round( Math.random());
            const answerPhraseLess = (phraseRandomLess === 1) ?
                `Проше простого! Ты загадал...` :
                `Скорее всего это...`;

            answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `${answerPhraseLess} ${numberToText()}?` : `${answerPhraseLess} ${answerNumber}?` : numberToText().length < 20 ? `${answerPhraseLess} минус ${numberToText()}?` : `${answerPhraseLess} ${answerNumber}?`;
        }
    }
})


document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        if (answerNumber > 0){
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
        gameRun = false;
        } else if (answerNumber < 0) {
        answerField.innerText = `Я опять отгадал\n\u{1f605}`;
        gameRun = false;
        } else {
        answerField.innerText = `Было нелегко, но я угадал\n\u{1f60f}`;
        gameRun = false;    
        }
    }
})


document.querySelector('#btnRetry').addEventListener('click', function () {
    location.reload(true);
})
