// Selectin the 3 input forms for user input
let age_days = document.getElementById("age_days");
let age_month = document.getElementById("age_month");
let age_year = document.getElementById("age_year");
let button = document.querySelector(".button");

let label_day = document.querySelector(".label_day");
let label_month = document.querySelector(".label_month");
let label_year = document.querySelector(".label_year");

let age_result_year = document.getElementById("age_years");
let age_result_months = document.getElementById("age_months");
let age_result_days = document.getElementById("age_days");

// input in number not string
// let day = parseInt(age_days.value);
// let month = parseInt(age_month.value);
// let year = parseInt(age_year.value);

// Number of days in months of the year
// function isLeapYear(year) {
//   return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
// }
// function getDaysInMonth(month, year) {
//   const daysInMonth = {
//     1: 31, // January
//     2: isLeapYear(year) ? 29 : 28, // February
//     3: 31, // March
//     4: 30, // April
//     5: 31, // May
//     6: 30, // June
//     7: 31, // July
//     8: 31, // August
//     9: 30, // September
//     10: 31, // October
//     11: 30, // November
//     12: 31, // December
//   };
//   return daysInMonth[month];
// }

// Erros
let error_day = document.getElementById("day_error");
let error_month = document.getElementById("month_error");
let error_year = document.getElementById("year_error");

// Validating the user inputs
// Validating the Month input
function validateMonth() {
  // the number of days varies with months for example Jan = 31 days, and Jun = 30
  // for the month
  let month = parseInt(age_month.value);
  if (month == "" || isNaN(month)) {
    label_month.style.color = "red";
    age_month.style.borderColor = "red";
    error_month.textContent = "This field is required";
  } else if (month < 1 || month > 12) {
    label_month.style.color = "red";
    age_month.style.borderColor = "red";
    error_month.textContent = "Must be a valid month.";
  } else {
    label_month.style.color = "hsl(0, 1%, 44%)";
    age_month.style.borderColor = "hsl(0, 1%, 44%)";
    error_month.textContent = "";
  }
  return month != "" || !isNaN(month) || month > 1 || month <= 12;
}

// Validating the Year input
function validateYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let year = parseInt(age_year.value);

  if (year == "" || isNaN(year)) {
    label_year.style.color = "red";
    age_year.style.borderColor = "red";
    error_year.textContent = "This field is required";
  } else if (year < 1) {
    label_year.style.color = "red";
    age_year.style.borderColor = "red";
    error_year.textContent = "Must be a valid year";
  } else if (year > currentYear) {
    label_year.style.color = "red";
    age_year.style.borderColor = "red";
    error_year.textContent = "Must be in the past";
  } else {
    label_year.style.color = "hsl(0, 1%, 44%)";
    age_year.style.borderColor = "hsl(0, 1%, 44%)";
    error_year.textContent = "";
  }
  return !isNaN(year) || year != "" || year > 1 || year < currentYear;
}

// Validating the Day input
function validateDay() {
  let month = parseInt(age_month.value);
  let year = parseInt(age_year.value);
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
  function getDaysInMonth(month, year) {
    const daysInMonth = {
      1: 31, // January
      2: isLeapYear(year) ? 29 : 28, // February
      3: 31, // March
      4: 30, // April
      5: 31, // May
      6: 30, // June
      7: 31, // July
      8: 31, // August
      9: 30, // September
      10: 31, // October
      11: 30, // November
      12: 31 // December
    };
    return daysInMonth[month];
  }

  let day = parseInt(age_days.value);
  if (day == "" || isNaN(day)) {
    label_day.style.color = "red";
    age_days.style.borderColor = "red";
    error_day.textContent = "This field is required";
  } else if (day < 1 || day > 31 || day > getDaysInMonth(month, year)) {
    label_day.style.color = "red";
    age_days.style.borderColor = "red";
    error_day.textContent = "Must be a valid day";
  } else {
    label_day.style.color = "hsl(0, 1%, 44%)";
    age_days.style.borderColor = "hsl(0, 1%, 44%)";
    error_day.textContent = "";
  }
  return (
    !isNaN(day) || day != "" || day > 1 || day < getDaysInMonth(month, year)
  );
}

age_days.addEventListener("input", validateDay);
age_month.addEventListener("input", validateMonth);
age_year.addEventListener("input", validateYear);

// first let us create a function that has all the validating functions

button.addEventListener("click", function () {
  // event.preventDefault();

  let day = parseInt(age_days.value);
  let month = parseInt(age_month.value);
  let year = parseInt(age_year.value);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  if (validateDay() && validateMonth() && validateYear()) {
    // if all the fields are valid then we can proceed with the rest of the code
    // Get current date information
    // const currentDate = new Date();
    // let currentDay = currentDate.getDate();
    // let currentMonth = currentDate.getMonth() + 1;
    // let currentYear = currentDate.getFullYear();

    let year_difference = currentYear - year;
    let month_difference = currentMonth - month;
    let day_difference = currentDay - day;

    // age_result_days.textContent = day_difference;

    // if (currentDate < day) {
    //   month_difference = month_difference - 1;
    //   age_result_months.textContent = month_difference;
    // }

    if (day_difference < 0) {
      month_difference -= 1;
      day_difference += new Date(currentYear, currentMonth - 1, 0).getDate();
    }
    if (month_difference < 0) {
      year_difference -= 1;
      month_difference += 12;
    }

    // Displaying the result
    age_result_year.textContent = year_difference;
    age_result_months.textContent = month_difference;
    age_result_days.textContent = day_difference;

    //   const daysInPrevMonth = daysInMonth(currentYear, currentMonth);
    //   day_difference = currentDate + daysInPrevMonth - day;
    //   if (day_difference < 0) {
    //     month_difference = month_difference - 1;
    //     age_result_months.textContent = month_difference;
    //     day_difference = currentDate + daysInPrevMonth - day;
    //     age_days.textContent = day_difference;
    //   }

    //   //   day_difference = day_difference - 1;
    //   //   age_result_days.textContent = day_difference;
    // } else {
    //   age_result_months.textContent = month_difference;
    // }

    // if (currentDate < day) {
    //   day_difference = day_difference - 1;
    //   age_result_days.textContent = day_difference;
    // } else {
    //   age_result_days.textContent = day_difference;
    // }
  }
});
// console.log(validateDay(), validateMonth(), validateYear());
// const currentDate = new Date();
// const currentMonth = currentDate.getMonth() + 1;
// const currentYear = currentDate.getFullYear();

// console.log(currentYear);
