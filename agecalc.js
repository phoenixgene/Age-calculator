class UI {
  display(days, months, years) {
    const out = document.getElementById("output");
    const outListYear = document.createElement("div");
    const outListYears = document.createElement("div");
    outListYear.className =
      "flex space-x-2 font-extrabold text-purple-700 text-4xl italic";
    outListYears.className = "text-black";
    outListYear.innerHTML = `
    <p>${years}</p>
    `;
    outListYears.innerHTML = `
    <p>Years</p>
    `;
    const outListMonth = document.createElement("div");
    const outListMonths = document.createElement("div");
    outListMonth.className =
      "flex space-x-2 font-extrabold text-purple-700 text-4xl italic";
    outListMonths.className = "text-black";
    outListMonth.innerHTML = `
    <p>${months}</p>
    `;
    outListMonths.innerHTML = `
    <p>Months</p>
    `;
    const outListDay = document.createElement("div");
    const outListDays = document.createElement("div");
    outListDay.className =
      "flex space-x-2 font-extrabold text-purple-700 text-4xl italic";
    outListDays.className = "text-black";
    outListDay.innerHTML = `
    <p>${days}</p>
    `;
    outListDays.innerHTML = `
    <p>Days</p>
    `;

    out.appendChild(outListYear);
    out.appendChild(outListMonth);
    out.appendChild(outListDay);
    outListYear.appendChild(outListYears);
    outListMonth.appendChild(outListMonths);
    outListDay.appendChild(outListDays);
    setTimeout(function () {
      document.getElementById("output").remove();
    }, 3000);
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector(".form");
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById("day").value = "";
    document.getElementById("month").value = "";
    document.getElementById("year").value = "";
  }
}

document.getElementById("form").addEventListener("submit", run);
function run(e) {
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const ui = new UI();

  if (day === "" || month === "" || year === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    (month === 4 && day > 30) ||
    (month === 6 && day > 30) ||
    (month === 9 && day > 30) ||
    (month === 11 && day > 30) ||
    (month === 2 &&
      ((year % 4 === 0 && day > 29) || (year % 4 !== 0 && day > 28))) ||
    year > currentYear ||
    (year === currentYear && month > currentMonth) ||
    (year === currentYear && month === currentMonth && day > currentDay)
  ) {
    ui.showAlert("Invalid date of birth.", "error");
  } else {
    const birthDate = new Date(year, month - 1, day);
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(
      ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
    );
    const ageInMonths = Math.floor(
      (ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) /
        (30.44 * 24 * 60 * 60 * 1000)
    );
    const ageInDays = Math.floor(
      (ageInMilliseconds % (30.44 * 24 * 60 * 60 * 1000)) /
        (24 * 60 * 60 * 1000)
    );
    ui.display(ageInDays, ageInMonths, ageInYears);
    ui.showAlert("Age calculated!", "success");
    ui.clearFields();
  }

  e.preventDefault();
}
