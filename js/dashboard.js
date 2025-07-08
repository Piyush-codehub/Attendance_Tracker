// // // // function loadAttendance() {
// // // //   const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];

// // // //   subjects.forEach(subject => {
// // // //     const stats = JSON.parse(localStorage.getItem(subject)) || { present: 0, absent: 0, total: 0 };
// // // //     const percent = stats.total ? Math.round((stats.present / stats.total) * 100) : 0;

// // // //     // Update stats
// // // //     const statBox = document.getElementById(`${subject.toLowerCase()}-stats`);
// // // //     if (statBox) {
// // // //       statBox.innerHTML = `
// // // //         <p>Present: ${stats.present}</p>
// // // //         <p>Absent: ${stats.absent}</p>
// // // //         <p>Total: ${stats.total}</p>
// // // //       `;
// // // //     }

// // // //     // Circular progress
// // // //     const progressEl = document.querySelector(`.${subject.toLowerCase()} .circular-progress`);
// // // //     if (progressEl) {
// // // //       progressEl.setAttribute("data-progress", percent);
// // // //       progressEl.querySelector(".value").innerText = `${percent}%`;
// // // //       progressEl.style.background = `conic-gradient(#3498db ${percent * 3.6}deg, #ddd ${percent * 3.6}deg)`;
// // // //     }
// // // //   });
// // // // }

// // // // function loadProfile() {
// // // //   const name = localStorage.getItem("name") || "Your Name";
// // // //   const branch = localStorage.getItem("branch") || "Branch";
// // // //   const sem = localStorage.getItem("sem") || "Semester";

// // // //   document.getElementById("dash-name").textContent = name;
// // // //   document.getElementById("dash-branch").textContent = branch;
// // // //   document.getElementById("dash-sem").textContent = `${sem} sem`;
// // // // }

// // // // document.addEventListener("DOMContentLoaded", () => {
// // // //   loadAttendance();
// // // //   loadProfile();
// // // // });

// // // function loadAttendance() {
// // //   const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];

// // //   subjects.forEach(subject => {
// // //     const stats = JSON.parse(localStorage.getItem(subject)) || { present: 0, absent: 0, total: 0 };
// // //     const percent = stats.total ? Math.round((stats.present / stats.total) * 100) : 0;

// // //     // Update stats
// // //     const statBox = document.getElementById(`${subject.toLowerCase()}-stats`);
// // //     if (statBox) {
// // //       statBox.innerHTML = `
// // //         <p>Present: ${stats.present}</p>
// // //         <p>Absent: ${stats.absent}</p>
// // //         <p>Total: ${stats.total}</p>
// // //       `;
// // //     }

// // //     // Circular progress
// // //     const progressEl = document.querySelector(`.${subject.toLowerCase()} .circular-progress`);
// // //     if (progressEl) {
// // //       const progressColor = percent < 75 ? "#fa0505" : "#0de046"; // red if < 75%, green otherwise
// // //       progressEl.setAttribute("data-progress", percent);
// // //       progressEl.querySelector(".value").innerText = `${percent}%`;
// // //       progressEl.querySelector(".value").style.color = progressColor;
// // //       progressEl.style.background = `conic-gradient(${progressColor} ${percent * 3.6}deg, #ddd ${percent * 3.6}deg)`;
// // //     }
// // //   });
// // // }

// // // function loadProfile() {
// // //   const name = localStorage.getItem("name") || "Your Name";
// // //   const branch = localStorage.getItem("branch") || "Branch";
// // //   const sem = localStorage.getItem("sem") || "Semester";

// // //   document.getElementById("dash-name").textContent = name;
// // //   document.getElementById("dash-branch").textContent = branch;
// // //   document.getElementById("dash-sem").textContent = `${sem} sem`;
// // // }

// // // document.addEventListener("DOMContentLoaded", () => {
// // //   loadAttendance();
// // //   loadProfile();
// // // });

// // function loadAttendance(filter = "all") {
// //   const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];
// //   const today = new Date();
// //   const dailyData = JSON.parse(localStorage.getItem("dailyAttendance")) || {};

