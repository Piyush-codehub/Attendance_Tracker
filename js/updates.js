// // document.addEventListener("DOMContentLoaded", () => {
// //   const form = document.getElementById("attendance-form");
// //   const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];
// //   const today = new Date();
// //   const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
// //   const attendance = JSON.parse(localStorage.getItem("dailyAttendance")) || {};
// //   const selections = {};

// //   // Reset flag from previous session (if reset was used)
// //   if (localStorage.getItem("justReset") === "true") {
// //     localStorage.removeItem("justReset");
// //   }

// //   // 🚫 Block re-submission for today
// //   if (attendance[dateKey]) {
// //     form.innerHTML = `
// //       <h2 style="color: green;">✅ You’ve already submitted attendance for today.</h2>
// //       <p>Come back tomorrow to mark again!</p>
// //       <button id="reset-attendance" style="margin-top: 10px; padding: 10px 15px;">🔁 Reset Today</button>
// //     `;
// //     form.style.textAlign = "center";

// //     document.getElementById("reset-attendance").addEventListener("click", () => {
// //       if (confirm("Are you sure you want to reset today's attendance?")) {
// //         subjects.forEach(subject => {
// //           const status = attendance[dateKey][subject];
// //           if (!status) return;

// //           let stats = JSON.parse(localStorage.getItem(subject)) || { present: 0, absent: 0, total: 0 };
// //           if (status === "present") stats.present = Math.max(0, stats.present - 1);
// //           if (status === "absent") stats.absent = Math.max(0, stats.absent - 1);
// //           stats.total = Math.max(0, stats.total - 1);
// //           localStorage.setItem(subject, JSON.stringify(stats));
// //         });

// //         delete attendance[dateKey];
// //         localStorage.setItem("dailyAttendance", JSON.stringify(attendance));
// //         localStorage.setItem("justReset", "true");
// //         location.reload();
// //       }
// //     });

// //     return;
// //   }

// //   // ✅ BIOMETRIC marked and locked
// //   const biometricBtn = document.querySelector('.mark[data-subject="BIOMETRIC"]');
// //   if (biometricBtn) {
// //     selections["BIOMETRIC"] = "present";
// //     biometricBtn.textContent = "✅ Present";
// //     biometricBtn.style.backgroundColor = "#28a745";
// //     biometricBtn.style.color = "#fff";
// //     biometricBtn.disabled = true;
// //     biometricBtn.style.cursor = "not-allowed";
// //   }

// //   // Toggle logic for other subjects
// //   document.querySelectorAll(".mark").forEach(button => {
// //     const subject = button.dataset.subject;
// //     if (subject === "BIOMETRIC") return;

// //     button.addEventListener("click", () => {
// //       const current = selections[subject] || "none";

// //       if (current === "none") {
// //         selections[subject] = "present";
// //         button.textContent = "✅ Present";
// //         button.style.backgroundColor = "#28a745";
// //         button.style.color = "#fff";
// //       } else if (current === "present") {
// //         selections[subject] = "absent";
// //         button.textContent = "❌ Absent";
// //         button.style.backgroundColor = "#dc3545";
// //         button.style.color = "#fff";
// //       } else {
// //         selections[subject] = "none";
// //         button.textContent = "Mark";
// //         button.style.backgroundColor = "";
// //         button.style.color = "";
// //       }
// //     });
// //   });

// //   // 📌 Submit handler
// //   form.addEventListener("submit", (e) => {
// //     e.preventDefault();

// //     // Ensure BIOMETRIC is included
// //     selections["BIOMETRIC"] = "present";

// //     const dailyData = JSON.parse(localStorage.getItem("dailyAttendance")) || {};

// //     // Reverse old stats (if any)
// //     if (dailyData[dateKey]) {
// //       subjects.forEach(subject => {
// //         const oldStatus = dailyData[dateKey][subject];
// //         if (!oldStatus) return;

// //         let stats = JSON.parse(localStorage.getItem(subject)) || { present: 0, absent: 0, total: 0 };
// //         if (oldStatus === "present") stats.present = Math.max(0, stats.present - 1);
// //         if (oldStatus === "absent") stats.absent = Math.max(0, stats.absent - 1);
// //         stats.total = Math.max(0, stats.total - 1);
// //         localStorage.setItem(subject, JSON.stringify(stats));
// //       });
// //     }

