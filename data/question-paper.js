import { availablePapers } from "./available-papers.js";

export let subjectName = JSON.parse(localStorage.getItem('subjectName')) || 'Computer Basics';

export function changeSubjectName(newSubjectName) {
    subjectName = newSubjectName;
    localStorage.setItem('subjectName', JSON.stringify(subjectName));
}

export let questionPaper = JSON.parse(localStorage.getItem('questionPaper')) || availablePapers["Computer Basics"];
if (!questionPaper.length) {
    questionPaper = availablePapers["Computer Basics"];
}

export function changeQuestionPaper(pickedPaper) {
    questionPaper = availablePapers[pickedPaper];
    localStorage.setItem('questionPaper', JSON.stringify(questionPaper));
}