// //   subjects.forEach(subject => {
// //     let present = 0;
// //     let absent = 0;
// //     let total = 0;

// //     for (const dateKey in dailyData) {
// //       const record = dailyData[dateKey];
// //       const [y, m, d] = dateKey.split("-").map(Number);
// //       const date = new Date(y, m - 1, d);

// //       if (filter === "week") {
// //         const todayDay = today.getDay(); // 0 (Sun) to 6 (Sat)
// //         const monday = new Date(today);
// //         monday.setDate(today.getDate() - ((todayDay + 6) % 7)); // most recent Monday
// //         if (date < monday) continue; // skip older
// //       }

// //       if (record[subject] === "present") present++;
// //       if (record[subject] === "absent") absent++;
// //       if (record[subject]) total++;
// //     }


// //     const percent = total ? Math.round((present / total) * 100) : 0;

// //     // Update stats UI
// //     const statBox = document.getElementById(`${subject.toLowerCase()}-stats`);
// //     if (statBox) {
// //       statBox.innerHTML = `
// //         <p>Present: ${present}</p>
// //         <p>Absent: ${absent}</p>
// //         <p>Total: ${total}</p>
// //       `;
// //     }

// //     // Update circular progress ring
// //     const progressEl = document.querySelector(`.${subject.toLowerCase()} .circular-progress`);
// //     if (progressEl) {
// //       const color = percent < 75 ? "#fa0505" : "#0de046";
// //       progressEl.setAttribute("data-progress", percent);
// //       progressEl.querySelector(".value").innerText = `${percent}%`;
// //       progressEl.querySelector(".value").style.color = color;
// //       progressEl.style.background = `conic-gradient(${color} ${percent * 3.6}deg, #ddd ${percent * 3.6}deg)`;
// //     }
// //   });
// // }

// // function loadProfile() {
// //   const name = localStorage.getItem("name") || "Your Name";
// //   const branch = localStorage.getItem("branch") || "Branch";
// //   const sem = localStorage.getItem("sem") || "Semester";

// //   document.getElementById("dash-name").textContent = name;
// //   document.getElementById("dash-branch").textContent = branch;
// //   document.getElementById("dash-sem").textContent = `${sem} sem`;
// // }

// // document.addEventListener("DOMContentLoaded", () => {
// //   loadAttendance(); // default = all data
// //   loadProfile();

// //   const thisWeekBtn = document.getElementById("this-week");
// //   const uptoBtn = document.getElementById("upto");

// //   if (thisWeekBtn && uptoBtn) {
// //     thisWeekBtn.addEventListener("click", () => {
// //       loadAttendance("week");
// //       thisWeekBtn.classList.add("active");
// //       uptoBtn.classList.remove("active");
// //     });

// //     uptoBtn.addEventListener("click", () => {
// //       loadAttendance("all");
// //       uptoBtn.classList.add("active");
// //       thisWeekBtn.classList.remove("active");
// //     });

// //     // Highlight "Upto" by default
// //     uptoBtn.classList.add("active");
// //   }
// // });

// function loadAttendance(filter = "all") {
//   const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];
//   const today = new Date();
//   const currentUsername = localStorage.getItem("username");

//   if (!currentUsername) return;

//   const dailyDataAll = JSON.parse(localStorage.getItem("dailyAttendance")) || {};
//   const dailyData = Object.fromEntries(
//     Object.entries(dailyDataAll).filter(
//       ([, value]) => value.user === currentUsername
//     )
//   );

//   subjects.forEach(subject => {
//     let present = 0;
//     let absent = 0;
//     let total = 0;

//     for (const dateKey in dailyData) {
//       const record = dailyData[dateKey];
//       const [y, m, d] = dateKey.split("-").map(Number);
//       const date = new Date(y, m - 1, d);

//       if (filter === "week") {
//         const todayDay = today.getDay(); // 0 = Sunday, 1 = Monday...
//         const monday = new Date(today);
//         monday.setDate(today.getDate() - ((todayDay + 6) % 7)); // back to most recent Monday
//         if (date < monday) continue;
//       }

//       if (record[subject] === "present") present++;
//       if (record[subject] === "absent") absent++;
//       if (record[subject]) total++;
//     }

