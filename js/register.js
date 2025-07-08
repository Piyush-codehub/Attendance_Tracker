// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("register-form");

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const username = document.getElementById("reg-username").value.trim();
//     const password = document.getElementById("reg-password").value;
//     const confirmPassword = document.getElementById("reg-confirm").value;

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     // Optional: prevent overwriting if already registered
//     if (localStorage.getItem("username")) {
//       if (!confirm("An account already exists. Do you want to overwrite it?")) {
//         return;
//       }
//     }

//     localStorage.setItem("username", username);
//     localStorage.setItem("password", password);

//     alert("Registration successful! Please login.");
//     window.location.href = "login.html";
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirm = document.getElementById("reg-confirm").value;

    // Validation
    if (!username || !password || !confirm) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    // Get users from localStorage
    let users = [];
    try {
      const stored = localStorage.getItem("users");
      users = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(users)) users = [];
    } catch {
      users = [];
    }

    // Check if username already exists
    const exists = users.some(user => user.username === username);
    if (exists) {
      alert("Username already exists.");
      return;
    }

    // Add new user
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registered successfully. Please login.");
    window.location.href = "index.html";
  });
});

