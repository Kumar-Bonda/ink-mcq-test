import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { userDetails } from "../data/credentials.js";

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


document.querySelector('.js-create-button')
    .addEventListener('click', createAccount);

function createAccount() {
    const userName = document.querySelector('.js-user-name').value;
    const password = document.querySelector('.js-password').value;

    if (userName && password) {
        for (let record of userDetails) {
            if (record.userName === userName && record.password === password) {
                document.querySelector('.js-sign-up-result')
                    .innerHTML = `
                        <div class="result-message">
                            <p>
                                Account already
                                <span style="font-weight: bold">
                                    exists!
                                </span>
                            </p>
                            <p>
                                Click on next to
                                <span style="
                                    color: green;
                                    font-weight: bold;
                                ">
                                    Login!
                                </span>
                            </p>
                        </div>
                        <a href="./01-login-page.html" class="next-button">
                            Next
                        </a>
                    `;
                return;
            }
            else if (record.password === password) {
                document.querySelector('.js-sign-up-result')
                    .innerHTML = `
                        <p>
                            Choose different
                            <span style="font-weight: bold">
                                password!
                            </span>
                        </p>
                    `;
                return;
            }
        }
        const timeAndDate = dayjs().format('ddd, hh:mm a, DD/MM/YYYY');
        userDetails.push({userName, password, timeAndDate});
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        
        document.querySelector('.js-sign-up-result')
            .innerHTML = `
                <div class="result-message">
                    <p>
                        Account has been
                        <span style="font-weight: bold">
                            created.
                        </span>
                    </p>
                    <p>
                        Click on next to
                        <span style="
                            color: green;
                            font-weight: bold;
                        ">
                            Login!
                        </span>
                    </p>
                </div>
                <a href="./01-login-page.html" class="next-button">
                    Next
                </a>
            `;
    }
    else if (userName && !password) {
        document.querySelector('.js-sign-up-result')
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
        document.querySelector('.js-sign-up-result')
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
        document.querySelector('.js-sign-up-result')
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

document.querySelector('.js-next-button')
    .addEventListener('click', () => {
        window.open('./01-login-page.html', '_self');
    });