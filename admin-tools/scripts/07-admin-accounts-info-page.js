import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { adminCredentials } from "../../data/credentials.js";

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

let adminsInfoHTML = '';
let accountCount = 1;
adminCredentials.forEach(account => {
    adminsInfoHTML += `
        <div class="account-details">
            <div class="account-label">Admin - ${accountCount}</div>
            <div class="username-line">
                <p>
                    <img src="../data/icons/admin-account-icon.svg">
                    &nbsp; ${account.userName}
                </p>
                <div class="tooltip">Username</div>
            </div>
            <div class="password-line">
                <p>
                    <img src="../data/icons/password-icon.svg">
                    &nbsp; ${account.password}
                </p>
                <div class="tooltip">Password</div>
            </div>
            <div class="date-line">
                <p>
                    <img src="../data/icons/date-icon.svg">
                    &nbsp; ${account.timeAndDate}
                </p>
                <div class="tooltip">Account Created Date</div>
            </div>
        </div>
    `;
    accountCount += 1;
});

document.querySelector('.js-accounts-info-container')
    .innerHTML = adminsInfoHTML;