import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { subjectName, questionPaper } from "../data/question-paper.js";
import { currentUser, userPickedAnswers } from "../data/user-stats.js";

const currentPaper = questionPaper.slice(1, questionPaper.length);
document.title = `${subjectName} - Answer Sheet`;

document.querySelector('.js-user-name')
    .innerHTML = `Attempted by: ${trimUserName(currentUser)}`;

function trimUserName(username) {
    if (username.length > 10)
        username = username.slice(0, 10) + "...";
    return username;
}

// date and time
let date = dayjs();
date = date.format('dddd, DD/MM/YYYY');

setInterval(loadTime, 1000);

function loadTime() {
    let time = dayjs();
    time = time.format('hh:mm A');
    document.querySelector('.js-time')
        .innerHTML = time;
}

// shuffling the questionPaper
const shuffledQuestionPaper = shuffle(currentPaper);

function shuffle(currentPaper) {
  for (let i = currentPaper.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentPaper[i], currentPaper[j]] = [currentPaper[j], currentPaper[i]];
  }
  return currentPaper;
}

let questionsHTML = '';
let i=1;
let c='a';
shuffledQuestionPaper.forEach((set) => {
    questionsHTML += `
        <div class="js-question-container question-container">
            <p class="question">${i}). ${set.question}</p>

            <div class="option ${c}" data-value="1">
                <p>A). ${set.options[0]}</p>
            </div>
            <div class="option ${c}" data-value="2">
                <p>B). ${set.options[1]}</p>
            </div>
            <div class="option ${c}" data-value="3">
                <p>C). ${set.options[2]}</p>
            </div>
            <div class="option ${c}" data-value="4">
                <p>D). ${set.options[3]}</p>
            </div>
        </div>
    `;
    i++;
    c+=1;
});

document.querySelector('.js-questions-container')
    .innerHTML = questionsHTML;

let a='a';
shuffledQuestionPaper.forEach((set) => {
    let userPickedAnswer;
    for (let pickedSet of userPickedAnswers) {
        if (pickedSet.questionId === set.id)
            userPickedAnswer = pickedSet.pickedAnswer;
    }

    const options = document.querySelectorAll(`.${a}`);

    for (let option of options) {
        if (Number(option.dataset.value) === set.answer)
            option.classList.add('correctAnswer');

        if (Number(option.dataset.value) === userPickedAnswer) {
            if(option.classList.contains('correctAnswer')) {
                const optionHTML = option.innerHTML;
                const checkmarkHTML = `
                    <div class="icon-container">
                        <img src="./data/icons/check-mark-icon.svg" class="checkmark-icon">
                    </div>
                `;
                option.innerHTML = optionHTML + checkmarkHTML;
                option.classList.add('is-user-picked-option');
            }
            else {
                option.classList.add('wrongAnswer');
                const optionHTML = option.innerHTML;
                const intomarkHTML = `
                    <div class="icon-container">
                        <img src="./data/icons/into-icon.svg" class="into-icon">
                    </div>
                `;
                option.innerHTML = optionHTML + intomarkHTML;
                option.classList.add('is-user-picked-option');
            }
        }
    }
    a+=1;
});