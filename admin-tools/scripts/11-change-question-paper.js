import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { availablePapers } from "../../data/available-papers.js";
import { changeQuestionPaper, changeSubjectName } from "../../data/question-paper.js";

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

document.querySelector('.js-sugesstion-message')
    .innerHTML = `
        Click on a
        <b>Subject</b>
        to set as question paper!
    `;

displayAvailablePapers();

function displayAvailablePapers() {
    let availablePapersHTML = '';
    let id = 1;
    Object.values(availablePapers).forEach(paper => {
        const subjectName = paper[0].subjectName;
        const noOfQustions = paper.length - 1;
        availablePapersHTML += `
            <div class="paper-container">
                <div class="subject-info">
                    <a href="#popup-container" class="js-set-button" data-id="${id}">
                        Subject: ${subjectName} (${noOfQustions})
                    </a>
                    <button class="js-open-button js-open-button-${id} open-button" data-id="${id}">
                        Open Paper
                        <img src="../data/icons/expand-more.svg">
                    </button>
                </div>
                <table class="paper-table js-${id}"></table>
            </div>
        `;
        id += 1;
    });

    document.querySelector('.js-available-papers')
        .innerHTML = availablePapersHTML;

    const setButtons = document.querySelectorAll(`.js-set-button`);
    setButtons.forEach(saveButton => {
        saveButton.addEventListener('click', () => {
            const index = saveButton.dataset.id - 1;
            const subject = Object.values(availablePapers)[index][0].subjectName;
            document.querySelector('.js-confirm-message')
                .innerHTML = `
                    <p>Do you want to set question paper</p>
                    <p>to <b>${subject}!</b></p>
                    <div class="yes-and-no">
                        <a href="#" class="no-button">
                            No
                        </a>
                        <button class="js-yes-button yes-button">
                            Yes
                        </button>
                    </div>
                `;

            const yesButton = document.querySelector('.js-yes-button');
            yesButton.addEventListener('click', () => {
                changeQuestionPaper(subject);
                changeSubjectName(subject);

                document.querySelector('.js-confirm-message')
                    .innerHTML = `
                        <p>Question paper has been set</p>
                        <p>to <b>${subject}!</b></p>
                        <p style="margin-top: 10px;">
                            Go to
                            <a href="./10-add-remove-questions-page.html" style="
                                color: black;
                            ">
                                <b>add/remove question!</b>
                            </a>
                        </p>
                        <p>If you want to edit questions.</p>
                        <a href="#" class="okay-button">Okay</a>
                    `;
            });
        });
    });

    document.querySelectorAll('.js-open-button')
        .forEach(openButton => {
            let isPaperOpened = false;
            openButton.addEventListener('click', () => {
                const id = openButton.dataset.id;
                if (isPaperOpened === false) {
                    const image = document.querySelector(`.js-open-button-${id} img`);
                    image.src = "../data/icons/expand-less.svg";

                    document.querySelector(`.js-${id}`)
                        .innerHTML = formatPaperAsTable(Object.values(availablePapers)[id-1]);
                    isPaperOpened = !isPaperOpened;
                }
                else {
                    const image = document.querySelector(`.js-open-button-${id} img`);
                    image.src = "../data/icons/expand-more.svg";

                    document.querySelector(`.js-${id}`)
                        .innerHTML = '';
                    isPaperOpened = !isPaperOpened;
                }
            });
        });
}

function formatPaperAsTable(paper) {
    const questionPaper = paper.slice(1, paper.length)
    let paperHTML = `
        <th class="s-no-header">
            No.
        </th>
        <th>
            Questions
        </th>
    `;
    questionPaper.forEach(set => {
        paperHTML += `
            <tr>
                <td class="s-no">${set.id}.</td>
                <td>${set.question}</td>
            </tr>
        `;
    });
    
    return paperHTML;
}