// //     // Save new stats and calendar entry
// //     dailyData[dateKey] = {};
// //     subjects.forEach(subject => {
// //       const status = selections[subject];
// //       if (status && status !== "none") {
// //         dailyData[dateKey][subject] = status;

// //         let stats = JSON.parse(localStorage.getItem(subject)) || { present: 0, absent: 0, total: 0 };
// //         if (status === "present") stats.present += 1;
// //         if (status === "absent") stats.absent += 1;
// //         stats.total += 1;
// //         localStorage.setItem(subject, JSON.stringify(stats));
// //       }
// //     });

// //     localStorage.setItem("dailyAttendance", JSON.stringify(dailyData));
// //     alert("✅ Attendance saved!");
// //     window.location.href = "index.html";
// //   });
// // });

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("attendance-form");
//   const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];
//   const today = new Date();
//   const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
//   const username = localStorage.getItem("username");
//   const selections = {};

//   if (!username) {
//     alert("Please login first.");
//     window.location.href = "login.html";
//     return;
//   }

//   const dailyData = JSON.parse(localStorage.getItem("dailyAttendance")) || {};

//   // 🔄 Reset flag if previously used
//   if (localStorage.getItem("justReset") === "true") {
//     localStorage.removeItem("justReset");
//   }

//   // 🔒 Check if today's attendance already submitted by this user
//   if (dailyData[dateKey] && dailyData[dateKey].user === username) {
//     form.innerHTML = `
//       <h2 style="color: green;">✅ You’ve already submitted attendance for today.</h2>
//       <p>Come back tomorrow to mark again!</p>
//       <button id="reset-attendance" style="margin-top: 10px; padding: 10px 15px;">🔁 Reset Today</button>
//     `;
//     form.style.textAlign = "center";

//     document.getElementById("reset-attendance").addEventListener("click", () => {
//       if (confirm("Are you sure you want to reset today's attendance?")) {
//         // Reverse stats
//         subjects.forEach(subject => {
//           const status = dailyData[dateKey][subject];
//           if (!status) return;

//           let stats = JSON.parse(localStorage.getItem(subject)) || { present: 0, absent: 0, total: 0 };
//           if (status === "present") stats.present = Math.max(0, stats.present - 1);
//           if (status === "absent") stats.absent = Math.max(0, stats.absent - 1);
//           stats.total = Math.max(0, stats.total - 1);
//           localStorage.setItem(subject, JSON.stringify(stats));
//         });

//         // Remove this user's record for today
//         delete dailyData[dateKey];
//         localStorage.setItem("dailyAttendance", JSON.stringify(dailyData));
//         localStorage.setItem("justReset", "true");
//         location.reload();
//       }
//     });

//     return;
//   }

//   // ✅ Lock BIOMETRIC
//   const biometricBtn = document.querySelector('.mark[data-subject="BIOMETRIC"]');
//   if (biometricBtn) {
//     selections["BIOMETRIC"] = "present";
//     biometricBtn.textContent = "✅ Present";
//     biometricBtn.style.backgroundColor = "#28a745";
//     biometricBtn.style.color = "#fff";
//     biometricBtn.disabled = true;
//     biometricBtn.style.cursor = "not-allowed";
//   }

//   // Toggle subject buttons
//   document.querySelectorAll(".mark").forEach(button => {
//     const subject = button.dataset.subject;
//     if (subject === "BIOMETRIC") return;

//     button.addEventListener("click", () => {
//       const current = selections[subject] || "none";

//       if (current === "none") {
//         selections[subject] = "present";
//         button.textContent = "✅ Present";
//         button.style.backgroundColor = "#28a745";
//         button.style.color = "#fff";
//       } else if (current === "present") {
//         selections[subject] = "absent";
//         button.textContent = "❌ Absent";
//         button.style.backgroundColor = "#dc3545";
//         button.style.color = "#fff";
//       } else {
//         selections[subject] = "none";
//         button.textContent = "Mark";
//         button.style.backgroundColor = "";
//         button.style.color = "";
//       }
//     });
//   });

//   // 🔘 Submit Attendance
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     selections["BIOMETRIC"] = "present"; // always forced

//     // Reverse any old stats if the same user already submitted (unlikely with above check, but safe)
//     if (dailyData[dateKey] && dailyData[dateKey].user === username) {
//       subjects.forEach(subject => {
//         const oldStatus = dailyData[dateKey][subject];
//         if (!oldStatus) return;

