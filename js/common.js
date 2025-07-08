document.addEventListener("DOMContentLoaded", () => {
  // Ask for permission once
  if (Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        scheduleReminder();
      }
    });
  } else if (Notification.permission === "granted") {
    scheduleReminder();
  }
});

// Schedule a notification every day (as a demo, triggers in 10 sec)
function scheduleReminder() {
  // For demo: trigger after 10 sec (you can use real schedule later)
  setTimeout(() => {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const attendance = JSON.parse(localStorage.getItem("dailyAttendance")) || {};

    if (!attendance[key]) {
      new Notification("📢 Reminder", {
        body: "Don't forget to mark your attendance today!",
        icon: "assets/icon.png", // optional: add your own icon
      });
    }
  }, 10000); // 10 seconds for testing
}


// fetch('navbar.html')
//   .then(res => res.text())
//   .then(data => {
//     document.getElementById('navbar-container').innerHTML = data;
//     const script = document.createElement('script');
//     script.src = 'js/navbar.js';
//     document.body.appendChild(script);
    
//   });
// Inject navbar.html into #navbar-container
fetch("navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar-container").innerHTML = html;

    // Dynamically load navbar.js AFTER injecting the HTML
    const script = document.createElement("script");
    script.src = "js/navbar.js";
    script.onload = () => {
      // 🟢 Call functions ONLY after navbar.js is fully loaded
      if (typeof loadNavbarProfileImage === "function") loadNavbarProfileImage();
      if (typeof setupSidebarToggle === "function") setupSidebarToggle();
    };
    document.body.appendChild(script);
  });




fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer-container").innerHTML = data;
  });

document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme") || "light";
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode"); // Default light mode
  }
});
