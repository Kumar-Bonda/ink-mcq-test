import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { 
        availablePapers, 
        saveAvailablePapersToStorage} from "../../data/available-papers.js";

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

let subjectNameEntered = '';
document.querySelector('.js-create-button')
    .addEventListener('click', () => {
        const subjectName = document.querySelector('.js-subject-name-input').value;

        if (!(subjectName.length)) {
            isEmpty('Subject Name');
            return;
        }
        
        if (Object.keys(availablePapers).includes(subjectName)) {
            displayDuplicateNameError(subjectName);
            return;
        }

        if (subjectName.length > 15) {
            displayNameLengthError(subjectName);
            return;
        }

        createNewVariable(subjectName);
        displaySubjectInfo(subjectName);
        subjectNameEntered = subjectName;
        editSubjectNameEvent();
    });

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

function displayDuplicateNameError(subjectName) {
    document.querySelector('.js-error-message')
        .innerHTML = `
            <p>
                <b>'${subjectName}'</b> is already exists!
            </p>
            <p>
                Choose diffrent Subject name!
            </p>
            <a href="#save-button" class="okay-button">
                Okay
            </a>
        `;
}

function displayNameLengthError(subjectName) {
    document.querySelector('.js-error-message')
        .innerHTML = `
            <p>
                <span style="color: red">Note: </span>
                Subject name must be less than
            </p>
            <p>or equal to <b>15 characters!</b></p>
            <p style="
                border: 2px solid rgb(48, 48, 56);
                padding: 1px 5px;
                margin-top: 5px;
            ">
                ${subjectName} = ${subjectName.length} characters
            </p>
            <a href="#" class="okay-button">Okay</a>
        `;
}

function createNewVariable(subjectName) {
    // create a varible for new paper
    availablePapers[subjectName] = [
        {
            subjectName
        }
    ];
    saveAvailablePapersToStorage(availablePapers);

    document.querySelector('.js-message')
        .innerHTML = `
            <p>
                <b>Subject Name</b> has been saved!
            </p>
            <p>
                You can now start adding questions!
            </p>
            <a href="#save-button" class="okay-button">
                Okay
            </a>
        `;
}

function displaySubjectInfo(subjectName) {
    if (!(availablePapers[subjectName]))
        return;

    document.querySelector('.js-subject-info')
        .innerHTML = `
            <p>Subject: ${subjectName}</p>
            <p>No.of Questions: ${availablePapers[subjectName].length - 1}</p>
        `;
}

function editSubjectNameEvent() {
    document.querySelector('.js-subject-name-query')
        .innerHTML = `
            <button class="js-edit-button edit-button save-button">Edit Subject Name</button>
        `;

    document.querySelector('.js-edit-button')
        .addEventListener('click', () => {
            document.querySelector('.js-subject-name-query')
                .innerHTML = `
                    <input type="text" placeholder="New Subject Name" class="js-new-subject-name-input subject-name-input">
                    <a href="#popup-container" class="js-save-button save-button">Edit</a>
                `;

            document.querySelector('.js-save-button')
                .addEventListener('click', () => {
                    editSubjectName();
                });
        });
}

function editSubjectName() {
    const newSubjectName = document.querySelector('.js-new-subject-name-input').value;

    if (!(newSubjectName.length)) {
        isEmpty('Subject Name');
        return;
    }

    if (newSubjectName.length > 15) {
        displayNameLengthError(newSubjectName);
        return;
    }

    const oldSubjectName = subjectNameEntered;
    replaceNewVariable(oldSubjectName, newSubjectName);
    editSubjectNameEvent();
    displaySubjectInfo(newSubjectName);

}