//         let stats = JSON.parse(localStorage.getItem(subject)) || { present: 0, absent: 0, total: 0 };
//         if (oldStatus === "present") stats.present = Math.max(0, stats.present - 1);
//         if (oldStatus === "absent") stats.absent = Math.max(0, stats.absent - 1);
//         stats.total = Math.max(0, stats.total - 1);
//         localStorage.setItem(subject, JSON.stringify(stats));
//       });
//     }

//     // ✅ Save new data
//     dailyData[dateKey] = { user: username };
//     subjects.forEach(subject => {
//       const status = selections[subject];
//       if (status && status !== "none") {
//         dailyData[dateKey][subject] = status;

//         let stats = JSON.parse(localStorage.getItem(subject)) || { present: 0, absent: 0, total: 0 };
//         if (status === "present") stats.present += 1;
//         if (status === "absent") stats.absent += 1;
//         stats.total += 1;
//         localStorage.setItem(subject, JSON.stringify(stats));
//       }
//     });

//     localStorage.setItem("dailyAttendance", JSON.stringify(dailyData));
//     alert("✅ Attendance saved!");
//     window.location.href = "index.html";
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("attendance-form");
  const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const username = localStorage.getItem("username");
  const selections = {};

  if (!username) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  const dailyData = JSON.parse(localStorage.getItem("dailyAttendance")) || {};
  let userStats = JSON.parse(localStorage.getItem("userStats")) || {};

  // Ensure user entry exists
  if (!userStats[username]) {
    userStats[username] = {};
  }

  // If already marked today
  if (dailyData[dateKey] && dailyData[dateKey].user === username) {
    form.innerHTML = `
      <h2>✅ You’ve already submitted attendance for today.</h2><br>
      <p>Come back tomorrow to mark again!</p>
      <button id="reset-attendance">🔁 Reset Today</button>
    `;
    form.style.textAlign = "center";

    document.getElementById("reset-attendance").addEventListener("click", () => {
      if (confirm("Are you sure you want to reset today's attendance?")) {
        subjects.forEach(subject => {
          const status = dailyData[dateKey][subject];
          if (!status) return;

          let stats = userStats[username][subject] || { present: 0, absent: 0, total: 0 };
          if (status === "present") stats.present = Math.max(0, stats.present - 1);
          if (status === "absent") stats.absent = Math.max(0, stats.absent - 1);
          stats.total = Math.max(0, stats.total - 1);
          userStats[username][subject] = stats;
        });

        delete dailyData[dateKey];
        localStorage.setItem("userStats", JSON.stringify(userStats));
        localStorage.setItem("dailyAttendance", JSON.stringify(dailyData));
        location.reload();
      }
    });
    return;
  }

  // Auto-mark biometric
  const biometricBtn = document.querySelector('.mark[data-subject="BIOMETRIC"]');
  if (biometricBtn) {
    selections["BIOMETRIC"] = "present";
    biometricBtn.textContent = "✅ Present";
    biometricBtn.style.backgroundColor = "#28a745";
    biometricBtn.style.color = "#fff";
    biometricBtn.disabled = true;
  }

  document.querySelectorAll(".mark").forEach(button => {
    const subject = button.dataset.subject;
    if (subject === "BIOMETRIC") return;

    button.addEventListener("click", () => {
      const current = selections[subject] || "none";
      let next = current === "none" ? "present" : current === "present" ? "absent" : "none";

      selections[subject] = next;

      button.textContent =
        next === "present" ? "✅ Present" :
        next === "absent" ? "❌ Absent" : "Mark";

      button.style.backgroundColor =
        next === "present" ? "#28a745" :
        next === "absent" ? "#dc3545" : "";

      button.style.color = next !== "none" ? "#fff" : "";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    selections["BIOMETRIC"] = "present";
    dailyData[dateKey] = { user: username };

    subjects.forEach(subject => {
      const status = selections[subject];
      if (!status || status === "none") return;

      dailyData[dateKey][subject] = status;

      let stats = userStats[username][subject] || { present: 0, absent: 0, total: 0 };
      if (status === "present") stats.present += 1;
      if (status === "absent") stats.absent += 1;
      stats.total += 1;

      userStats[username][subject] = stats;
    });

    localStorage.setItem("dailyAttendance", JSON.stringify(dailyData));
    localStorage.setItem("userStats", JSON.stringify(userStats));

    alert("✅ Attendance saved!");
    window.location.href = "dashboard.html";
  });
});
