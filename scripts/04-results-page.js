import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { questionPaper, subjectName } from "../data/question-paper.js";
import { userResults } from "../data/user-stats.js";
import { currentUser } from "../data/user-stats.js";
import { updateLastResult, updateLastResultDetails } from "../data/credentials.js";

document.querySelector('.js-header-label')
    .innerHTML = `${subjectName}`;

const currentPaper = questionPaper.slice(1, questionPaper.length);

// update the result of the user
const result = `${subjectName}: ${userResults.correctAnswers * 2}/${currentPaper.length * 2}`;
updateLastResult(currentUser, result);

// update the resultDetails of the user
const resultDetails = {
    marks: `${userResults.correctAnswers * 2}/${currentPaper.length * 2}`,
    subjectName: `${subjectName}`,
    totalQuestions: `${currentPaper.length}`,
    attempted: `${userResults.attempted}`,
    unattempted: `${userResults.unattempted}`,
    corrects: `${userResults.correctAnswers}`,
    wrongs: `${userResults.wrongAnswers}`
}
updateLastResultDetails(currentUser, resultDetails);

// date and time
let date = dayjs();
date = date.format('dddd, DD/MM/YYYY');
document.querySelector('.js-date')
    .innerHTML = date;

setInterval(loadTime, 1000);

function loadTime() {
    let time = dayjs();
    time = time.format('hh:mm A');
    document.querySelector('.js-time')
        .innerHTML = time;
}

displayResult();

function displayResult() {
    let resultContainerHTML = `
        <div class="js-results results">
            <div class="score-card">
                <p>${userResults.correctAnswers * 2}/${currentPaper.length * 2}</p>
            </div>
            <div class="first-line">
                <p>Attempted: ${userResults.attempted}</p>
                <p>Corrects: ${userResults.correctAnswers}</p>
            </div>
            <div class="second-line">
                <p>Unattempted: ${userResults.unattempted}</p>
                <p>Wrongs: ${userResults.wrongAnswers}</p>
            </div>
        </div>
    `;

    document.querySelector('.js-result-container')
        .innerHTML = resultContainerHTML;

    if (!(userResults.attempted === 0)) {
        document.querySelector('.js-results')
            .innerHTML += `
                <a class="answer-sheet-link" href="./05-answer-sheet-page.html">Answer Sheet</a>
            `;
    }
}