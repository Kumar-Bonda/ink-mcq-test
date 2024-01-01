import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { userDetails } from "../data/credentials.js";
import { updateCurrentUser } from "../data/user-stats.js";

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


document.querySelector('.js-login-button')
    .addEventListener('click', () => {
        submitCredentials();
    });

function submitCredentials() {
    const userName = document.querySelector('.js-user-name').value;
    const password = document.querySelector('.js-password').value;

    if (userName && password) {
        for (let record of userDetails) {
            if (record.userName === userName && record.password === password) {
                document.querySelector('.js-login-result')
                    .innerHTML = `
                        <div class="result-message">
                            <p>
                                Credentials
                                <span style="font-weight: bold">
                                    Found!
                                </span>
                            </p>
                            <p>
                                Click on next to
                                <span style="
                                    color: green;
                                    font-weight: bold;
                                ">
                                    Continue!
                                </span>
                            </p>
                        </div>
                        <a href="./02-instructions-page.html"
                        class="instructions-link">
                            Next
                        </a>
                    `;
                    
                updateCurrentUser(userName);
                return;
            }
        }
        document.querySelector('.js-login-result')
            .innerHTML = `
                <div class="result-message">
                    <p>
                        Seems like you're
                        <span style="font-weight: bold">
                            not signed!
                        </span>
                    </p>
                    <p>
                        Click on
                        <span style="
                            color: green;
                            font-weight: bold;
                        ">
                            sign up!
                        </span>
                    </p>
                </div>
                <a href="./index.html" class="sign-up-link">Sign Up</a>
            `;
    }
    else if (userName && !password) {
        document.querySelector('.js-login-result')
            .innerHTML = `
                <p>
                    You didn't enter
                    <span style="font-weight: bold">
                        password!
                    </span>
                </p>
            `;
    }
    else if (!userName && password) {
        document.querySelector('.js-login-result')
            .innerHTML = `
                <p>
                    You didn't enter
                    <span style="font-weight: bold">
                        username!
                    </span>
                </p>
            `;
    }
    else {
        document.querySelector('.js-login-result')
            .innerHTML = `
                <div class="result-message">
                    <p>
                        You didn't enter
                    </p>
                    <p>
                        <span style="font-weight: bold">
                            username
                        </span>
                        and
                        <span style="font-weight: bold">
                            password!
                        </span>
                    </p>
                </div>
            `;
    }
}

document.querySelector('.js-back-button')
    .addEventListener('click', () => {
        window.open('./index.html', '_self');
    });