//     const percent = total ? Math.round((present / total) * 100) : 0;

//     // Update stats UI
//     const statBox = document.getElementById(`${subject.toLowerCase()}-stats`);
//     if (statBox) {
//       statBox.innerHTML = `
//         <p>Present: ${present}</p>
//         <p>Absent: ${absent}</p>
//         <p>Total: ${total}</p>
//       `;
//     }

//     // Update circular progress ring
//     const progressEl = document.querySelector(`.${subject.toLowerCase()} .circular-progress`);
//     if (progressEl) {
//       const color = percent < 75 ? "#fa0505" : "#0de046";
//       progressEl.setAttribute("data-progress", percent);
//       progressEl.querySelector(".value").innerText = `${percent}%`;
//       progressEl.querySelector(".value").style.color = color;
//       progressEl.style.background = `conic-gradient(${color} ${percent * 3.6}deg, #ddd ${percent * 3.6}deg)`;
//     }
//   });
// }

// function loadProfile() {
//   const username = localStorage.getItem("username");
//   const users = JSON.parse(localStorage.getItem("users")) || [];
//   const currentUser = users.find(user => user.username === username);

//   if (!currentUser) return;

//   const fullName = currentUser.firstName && currentUser.lastName
//     ? `${currentUser.firstName} ${currentUser.lastName}`
//     : username;

//   document.getElementById("dash-name").textContent = fullName;
//   document.getElementById("dash-branch").textContent = currentUser.branch || "Branch";
//   document.getElementById("dash-sem").textContent = (currentUser.sem || "Semester") + " sem";
// }

// document.addEventListener("DOMContentLoaded", () => {
//   loadAttendance(); // Load all attendance by default
//   loadProfile();

//   const thisWeekBtn = document.getElementById("this-week");
//   const uptoBtn = document.getElementById("upto");

//   if (thisWeekBtn && uptoBtn) {
//     thisWeekBtn.addEventListener("click", () => {
//       loadAttendance("week");
//       thisWeekBtn.classList.add("active");
//       uptoBtn.classList.remove("active");
//     });

//     uptoBtn.addEventListener("click", () => {
//       loadAttendance("all");
//       uptoBtn.classList.add("active");
//       thisWeekBtn.classList.remove("active");
//     });

//     // Default to "Upto"
//     uptoBtn.classList.add("active");
//   }
// });

function loadAttendance() {
  const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];
  const username = localStorage.getItem("username");
  if (!username) return;

  const userStats = JSON.parse(localStorage.getItem("userStats")) || {};
  const userData = userStats[username] || {};

  subjects.forEach(subject => {
    const stats = userData[subject] || { present: 0, absent: 0, total: 0 };
    const percent = stats.total ? Math.round((stats.present / stats.total) * 100) : 0;

    const statBox = document.getElementById(`${subject.toLowerCase()}-stats`);
    if (statBox) {
      statBox.innerHTML = `
        <p>Present: ${stats.present}</p>
        <p>Absent: ${stats.absent}</p>
        <p>Total: ${stats.total}</p>
      `;
    }

    const progressEl = document.querySelector(`.${subject.toLowerCase()} .circular-progress`);
    if (progressEl) {
      const color = percent < 75 ? "#fa0505" : "#0de046";
      progressEl.setAttribute("data-progress", percent);
      progressEl.querySelector(".value").innerText = `${percent}%`;
      progressEl.querySelector(".value").style.color = color;
      progressEl.style.background = `conic-gradient(${color} ${percent * 3.6}deg, #ddd ${percent * 3.6}deg)`;
    }
  });
}

function loadProfile() {
  const username = localStorage.getItem("username");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find(u => u.username === username);

  if (!currentUser) return;

  const name = currentUser.firstName && currentUser.lastName
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : currentUser.username;

  document.getElementById("dash-name").textContent = name;
  document.getElementById("dash-branch").textContent = currentUser.branch || "Branch";
  document.getElementById("dash-sem").textContent = `${currentUser.sem || "Semester"} sem`;
}

document.addEventListener("DOMContentLoaded", () => {
  loadAttendance();
  loadProfile();
});
