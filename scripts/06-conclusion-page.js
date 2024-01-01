import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { subjectName } from "../data/question-paper.js";

document.title += ` - ${subjectName}`;

document.querySelector('.js-header-label')
    .innerHTML = `${subjectName}`;

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