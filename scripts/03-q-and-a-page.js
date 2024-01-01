import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { subjectName, questionPaper } from "../data/question-paper.js";
import { userPickedAnswers,
    resetUserResults, 
    updateUserResults} from "../data/user-stats.js";
import { currentUser,
    updateUserPickedAnswers,
    resetUserPickedAnswers } from "../data/user-stats.js";

document.title += ` - ${subjectName}`;

const currentPaper = questionPaper.slice(1, questionPaper.length);
if (!(currentPaper.length))
    displayNoQuestionPaper();

function displayNoQuestionPaper() {
    const noQuestionPaperHTML = `
        <div class="no-question-paper">
            <img src="../data/icons/no-data.svg">
            <p>No Question Paper</p>
        </div>
    `;

    document.querySelector('.js-questions-container')
        .innerHTML = noQuestionPaperHTML;
}

// reset userResults & userPickedAnswers so that new results can be created.
resetUserResults();
resetUserPickedAnswers();

document.querySelector('.js-user-name')
    .innerHTML = `${currentUser}`;

// date and time
let date = dayjs();
date = date.format('dddd, DD/MM/YYYY');
document.querySelector('.js-subject-name')
    .innerHTML = `Subject: ${subjectName}`;

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
            <div class="question-line">
                <p class="question">${i}). ${set.question}</p>
                <div class="save-button-container">
                    <button class="js-save-button save-button" data-question-id="${set.id}">Save</button>
                    <p class="js-${set.id}"></p>
                </div>
            </div>

            <label class="option js-option-${c}">
                <input type="radio" value="1" name="Q${set.id}">${set.options[0]}
            </label>
            <label class="option js-option-${c}">
                <input type="radio" value="2" name="Q${set.id}">${set.options[1]}
            </label>
            <label class="option js-option-${c}">
                <input type="radio" value="3" name="Q${set.id}">${set.options[2]}
            </label>
            <label class="option js-option-${c}">
                <input type="radio" value="4" name="Q${set.id}">${set.options[3]}
            </label>
        </div>
    `;
    i++;
    c+=1;
});

document.querySelector('.js-questions-container')
    .innerHTML = questionsHTML;

let a = 'a';
for (let i=1; i<=currentPaper.length; i++) {
    const options = document.querySelectorAll(`.js-option-${a}`);
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(option => {
                option.classList.remove('is-checked');
            });
            option.classList.add('is-checked');
        });
    });
    a += 1;
}

document.querySelectorAll('.js-save-button')
    .forEach(saveButton => {
        saveButton.addEventListener('click', () => {
            let questionId = Number(saveButton.dataset.questionId);

            const radioButtons = document.querySelectorAll(`input[name=Q${questionId}`);
            if (!radioButtons.length)
                return;
            
            let checkedRadioButton;
            for (const radioButton of radioButtons) {
                if (radioButton.checked)
                    checkedRadioButton = radioButton;
            }
            if (!checkedRadioButton)
                return;

            const userPickedAnswer = Number(checkedRadioButton.value);
            updateUserPickedAnswers(questionId, userPickedAnswer);
            animateSavedMessage(questionId);
            setTimeout(() => {
                removeSavedMessage(questionId);
            }, 1000);
        });
    });

function animateSavedMessage(questionId) {
    const savedMessageElement = document.querySelector(`.js-${questionId}`);
    savedMessageElement.innerHTML = 'Saved!';
    savedMessageElement.classList.add('saved-message');
}

function removeSavedMessage(questionId) {
    const savedMessageElement = document.querySelector(`.js-${questionId}`);
    savedMessageElement.innerHTML = '';
    savedMessageElement.classList.remove('saved-message');
}

document.querySelector('.js-submit-button')
    .addEventListener('click', () => {
        displayPopup();
    });

function displayPopup() {
    document.querySelector('.js-message')
        .innerHTML = `
            <div class="info">
                <p class="attempted">Attempted: ${userPickedAnswers.length}</p>
                <p>Unattempted: ${currentPaper.length - userPickedAnswers.length}</p>
            </div>
            <p>Are you sure you want to <b>end</b> the test?</p>
            <div class="yes-no-buttons">
                <a href="#submit-button" class="no-button">No</a>
                <a href="./04-results-page.html" class="js-yes-button yes-button">Yes, End Test</a>
            </div>
        `;

        if (userPickedAnswers.length < 1) {
            document.querySelector('.js-message')
                .innerHTML += `
                    <p class="note">
                        <span style="color: red">Note:</span>
                        Save buttons must be clicked to save the answers
                    </p>
                `;
        }

        document.querySelector('.js-yes-button')
            .addEventListener('click', updateUserResults);
}