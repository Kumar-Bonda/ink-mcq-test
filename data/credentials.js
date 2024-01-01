const adminCredentialsArray = JSON.parse(localStorage.getItem('adminCredentials')) || [];

export const adminCredentials = !(adminCredentialsArray.length)
    ? [
        {
            userName: 'ADMIN-BK',
            password: 'admin-bk@ink-mcq-test',
            timeAndDate: 'Mon, 04:20 pm, 04/12/2023'
        },
        {
            userName: 'ADMIN-MBN',
            password: 'admin-mbn@ink-mcq-test',
            timeAndDate: 'Tues, 04:45 pm, 05/12/2023'
        },
        {
            userName: 'ADMIN-INK',
            password: 'admin@ink',
            timeAndDate: 'Wed, 04:20 pm, 06/12/2023'
        }
    ]
    : adminCredentialsArray;


const credentialsArray = JSON.parse(localStorage.getItem('userDetails')) || [];

export const userDetails = !(credentialsArray.length)
    ? [
        {
            userName: 'Admin-BK',
            password: 'bk@admin',
            timeAndDate: 'Mon, 04:20 pm, 04/12/2023',
            lastResult: "Computer Basics: 10/20",
            lastResultDetails: {
                marks: '10/20',
                subjectName: 'Computer Basics',
                totalQuestions: 10,
                attempted: 10,
                unattempted: 0,
                corrects: 5,
                wrongs: 5
            }
        },
        {
            userName: 'Virat-Kohli',
            password: 'vk@18',
            timeAndDate: 'Mon, 04:45 pm, 04/12/2023',
            lastResult: "Computer Basics: 12/20",
            lastResultDetails: {
                marks: '12/20',
                subjectName: 'Computer Basics',
                totalQuestions: 10,
                attempted: 10,
                unattempted: 0,
                corrects: 6,
                wrongs: 4
            }
        },
        {
            userName: 'Sachin-Tendulkar',
            password: 'sachin@10',
            timeAndDate: 'Tues, 04:20 pm, 05/12/2023',
            lastResult: "Computer Basics: 14/20",
            lastResultDetails: {
                marks: '14/20',
                subjectName: 'Computer Basics',
                totalQuestions: 10,
                attempted: 10,
                unattempted: 0,
                corrects: 7,
                wrongs: 3
            }
        },
        {
            userName: 'MS-Dhoni',
            password: 'msd@07',
            timeAndDate: 'Tues, 04:45 pm, 05/12/2023',
            lastResult: "Computer Basics: 16/20",
            lastResultDetails: {
                marks: '16/20',
                subjectName: 'Computer Basics',
                totalQuestions: 10,
                attempted: 10,
                unattempted: 0,
                corrects: 8,
                wrongs: 2
            }
        },
        {
            userName: 'Bhuvaneswar-Kumar',
            password: 'bhuvi@15',
            timeAndDate: 'Wed, 04:20 pm, 06/12/2023',
            lastResult: "Computer Basics: 18/20",
            lastResultDetails: {
                marks: '18/20',
                subjectName: 'Computer Basics',
                totalQuestions: 10,
                attempted: 10,
                unattempted: 0,
                corrects: 9,
                wrongs: 1
            }
        },
        {
            userName: 'M-Shami',
            password: 'shami@11',
            timeAndDate: 'Wed, 04:45 pm, 06/12/2023',
            lastResult: "Computer Basics: 20/20",
            lastResultDetails: {
                marks: '20/20',
                subjectName: 'Computer Basics',
                totalQuestions: 10,
                attempted: 10,
                unattempted: 0,
                corrects: 10,
                wrongs: 0
            }
        }
    ]
    : credentialsArray;

export function updateLastResult(username, result) {
    for (let set of userDetails) {
        if (set.userName === username) {
            set.lastResult = result;
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            return;
        }
    }
}

export function updateLastResultDetails(username, resultDetails) {
    for (let set of userDetails) {
        if (set.userName === username) {
            set.lastResultDetails = resultDetails;
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            return;
        }
    }
}