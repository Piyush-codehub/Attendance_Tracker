// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.getElementById("edit-form");
//     const dateInput = document.getElementById("edit-date");
//     const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];
//     const selections = {};

//     // Set max date = today
//     dateInput.max = new Date().toISOString().split("T")[0];

//     // ✅ Default BIOMETRIC to present
//     const biometricBtn = document.querySelector('.mark[data-subject="BIOMETRIC"]');
//     if (biometricBtn) {
//         selections["BIOMETRIC"] = "present";
//         biometricBtn.textContent = "✅ Present";
//         biometricBtn.style.backgroundColor = "#28a745";
//         biometricBtn.style.color = "#fff";
//     }

//     // Button toggle logic
//     document.querySelectorAll(".mark").forEach(button => {
//         button.addEventListener("click", () => {
//             const subject = button.dataset.subject;
//             const current = selections[subject] || "none";

//             let next;
//             if (current === "none") {
//                 next = "present";
//                 button.textContent = "✅ Present";
//                 button.style.backgroundColor = "#28a745";
//                 button.style.color = "#fff";
//             } else if (current === "present") {
//                 next = "absent";
//                 button.textContent = "❌ Absent";
//                 button.style.backgroundColor = "#dc3545";
//                 button.style.color = "#fff";
//             } else {
//                 next = "none";
//                 button.textContent = "Mark";
//                 button.style.backgroundColor = "";
//                 button.style.color = "";
//             }

//             selections[subject] = next;
//         });
//     });

//     form.addEventListener("submit", (e) => {
//         e.preventDefault();

//         const dateVal = dateInput.value;
//         if (!dateVal) {
//             alert("Please select a date.");
//             return;
//         }

//         const [year, month, day] = dateVal.split("-");
//         const dateKey = `${parseInt(year)}-${parseInt(month)}-${parseInt(day)}`;

//         const dailyData = JSON.parse(localStorage.getItem("dailyAttendance")) || {};
//         const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];

//         // 🧹 Step 1: Reverse old stats for this day (if exists)
//         if (dailyData[dateKey]) {
//             subjects.forEach(subject => {
//                 const status = dailyData[dateKey][subject];
//                 if (!status) return;

//                 let stats = JSON.parse(localStorage.getItem(subject)) || { present: 0, absent: 0, total: 0 };
//                 if (status === "present") stats.present = Math.max(0, stats.present - 1);
//                 if (status === "absent") stats.absent = Math.max(0, stats.absent - 1);
//                 stats.total = Math.max(0, stats.total - 1);
//                 localStorage.setItem(subject, JSON.stringify(stats));
//             });
//         }

//         // 🆕 Step 2: Save new attendance data
//         dailyData[dateKey] = {};
//         subjects.forEach(subject => {
//             const status = selections[subject];
//             if (status && status !== "none") {
//                 dailyData[dateKey][subject] = status;

//                 // ✅ Update subject-wise stats
//                 let stats = JSON.parse(localStorage.getItem(subject)) || { present: 0, absent: 0, total: 0 };
//                 if (status === "present") stats.present += 1;
//                 if (status === "absent") stats.absent += 1;
//                 stats.total += 1;
//                 localStorage.setItem(subject, JSON.stringify(stats));
//             }
//         });

//         localStorage.setItem("dailyAttendance", JSON.stringify(dailyData));

//         alert(`✅ Attendance updated for ${dateVal}`);
//         window.location.href = "calendar.html";
//     });

// });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("edit-form");
  const dateInput = document.getElementById("edit-date");
  const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];
  const selections = {};
  const username = localStorage.getItem("username");

  if (!username) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  // Set max date = today
  dateInput.max = new Date().toISOString().split("T")[0];

  // ✅ Default BIOMETRIC to present
  const biometricBtn = document.querySelector('.mark[data-subject="BIOMETRIC"]');
  if (biometricBtn) {
    selections["BIOMETRIC"] = "present";
    biometricBtn.textContent = "✅ Present";
    biometricBtn.style.backgroundColor = "#28a745";
    biometricBtn.style.color = "#fff";
  }

  // Toggle buttons
  document.querySelectorAll(".mark").forEach(button => {
    button.addEventListener("click", () => {
      const subject = button.dataset.subject;
      const current = selections[subject] || "none";

      let next;
      if (current === "none") {
        next = "present";
        button.textContent = "✅ Present";
        button.style.backgroundColor = "#28a745";
        button.style.color = "#fff";
      } else if (current === "present") {
        next = "absent";
        button.textContent = "❌ Absent";
        button.style.backgroundColor = "#dc3545";
        button.style.color = "#fff";
      } else {
        next = "none";
        button.textContent = "Mark";
        button.style.backgroundColor = "";
        button.style.color = "";
      }

      selections[subject] = next;
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dateVal = dateInput.value;
    if (!dateVal) {
      alert("Please select a date.");
      return;
    }

    const [year, month, day] = dateVal.split("-");
    const dateKey = `${parseInt(year)}-${parseInt(month)}-${parseInt(day)}`;

    const dailyData = JSON.parse(localStorage.getItem("dailyAttendance")) || {};
    const userStats = JSON.parse(localStorage.getItem("userStats")) || {};

    if (!userStats[username]) {
      userStats[username] = {};
    }

    // 🧹 Step 1: Reverse old stats if this user already had entry for this date
    if (dailyData[dateKey] && dailyData[dateKey].user === username) {
      subjects.forEach(subject => {
        const status = dailyData[dateKey][subject];
        if (!status) return;

        let stats = userStats[username][subject] || { present: 0, absent: 0, total: 0 };
        if (status === "present") stats.present = Math.max(0, stats.present - 1);
        if (status === "absent") stats.absent = Math.max(0, stats.absent - 1);
        stats.total = Math.max(0, stats.total - 1);

        userStats[username][subject] = stats;
      });
    }

    // 🆕 Step 2: Save new attendance
    dailyData[dateKey] = { user: username };

    subjects.forEach(subject => {
      const status = selections[subject];
      if (status && status !== "none") {
        dailyData[dateKey][subject] = status;

        let stats = userStats[username][subject] || { present: 0, absent: 0, total: 0 };
        if (status === "present") stats.present += 1;
        if (status === "absent") stats.absent += 1;
        stats.total += 1;

        userStats[username][subject] = stats;
      }
    });

    localStorage.setItem("dailyAttendance", JSON.stringify(dailyData));
    localStorage.setItem("userStats", JSON.stringify(userStats));

    alert(`✅ Attendance updated for ${dateVal}`);
    window.location.href = "calendar.html";
  });
});
