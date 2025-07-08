// document.addEventListener("DOMContentLoaded", () => {
//   const calendarEl = document.getElementById("calendar");

//   const now = new Date();
//   const year = now.getFullYear();
//   const month = now.getMonth(); // 0-indexed
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const attendance = JSON.parse(localStorage.getItem("dailyAttendance")) || {};

//   for (let day = 1; day <= daysInMonth; day++) {
//     const dateKey = `${year}-${month + 1}-${day}`;
//     const subjectData = attendance[dateKey];

//     const dayEl = document.createElement("div");
//     dayEl.classList.add("day");

//     // Add today's highlight
//     if (day === now.getDate()) {
//       dayEl.classList.add("today");
//     }

//     // Date text
//     let html = `<span class="date">${day}</span>`;

//     if (subjectData) {
//       html += `<ul class="subject-list">`;
//       Object.keys(subjectData).forEach(subject => {
//         const status = subjectData[subject];
//         const icon = status === "present" ? "✅" : "❌";
//         html += `<li>${icon} ${subject}</li>`;
//       });
//       html += `</ul>`;
//     } else {
//       html += `<p class="no-data">No data</p>`;
//     }

//     dayEl.innerHTML = html;
//     calendarEl.appendChild(dayEl);
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar");
  const username = localStorage.getItem("username");

  if (!username) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const attendance = JSON.parse(localStorage.getItem("dailyAttendance")) || {};

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month + 1}-${day}`;
    const subjectData = attendance[dateKey];

    const dayEl = document.createElement("div");
    dayEl.classList.add("day");

    // Highlight today
    if (day === now.getDate()) {
      dayEl.classList.add("today");
    }

    let html = `<span class="date">${day}</span>`;

    // Show data only if it belongs to the current user
    if (subjectData && subjectData.user === username) {
      html += `<ul class="subject-list">`;
      Object.keys(subjectData).forEach(subject => {
        if (subject === "user") return; // skip user field
        const status = subjectData[subject];
        const icon = status === "present" ? "✅" : "❌";
        html += `<li>${icon} ${subject}</li>`;
      });
      html += `</ul>`;
    } else {
      html += `<p class="no-data">No data</p>`;
    }

    dayEl.innerHTML = html;
    calendarEl.appendChild(dayEl);
  }
});
