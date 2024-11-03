// Selecting input elements for user input
let age_days = document.getElementById("age_days");
let age_month = document.getElementById("age_month");
let age_year = document.getElementById("age_year");
let button = document.querySelector(".button");

// Output elements for displaying age results
let age_result_years = document.getElementById("age_years");
let age_result_months = document.getElementById("age_months");
let age_result_days = document.getElementById("age_days");

// Error elements for validation feedback
let error_day = document.getElementById("day_error");
let error_month = document.getElementById("month_error");
let error_year = document.getElementById("year_error");

// Validation functions
function validateDay() {
  /*...*/
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
function validateMonth() {
  /*...*/
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
function validateYear() {
  /*...*/
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

// Event listeners for input validation
age_days.addEventListener("input", validateDay);
age_month.addEventListener("input", validateMonth);
age_year.addEventListener("input", validateYear);

// Calculate age on button click
button.addEventListener("click", function () {
  // Parsing input values as integers
  let day = parseInt(age_days.value);
  let month = parseInt(age_month.value);
  let year = parseInt(age_year.value);

  // Ensure inputs are valid before calculation
  if (validateDay() && validateMonth() && validateYear()) {
    // Get current date information
    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1; // Months are 0-based in JS
    let currentYear = currentDate.getFullYear();

    // Calculate the year, month, and day differences
    let ageYears = currentYear - year;
    let ageMonths = currentMonth - month;
    let ageDays = currentDay - day;

    // Adjust if current day is less than birth day
    if (ageDays < 0) {
      ageMonths -= 1;
      ageDays += new Date(currentYear, currentMonth - 1, 0).getDate(); // Days in previous month
    }

    // Adjust if current month is less than birth month
    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    // Display the result
    age_result_years.textContent = ageYears;
    age_result_months.textContent = ageMonths;
    age_result_days.textContent = ageDays;
  }
});
