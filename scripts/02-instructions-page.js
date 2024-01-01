import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { questionPaper } from "../data/question-paper.js";

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

const questionsCount = questionPaper.length - 1;
document.querySelector('.js-question-count')
    .innerHTML = questionsCount;