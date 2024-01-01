import { questionPaper } from "./question-paper.js";
const currentPaper = questionPaper.slice(1, questionPaper.length);

export let currentUser = localStorage.getItem('currentUser') || 'No Username';

export function updateCurrentUser(username) {
    currentUser = username;
    localStorage.setItem('currentUser', currentUser);
}

export let userPickedAnswers = JSON.parse(localStorage.getItem('userPickedAnswers')) || [];

export function updateUserPickedAnswers(questionId, pickedAnswer) {
    const newPickedSet = { questionId, pickedAnswer};

    let matchedSet;
    for (let record of userPickedAnswers) {
        if (record.questionId === questionId)
            matchedSet = record;
    }

    if (matchedSet) {
        const index = userPickedAnswers.indexOf(matchedSet);
        userPickedAnswers.splice(index, 1, newPickedSet);
    }
    else
        userPickedAnswers.push(newPickedSet);

    localStorage.setItem('userPickedAnswers', JSON.stringify(userPickedAnswers));
}

export function resetUserPickedAnswers() {
    userPickedAnswers = [];
    localStorage.setItem('userPickedAnswers', JSON.stringify(userPickedAnswers));
}

export let userResults = JSON.parse(localStorage.getItem('userResults')) || {
    attempted: 0,
    unattempted: 0,
    correctAnswers: 0,
    wrongAnswers: 0
};

export function updateUserResults() {
    updateAttempted(userPickedAnswers.length);
    for (let set of userPickedAnswers) {
        for (let questionSet of currentPaper) {
            if (set.questionId === questionSet.id) {
                if (set.pickedAnswer === questionSet.answer)
                    updateCorrectAnswers();
                else
                    updateWrongAnswers();
                break;
            }
        }
    }
}

export function updateAttempted(attempted) {
    userResults.attempted = attempted;
    userResults.unattempted = currentPaper.length - userResults.attempted;
    localStorage.setItem('userResults', JSON.stringify(userResults));
}

export function updateCorrectAnswers() {
    userResults.correctAnswers++;
    localStorage.setItem('userResults', JSON.stringify(userResults));
}

export function updateWrongAnswers() {
    userResults.wrongAnswers++;
    localStorage.setItem('userResults', JSON.stringify(userResults));
}

export function resetUserResults() {
    userResults = {
        attempted: 0,
        unattempted: 0,
        correctAnswers: 0,
        wrongAnswers: 0
    };
    localStorage.setItem('userResults', JSON.stringify(userResults));
}