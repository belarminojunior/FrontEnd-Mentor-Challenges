let dayInput = document.getElementById('dayInput');
let monthInput = document.getElementById('monthInput');
let yearInput = document.getElementById('yearInput');

let dayOutput = document.getElementById('dayOutput');
let monthOutput = document.getElementById('monthOutput');
let yearOutput = document.getElementById('yearOutput');

let submissionBtn = document.getElementById('submissionBtn');
let error = '0.5px solid var(--LIGHT-RED)';

const MAX_VALID_YEAR = new Date().getFullYear();
const MIN_VALID_YEAR = 1700;

submissionBtn.addEventListener('click', () => {
    const BIRTH_DATE = dayInput.value;
    const BIRTH_MONTH = monthInput.value;
    const BIRTH_YEAR = yearInput.value;

    if (validateDay(BIRTH_DATE, BIRTH_MONTH, BIRTH_YEAR)
    && validateMonth(BIRTH_MONTH) && validateYear(BIRTH_DATE, BIRTH_MONTH, BIRTH_YEAR)) {
    } else {
        return;
    }

    let today = new Date();

    // Age Calculation

    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Day handling
    if (currentDate < BIRTH_DATE) {
        currentMonth -= 1;

        days = currentDate + DAYS_PER_MONTH[currentMonth === 0 ? 11 : currentMonth - 1] - BIRTH_DATE;

        days = isLeap(currentYear) && currentMonth >= 2
            ? days += 1
            : days;

    } else {
        days = currentDate - BIRTH_DATE;
    }

    // Month handling
    if (currentMonth < BIRTH_MONTH) {
        currentYear -= 1;
        months = currentMonth + 12 - BIRTH_MONTH;
    } else {
        months = currentMonth - BIRTH_MONTH;
    }

    // Year handling
    years = currentYear - BIRTH_YEAR;


    // Displaying
    yearOutput.innerText = years;
    monthOutput.innerText = months;
    dayOutput.innerText = days;
});

dayInput.addEventListener('blur', () => {

    const D = dayInput.value;
    const M = monthInput.value;
    const Y = yearInput.value;

    if (D == '') {
        showMessage(dayInput, "This field is required", error);
        return false;
    } else if (!validateDay(D, M, Y)) {
        showMessage(dayInput, "Must be a valid day", error);
        return false;
    } else {
        showMessage(dayInput, '', '');
        return true;
    }

});

monthInput.addEventListener('blur', () => {

    const M = monthInput.value;

    if (M == '') {
        showMessage(monthInput, "This field is required", error);
        return false;
    } else if (!validateMonth(M)) {
        showMessage(monthInput, "Must be a valid month", error);
        return false;
    } else {
        showMessage(monthInput, '', '');
        return true;
    }

});

yearInput.addEventListener('blur', () => {

    const D = dayInput.value;
    const M = monthInput.value;
    const Y = yearInput.value;

    if (Y == '') {
        showMessage(yearInput, "This field is required", error);
        return false;
    } else if (!validateYear(D, M, Y)) {
        showMessage(yearInput, "Must be in past", error);
        return false;
    } else {
        showMessage(yearInput, '', '');
        return true;
    }

});

function showMessage(element, msg, border) {
    element.style.border = border;
    element.nextElementSibling.innerText = msg;
}

/*
function validateDate(day, month, year) {

    if (year > MAX_VALID_YEAR || year < MIN_VALID_YEAR)
        return false;
    
    if (month < 1 || month > 12)
        return false;
    
    if (day < 1 || day > 31)
        return false;
    
    // February handling
    if (month == 2) {
        if (isLeap(year)) {
            return (day <= 29);
        } else {
            return (day <= 28);
        }
    }

    if (month == 4 || month == 6 || month == 9 || month == 11)
        return (day <= 30);
    
    return true;

}
*/

function validateDay(day, month, year) {
    if (day < 1 || day > 31)
        return false;
    
    // February handling
    if (month == 2) {
        if (isLeap(year)) {
            return (day <= 29);
        } else {
            return (day <= 28);
        }
    }

    if (month == 4 || month == 6 || month == 9 || month == 11)
        return (day <= 30);
    
    return true;
}

function validateMonth(month) {
    return month >= 1 && month <= 12;
}

function validateYear(day, month, year) {
    const NEWER_DATE = new Date();
    const OLDER_DATE = new Date(`${year}-${month}-${day}`);

    return OLDER_DATE.setHours(0, 0, 0, 0) <= NEWER_DATE.setHours(0, 0, 0, 0);
}

function isLeap(year) {
    return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
}
