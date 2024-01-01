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

updateAccountsInfoTable();

document.querySelector('.js-delete-button')
    .addEventListener('click', () => {
        findAccount();
    });

function findAccount() {
    const userName = document.querySelector('.js-user-name').value;
    const password = document.querySelector('.js-password').value;

    if (userName && password) {
        for (let record of userDetails) {
            if (record.userName === userName && record.password === password) {
                document.querySelector('.js-delete-result')
                    .innerHTML = `
                        <p>Are you sure!</p>
                        <p>
                            you want to
                            <span style="
                                color: red;
                                font-weight: bold;
                            ">
                                delete
                            </span>
                            your account
                        </p>
                        <div class="yes-and-no">
                            <a href="#" class="no-button">
                                No
                            </a>
                            <a href="#delete-confirmation" class="js-yes-button yes-button">
                                Yes
                            </a>
                        </div>
                    `;

                document.querySelector('.js-yes-button')
                    .addEventListener('click', () => {
                        deleteAccount(userName, password);
                    });
                return;
            }
        }
        document.querySelector('.js-delete-result')
            .innerHTML = `
                <p style="font-weight: bold">Incorrect Credentials!</p>
                <a href="#" class="okay-button">Okay</a>
            `;
    }
    else if (userName && !password) {
        document.querySelector('.js-delete-result')
            .innerHTML = `
                <p>
                    You didn't enter
                    <span style="font-weight: bold">
                        password!
                    </span>
                </p>
                <a href="#" class="okay-button">Okay</a>
            `;
    }
    else if (!userName && password) {
        document.querySelector('.js-delete-result')
            .innerHTML = `
                <p>
                    You didn't enter
                    <span style="font-weight: bold">
                        username!
                    </span>
                </p>
                <a href="#" class="okay-button">Okay</a>
            `;
    }
    else {
        document.querySelector('.js-delete-result')
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
                <a href="#" class="okay-button">Okay</a>
            `;
    }
}

function deleteAccount(userName, password) {
    for (let record of userDetails) {
        if (record.userName === userName && record.password === password) {
            let index = userDetails.indexOf(record);
            userDetails.splice(index, 1);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            if (!(userDetails.length))
                diplayNoRecords();
            else
                updateAccountsInfoTable();
            return;
        }
    }
}

function updateAccountsInfoTable() {
    let accountsInfoTableHTML = `
        <th>
            <div class="table-header">
                <img src="../data/icons/user-account-icon.svg">
                <p>&nbsp;Accounts</p>
            </div>
        </th>
        <th>
            <div class="table-header">
                <img src="../data/icons/date-icon.svg">
                <p>&nbsp;Date Created</p>
            </div>
        </th>
    `;
    userDetails.forEach(account => {
        accountsInfoTableHTML += `
            <tr>
                <td>${account.userName}</td>
                <td>${account.timeAndDate}</td>
            </tr>
        `;
    });

    document.querySelector('.js-accounts-info-table')
        .innerHTML = accountsInfoTableHTML;
}