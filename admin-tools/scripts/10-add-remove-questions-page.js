import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { questionPaper, subjectName } from "../../data/question-paper.js";

const currentPaper = questionPaper.slice(1, questionPaper.length);
document.title += ` - ${subjectName}`;

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

displaySubjectInfo();

function displaySubjectInfo() {
    document.querySelector('.js-subject-info')
        .innerHTML = `
            <p>Subject: ${subjectName}</p>
            <p>No.of Questions: ${currentPaper.length}</p>
        `;
}

document.querySelector('.js-sugesstion-message')
    .innerHTML = `
        If you want to edit
        <b>Other Subject</b>,
        go to
        <a href="./11-change-question-paper.html" style ="color: black;">
            <b>Change Subject</b>
        </a>
        page and select the subject you want then come to this page to edit!
    `;

displayQuestionPaper();
document.querySelector('.js-add-button')
    .addEventListener('click', addQuestion);

function displayQuestionPaper() {
    let questionsHTML = '';
    let i=1;
    let c='a';
    currentPaper.forEach((set) => {
        questionsHTML += `
            <div class="question-container">
                <div class="question-line">
                    <p class="question">${i}). ${set.question}</p>
                    <button class="js-remove-button remove-button" data-question-id="${set.id}">Remove</button>
                </div>

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

    colorTheAnswers();

    document.querySelectorAll('.js-remove-button')
        .forEach(removeButton => {
            removeButton.addEventListener('click', () => {
                const questionId = removeButton.dataset.questionId;
                removeQuestion(questionId);
                displaySubjectInfo();
                if (!(currentPaper.length)) {
                    const noDataHTML = `
                        <div class="js-questions-container questions-container">
                            <div class="no-question-paper">
                                <img src="../data/icons/no-data.svg">
                                <p>No Question Paper</p>
                            </div>
                        </div>
                    `;
    
                    document.querySelector('.js-questions-container')
                        .innerHTML = noDataHTML;
                }
                else
                    displayQuestionPaper();
            });
        });
}

function colorTheAnswers() {
    let a='a';
    currentPaper.forEach((set) => {
        const options = document.querySelectorAll(`.${a}`);

        for (let option of options) {
            if (Number(option.dataset.value) === set.answer) {
                option.classList.add('correctAnswer');
            }
        }
        a+=1;
    });
}

function addQuestion() {
    document.querySelector('.js-add-question-container')
        .innerHTML = `
            <div class="question-container new-question-container">
                <div class="add-question-label">
                    <p>Add New Question</p>
                    <div class="buttons">
                        <a class="js-save-button save-button">
                            Save
                        </a>
                        <button id="done-button" class="js-cancel-button cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
                <input type="text" id="question" placeholder="Enter Question" class="js-entered-question">

                <div class="options-container">
                    <p>Enter 4 Options</p>
                    <div class="first-line">
                        <input type="text" placeholder="Option-1" class="js-entered-option">
                        &nbsp; &nbsp;
                        <input type="text" placeholder="Option-2" class="js-entered-option">
                    </div>
                    <div class="second-line">
                        <input type="text" placeholder="Option-3" class="js-entered-option">
                        &nbsp; &nbsp;
                        <input type="text" placeholder="Option-4" class="js-entered-option">
                    </div>
                </div>

                <p>Enter Answer</p>
                <div class="answer-line">
                    <input type="number" placeholder="Answer in number (1-4)" class="js-entered-answer">
                </div>
            </div>
        `;

    document.querySelector('.js-save-button')
        .addEventListener('click', () => {
            saveQuestionToPaper();
        });

    document.querySelector('.js-cancel-button')
        .addEventListener('click', () => {
            document.querySelector('.new-question-container').remove();
        });
}

function saveQuestionToPaper() {
    let id;
    if (!(currentPaper.length))
        id = currentPaper.length + 1;
    else
        id = currentPaper[(currentPaper.length)-1].id + 1;

    const question = document.querySelector('.js-entered-question').value;

    if (question === '') {
        isEmpty('Question');
        document.querySelector('.js-save-button').setAttribute("href", `#popup-container`);
        return;
    }
    else {
        document.querySelector('.js-save-button').removeAttribute("href");
    }

    let options = [];
    const enteredOptions = document.querySelectorAll('.js-entered-option');
    let optionCount = 1;
    for (let option of enteredOptions) {
        if (option.value === '') {
            isEmpty(`Option-${optionCount}`);
            document.querySelector('.js-save-button').setAttribute("href", `#popup-container`);
            return;
        }
        else {
            document.querySelector('.js-save-button').removeAttribute("href");
        }
        options.push(option.value);
        optionCount += 1;
    }

    const answer = Number(document.querySelector('.js-entered-answer').value);
    if (answer === 0) {
        isEmpty('Answer');
        document.querySelector('.js-save-button').setAttribute("href", `#popup-container`);
        return;
    }
    else {
        document.querySelector('.js-save-button').removeAttribute("href");
    }

    // pushing new question into question paper
    currentPaper.push({
        id,
        question,
        options,
        answer
    });
    localStorage.setItem('questionPaper', JSON.stringify(currentPaper));
    
    // emptying the entered inputs
    document.querySelector('.js-entered-question').value = '';
    document.querySelectorAll('.js-entered-option')[0].value = '';
    document.querySelectorAll('.js-entered-option')[1].value = '';
    document.querySelectorAll('.js-entered-option')[2].value = '';
    document.querySelectorAll('.js-entered-option')[3].value = '';
    document.querySelector('.js-entered-answer').value = '';

    document.querySelector('.js-cancel-button')
        .innerHTML = 'Done';

    displaySubjectInfo();
    displayQuestionPaper();
}

function removeQuestion(questionId) {
    for (let questionSet of currentPaper) {
        if (questionSet.id === Number(questionId)) {
            const index = currentPaper.indexOf(questionSet);
            currentPaper.splice(index, 1);
            localStorage.setItem('questionPaper', JSON.stringify(currentPaper));
            return;
        }
    }
}

function isEmpty(message) {
    document.querySelector('.js-empty-message')
        .innerHTML = `
        <p>
            You didn't enter <b>${message}!</b>
        </p>
        <a href="#save-button" class="okay-button">
            Okay
        </a>`;
}