function replaceNewVariable(oldSubjectName, newSubjectName) {
    availablePapers[newSubjectName] = availablePapers[oldSubjectName];
    delete availablePapers[oldSubjectName];
    availablePapers[newSubjectName][0].subjectName = newSubjectName;
    saveAvailablePapersToStorage(availablePapers);

    document.querySelector('.js-message')
        .innerHTML = `
            <p>
                Subject name has been changed from
            </p>
            <p>
                <b>${oldSubjectName}</b>
                to
                <b>${newSubjectName}</b>!
            </p>
            <a href="#save-button" class="okay-button">
                Okay
            </a>
        `;

    subjectNameEntered = newSubjectName;
}

const addButton = document.querySelector('.js-add-button');
addButton.addEventListener('click', () => {
        if (!(subjectNameEntered.length)) {
            addButton.setAttribute('href', "#popup-container");

            document.querySelector('.js-empty-message')
                .innerHTML = `
                    <p>
                        <span style="color: red">Note:</span>
                        Subject name must be added
                    </p>
                    <p>before the questions!</p>
                    <a href="#" class="okay-button">
                        Okay
                    </a>
                `;
            return;
        }
        addButton.removeAttribute('href');

        addQuestion();
    });

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
            saveQuestionToPaper(subjectNameEntered);
            displaySubjectInfo(subjectNameEntered);
            displayQuestionPaper(subjectNameEntered);
        });

    document.querySelector('.js-cancel-button')
        .addEventListener('click', () => {
            document.querySelector('.new-question-container').remove();
        });
}

function saveQuestionToPaper(subjectName) {
    let id = availablePapers[subjectName].length;

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
    else if (answer < 0 || answer > 4) {
        document.querySelector('.js-empty-message')
            .innerHTML = `
                <p>
                    The answer must be:
                </p>
                <p>
                    <b>1 >= Answer <= 4</b>
                </p>
                <a href="#save-button" class="okay-button">
                    Okay
                </a>
            `;
            document.querySelector('.js-save-button').setAttribute("href", `#popup-container`);
            return;
    }
    else {
        document.querySelector('.js-save-button').removeAttribute("href");
    }

    // pushing new question into question paper
    availablePapers[subjectName].push({
        id,
        question,
        options,
        answer
    });
    saveAvailablePapersToStorage(availablePapers);
    
    // emptying the entered inputs
    document.querySelector('.js-entered-question').value = '';
    document.querySelectorAll('.js-entered-option')[0].value = '';
    document.querySelectorAll('.js-entered-option')[1].value = '';
    document.querySelectorAll('.js-entered-option')[2].value = '';
    document.querySelectorAll('.js-entered-option')[3].value = '';
    document.querySelector('.js-entered-answer').value = '';

    document.querySelector('.js-cancel-button')
        .innerHTML = 'Done';
}

function displayQuestionPaper(subjectName) {
    if (!(availablePapers[subjectName]))
        return;

    const currentPaper = availablePapers[subjectName].slice(1, availablePapers[subjectName].length);
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

    document.querySelector('.js-added-questions')
        .innerHTML = questionsHTML;

    colorTheAnswers(currentPaper);

    document.querySelectorAll('.js-remove-button')
        .forEach(removeButton => {
            removeButton.addEventListener('click', () => {
                const questionId = removeButton.dataset.questionId;
                removeQuestion(questionId, currentPaper);
                displaySubjectInfo(subjectName);
                if (!(currentPaper.length === 1)) {
                    const noDataHTML = `
                        <div class="no-question-paper">
                            <img src="../data/icons/no-data.svg">
                            <p>No Question Paper</p>
                        </div>
                    `;
    
                    document.querySelector('.js-added-questions')
                        .innerHTML = noDataHTML;
                    return;
                }

                displayQuestionPaper(subjectName);
            });
        });
}

function colorTheAnswers(currentPaper) {
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

function removeQuestion(questionId, currentPaper) {
    for (let questionSet of currentPaper) {
        if (questionSet.id === Number(questionId)) {
            const index = currentPaper.indexOf(questionSet);
            currentPaper.splice(index, 1);
            saveAvailablePapersToStorage(availablePapers);
            return;
        }
    }
}