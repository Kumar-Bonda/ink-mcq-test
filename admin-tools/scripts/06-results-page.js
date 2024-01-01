import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { userDetails } from "../../data/credentials.js";

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

displayResults();

function displayResults() {
    let accountsInfoHTML = '';
    if (!(userDetails.length)) {
        accountsInfoHTML = `
            <div style="align-items: center;" class="user-result">
                <p style="
                    width: 300px;
                    font-size: 20px;
                    font-weight: bold;
                    justify-content: center;
                ">
                    <img src="../data/icons/no-accounts-icon.svg">
                    &nbsp; No Records
                </p>
            </div>
        `;
    }

    let accountCount = 1;
    userDetails.forEach(account => {
        accountsInfoHTML += `
            <div class="user-result js-${accountCount}">
                <div class="user-info">
                    <p class="label">Account - ${accountCount}</p>
                    <div class="profile-container">
                        <img src="../data//icons/user-profile-icon.svg" class="account-icon">
                        ${addTopScorerTag(account.lastResultDetails.marks)}
                    </div>
                </div>
                <div class="result-details">
                    <div class="first-line">
                        <p class="username">${trimUserName(account.userName)}</p>
                        <p class="marks">
                            Marks: ${account.lastResultDetails.marks}
                        </p>
                    </div>
                    <div class="second-line">
                        <p class="subject-name">
                            ${account.lastResultDetails.subjectName}
                        </p>
                        <p class="total-questions">
                            Total Q's: ${account.lastResultDetails.totalQuestions}
                        </p>
                    </div>
                    <div class="third-line">
                        <p class="attempted">
                            Attempted: ${account.lastResultDetails.attempted}
                        </p>
                        <p class="corrects">
                            Corrects: ${account.lastResultDetails.corrects}
                        </p>
                    </div>
                    <div class="fourth-line">
                        <p class="unattempted">
                            Unattempted: ${account.lastResultDetails.unattempted}
                        </p>
                        <p class="wrongs">
                            Wrongs: ${account.lastResultDetails.wrongs}
                        </p>
                    </div>
                </div>
            </div>
        `;
        accountCount += 1;
    });

    document.querySelector('.js-accounts-container')
        .innerHTML = accountsInfoHTML;
}

function addTopScorerTag(marks) {
    const percentage = eval(marks) * 100;
    let topScorerHTML;
    if ( Number(percentage) >= 75) {
        topScorerHTML = `
            <div class="tag-container">
                <span class="top-scorer-tag">
                    <img src="../data/icons/top-scorer-tag.svg">
                </span>
                <span class="tooltip">Top Scorer</span>
            </div>
        `;
    }
    else
        topScorerHTML = '';
    return topScorerHTML;
}

function trimUserName(username) {
    if (username.length > 14)
        username = username.slice(0, 14) + "...";
    return username;
}