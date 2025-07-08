document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const label = document.getElementById("theme-label");

  const savedTheme = localStorage.getItem("theme") || "light";
  const isDark = savedTheme === "dark";

  toggle.checked = isDark;
  label.textContent = isDark ? "Dark Mode" : "Light Mode";
  applyTheme(savedTheme);

  toggle.addEventListener("change", () => {
    const theme = toggle.checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    label.textContent = theme === "dark" ? "Dark Mode" : "Light Mode";
    applyTheme(theme);
  });

  function applyTheme(theme) {
    document.body.classList.remove("dark-mode");
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    }
    // For light/default: no additional class = original styles
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const deleteBtn = document.querySelector(".delete-account");

  deleteBtn.addEventListener("click", () => {
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    const enteredPassword = prompt("Please enter your password to confirm:");

    const username = localStorage.getItem("username");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(user => user.username === username);

    if (userIndex === -1) {
      alert("User not found.");
      return;
    }

    if (enteredPassword !== users[userIndex].password) {
      alert("Incorrect password. Account not deleted.");
      return;
    }

    // ✅ Remove user from array
    users.splice(userIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Remove user-specific data (optional: delete everything)
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("profileImg");

    // Remove user's attendance stats if stored separately
    const subjects = ["CHEM", "PYTHON", "IWD", "MATHS", "ENGLISH", "BIOMETRIC"];
    subjects.forEach(subject => localStorage.removeItem(subject));
    localStorage.removeItem("dailyAttendance");

    alert("Account deleted successfully.");
    window.location.href = "index.html";
  });
});
